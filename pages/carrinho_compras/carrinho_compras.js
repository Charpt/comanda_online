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

        buscarDados(user);// BUSCA AS INFORMAÇÕES DOS ITENS JA CADASTRADOS NO CARRINHO ATUAL
        obter_quantidade_de_carrinhos_fechados(user); // BUSCA A QUANTIDADE DE CARINHOS JA CADASTRADOS 
    }
})


/*******************************************************************************************/
/****************** FUNÇÃO PARA OBTER QUANTOS CARINHOS DE COMPRAS JA FORAM CONCLUIDOS
 * E RETORNAR O VALOR PARA A VARIAVEL NUMERO *******/
/*******************************************************************************************/

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

// INSERINDO A QUANTIDADE NO CARRINHO 
function Add_quantidade_de_carrinhos_fechados(){
    const dados = criar_novo_numero_carrinho();
    ShowLoading();
    
    Atualizar_quantidade_carrinho_fechado(dados);


}




function Atualizar_quantidade_carrinho_fechado(dados){
    dados_servicos.Atualizar_quantidade_carrinho_finalizado(dados)
    .then(()=>{
        
        console.log("novo numero de carrinho criado" + dados.quantidade);
       

    }).catch(()=>{
       removeLoading();
       alert("Erro ao salvar Produto");
    })
}


function criar_novo_numero_carrinho(){
    
    return{
        quantidade:  numero,
        user:{
            uid: firebase.auth().currentUser.uid
        }
    }
}






/***************************************************************************
 *  BUSCA OS DADOS 
 * 
 */
var quantidade_de_itens_carrinho;
function buscarDados(user)
{
   dados_servicos.BuscarPorUsuario_Carrinho_de_Compras(user)
   .then(dados =>
    {
        Criar_Carrinho_de_Compras(dados);
        quantidade_de_itens_carrinho = dados.length;
        
        

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

i=0;
dados.forEach(dados => {    
    Add_Item_Carrinho_de_Compras(carrinho,dados,i++);
    
//console.log(dados.date_criacao);
    
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


function Add_Item_Carrinho_de_Compras(carrinho, dados,numero_item){

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
    td_item_1_cod.id ='item_codigo_tb_' + numero_item;
    tr_tbody.appendChild(td_item_1_cod);

    const td_item_1_quant = document.createElement('td');
    td_item_1_quant.innerHTML =dados.quantidade;
    td_item_1_quant.id ='item_quant_tb_' + numero_item;
    td_item_1_quant.classList.add('evidente');
    tr_tbody.appendChild(td_item_1_quant);

    const td_item_1_produtos = document.createElement('td');
    td_item_1_produtos.innerHTML =dados.item_nome +"<br> <b class=obs> obs: "+ dados.observacao;
    td_item_1_produtos.id ='item_produto_tb_' + numero_item;
    td_item_1_produtos.classList.add('evidente');
    td_item_1_produtos.classList.add('nome_item');
    tr_tbody.appendChild(td_item_1_produtos);

    const td_item_1_uni_preco = document.createElement('td');
    td_item_1_uni_preco.innerHTML =(dados.unidade_preco).toLocaleString('en', {minimumFractionDigits: 2});
    td_item_1_uni_preco.id ='item_uni_preco_tb_' + numero_item;
    tr_tbody.appendChild(td_item_1_uni_preco);

    const td_item_1_preco = document.createElement('td');
    td_item_1_preco.classList.add('evidente');
    td_item_1_preco.innerHTML =(dados.unidade_preco * dados.quantidade).toLocaleString('en', {minimumFractionDigits: 2});
    td_item_1_preco.id ='item_preco_tb_' + numero_item;
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
        //console.log(parseFloat(valorCelula).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        
    }

    return soma;

 }






// funcao para perguntar se deseja deletar produtotos do carrinho
 function Deseja_Deletar_Produto_carrinho_de_compras(dados)
{
    const desejaDeletarProduto = confirm('DESEJA DELETAR O PRODUTO AAAA');
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






function Alerta_compra(){


    const desejaDeletarProduto = confirm();    
    
    if(desejaDeletarProduto == true){
       alert("Compra Finalizada");
    }
}







/*******************************************************************************************/
/****************** FUNÇÃO PARA ESCONDER OU MOSTRAR AS OPÇOES DE ENTREGA OU RETIRADA *****************************************/
/*******************************************************************************************/


document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[name="opcao"]');
    const opcao_entrega_id = document.getElementById('opcao_entrega_id');
    const opcao_retirada_id = document.getElementById('opcao_retirada_id');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'entrega') {
                opcao_entrega_id.style.display = "block";
                opcao_retirada_id.style.display = "none";
            } else if (this.value === 'retirada') {
                opcao_entrega_id.style.display = "none";
                opcao_retirada_id.style.display = "block";
            }
        });
    });
});


/*************************************************
 * CRIAR A COMANDA DO PEDIDO
 */
function criar_comanda_pedido(){
    console.log(obter_dados_comanda_pedido());
}

function obter_dados_comanda_pedido() {
    var dados = {}; // Objeto para armazenar os dados

    for (var i = 0; i < quantidade_de_itens_carrinho; i++) {
        // Obtém o elemento da tabela
       
        var elemento2 = document.getElementById('item_quant_tb_' + (i + 0));
        var elemento3 = document.getElementById('item_produto_tb_' + (i + 0));
        


        
        // Verifica se o elemento existe antes de acessar o texto
        if (elemento3) {
            // Armazena o conteúdo de texto no objeto
            
            dados['td_item_prod_' + (i + 1)] = elemento2.textContent + "/"+elemento3.textContent|| elemento2.innerText + "/"+elemento3.innerText;
        } else {
            // Se o elemento não existir, armazena null ou uma mensagem de erro
            dados['td_item_cod_' + (i + 1)] = null;
        }
    }

    return dados; // Retorna o objeto com todos os dados
}

    const form = {


        //date_criacao:() => document.getElementById('date_criacao_id'),
       // date_criacaoInvalido:() => document.getElementById('date_criacaoInvalido_id'),
    
        entrega:() => document.getElementById('entrega_id'),
    
        retirada:() => document.getElementById('retirada_id'),
    
        endereco:() => document.getElementById('selecao_endereco_id'), 
        nome_condominio:() => document.getElementById('selecao_condominio_id'),      
        
        nome_entrega:() => document.getElementById('nome_entrega_id'),  
        nome_retirada:() => document.getElementById('nome_retirada_id'),  

        bloco:() => document.getElementById('bloco_id'),
       
    
        apartamento:() => document.getElementById('apartamento_id'),
       
        forma_pagamento:() => document.getElementById('selecao_forma_pagamento_id'),

        //observacao:() => document.getElementById('observacao_id'),      
        
    }