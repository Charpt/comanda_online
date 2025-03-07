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
*FUNÇÃO PARA VERIFICAR COMO CHEGAMOS A PAGINA DE CADASTRAR NOVO ITEM
* SE CASO CHEGAMOS AQUI ATRAVEZ DE TER CLICADO EM UM PRODUTO, ISSO SIGNIFICA QUE IREMOS ATUALIZAR OS DADOS DO ITEM
 SE NAO IREMOS INICIAR UM NOVO CADASRTO

 ESSA INFORMAÇÃO FOI ENVIADA ATRAVES DA URLSearchParams ENVIANDO O UID DO ITEM CLICADO
/*******************************************************************************************/
// se NovoProdutoOuAtualizacao retornar verdadadeiro ele pega a informaçaõ da funcao Obter_informacao_url_uid e coloca na variavel uid e faz a busca no bancod e dados pela uid
if(!Item_novo_ou_atualizacao()){

    
    const uid = Obter_informacao_url_uid();
    Buscar_uid_item(uid);
    
    
}else{
    // ele busca o ultimo id adicionado e adiciona mais um numero para que seja o id do item
    add_ou_buscar_id_item('busca');
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



/*******************************************************************************************/
/****************** FUNÇÃO PARA CADASTRAR NOVO ITEM *****************************************/
/*******************************************************************************************/


function CadastrarProduto(){

ShowLoading();



    const dados = criarProduto();
    

    if(!Obter_informacao_url_uid()){
        
        CadastrarNovoProduto(dados);

    }else{

        Atualizar_dados_do_item(dados);
    }


    
}
/******************************************************
 * ATUALIZA OS DADOS DOS ITENS
 *********************************************/
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
    
        add_ou_buscar_id_item("add");

        // faz essperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
        setTimeout(() => {
            window.location.href = "../lista_de_item/lista_de_item.html";
}, 1000); // 2000 milissegundos = 2 segundos
        
        

     }).catch(()=>{
        removeLoading();
        alert("Erro ao salvar Produto");
     })
}

function Inserir_dados_no_formulario_para_Atualizar(dados_produtos){

    if(dados_produtos.status == "status_ativo"){
        form.status_ativo().checked = true;

    }else{
        if(dados_produtos.status == "desativado"){
            form.status_desativado().checked = true;
    
        }else{
            if(dados_produtos.status == "falta"){
                form.status_falta().checked = true;
        
            }else{
                if(dados_produtos.status == "pausado"){
                    form.status_pausado().checked = true;
            
                }
            }
        }
    }
    form.codigo().innerText = dados_produtos.codigo;
    form.produto().value = dados_produtos.produto;
    form.unidade_medida().value = dados_produtos.unidade_medida;
    form.quantidade().value = dados_produtos.quantidade;
    form.preco().value = dados_produtos.preco;
    form.observacao().value = dados_produtos.observacao;
    form.date_criacao().value = dados_produtos.date_criacao;

    

    

}

function criarProduto(){

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
        observacao: form.observacao().value,
        user:{
            uid: firebase.auth().currentUser.uid

        },
        date_criacao: form.date_criacao().value

        
       

        

    }
}



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
   
        return true;   


}


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

    observacao:() => document.getElementById('observacao_id'),

    btnCadastrar:() => document.getElementById('btnCadastrarProduto_id'),
   
    
}

// funcao que crias o id do item verificando o ultimo id registrado no banco de dados e adicionando mais um numero nele ou buscando o id para visualizar
async function add_ou_buscar_id_item(add_ou_busca) {

    const docRef = db.collection("contador").doc("ultimoNumero");

    try {
        // Inicia uma transação para garantir que o número seja único
        const nextNumber = await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);

            let ultimoNumero;
            if (doc.exists) {
                ultimoNumero = doc.data().numero;
            } else {
                ultimoNumero = 0; // Começa do zero se o documento não existir
            }

            const proximoNumero = ultimoNumero + 1;

            // Atualiza o último número no Firestore
            if(add_ou_busca == "add"){
                transaction.set(docRef, { numero: proximoNumero });
                console.log("entramos")
                
            }
            

            return proximoNumero;
        });

        // Exibe o próximo número para o usuário
        document.getElementById("codigo_id").innerText = " " + nextNumber;
    } catch (error) {
        console.error("Erro ao obter o próximo número: ", error);
    }
}

