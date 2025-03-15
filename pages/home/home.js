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



const del_checkbox = document.getElementById('del_checkbox_id');

if (del_checkbox) {
    del_checkbox.addEventListener('change', function () {
        // Obtém todos os elementos com a classe 'td_delete'
        const tdDeleteElements = document.getElementsByClassName('td_delete');

        // Itera sobre a coleção de elementos
        for (let i = 0; i < tdDeleteElements.length; i++) {
            if (this.checked) {
                tdDeleteElements[i].style.display = 'flex'; // ou 'block', 'inline', etc.
            } else {
                tdDeleteElements[i].style.display = 'none';
            }
        }
    });
} else {
    console.error("Elemento 'del_checkbox_id' não encontrado no DOM.");
}


Criar_Carrinho_de_Compras();
function Criar_Carrinho_de_Compras(){ 


    
    const lista_compras = document.getElementById('lista_compras');

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

    const th_delete = document.createElement('th');
    th_delete.innerHTML ="Del";
    th_delete.classList.add('td_delete');
    tr_thead.appendChild(th_delete);

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




btn_add.onclick = function() {

    const lista_compras = document.getElementById('lista_compras');

    const item_nome = document.getElementById('item_nome_id');
    const item_quant = document.getElementById('item_quant_id')

    const tbody = document.createElement('tbody');
    lista_compras.appendChild(tbody);



    const tr_tbody = document.createElement('tr');
    tbody.appendChild(tr_tbody);


    const input_item_button = document.createElement('button');
    input_item_button.classList.add('botao_deletar_id');
    input_item_button.innerHTML ='x';

    const td_item_button = document.createElement('td');
    td_item_button.classList.add('td_delete');

    

    td_item_button.appendChild(input_item_button);
    tr_tbody.appendChild(td_item_button);


    const td_item_nome = document.createElement('td');
    td_item_nome.innerHTML = item_nome.value;
    td_item_nome.classList.add('td_item_nome');
    tr_tbody.appendChild(td_item_nome); 

    const td_item_quant = document.createElement('td');
    td_item_quant.innerHTML = item_quant.value;
    td_item_quant.classList.add('td_item_quant');
    tr_tbody.appendChild(td_item_quant);


    const input_item_checkbox = document.createElement('input');

    input_item_checkbox.type = 'checkbox';
  
    const td_item_checkbox = document.createElement('td');
    td_item_checkbox.classList.add('td_item_checkbox');

    td_item_checkbox.appendChild(input_item_checkbox);
    tr_tbody.appendChild(td_item_checkbox);
  
}


