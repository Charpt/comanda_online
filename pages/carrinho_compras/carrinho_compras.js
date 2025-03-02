/*******************************************************************************************/
/****************** FUNÇÃO PARA ENVIAR USUARIOS NAO AUTENTICADOS PARA A PAGINA INICIAL DE LOGIN */
/*******************************************************************************************/

firebase.auth().onAuthStateChanged(user =>{
    if(!user){
        window.location.href="../../index.html";
    }
})


/*******************************************************************************************/
/****************** FUNÇÃO PARA DESLOGAR O USUARIO *****************************************/
/*******************************************************************************************/

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
        obter_quantidade_de_carrinhos_fechados(user);
    }
})


// obter quantidade de carrinhos de compras

var numero;
function obter_quantidade_de_carrinhos_fechados(user){
    const numero_de_carrinho1 = document.getElementById('quantidade_carrinhos1')
    const numero_de_carrinho = document.createElement('label');
    dados_servicos.Buscar_Carrinho_de_Compras_quantidade(user)
    .then(dados =>
     {
        dados.forEach(dados => {    
            
            numero_de_carrinho.classList.add('quantidade_carrinhos');
            numero_de_carrinho.id ='quantidade_carrinhos2';

            numero_de_carrinho.innerHTML = (dados.quantidade + 1);
            numero = (dados.quantidade + 1);
       
            numero_de_carrinho1.appendChild(numero_de_carrinho);

     });
         
     
     
 
     }).catch(error =>
     {
         removeLoading();
         console.log(error);
         alert("Erro ao recuperar dados");
    })

    return numero;

}




function buscarDados(user)
{
   dados_servicos.BuscarPorUsuario_Carrinho_de_Compras(user)
   .then(dados =>
    {
        Criar_Carrinho_de_Compras(dados);
        
        

    }).catch(error =>
    {
        removeLoading();
        console.log(error);
        alert("Erro ao recuperar dados");
   })
}





function Add_Item_Carrinho(){
    window.location.href ="../add_item_carrinho/add_item_carrinho.html";
}


// Verifica se há um valor salvo no localStorage
const input = document.getElementById('bloco_id');

const savedValue = localStorage.getItem('inputValue');

if (savedValue) {
    input.value = savedValue; // Preenche o input com o valor salvo
}

// Salva o valor no localStorage sempre que o usuário digitar algo
input.addEventListener('input', function() {
    localStorage.setItem('inputValue', this.value);
});


function Criar_Carrinho_de_Compras(dados){ 


    
    const carrinho = document.getElementById('carrinho');

    const caption = document.createElement('caption');
    caption.classList.add('evidente_destaque_1');
    caption.id = ('capition_endereco');
    caption.innerHTML = "Produtos";
    carrinho.appendChild(caption);

Criar_Colunas_Carrinho_de_Compras(carrinho);


dados.forEach(dados => {    
    Add_Item_Carrinho_de_Compras(carrinho,dados);
    
console.log(dados.date_criacao);
    
});

//SOMA AS COLUNAS DA TABELA EXIBINDO O VALOR TOTAL
const total_carrinho = document.getElementById('total_carrinho');
total_carrinho.innerHTML = somar_Colunas("carrinho",4).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

}

function Criar_Colunas_Carrinho_de_Compras(carrinho){
    

    const thead = document.createElement('thead');
    carrinho.appendChild(thead);

    const tr_thead = document.createElement('tr');
    thead.appendChild(tr_thead);

    const th_codigo = document.createElement('th');
    th_codigo.innerHTML ="COD.";
    tr_thead.appendChild(th_codigo);

    const th_quant = document.createElement('th');
    th_quant.innerHTML ="QUANT.";
    tr_thead.appendChild(th_quant);

    const th_produtos = document.createElement('th');
    th_produtos.innerHTML ="PRODUTO";
    tr_thead.appendChild(th_produtos);

    const th_uni_preco = document.createElement('th');
    th_uni_preco.innerHTML ="uni. PREÇO";
    tr_thead.appendChild(th_uni_preco);

    const th_preco = document.createElement('th');
    th_preco.innerHTML ="PREÇO";
    tr_thead.appendChild(th_preco);


}


