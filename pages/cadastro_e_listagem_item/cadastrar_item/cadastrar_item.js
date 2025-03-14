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






/******************************************************************************************
*FUNÇÃO PARA VERIFICAR COMO CHEGAMOS A PAGINA DE "CADASTRAR NOVO ITEM"
* SE CASO CHEGAMOS AQUI ATRAVEZ DE TER CLICADO EM UM PRODUTO NA PAGINA LISTA DE PRODUTOS,
 ISSO SIGNIFICA QUE IREMOS ATUALIZAR OS DADOS DO ITEM
 SE NAO IREMOS INICIAR UM NOVO CADASRTO

 ESSA INFORMAÇÃO FOI ENVIADA ATRAVES DA URLSearchParams ENVIANDO O UID DO ITEM CLICADO
/*******************************************************************************************/
// SE(Item_novo_ou_atualizacao)  retornar verdadadeiro
//  ele pega a informaçaõ da funcao Obter_informacao_url_uid e coloca na variavel uid
//  e faz a busca no banco de dados pela uid
// SE NAO ELE CHAMA A FUNCAO add_ou_buscar_id_item
//  QUE BUSCA NO BANCO DE DADOS O ULTIMO ID CODIGO ADICIONADO
//  E SOMA MAIS 1 NESSE ID PARA SER USADO COMO ID DO PROXIMO ITEM
if(!Item_novo_ou_atualizacao()){

    
    const uid = Obter_informacao_url_uid();
    Buscar_uid_item(uid);

    
    
}else{
    // ele busca o ultimo id adicionado e adiciona mais um numero para que seja o id do item
    // para usar vc precisa fornecer a ele a 
    // funcao 'add' ou 'busca' 
    // a colecao e o documento 
    // e qual elemento_id html ira receber os dados trazidos do banco de dados use uma label
    document.getElementById('tempo_preparo_hora_id').value = 0;
    document.getElementById('tempo_preparo_minuto_id').value = 0;
    document.getElementById('quantidade_id').value = 1;
    document.getElementById('preco_id').value = '0,00';
    document.getElementById('acompanhamento_id').value = 'Arroz, Feijão, Batata Frita, Farofa e Salada';

    Inserir_date('date_criacao_id');


    add_ou_buscar_id_item('busca','ultimo_id_adicionado','ultimo_id_adicionado','codigo_id');

    
}

function Obter_informacao_url_uid(){
    const urlParametros = new URLSearchParams(window.location.search);
    //retorna o parametro da url que seja = uid  ex... pagina.html  ? uid = MvPYiwBPTfT1jwPnLjnw
    return urlParametros.get('uid');
}

// verifica se retornou alguma informcação da funcao Obter_informacao_url_uid se sim (true) se nao (false)
function Item_novo_ou_atualizacao(){
    return Obter_informacao_url_uid() ? false : true;
}






/**************************************************
 * BUSCA UM DOCUMENTO QUE TENHA A UID DE PROCURA 
 ****************************************************/

function Buscar_uid_item(uid){
   ShowLoading();
    firebase.firestore()
        .collection('produtos')
        .doc(uid)
        .get()
    .then(doc => {
        
        if(doc.exists){
            removeLoading();
            Inserir_dados_no_formulario_para_Atualizar(doc.data());
            
            ToggleCadastrarProdutoButton();

        }else{
            alert("Documento nao encontrado");
            window.location.href ="../lista_de_item/lista_de_item.html";
        }
    }).catch(()=>{
        removeLoading();
        alert("Erro ao salvar Produto");
        window.location.href ="../lista_de_item/lista_de_item.html";
     });
     
}

/**************************************************
 * FUNCAO PARA ADICIONAR AS INFORMAÇÕES BUSCADA PELA FUNCAO Buscar_uid_item(uid)
 * NOS ELEMENTOS DA TELA DE ATUALIZACAO
 ****************************************************/

function Inserir_dados_no_formulario_para_Atualizar(dados){

// DADOS PARA SEREM INSERIDO 

    if(dados.status == "status_ativo"){
        form.status_ativo().checked = true;

    }else{
        if(dados.status == "desativado"){
            form.status_desativado().checked = true;
    
        }else{
            if(dados.status == "falta"){
                form.status_falta().checked = true;
        
            }else{
                if(dados.status == "pausado"){
                    form.status_pausado().checked = true;
            
                }
            }
        }
    }
    form.codigo().innerText = dados.codigo;
    form.produto().value = dados.produto;
    form.unidade_medida().value = dados.unidade_medida;
    form.quantidade().value = dados.quantidade;
    form.preco().value = dados.preco;
    form.tempo_preparo_hora().value = dados.tempo_preparo_hora;
    form.tempo_preparo_minuto().value = dados.tempo_preparo_minuto;
    
    form.acompanhamento().value = dados.acompanhamento;
    form.date_criacao().value = dados.date_criacao;

    // caso seja uma atualizacao o botao delete ira aparecer e o nome do botao cadastrar muda para atualizar
    form.botao_delete_id().style.display = 'block';
    form.btnCadastrar().innerText = 'atualizar';

}




