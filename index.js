firebase.auth().onAuthStateChanged(user =>{
    if(user){
        window.location.href="pages/home/home.html";

    }
})

function OnchangeEmail(){
    TogglebuttonsDisabled();
    ToggleEmailErrors();
    
            
}

function OnchangePassword(){
    TogglebuttonsDisabled();
    
    TogglePasswordErrors();
            
}
    
    function isEmailValid(){
        const email = from.email().value;
        if(!email){
    return false;
        }else{
            return validateEmail(email)
        }
        
    }
    
    function isPasswordValid(){
        const password = from.password().value;
        if(!password){
    return false;
        }else{
            return true;
        }
        
    }
     function ToggleEmailErrors(){
        const email = from.email().value;

        from.emailObrigatorio().style.display = email ? "none" : "block";

        from.emailInvalido().style.display = validateEmail(email) ? "none" : "block";
     }
    
     function TogglePasswordErrors(){
        const password = from.password().value;
        from.passwordObrigatorio().style.display = !password ? "block": "none";
     }
    
     function TogglebuttonsDisabled(){
        
    const emailValid = isEmailValid();

    from.recuperarSenha().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    from.botaoEntrar().disabled = !emailValid || !passwordValid;
     }
    
     function Login(){ 
        ShowLoading();
        const email = from.email().value
        const password = from.password().value
  
  firebase.auth().signInWithEmailAndPassword(email,password).then(response =>{
    removeLoading();
    window.location.href ="pages/home/home.html";
  }).catch(error => {
    alert(getErrorMensagem(error));
    removeLoading();
  });
         
     }
     function Registrar(){
        window.location.href ="pages/registrar/registrar.html";
     }

     function Recuperar_Senha(){
        ShowLoading();
        firebase.auth().sendPasswordResetEmail(from.email().value).then(() =>{
            removeLoading();
            alert("Email ENVIADO com SUCESSO")
        }).catch(error =>{
            
            alert(getErrorMensagem(error));
            removeLoading();
    
        });
      }

      function getErrorMensagem(error){
        if(error.code=="auth/user-not-found" || error.code=="auth/wrong-password"){
            return "Usuario Nao Existe ou Senha Invalida"
        }else{
            return error
        }
    
      }
    const from = {
        email:() => document.getElementById('email_id'),
        emailObrigatorio:() => document.getElementById('email_obrigatorio_id'),
        emailInvalido:() => document.getElementById('email_invalido_id'),

        password:()=>document.getElementById('password_id'),
        passwordObrigatorio:()=>document.getElementById('senha_obrigatorio_id'),

        recuperarSenha:()=>document.getElementById('recuperar_password_button_id'),
        botaoEntrar:()=>document.getElementById('login_button_id'),
        botaoRegistrar:()=>document.getElementById('password_id'),
}

    