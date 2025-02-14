function deslogar(){
    firebase.auth().signOut().then(() =>{
        window.location.href ="../../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

 
function CadastrarProduto(){

    ShowLoading();

    const dados = criarProduto();
     firebase.firestore()
     .collection('produtos')
     .add(dados)
     .then(()=>{
        removeLoading();
        window.location.href = "../lista_de_produtos/lista_de_produtos.html";

     }).catch(()=>{
        removeLoading();
        alert("Erro ao salvar Produto");
     })
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
        codigo: form.codigo().value,
        produto: form.produto().value,
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

function OnChangeCodigo(){
    const codigo = form.codigo().value;
    form.codigoObrigatorio().style.display = codigo ? "none":"block";
    form.codigoInvalido().style.display = codigo  <= 0 ? "block": "none";   
    ToggleCadastrarProdutoButton();
}

function OnChangeProduto(){
    const produto = form.produto().value;
    form.produtoObrigatorio().style.display = produto ? "none":"block";
    form.produtoInvalido().style.display = produto.length  >= 3 ? "none": "block";
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

function OnChangeDate_criacao(){
    
       const date_criacao = form.date_criacao().value;
       form.date_criacaoInvalido().style.display = !date_criacao ? "block" : "none";
    
}




function ToggleCadastrarProdutoButton(){
    form.btnCadastrar().disabled = !isFromValid();
    
}

function isFromValid(){
    const codigo = form.codigo().value;
    if(!codigo || codigo <= 0){
        return false;
    }

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

    status_ativo:() => document.getElementById('status_ativo_id'),

    status_desativado:() => document.getElementById('status_desativado_id'),

    status_falta:() => document.getElementById('status_falta_id'),

    status_pausado:() => document.getElementById('status_pausado_id'),

    codigo:() => document.getElementById('codigo_id'),
    codigoObrigatorio:() => document.getElementById('codigo_obrigatorio_id'),
    codigoInvalido:() => document.getElementById('codigo_invalido_id'),

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
   
    date_criacao:() => document.getElementById('date_criacao_id'),
    date_criacaoInvalido:() => document.getElementById('date_criacao_invalido_id'),
}