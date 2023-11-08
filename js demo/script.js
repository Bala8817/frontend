// color change
const colorBox = document.getElementById("colorBox");
const changeColorButton = document.getElementById("changeColorButton");


const colors = ["#192370", "#00008B", "#000080", "#7B68EE", "#9b59b6"," #302C42"];

function changeColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = randomColor;
}


changeColorButton.addEventListener("click", changeColor);



// crud
let getUrl = "http://localhost:5000/users/view"
let postUrl = "http://localhost:5000/users/create"
let delUrl = "http://localhost:5000/users/delete"
let updateUrl = "http://localhost:5000/users/update"

let fna=document.getElementById('name');
let ema=document.getElementById('email');
let pho=document.getElementById('phone');
let pas=document.getElementById('password');
let sub=document.getElementById('submit');
let tbl=document.getElementById('tbl');
let msg=document.getElementById('msg');
  
// eye
let eye=document.getElementById('eye')
eye.addEventListener("click",function(i){
    console.log(i)
    console.log(pas.type)
    if(pas.type==="password"){
        pas.setAttribute("type","text")
        // console.log(eye)
        eye.classList.add("fa-eye-slash")
        eye.classList.remove("fa-eye")
    }
    else{
        pas.setAttribute("type","password")
        eye.classList.remove("fa-eye-slash")
        eye.classList.add("fa-eye")
    }
})



let format=/^(([^<>()[\]\\.,;:\s@"]+(\[^<>()[.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

sub.addEventListener("click", post)
// post
async function post(){
    let fname=fna.value.trim();
    let mail=ema.value.trim();
    let phne=pho.value.trim();
    let pass=pas.value.trim();

    if(fname==="" || mail==="" || phne==="" || pass===""){
        alert("Please enter the full form")
        // msg.text="please enter the full form"
        return 
    }

    if(fname.length<=3){
       alert("please enter the name correct format")
    // msg.innerHTML="please enter the full form"
    
    }

    if(!(format.test(mail))){
        alert("enter valid email")
        // msg.innerHTML="please enter the full form"
        
    }

    if(phne.length!==10){
        alert("enter valid number")
    }

    if(pass.length!==8){
        alert("Password is required")
        // msg.innerHTML="please enter the full form"
        return
    }

    let userObj={name:fname,email:mail,phone:phne,password:pass}
    let userStr=JSON.stringify(userObj)

    try{
        let object={
            method:"POST",
            headers:{"content-type":"application/json"},
            body:userStr
        }
        let response=await fetch(postUrl,object);
        let res=await (response.json());
        console.log("hai")
        if(res.ok){
            fname.value="";
            mail.value="";
            phne.value="";
            pass.value="";

            console.log("post successfuly send")
            get()
        }
    }
    catch(err){
        console.log(err)
    }
}

// get
async function get(){
    try{
    let response=await fetch(getUrl);
    let resget=await response.json()
    console.log(response);
    if(response.ok){
        createInterface(resget.data)
    }
   }
   catch(err){
    console.log(err)
   }
}
get()


// create
function createInterface(data){
    tbl.innerHTML="";

    for(let key of data){
        let id=key._id;
        let fn=key.name;
        let em=key.email;
        let ph=key.phone;
        let ps=key.password;    
          

        let ps1=""
        for(i=0;i<ps.length;i++){
            ps1+="*"
        }
        // console.log(id)
        let tr=document.createElement('tr')
        tr.innerHTML=
        `
        <td>${fn}</td>
        <td>${em}</td>
        <td>${ph}</td>
        <td>${ps1}</td>
        <td><button class="btn btn-primary btn-sm" onclick="upd('${id}','${fn}','${em}','${ph}','${ps}')">edit</button></td>
        <td><button class="btn btn-danger btn-sm" onclick="del('${id}')">delete</button></td>
        `
    tbl.append(tr)
    }
}
get()

// delete
async function del(id){
    try{
       let response=await fetch(`${delUrl}?_id=${id}`,{
       method:"DELETE"
    })
    if(response.ok){
        get()
    }
   }
   catch(err){
    console.log(err)
   }
}

// update

let update=document.getElementById('update');
update.style.display="none"

function upd(a,b,c,d,e){
    update.style.display="inline-block"
    sub.style.display="none"
    fna.value=b;
    ema.value=c;
    pho.value=d;
    pas.value=e;

    update.addEventListener("click",function(){
        
        let userObj=JSON.stringify({name:fna.value,email:ema.value,phone:pho.value,password:pas.value})
        addup(a,userObj)
    })
}

async function addup(id,userObj){
    try{
           let response=await fetch(`${updateUrl}?_id=${id}`,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:userObj
           })
           if(response.ok){
            fna.value="";
            ema.value="";
            pho.value="";
            pas.value="";
           }
           get()
    }
    catch(err){
        console.log(err)
    }
}