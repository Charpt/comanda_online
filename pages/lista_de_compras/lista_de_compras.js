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






    

Criar_Carrinho_de_Compras();
function Criar_Carrinho_de_Compras(){ 


    
    const lista_compras = document.getElementById('lista_compras_id');

    const caption = document.createElement('caption');
    caption.innerHTML = "Lista de Compras";
    lista_compras.appendChild(caption);

Criar_Colunas_Carrinho_de_Compras(lista_compras);


}





function Criar_Colunas_Carrinho_de_Compras(lista_compras){
    

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

const btn_add = document.getElementById('botao_colocar_na_lista_id');



i=0;
btn_add.onclick = function() {

    const lista_compras = document.getElementById('lista_compras_id');

    const item_nome = document.getElementById('item_nome_id');
    const item_quant = document.getElementById('item_quant_id')

    const tbody = document.createElement('tbody');
    lista_compras.appendChild(tbody);



    const tr_tbody = document.createElement('tr');
    tbody.appendChild(tr_tbody);


    const td_item_nome = document.createElement('td');
    td_item_nome.innerHTML = item_nome.value;
    td_item_nome.classList.add('td_item_nome');
    td_item_nome.id ='td_item_nome_id'+i++;
    tr_tbody.appendChild(td_item_nome); 

    const td_item_quant = document.createElement('td');
    td_item_quant.innerHTML = item_quant.value;
    td_item_quant.classList.add('td_item_quant');
    td_item_quant.id ='td_item_quant_id'+i++;
    tr_tbody.appendChild(td_item_quant);


    const input_item_checkbox = document.createElement('input');
    input_item_checkbox.type = 'checkbox';
  
    const td_item_checkbox = document.createElement('td');
    td_item_checkbox.classList.add('td_item_checkbox');

    td_item_checkbox.id ='item_checkbox_id'+i++;

    
 
    input_item_checkbox.addEventListener('change', function () {

        if (this.checked) { // Verifica se a checkbox está marcada
            
            td_item_nome.style.backgroundColor = 'rgb(44, 155, 53)';
            td_item_quant.style.backgroundColor = 'rgb(44, 155, 53)';
            td_item_checkbox.style.backgroundColor = 'rgb(44, 155, 53)';
        } else {
            
           td_item_nome.style.backgroundColor = 'rgb(247, 247, 247)';
            td_item_quant.style.backgroundColor = 'rgb(255, 255, 255)';
            td_item_checkbox.style.backgroundColor = 'rgb(255, 255, 255)';
        }
    });

    td_item_checkbox.appendChild(input_item_checkbox);
    tr_tbody.appendChild(td_item_checkbox);
  
}


