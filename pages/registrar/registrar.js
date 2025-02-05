firebase.auth().onAuthStateChanged(user =>{
    if(user){
        window.location.href="../home/home.html";

    }
})

function ToggleEmailErrors(){
    const email = from.email().value;

    from.emailObrigatorio().style.display = email ? "none" : "block";

    from.emailInvalido().style.display = validateEmail(email) ? "none" : "block";
    ValidarEmailIguais();
    ToggleRegistrarButton();
 }

 function ToggleConfirmEmailErrors(){
    const ConfirmEmail = from.confirmEmail().value;

    from.confirmEmailObrigatorio().style.display = ConfirmEmail ? "none" : "block";

    from.confirmEmailInvalido().style.display = validateEmail(ConfirmEmail) ? "none" : "block";
    ValidarEmailIguais();
    ToggleRegistrarButton();

    
 }


function ValidarEmailIguais(){
    const email = from.email().value;
    const confirmEmail = from.confirmEmail().value;

    from.confirmEmailInvalido().style.display = email == confirmEmail ? "none" : "block";
    
    
}

function TogglePasswordErrors(){
const password = from.password().value;
from.passwordObrigatorio().style.display = password ? "none" : "block";
from.confirmMinPassword ().style.display = password.length >= 6 ? "none" : "block";
ValidarPasswordIguais();
ToggleRegistrarButton();




}
function ToggleConfirmPasswordErrors(){

    ValidarPasswordIguais();
    ToggleRegistrarButton();
    
    }

function ValidarPasswordIguais(){
    const password = from.password().value;
    const confirmPassword = from.confirmPassword().value;
    from.confirmPasswordInvalido().style.display = password == confirmPassword ? "none" : "block";

    
}

function ToggleRegistrarButton(){
    from.botaoRegistrar().disabled = !isFromValid();
    
}

function isFromValid(){
    const email = from.email().value;
    if(!email || !validateEmail(email)){
        return false;
    }
    const confirmEmail = from.confirmEmail().value;
    if(!confirmEmail || !validateEmail(confirmEmail) ){
        return false;
    }
    const password = from.password().value;
    if(!password || password.length < 6){
        return false;
    }
    const confirmPassword = from.confirmPassword().value;
    if(password != confirmPassword){
        return false;
    }

    return true;
}

function LoginPage(){
    window.location.href ="../../index.html";
}


function Registrar(){
    ShowLoading();
    const email = from.email().value;
    const password = from.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email,password
        ).then(() => {
            removeLoading();
         window.location.href="../../pages/home/home.html";
        }).catch(error =>{
            removeLoading();
            alert(getErrorMensagem(error))
        })
}
function getErrorMensagem(error){

    if(error.code == "auth/email-already-in-use")
    return "Email ja Esta em Uso!!!";
}



const from = {

    email:() => document.getElementById('email_id'),
    emailObrigatorio:() => document.getElementById('email_obrigatorio_id'),
    emailInvalido:() => document.getElementById('email_invalido_id'),
    
    confirmEmail:() => document.getElementById('confirm_email_id'),
    confirmEmailObrigatorio:() => document.getElementById('confirm_email_obrigatorio_id'),
    confirmEmailInvalido:() => document.getElementById('confirm_email_invalido_id'),

    password:()=>document.getElementById('password_id'),
    passwordObrigatorio:()=>document.getElementById('password_obrigatorio_id'),
    confirmMinPassword:()=>document.getElementById('confirm_min_password_id'),

    confirmPassword:()=>document.getElementById('confirm_password_id'),    
    confirmPasswordInvalido:()=>document.getElementById('confirm_password_invalido_id'),



    botaoRegistrar:()=>document.getElementById('registrar_id'),
}