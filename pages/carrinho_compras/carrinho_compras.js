function deslogar(){
    firebase.auth().signOut().then(() =>{
        window.location.href ="../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

function Add_Item_Carrinho(){
    window.location.href ="../add_item_carrinho/add_item_carrinho.html";
}