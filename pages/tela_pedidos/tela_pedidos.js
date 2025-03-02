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
        window.location.href ="../../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

/******************************************************************************************
O METODO onAuthStateChanged VERIFICA SE TEVE ALGUMA ALTERAÇÃO NO STATUS DO USUARIO LOGADO
SE O USUSARIO ESTIVER LOGADO ELE EXECULTA O BUSCAR DADOS
/*******************************************************************************************/

firebase.auth().onAuthStateChanged(user =>{
    if(user){

        //buscar_info_identificacao_pedidos_ativos("add_dados_itens_pedidos_ativos_na_comanda");
       // buscar_itens_pedidos_ativos(user);
        
    }
})

/*******************************************************************************************/
/** FUNÇÃO PARA BUSCAR DENTRO DO BANCO DE DADOS O DOCUMENTO EXPECIFICO COM AS INFORMAÇÕES DO CLIENTE QUE O PEDIU 
/*******************************************************************************************/

/*
function buscar_info_identificacao_pedidos_ativos()
{

    ShowLoading();

    firebase.firestore()
         .collection('pedidos_ativos').doc('pMNkSp0pCcrR9ItIRBJk').collection('pedido_n1').doc('identificacao_pedidon1')
         .get()
         .then((doc) => {
        if (doc.exists) {
          //console.log("Dados do documento:", doc.data());
           add_dados_itens_pedidos_ativos_na_comanda(doc.data());
          removeLoading();
          
        } else {
          console.log("Documento não encontrado!");
          removeLoading();
        }
      }).catch(error =>
    {
        removeLoading();
        console.log(error);
        alert("Erro ao recuperar dados");
   })
}



/*******************************************************************************************/
/** FUNÇÃO PARA BUSCAR DENTRO DO BANCO DE DADOS OS DADOS DOS ITENS CADASTRADOS 
/*******************************************************************************************/

/*
function buscar_itens_pedidos_ativos(user)
{

    ShowLoading();

   dados_servicos.buscar_itens_bd_pedidos_ativos(user)
   .then(dados =>
    {
        removeLoading();

        inserir_dados_pedidos_ativos(dados);

    }).catch(error =>
    {
        removeLoading();
        console.log(error);
        alert("Erro ao recuperar dados");
   })
}

/*******************************************************************************************/
/** FUNÇÃO PARA ADICIONAR OS ITENS DO BANCO DE DADOS EM UM LISTA ORDENADA ASSIM ADICIONAMOS
 * OS DADOS DOS ITENS NO LI
/*******************************************************************************************/

/*
function add_dados_itens_pedidos_ativos_na_comanda(dados){
    const orderList = document.getElementById('lista_dos_itens_pedidos_ativos_comanda');
    if(!dados.empty){
        const li = criar_elemento_li_com_os_dados(dados)    
            li.appendChild(criar_elemento_p_com_o_valor("<i class=tempo_preparo>tempo de preparo "+dados.tempo_preparo+"</i>"));
            li.appendChild(criar_elemento_p_com_o_valor("<i class=retirada>"+dados.meio_de_envio+"</i>"));
            li.appendChild(criar_elemento_p_com_o_valor("<i class=cliente>"+dados.cliente+"</i>"));      
            li.appendChild(criar_elemento_p_com_o_valor("<i class=titulo_card>"+dados.endereco+"</i>")); 
        orderList.appendChild(li);
    }
}


function inserir_dados_pedidos_ativos(dados){
    const orderList = document.getElementById('lista_dos_itens_pedidos_ativos_comanda');
     dados.forEach(dados => {
        console.log(dados.ident.uid);
        const li = document.getElementById(dados.ident.uid);   
        if(dados.ident.uid != ""){
            li.appendChild(criar_elemento_p_com_o_valor("<i class=text_info_card > <b class=info_item>"+dados.quantidade+"- "+dados.item_pedido+"</i>"));  
            li.appendChild(criar_elemento_p_com_o_valor("<i class=observacao>"+dados.observacao+"</i>"));
            orderList.appendChild(li);
        }  
    });
     console.log('inserindo dados de identificacao');
}


/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (LI) QUE REPRESENTA UM ITEM DO BANCO DE DADOS 
/*******************************************************************************************/


function criar_elemento_li_com_os_dados(dados){
    
    const li = document.createElement('li');
    li.classList.add('ativo');
    li.classList.add('card');
    li.id = dados.uid;
    
    li.addEventListener('click',()=> {
        //window.location.href ="../cadastrar_produtos/cadastrar_produtos.html?uid="+dados.uid;
    })
    return li;
}

/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (p) QUE REPRESENTA UM PARAGRAFO DAS INFORMAÇÕES DOS ITENS  
/*******************************************************************************************/
function criar_elemento_p_com_o_valor(value){
    const elemento = document.createElement('p');
    elemento.innerHTML =  value;
    return elemento;
}

/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (BUTTON) QUE TEM O EVENTO DE CLIQUE PARA ACIOANR UM EVENTO 
/*******************************************************************************************/

function criar_elemento_button_com_evento(dados){
    const botaoDeletar = document.createElement('button');
    botaoDeletar.innerHTML =  "FINALIZAR PEDIDO";
    botaoDeletar.addEventListener('click',Event => {
        Event.stopPropagation();
        //DesejaDeletarProduto(dados);

    });
    
    return botaoDeletar;
}