// se caso um item foi buscado para atualizacao ele tbm pode ser deletado
function Deseja_Deletar_item(colecao,uid_do_item)
{
    
    const desejaDeletarProduto = confirm('DESEJA DELETAR O PRODUTO');
    if(desejaDeletarProduto == true){
        ShowLoading();
        
        dados_servicos.Delete_item(colecao,uid_do_item)
       .then(snapshot =>{
        removeLoading();
    
        
        // faz esperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
        setTimeout(() => {
    
    
            window.location.href ="../lista_de_item/lista_de_item.html";
            
        }, 1000); // 1000 milissegundos = 1 segundos
    
       }).catch(error =>{
        removeLoading();
        console.log(error);
        alert("Erro ao deletar dados");
       })
    }

}




/*******************************************************************************************/
/****************** FUNÇÃO PARA VERIFICAR SE O USUARIO QUER ATUALIZAR OU CADASTRAR UM ITEM */
/*******************************************************************************************/


function Verificar_Atualizacao_ou_Cadastro(){

// cria uma pequena animacao de carregamento na tela
ShowLoading();

// cria um objeto com as informações do item
const dados = Criar_Item();

//retorna o parametro da url que seja = uid  ex... pagina.html  ? uid = MvPYiwBPTfT1jwPnLjnw

// A FUNÇÃO CadastrarNovoProduto(dados); É CHAMADA SE O VALOR FOR VAZIO EM Obter_informacao_url_uid()

// A FUNCAO Atualizar_dados_do_item(dados); É CHAMADA SE O VALOR FOR IGUAL A UID DO ITEM EM Obter_informacao_url_uid()
    if(!Obter_informacao_url_uid()){

        CadastrarNovoProduto(dados);

    }else{

        Atualizar_dados_do_item(dados);

    }  
}


/******************************************************
 * FUNCAO PARA ATUALIZAR OS DADOS CADASTRADOS DOS ITENS 
 ********************************************************/
function Atualizar_dados_do_item(dados){

    ShowLoading();
    dados_servicos.Atualizar_dados(dados)
     .then(()=>{
        
        window.location.href = "../lista_de_item/lista_de_item.html";

     }).catch(()=>{
        removeLoading();
        alert("Erro ao salvar Produto");
     })

}





/******************************************************
 * CADASTRA NOVOS ITENS
 *********************************************/
function CadastrarNovoProduto(dados){
     dados_servicos.Cadastrar_novo_dado(dados)
     .then(()=>{
    
        
        add_ou_buscar_id_item("add",'ultimo_id_adicionado','ultimo_id_adicionado','codigo_id');

        // faz esperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
        setTimeout(() => {
            window.location.href = "../lista_de_item/lista_de_item.html";
}, 1000); // 1000 milissegundos = 1 segundos
        
        

     }).catch(()=>{
        removeLoading();
        alert("Erro ao salvar Produto");
     })
}





/*********************************************************************
 * FUNÇÃO PARA CRIAR O OBJETO ITEM QUE SERA SALVO NO BANCO DE DADOS
 **************************************************************/
function Criar_Item(){

    var status_radio = "vazio";

    if(form.status_ativo().checked == true){
         status_radio = "ativo"

    }else{
        if(form.status_desativado().checked == true){
             status_radio = "desativado"
    
        }else{
            if(form.status_falta().checked == true){
                 status_radio = "falta"
        
            }else{
                if(form.status_pausado().checked == true){
                     status_radio = "pausado"
            
                }
            }
        }

    }

    return{
        
        status: status_radio,
        codigo: parseInt(form.codigo().innerText),
        produto: form.produto().value.toUpperCase(),
        unidade_medida: form.unidade_medida().value,
        quantidade: form.quantidade().value,
        preco: form.preco().value,
        tempo_preparo_hora: form.tempo_preparo_hora().value,
        tempo_preparo_minuto: form.tempo_preparo_minuto().value,
        acompanhamento: form.acompanhamento().value,
        user:{
            uid: firebase.auth().currentUser.uid

        },
        date_criacao: form.date_criacao().value
    }
}



/*********************************************************************
 * FUNÇÃO PARA VALIDAÇÃO DO FORMULARIO
 **************************************************************/

function OnChangeDate_criacao(){
    
    const date_criacao = form.date_criacao().value;
    form.date_criacaoInvalido().style.display = !date_criacao ? "block" : "none";
    ToggleCadastrarProdutoButton();
 
}

function OnChangeProduto(){
    const produto = form.produto().value;
    form.produtoObrigatorio().style.display = produto ? "none":"block";
    form.produtoInvalido().style.display = produto.length  >= 1 ? "none": "block";
    ToggleCadastrarProdutoButton();
}

