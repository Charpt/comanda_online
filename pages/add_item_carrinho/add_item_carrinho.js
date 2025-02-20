function deslogar(){
    firebase.auth().signOut().then(() =>{
        window.location.href ="../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

firebase.auth().onAuthStateChanged(user =>{
    if(user){

        buscarDados(user);
    }
})






   /* document.getElementById('formulario_de_pesquisa').addEventListener('submit',function(event){
    event.preventDefault();
    const itemnome = document.getElementById('pesquisa_codigo_name').value;
        
    
       return firebase.firestore()
        .collection('produtos')
        .where('user.uid','==', user.uid)
        .orderBy('codigo','desc')
        .get()
       .then(dados =>{
    
        const resultado = document.getElementById('resultado');
            resultado.innerHTML="";
    
            if(dados.empty){
                 console.log("<p>Nenhum item encontrado");
    
            }else{
                dados.array.forEach((doc) => {
                    const data = doc.data();
                    console.log(`<p>${data.item_nome}</p>`) ;
                    
                });
            }
           
        })
        
        .catch(error =>
        {
           
            console.log(error);
            alert("Erro ao recuperar dados");
       })
    
    }); */

