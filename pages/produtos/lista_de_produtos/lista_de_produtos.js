function deslogar(){
    firebase.auth().signOut().then(() =>{
        window.location.href ="../../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

firebase.auth().onAuthStateChanged(user =>{
    if(user){

        buscarDados(user);
    }
})

function CadastrarProdutoPage(){
    window.location.href ="../cadastrar_produtos/cadastrar_produtos.html";
}


function buscarDados(user){

    ShowLoading();

   firebase.firestore()
   .collection('produtos')
   .where('user.uid','==', user.uid)
   .orderBy('codigo','desc')
   .get()
   .then(snapshot =>{
    removeLoading();
    const dados = snapshot.docs.map(doc => doc.data());
    AddDados(dados);
   }).catch(error =>{
    removeLoading();
    console.log(error);
    alert("Erro ao recuperar dados");
   })
}

function AddDados(dados){
const orderList = document.getElementById('lista_dados');

dados.forEach(dados => {

    
    

    const li = document.createElement('li');

    li.classList.add(dados.status);
    li.classList.add("card");


    const img = document.createElement('img');
    img.src =  "produto_teste.jpg";
    img.alt = "carne de panela com batata";
    
    
    li.appendChild(img);

    const produto = document.createElement('h1');
    produto.innerHTML =  ""+dados.produto;
    li.appendChild(produto);

    const status = document.createElement('P');
    status.innerHTML =  "<b>STATUS:</b> "+dados.status;
    li.appendChild(status);

    const codigo = document.createElement('P');
    codigo.innerHTML =  "<b>CODIGO:</b> "+dados.codigo;
    li.appendChild(codigo);

    const quantidade = document.createElement('p');
    quantidade.innerHTML =  "<b>QUANT:<b/> "+dados.quantidade;
    li.appendChild(quantidade);

    const preco = document.createElement('P');
    preco.innerHTML =  "<b>PREÇO:</b> "+dados.preco;
    li.appendChild(preco);

    const observacao = document.createElement('p');    
    observacao.innerHTML =  "<b>OBS:</b> "+dados.observacao;
    li.appendChild(observacao);
    
    const unidade_medida = document.createElement('p');
    unidade_medida.innerHTML =  "<b>UNIDADE DE MEDIDA:</b> "+dados.unidade_medida;
    li.appendChild(unidade_medida);

    const date_criacao = document.createElement('p');
    date_criacao.innerHTML =  "<b>CRIADO:</b> "+formatar_date(dados.date_criacao);
    li.appendChild(date_criacao);


    const botao = document.createElement('button');
    botao.innerHTML =  "mais informações";
    li.appendChild(botao);

    orderList.appendChild(li);
    
});

}

function formatar_date(date){
    return new Date(date).toLocaleString('pt-br');

}