function Add_Item_Carrinho_de_Compras(carrinho, dados){

    const tbody = document.createElement('tbody');
    carrinho.appendChild(tbody);
    tbody.id = dados.uid;
    tbody.addEventListener('click',Event => {
        Event.stopPropagation();
        Deseja_Deletar_Produto_carrinho_de_compras(dados);
    });

    const tr_tbody = document.createElement('tr');
    tbody.appendChild(tr_tbody);

    const td_item_1_cod = document.createElement('td');
    td_item_1_cod.innerHTML =dados.codigo;
    tr_tbody.appendChild(td_item_1_cod);

    const td_item_1_quant = document.createElement('td');
    td_item_1_quant.innerHTML =dados.quantidade;
    td_item_1_quant.classList.add('evidente');
    tr_tbody.appendChild(td_item_1_quant);

    const td_item_1_produtos = document.createElement('td');
    td_item_1_produtos.innerHTML =dados.item_nome +"<br> <b class=obs> obs: "+ dados.observacao;
    td_item_1_produtos.classList.add('evidente');
    td_item_1_produtos.classList.add('nome_item');
    tr_tbody.appendChild(td_item_1_produtos);

    const td_item_1_uni_preco = document.createElement('td');
    td_item_1_uni_preco.innerHTML =(dados.unidade_preco).toLocaleString('en', {minimumFractionDigits: 2});
    tr_tbody.appendChild(td_item_1_uni_preco);

    const td_item_1_preco = document.createElement('td');
    td_item_1_preco.classList.add('evidente');
    td_item_1_preco.innerHTML =(dados.unidade_preco * dados.quantidade).toLocaleString('en', {minimumFractionDigits: 2});
    tr_tbody.appendChild(td_item_1_preco);
 
    const total_carrinho = document.getElementById('total_carrinho');
    total_carrinho.innerHTML = somar_Colunas("carrinho",4).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}





// funcao pra somar as colunas 

 function somar_Colunas(tabela_id,indice_Coluna){

    const tabela = document.getElementById(tabela_id);

    let soma = 0;

    for(let i =1; i< tabela.rows.length;i++){

        const valorCelula = String(tabela.rows[i].cells[indice_Coluna].innerHTML);


        soma+= parseFloat(valorCelula) || 0;
        console.log(parseFloat(valorCelula).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        
    }

    return soma;

 }



// deletar produtotos do carrinho



 function Deseja_Deletar_Produto_carrinho_de_compras(dados)
{
    const desejaDeletarProduto = confirm('DESEJA DELETAR O PRODUTO');
    if(desejaDeletarProduto == true){
        Deletar_Produto_carrinho_de_compras(dados);
    }

}

function Deletar_Produto_carrinho_de_compras(dados){
    ShowLoading();

    dados_servicos.Delete_dados_carrinho_de_compras(dados)
   .then(snapshot =>{
    removeLoading();

    document.getElementById(dados.uid).remove();

   }).catch(error =>{
    removeLoading();
    console.log(error);
    alert("Erro ao deletar dados");
   })
}

// INSERINDO A QUANTIDADE NO CARRINHO 
function AtualizarDadosDoProduto(){
    const dados = criarProduto();

    ShowLoading();
    
    finalizar(dados);


}



function finalizar(dados){
    dados_servicos.Add_quantidade_carrinho_finalizado(dados)
    .then(()=>{
       
       

    }).catch(()=>{
       removeLoading();
       alert("Erro ao salvar Produto");
    })
}


function criarProduto(){
    
    return{
        quantidade:  numero,
        user:{
            uid: firebase.auth().currentUser.uid
        }
    }
}