function OnChangeQuantidade(){
    const quantidade = form.quantidade().value;
    form.quantidadeObrigatorio().style.display = quantidade ? "none":"block";
    form.quantidadeInvalido().style.display = quantidade  > 0? "none": "block";

    ToggleCadastrarProdutoButton();
}

function OnChangePreco(){
    const preco = form.preco().value;
    form.precoObrigatorio().style.display = preco ? "none":"block";
    form.precoInvalido().style.display = preco  <= 0 ? "block": "none";   
    ToggleCadastrarProdutoButton();
}

function OnChangeTempo_preparo_hora(){
    const tempo_preparo_hora = form.tempo_preparo_hora().value;
    form.tempo_preparo().style.display = tempo_preparo_hora  < 60 ? "none": "block";
    ToggleCadastrarProdutoButton();
}
function OnChangeTempo_preparo_minuto(){
    const tempo_preparo_minuto = form.tempo_preparo_minuto().value;
    form.tempo_preparo().style.display = tempo_preparo_minuto  < 60 ? "none": "block";

    ToggleCadastrarProdutoButton();
}


function ToggleCadastrarProdutoButton(){
    form.btnCadastrar().disabled = !isFromValid();
    
}

function isFromValid(){

    const produto = form.produto().value;
    if(!produto){
        return false;
    }

    const quantidade = form.quantidade().value;
    if(!quantidade || quantidade <= 0){
        return false;
    }

    const preco = form.preco().value;
    if(!preco || preco <= 0){
        return false;
    }


    const tempo_preparo_minuto = form.tempo_preparo_minuto().value;
    const tempo_preparo_hora = form.tempo_preparo_hora().value;

    if(!tempo_preparo_minuto && !tempo_preparo_hora || tempo_preparo_hora<=0 && tempo_preparo_minuto <= 0){
        console.log('horas');
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


    date_criacao:() => document.getElementById('date_criacao_id'),
    date_criacaoInvalido:() => document.getElementById('date_criacaoInvalido_id'),

    status_ativo:() => document.getElementById('status_ativo_id'),

    status_desativado:() => document.getElementById('status_desativado_id'),

    status_falta:() => document.getElementById('status_falta_id'),

    status_pausado:() => document.getElementById('status_pausado_id'),

    codigo:() => document.getElementById('codigo_id'),

    produto:() => document.getElementById('produto_nome_id'),    

    produtoObrigatorio:() => document.getElementById('produto_nome_obrigatorio_id'),
    produtoInvalido:() => document.getElementById('produto_nome_invalido_id'),

    unidade_medida:() => document.getElementById('selecao_unidade_medida_id'),

    quantidade:() => document.getElementById('quantidade_id'),
    quantidadeObrigatorio:() => document.getElementById('quantidade_obrigatorio_id'),
    quantidadeInvalido:() => document.getElementById('quantidade_invalida_id'),

    preco:() => document.getElementById('preco_id'),
    precoObrigatorio:() => document.getElementById('preco_obrigatorio_id'),
    precoInvalido:() => document.getElementById('preco_invalido_id'),

    tempo_preparo_hora:() => document.getElementById('tempo_preparo_hora_id'),
    tempo_preparo_minuto:() => document.getElementById('tempo_preparo_minuto_id'),
    tempo_preparo:() => document.getElementById('tempo_preparo_id'),

    acompanhamento:() => document.getElementById('acompanhamento_id'),

    btnCadastrar:() => document.getElementById('btnCadastrarProduto_id'),
    botao_delete_id :() =>  document.getElementById('botao_delete_id'),
   
    
}

// FUNCAO PARA CRIAR UMA MASCARA MONETARIA NO CAMPO PREÇO, EM UM INPUT DO TIPO TEXT, VOCE SO PRECISA PASSAR O ID DO ELEMENTO INPUT TEXT
// A FUNCAO COMPLETA ESTA NO ARQUIVO serviços_dados_produtos.js
Mascara_monetaria_input('preco_id');




// funcao que abre a caixa de dialogo caso queira deletar um item
document.addEventListener('DOMContentLoaded', function() {
    // Pegar elementos do DOM
    var modal = document.getElementById('customAlert');
    var btn = document.getElementById('botao_delete_id');
    var span = document.getElementsByClassName('close')[0];
    var submitBtn = document.getElementById('submitPassword');
    var passwordInput = document.getElementById('passwordInput');

    // Abrir o modal quando o botão é clicado
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // Fechar o modal quando o botão de fechar é clicado
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Fechar o modal quando o usuário clica fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Validar a senha quando o botão de enviar é clicado
    submitBtn.onclick = function() {
        var password = passwordInput.value;
        if (password === "123") { // Substitua "senha123" pela senha desejada
            alert('Senha correta!');
            Deseja_Deletar_item('produtos',Obter_informacao_url_uid());

            

            modal.style.display = 'none';
        } else {
            alert('Senha incorreta! Tente novamente.');
        }
    }
});




