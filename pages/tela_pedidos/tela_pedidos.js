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

        
       buscar_itens_pedidos_ativos(user);
        
    }
})

function buscar_itens_pedidos_ativos(user){

    ShowLoading();

    dados_servicos.Buscar_pedidos(user,'pedidos')
    .then(dados =>
     {
         removeLoading();
 
         inserir_dados_pedidos_ativos(dados);
         //console.log(dados);
 
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



function inserir_dados_pedidos_ativos(dados){

const orderList = document.getElementById('lista_dos_itens_pedidos_ativos_comanda');

     dados.forEach(dados => {

        const li = criar_elemento_li_com_os_dados(dados)    

        li.appendChild(criar_elemento_p_com_o_valor('nº'+dados.numero_carrinho,'numero_pedido'));
        if(dados.reserva =='sim'){
            li.appendChild(criar_elemento_p_com_o_valor('reservado','reservado'));
        }
        

        li.appendChild(criar_elemento_p_com_o_valor("tempo: "+dados.tempo_preparo,'tempo_preparo'));
        li.appendChild(criar_elemento_p_com_o_valor(dados.forma_envio,dados.forma_envio));
        
        if(dados.forma_envio == "entrega"){
            li.appendChild(criar_elemento_p_com_o_valor("Cliente: "+dados.nome_cliente+"<br>"+dados.endereco+": "+dados.nome_condominios+" - B "+dados.bloco+" AP "+dados.apartamento,'titulo_card')); 

        }else{
            li.appendChild(criar_elemento_p_com_o_valor("Cliente: "+dados.nome_cliente,'titulo_card')); 
        }

        // Itera sobre as propriedades do objeto `dados` para encontrar `td_item_prod_`
        for (const key in dados) {
            if (key.startsWith('td_item_prod_')) {
                // Adiciona cada item como um novo parágrafo
                li.appendChild(criar_elemento_p_com_o_valor('<br><b>'+extrairPalavrasEntreAspas(`${dados[key]}`)[0] +' - '+ extrairPalavrasEntreAspas(`${dados[key]}`)[1]+'</b>'+'<br><b class=color_observacao>'+extrairPalavrasEntreAspas(`${dados[key]}`)[2]+'</b>'),'item_info_pedidos');
                
            }
        }

       
            
        li.appendChild(criar_elemento_button_com_evento(dados));
    orderList.appendChild(li);
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
function criar_elemento_p_com_o_valor(value,info){
    const elemento = document.createElement('p');
    if(info == 'retirada'){
        elemento.classList.add('retirada');
    }else{
        if(info == 'tempo_preparo'){
            elemento.classList.add('tempo_preparo');
        }else{
            if(info == 'nome_cliente'){
                elemento.classList.add('nome_cliente');
            }else{
                if(info == 'titulo_card'){
                    elemento.classList.add('titulo_card');
                }else{
                    if(info == 'entrega'){
                        elemento.classList.add('entrega');
                    }else{
                        if(info == 'item_info_pedidos'){
                            elemento.classList.add('item_info_pedidos');
                            
                        }else{
                            if(info == 'reservado'){
                                elemento.classList.add('reservado');
                                
                            }
                        }
                    }
                }
            }
        }
    }
    
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


function removerAspasDuplas(str) {
    // Remove todas as aspas duplas da string
    return str.replace(/"/g, '-');
}

function extrairPalavrasEntreAspas(str) {
    // Usa uma expressão regular para encontrar todas as palavras entre aspas duplas
    const matches = str.match(/"(.*?)"/g);

    // Se não houver matches, retorna um array vazio
    if (!matches) {
        return [];
    }

    // Remove as aspas duplas de cada match e retorna o array
    return matches.map(match => match.replace(/"/g, ''));
}