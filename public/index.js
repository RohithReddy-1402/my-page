document.getElementById('sign-up').addEventListener('click',()=>{
            window.location.href='sign.html';
        });
document.getElementById('login').addEventListener('click',()=>{
            window.location.href='login.html';
        });
const form=document.getElementById('form');
const password = document.getElementById('password');
const passConf=document.getElementById('passConf');
form.addEventListener('submit',(event)=>{
    if(password.value !==passConf.value){
        event.defaultPrevented();
        alert("confirm the password correctly !")
    }
})
