
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


/*******************************************************************************************/
/****************** FUNÇÃO PARA ABRIR A PAGINA DE CADASTRO DOS ITENS *****************************************/
/*******************************************************************************************/
function CadastrarProdutoPage(){
    window.location.href ="../cadastrar_item/cadastrar_item.html";
}


const input_selecao = document.getElementById('selecao_status_lista_de_item_id');

// Recuperar o valor selecionado do localStorage
var status_selecao = localStorage.getItem('selecao_status_lista_de_item');
if (status_selecao) {
    document.getElementById('selecao_status_lista_de_item_id').value = status_selecao;
}
input_selecao.addEventListener('change', function() {


    localStorage.setItem('selecao_status_lista_de_item', input_selecao.value);

        window.location.href ="lista_de_item.html?status_selecao="+input_selecao.value;


});



function Obter_informacao_url_uid(){
    const urlParametros = new URLSearchParams(window.location.search);
    //retorna o parametro da url que seja = uid  ex... pagina.html  ? uid = MvPYiwBPTfT1jwPnLjnw
    return urlParametros.get('status_selecao');
}

/******************************************************************************************
O METODO onAuthStateChanged VERIFICA SE TEVE ALGUMA ALTERAÇÃO NO STATUS DO USUARIO LOGADO
SE O USUSARIO ESTIVER LOGADO ELE EXECUTA A BUSCAR DADOS
/*******************************************************************************************/

firebase.auth().onAuthStateChanged(user =>{
    if(user){

        ShowLoading();
        dados_servicos.Buscar_Item('itens',user,Obter_informacao_url_uid(),'codigo','asc')
        .then(dados =>
         {
             removeLoading();
             Set_Dados_nos_Elementos(dados);
     
         }).catch(error =>
         {
             removeLoading();
             console.log(error);
             alert("Erro ao recuperar dados");
        })
    }
})





/*******************************************************************************************/
/** FUNÇÃO PARA ADICIONAR OS ITENS DO BANCO DE DADOS EM UM LISTA ORDENADA ASSIM ADICIONAMOS
 * OS DADOS DOS ITENS NO LI
/*******************************************************************************************/

function Set_Dados_nos_Elementos(dados){

const orderList = document.getElementById('lista_dados');

dados.forEach(dados => {

    const li = Criar_lista_dos_dados(dados)   
    const div1 = Criar_div();
    
   // li.appendChild(CriarImagemDosDados());    
    li.appendChild(Criar_Paragrafos_Titulos(dados.item_nome));

    li.appendChild(Criar_Paragrafos_indicador_resultado('Acompanhamenentos: ',dados.acompanhamento));

   

   if(dados.tempo_preparo_hora < 10 && dados.tempo_preparo_minuto < 10){
    li.appendChild(Criar_Paragrafos_indicador_resultado('tempo Preparo: ','0'+dados.tempo_preparo_hora+':0'+dados.tempo_preparo_minuto));   
   }else{
    if(dados.tempo_preparo_hora < 10 && dados.tempo_preparo_minuto > 10){
        li.appendChild(Criar_Paragrafos_indicador_resultado('tempo Preparo: ','0'+dados.tempo_preparo_hora+':'+dados.tempo_preparo_minuto));   
       }else{
        if(dados.tempo_preparo_hora > 10 && dados.tempo_preparo_minuto < 10){
            li.appendChild(Criar_Paragrafos_indicador_resultado('tempo Preparo: ',dados.tempo_preparo_hora+':0'+dados.tempo_preparo_minuto));   
           }else{
            if(dados.tempo_preparo_hora > 10 && dados.tempo_preparo_minuto > 10){
                li.appendChild(Criar_Paragrafos_indicador_resultado('tempo Preparo: ',dados.tempo_preparo_hora+':'+dados.tempo_preparo_minuto));   
               }else{
                
               }
           }
       }
   }

    
    li.appendChild(Criar_Paragrafos_indicador_resultado('quantidade:',dados.quantidade));
    li.appendChild(Criar_Paragrafos_indicador_resultado('preço: ',dados.preco));
    
    li.appendChild(Criar_Paragrafos_indicador_resultado('tipo medida: ',dados.unidade_medida));    
    li.appendChild(Criar_Paragrafos_indicador_resultado( 'data da criação:',formatar_date(dados.date_criacao)));

    li.appendChild(div1);
    div1.appendChild(Criar_Paragrafos_roda_pe_card('Status: ',dados.status));
    div1.appendChild(Criar_Paragrafos_roda_pe_card('Codigo: ',dados.codigo));
    orderList.appendChild(li);

});

}

/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (div) 
/*******************************************************************************************/


function Criar_div(){
    
    const div = document.createElement('div');
    div.classList.add('div_separador');    
    
    return div;
}

/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (LI) QUE REPRESENTA UM ITEM DO BANCO DE DADOS 
/*******************************************************************************************/


function Criar_lista_dos_dados(dados){
    
    const li = document.createElement('li');
    li.classList.add(dados.status);
    li.classList.add('card');
    li.id = dados.uid;
    
    li.addEventListener('click',()=> {
        window.location.href ="../cadastrar_item/cadastrar_item.html?uid="+dados.uid;
    })
    return li;
}

/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (BUTTON) QUE TEM O EVENTO DE CLIQUE PARA ACIOANR UM EVENTO 
/*******************************************************************************************/

function Criar_Botao_Delete(dados){
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



/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (p) QUE REPRESENTA UM PARAGRAFO DAS INFORMAÇÕES DOS ITENS  
/*******************************************************************************************/
function Criar_Paragrafos_indicador_resultado(texto_indicador,texto_resultado){

    const elemento = document.createElement('p');

    const elemento_texto_indicador = document.createElement('label');
    const elemento_texto_resultado = document.createElement('label');

    elemento_texto_indicador.classList.add('texto_indicador');    
    elemento_texto_resultado.classList.add('texto_resultado');

    
    
    elemento_texto_indicador.innerHTML =  texto_indicador;
    elemento_texto_resultado.innerHTML =  texto_resultado;

    elemento.appendChild(elemento_texto_indicador);
    elemento.appendChild(elemento_texto_resultado);
    return elemento;
}

/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (p) PARA OS TITULOS
/*******************************************************************************************/
function Criar_Paragrafos_Titulos(texto_titulo_card){

    const elemento_texto_titulo = document.createElement('p');
    elemento_texto_titulo.classList.add('texto_titulo_card');    
    elemento_texto_titulo.innerHTML =  texto_titulo_card;
    return elemento_texto_titulo;
}

/*******************************************************************************************/
/** FUNÇÃO PARA QUE CRIA CADA ELEMENTO (p) PARA OS TITULOS
/*******************************************************************************************/
function Criar_Paragrafos_roda_pe_card(texto_roda_pe_indicador,texto_roda_pe_resultado){


    const elemento = document.createElement('p');

    const elemento_texto_roda_pe_indicador = document.createElement('label');
    const elemento_texto_roda_pe_resultado = document.createElement('label');

    elemento_texto_roda_pe_indicador.classList.add('texto_roda_pe_indicador');    
    elemento_texto_roda_pe_resultado.classList.add('texto_roda_pe_resultado');

    
    
    elemento_texto_roda_pe_indicador.innerHTML =  texto_roda_pe_indicador;
    elemento_texto_roda_pe_resultado.innerHTML =  texto_roda_pe_resultado;

    elemento.appendChild(elemento_texto_roda_pe_indicador);
    elemento.appendChild(elemento_texto_roda_pe_resultado);
    return elemento;

   
}


