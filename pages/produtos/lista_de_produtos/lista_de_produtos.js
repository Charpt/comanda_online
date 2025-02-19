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


function buscarDados(user)
{

    ShowLoading();

   dados_servicos.BuscarPorUsuario(user)
   .then(dados =>
    {
        removeLoading();

        AddDados(dados);

    }).catch(error =>
    {
        removeLoading();
        console.log(error);
        alert("Erro ao recuperar dados");
   })
}



function AddDados(dados){

const orderList = document.getElementById('lista_dados');

dados.forEach(dados => {

    const li = Criar_lista_dos_dados(dados)   
    
    li.appendChild(CriarImagemDosDados());    
    li.appendChild(Criar_Paragrafos(""+dados.produto));
    li.appendChild(Criar_Paragrafos("<b>STATUS:</b> "+dados.status));   
    li.appendChild(Criar_Paragrafos("<b>CODIGO:</b> "+dados.codigo));   
    li.appendChild(Criar_Paragrafos("<b>QUANT:<b/> "+dados.quantidade));    
    li.appendChild(Criar_Paragrafos("<b>PREÇO:</b> "+dados.preco));
    li.appendChild(Criar_Paragrafos("<b>OBS:</b> "+dados.observacao));
    li.appendChild(Criar_Paragrafos("<b>UNIDADE DE MEDIDA:</b> "+dados.unidade_medida));    
    li.appendChild(Criar_Paragrafos( "<b>Criado:</b> "+formatar_date(dados.date_criacao)));
    li.appendChild(CriarBotaoDelete(dados));
    orderList.appendChild(li);
    
    
console.log(dados.date_criacao);
    
});

}

function Criar_lista_dos_dados(dados){
    
    const li = document.createElement('li');
    li.classList.add(dados.status);
    li.classList.add('card');
    li.id = dados.uid;
    
    li.addEventListener('click',()=> {
        window.location.href ="../cadastrar_produtos/cadastrar_produtos.html?uid="+dados.uid;
    })
    return li;
}

function CriarBotaoDelete(dados){
    const botaoDeletar = document.createElement('button');
    botaoDeletar.innerHTML =  "deletar";
    botaoDeletar.classList.add("outline");
    botaoDeletar.classList.add("danger");
    botaoDeletar.addEventListener('click',Event => {
        Event.stopPropagation();
        DesejaDeletarProduto(dados);

    });
    
    return botaoDeletar;
}


function DesejaDeletarProduto(dados)
{
    const desejaDeletarProduto = confirm('DESEJA DELETAR O PRODUTO');
    if(desejaDeletarProduto == true){
        DeletarProduto(dados);
    }

}

function Criar_Paragrafos(value){
    const elemento = document.createElement('p');
    elemento.innerHTML =  value;
    return elemento;
}

function CriarImagemDosDados(){
    const img = document.createElement('img');
    img.src =  "produto_teste.jpg";
    img.alt = "carne de panela com batata";
    return img;
}

function DeletarProduto(dados){
    ShowLoading();

    dados_servicos.DeleteDados(dados)
   .then(snapshot =>{
    removeLoading();

    document.getElementById(dados.uid).remove();

   }).catch(error =>{
    removeLoading();
    console.log(error);
    alert("Erro ao deletar dados");
   })
}


function formatar_date(data){

   
const dataString = data;

    const date = new Date(dataString);
    
    const dia = String(date.getDate()).padStart(2,'0');
    const mes = String(date.getMonth()+1).padStart(2,'0');
    const ano = date.getFullYear();
    const horas = String(date.getHours()).padStart(2,'0');
    const minutos = String(date.getMinutes()).padStart(2,'0');

    

    const dataformatada =`${dia}/${mes}/${ano} ás ${horas}:${minutos}`;



    return dataformatada

}


/*// Função para calcular a cor com base no tempo restante
function updateColor(card_id,startTime, totalDuration) {
    
    const card = document.getElementById(''+card_id);
     const now = new Date().getTime(); // Tempo atual em milissegundos
     const elapsedTime = now - startTime; // Tempo decorrido desde o início
     const progress = elapsedTime / totalDuration; // Progresso (0 a 1)
 
     // Limita o progresso a 1 (100%)
     if (progress >= 1) {
         card.style.backgroundColor = 'red'; // Cor final
         return;
     }
 
     // Calcula a cor intermediária
     const red = Math.floor(255 * progress); // Aumenta o vermelho
     const green = Math.floor(255 * (1 - progress)); // Diminui o verde
     card.style.backgroundColor = `rgb(${red}, ${green}, 0)`; // Aplica a cor
 
     // Atualiza a cor a cada segundo
     requestAnimationFrame(() => updateColor(startTime, totalDuration));
 }*/
