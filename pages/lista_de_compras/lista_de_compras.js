

/*******************************************************************************************/
/****************** FUNÇÃO PARA ENVIAR USUARIOS NAO AUTENTICADOS PARA A PAGINA INICIAL DE LOGIN */
/*******************************************************************************************/

firebase.auth().onAuthStateChanged(user =>{
    if(!user){
        window.location.href="../../../index.html";
    }
})


/*******************************************************************************************/
/****************** FUNÇÃO PARA DESLOGAR O USUARIO *****************************************/
/*******************************************************************************************/

function deslogar(){
    firebase.auth().signOut().then(() =>{
        window.location.href ="../../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

firebase.auth().onAuthStateChanged(user =>{
    if(user){

        Buscar_Dados('lista_de_compra',user,'ativo','item_nome','asc');// BUSCA AS INFORMAÇÕES DOS ITENS JA CADASTRADOS NO CARRINHO ATUAL
        
    }
})

/***************************************************************************
 *  BUSCA OS DADOS 
 * 
 */

function Buscar_Dados(colecao,user,status,campo,ordem)
{
    
   dados_servicos.Buscar_Item(colecao,user,status,campo,ordem)
   .then(dados =>
    {
            
        Criar_Lista_de_Compras(dados);
        console.log(dados);

    }).catch(error =>
    {
        removeLoading();
        console.log(error);
        alert("Erro ao recuperar dados");
   })
}






function Criar_Lista_de_Compras(dados){ 


    
    const lista_compras = document.getElementById('lista_compras_id');

    const caption = document.createElement('caption');
    caption.innerHTML = "Lista de Compras";
    lista_compras.appendChild(caption);

Criar_Colunas_Lista_de_Compras(lista_compras);

i=0;
dados.forEach(dados => {    
    add_item_lista_de_compras(lista_compras,dados,i++);
    
//console.log(dados.date_criacao);
    
});



}




var atualizar_ou_cadastrar = true;
var uid;
var item_nome_value;
var item_quant_value;
function Criar_Colunas_Lista_de_Compras(lista_compras){
    

    const thead = document.createElement('thead');
    lista_compras.appendChild(thead);

    const tr_thead = document.createElement('tr');
    thead.appendChild(tr_thead);

    const th_codigo = document.createElement('th');
    th_codigo.innerHTML ="item";
    tr_thead.appendChild(th_codigo);

    const th_quant = document.createElement('th');
    th_quant.innerHTML ="QUANT.";
    tr_thead.appendChild(th_quant);


    const th_preco = document.createElement('th');
    th_preco.innerHTML ="ok";
    tr_thead.appendChild(th_preco);


}

const checkbox_deletar = document.getElementById('checkbox_deletar_id');
const checkbox_editar = document.getElementById('checkbox_editar_id');
const btn_deletar = document.getElementById('btn_deletar_id');
function add_item_lista_de_compras(lista_compras, dados,numero_item){
    
     var uid = dados.uid;
     


    
    const tbody = document.createElement('tbody');
    tbody.id = uid;
    lista_compras.appendChild(tbody);
    


    const tr_tbody = document.createElement('tr');
    
    
    tbody.appendChild(tr_tbody);

    const td_item_nome = document.createElement('td');
    td_item_nome.innerHTML = dados.item_nome;
    td_item_nome.classList.add('td_item_nome');
    td_item_nome.id ='td_item_nome_id'+numero_item;
    //console.log(td_item_nome.id);
    tr_tbody.appendChild(td_item_nome); 




    

    const td_item_quant = document.createElement('td');
    td_item_quant.innerHTML = dados.item_quant;
    td_item_quant.classList.add('td_item_quant');
    td_item_quant.id ='td_item_quant_id'+numero_item;
    tr_tbody.appendChild(td_item_quant);


    const input_item_checkbox = document.createElement('input');
    input_item_checkbox.type = 'checkbox';
  
    const td_item_checkbox = document.createElement('td');
    td_item_checkbox.classList.add('td_item_checkbox');
    td_item_checkbox.id ='item_checkbox_id'+numero_item;
    
    var editar_desativado = true;
        
    // se a opçao deletar checkbox estiver ativa 
    checkbox_editar.addEventListener('change', function() {
        if (this.checked) { // Verifica se a checkbox está marcada
            
            
            
            document.getElementById('btn_deletar_id').style.display = 'inline';

            td_item_nome.style.backgroundColor = 'rgb(202, 199, 29)';
                td_item_quant.style.backgroundColor = 'rgb(202, 199, 29)';
                td_item_checkbox.style.backgroundColor = 'rgb(202, 199, 29)';
        
                input_item_checkbox.style.display = 'none';

            // Função de callback para o evento de clique
            const handleClick = function(Event) {
                
                form.item_nome().value = document.getElementById('td_item_nome_id'+numero_item).innerHTML;
                form.item_quant().value = document.getElementById('td_item_quant_id'+numero_item).innerHTML;
                form.uid().innerHTML = dados.uid;

                btn_deletar.onclick= function(){
                if(form.uid().innerHTML != ''){
                    
                    Deseja_Deletar_Produto_carrinho_de_compras('lista_de_compra',dados.uid);
                    
                }
                }
                
                        ToggleCadastrarItemButton();
                        atualizar_ou_cadastrar =false;
                
            };

            // Adiciona o listener de clique
            td_item_nome.addEventListener('click', handleClick);

            // Armazena a função de callback para poder removê-la depois
            td_item_nome._handleClick = handleClick;

        } else {



                        input_item_checkbox.style.display = '';
                    // faz esperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
        setTimeout(() => {

            location.reload();

        }, 1000); // 1000 milissegundos = 1 segundos

        }
    });


    if(dados.item_checkbox == true){
        input_item_checkbox.checked =true;
        td_item_nome.style.backgroundColor = 'rgb(44, 155, 53)';
                td_item_quant.style.backgroundColor = 'rgb(44, 155, 53)';
                td_item_checkbox.style.backgroundColor = 'rgb(44, 155, 53)';
    }else{
        input_item_checkbox.checked =false;
        td_item_nome.style.backgroundColor = 'rgb(247, 247, 247)';
                td_item_quant.style.backgroundColor = 'rgb(255, 255, 255)';
                td_item_checkbox.style.backgroundColor = 'rgb(255, 255, 255)';
    }
    
 
    input_item_checkbox.addEventListener('change', function() {

        
        
        if (this.checked) { // Verifica se a checkbox está marcada
            
            td_item_nome.style.backgroundColor = 'rgb(44, 155, 53)';
            td_item_quant.style.backgroundColor = 'rgb(44, 155, 53)';
            td_item_checkbox.style.backgroundColor = 'rgb(44, 155, 53)';

            var dados ={
                item_checkbox: true
            };
    
            console.log(uid);
            atualizar_check_box('lista_de_compra',uid,dados);

        } else {
            
           td_item_nome.style.backgroundColor = 'rgb(247, 247, 247)';
            td_item_quant.style.backgroundColor = 'rgb(255, 255, 255)';
            td_item_checkbox.style.backgroundColor = 'rgb(255, 255, 255)';
            var dados ={
                item_checkbox: false
            };
    
            
            atualizar_check_box('lista_de_compra',uid,dados);
            
        }
    });

    td_item_checkbox.appendChild(input_item_checkbox);
    tr_tbody.appendChild(td_item_checkbox);
    i++;
}



/******************************************************
 * FUNCAO PARA ATUALIZAR OS DADOS CADASTRADOS DOS ITENS 
 ********************************************************/
function atualizar_check_box(colecao,doc,dados){


    dados_servicos.Atualizar_dados(colecao,doc,dados)
     .then(()=>{
        
removeLoading();

     }).catch(()=>{
        removeLoading();
        alert("Erro ao salvar Produto");
     })

}

// funcao para perguntar se deseja deletar produtotos do carrinho
function Deseja_Deletar_Produto_carrinho_de_compras(colecao,dados)
{
    
    const desejaDeletarProduto = confirm('DESEJA DELETAR O PRODUTO');
    if(desejaDeletarProduto == true){
        Deletar_Produto_carrinho_de_compras(colecao,dados);
    }

}

function Deletar_Produto_carrinho_de_compras(colecao,dados){
    ShowLoading();
    

    dados_servicos.Delete_item(colecao,dados)
   .then(snapshot =>{

    document.getElementById(dados).remove();
    form.item_nome().value ='';
    form.item_quant().value ='';
    form.uid().innerHTML ='';
    atualizar_ou_cadastrar = true;

    
    removeLoading();

    

   }).catch(error =>{
    removeLoading();
    console.log(error);
    alert("Erro ao deletar dados");
   })
}




// botao para cadastrar item no banco de dados
const btn_add = document.getElementById('botao_colocar_na_lista_id');
btn_add.onclick = function() {
    ShowLoading();
    if(atualizar_ou_cadastrar){

        salvar_item_lista_de_compra();
    }else{

        const dados ={
            item_nome: form.item_nome().value,
            item_quant: form.item_quant().value
        };
        
        Atualizar_dados_do_item('lista_de_compra', form.uid().innerHTML,dados);
    }  
  
}




/*************************************************
 * CRIAR A COMANDA DO PEDIDO
 */
function salvar_item_lista_de_compra(){

    const dados = Obter_dados_Lista_de_compras();

    Cadastrar_Pedido(dados);
}

i=0
function Obter_dados_Lista_de_compras() {

    var dados = {}; // Objeto para armazenar os dados

    dados.user = {
        uid: firebase.auth().currentUser.uid
    };

    
    dados['item_nome'] = document.getElementById('item_nome_id').value;
    dados['item_quant'] = document.getElementById('item_quant_id').value;
    dados['status'] = 'ativo';

    dados['item_checkbox'] = false;


    return dados; // Retorna o objeto com todos os dados


}

/******************************************************
 * CADASTRA NOVOS pedidos no bacnod e dados
 *********************************************/
function Cadastrar_Pedido(dados){
    dados_servicos.Salvar_no_Banco_Dados(dados,"lista_de_compra")
    .then(()=>{
        location.reload();
       
    }).catch(()=>{
       removeLoading();
       alert("Erro ao salvar Item");
    })
}

/******************************************************
 * FUNCAO PARA ATUALIZAR OS DADOS CADASTRADOS DOS ITENS 
 ********************************************************/
function Atualizar_dados_do_item(colecao,doc,dados){

    ShowLoading();
    dados_servicos.Atualizar_dados(colecao,doc,dados)
     .then(()=>{

        location.reload();

     }).catch(()=>{
        removeLoading();
        alert("Erro ao atualizar Item");
     })

}

// validar cadastro

function OnChange_Item_nome(){
    const item_nome = form.item_nome().value;
    form.item_nome_Obrigatorio().style.display = item_nome ? "none":"block";
    form.item_nome_Invalido().style.display = item_nome.length  >= 1 ? "none": "block";
    ToggleCadastrarItemButton();
}

function OnChange_Item_quant(){
    const item_quant = form.item_quant().value;
    form.item_quant_Obrigatorio().style.display = item_quant ? "none":"block";
    form.item_quant_Invalido().style.display = item_quant  => 0? "none": "block";

    ToggleCadastrarItemButton();
}

function ToggleCadastrarItemButton(){
    form.btnCadastrar().disabled = !isFromValid();
    
}

function isFromValid(){

    const item_nome = form.item_nome().value;
    if(!item_nome){
        return false;
    }

    const item_quant = form.item_quant().value;
    if(!item_quant || item_quant < 0){
        return false;
    }

    return true;


}

/*********************************************************************
 * FUNÇÃO PARA ASSOCIAR OS ELEMENTOS HTML PELO ID
 * , ASSIM CONSEGUINDO BUSCAR AS INFORMAÇÃO DIGITADAS NOS FORMULARIOS
 *  E CONSEGUINDO INSERIR AS INFORMAÇÕES CASO SEJA SOLICITADO UMA ATUALIZACAO DOS DADOS 
 **************************************************************/

const form = {

    item_nome:() => document.getElementById('item_nome_id'),    
    item_nome_Obrigatorio:() => document.getElementById('item_nome_obrigatorio_id'),
    item_nome_Invalido:() => document.getElementById('item_nome_invalido_id'),

    item_quant:() => document.getElementById('item_quant_id'),
    item_quant_Obrigatorio:() => document.getElementById('item_quant_obrigatorio_id'),
    item_quant_Invalido:() => document.getElementById('item_quant_Invalido_id'),

    btnCadastrar:() => document.getElementById('botao_colocar_na_lista_id'),

    uid:() => document.getElementById('uid_id'),
   
    
}