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

/*******************************************************************************************/
/****************** FUNÇÃO PARA O FILTRO DE PESQUISA DOS ITENS *****************************************/
/*******************************************************************************************/
const status_selecao = document.getElementById('selecao_status_pedidos_id');

// Recuperar o valor selecionado do localStorage

var valor_localStorage = localStorage.getItem('valor_localStorage_status_tela_pedido');
if(Obter_informacao_url_uid()){

    status_selecao.value = Obter_informacao_url_uid();
}

status_selecao.addEventListener('change', function() {
    localStorage.setItem('valor_localStorage_status_tela_pedido', status_selecao.value);
    window.location.href ="tela_pedidos.html?status_selecao="+status_selecao.value;
});



function Obter_informacao_url_uid(){
    const urlParametros = new URLSearchParams(window.location.search);
    //retorna o parametro da url que seja = uid  ex... pagina.html  ? uid = MvPYiwBPTfT1jwPnLjnw
    return urlParametros.get('status_selecao');
}


function buscar_itens_pedidos_ativos(user){

// Escuta mudanças na coleção "minhaColecao"
db.collection("pedidos")
.where('user.uid','==', user.uid)
.where('status','==', Obter_informacao_url_uid())
.orderBy('numero_carrinho','asc')
.onSnapshot((querySnapshot) => {
removeLoading();
const dados = querySnapshot.docs.map(doc => (
        {
            ...doc.data(),
            uid: doc.id
        }));

        playBeep();
        inserir_dados_pedidos_ativos(dados);

  });

}






/*******************************************************************************************/
/** FUNÇÃO PARA ADICIONAR OS ITENS DO BANCO DE DADOS EM UM LISTA ORDENADA ASSIM ADICIONAMOS
 * OS DADOS DOS ITENS NO LI
/*******************************************************************************************/



function inserir_dados_pedidos_ativos(dados){

    
const orderList = document.getElementById('lista_dos_itens_pedidos_ativos_comanda');

orderList.innerHTML = "";

     dados.forEach(dados => {       


        const li = criar_elemento_li_com_os_dados(dados)    
        
        li.appendChild(criar_elemento_p_com_o_valor('nº'+dados.numero_carrinho,'numero_pedido'));

        if(dados.reserva =='sim'){
            li.appendChild(criar_elemento_p_com_o_valor('reservado','reservado'));
        }
        
        

        li.appendChild(criar_elemento_p_com_o_valor("tempo: "+dados.tempo_preparo,'tempo_preparo',dados.uid));
        
        li.appendChild(criar_elemento_p_com_o_valor(dados.forma_envio,dados.forma_envio));
        
        if(dados.forma_envio == "entrega"){
            if(dados.endereco == 'condominio'){
                li.appendChild(criar_elemento_p_com_o_valor("Cliente: "+dados.nome_cliente+"<br>Cond: "+dados.nome_condominios+" - B "+dados.bloco+" AP "+dados.apartamento,'titulo_card')); 

            }else{
                li.appendChild(criar_elemento_p_com_o_valor("Cliente: "+dados.nome_cliente+"<br>"+dados.endereco+": "+dados.nome_condominios+" - B "+dados.bloco+" AP "+dados.apartamento,'titulo_card')); 

            }

        }else{
            li.appendChild(criar_elemento_p_com_o_valor("Cliente: "+dados.nome_cliente,'titulo_card')); 
        }

        
        for (i=0;i<dados.quantidade_de_item_na_comanda;i++) {
            
            li.appendChild(criar_elemento_p_com_o_valor('<b class=item_info_pedidos><br>'+dados['quantidade'+(i+1)]+' - ' +'<b class=item_info_pedidos>'+ dados['item_nome'+(i+1)]+'<br><b class=color_observacao>'+substituirVirgulasPorBR(dados['observacao'+(i+1)])+'</b>'),'item_info_pedidos');
                
            
        }

        
           
        li.appendChild(criar_elemento_button_com_evento(dados,status_selecao.value));

        
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
function criar_elemento_p_com_o_valor(value,info,uid_item){
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

function criar_elemento_button_com_evento(dados,tela){
    
    const button_acao_pedidos = document.createElement('button');
    
    button_acao_pedidos.classList.add('button_acao_pedidos');

if(tela == 'preparando'){
    button_acao_pedidos.innerHTML =  "PEDIDO PRONTO";
    button_acao_pedidos.addEventListener('click',Event => {
        Event.stopPropagation();
        console.log(dados.uid);
        dados_servicos.Atualizar_dados_pedidos('pedidos',dados.uid,mudar_status_comanda_pedidos('pronto'));
                // faz essperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
                setTimeout(() => {
                    location.reload();
        }, 1000); // 1000 milissegundos = 1 segundos

    });
}else{

    if(tela == 'pronto'){
        button_acao_pedidos.innerHTML =  "ROTA DE ENTREGA";
        button_acao_pedidos.addEventListener('click',Event => {
            Event.stopPropagation();
            console.log(dados.uid);
            dados_servicos.Atualizar_dados_pedidos('pedidos',dados.uid,mudar_status_comanda_pedidos('rota entrega'));
                    // faz essperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
                    setTimeout(() => {
                        location.reload();
            }, 1000); // 1000 milissegundos = 1 segundos
    
        });
    }else{
    
        if(tela == 'rota entrega'){
            button_acao_pedidos.innerHTML =  "FINALIZAR";
            button_acao_pedidos.addEventListener('click',Event => {
                Event.stopPropagation();
                console.log(dados.uid);
                dados_servicos.Atualizar_dados_pedidos('pedidos',dados.uid,mudar_status_comanda_pedidos('finalizados'));
                        // faz essperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
                        setTimeout(() => {
                            location.reload();
                }, 1000); // 1000 milissegundos = 1 segundos
        
            });
        }else{

            if(tela == 'finalizados'){
                button_acao_pedidos.innerHTML =  "ver informcações";
                button_acao_pedidos.addEventListener('click',Event => {
                    Event.stopPropagation();
                    /*console.log(dados.uid);
                    dados_servicos.Atualizar_dados_pedidos('pedidos',dados.uid,mudar_status_comanda_pedidos('finalizados'));
                            // faz essperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
                            setTimeout(() => {
                                location.reload();
                    }, 1000); // 1000 milissegundos = 1 segundos
            */
                });


            }else{
    
                
            
            }
        
        }
    }

}
    
    return button_acao_pedidos;
}

  
    function mudar_status_comanda_pedidos(status) {

        var dados = {}; // Objeto para armazenar os dados
        dados['status'] =  status;
        return dados; // Retorna o objeto com todos os dados
    }

    


function substituirVirgulasPorBR(str) {
    // Substitui todas as vírgulas por <br>
    return str.replace(/,/g, '<br>');
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

