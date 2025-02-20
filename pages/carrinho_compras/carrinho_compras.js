function deslogar(){
    firebase.auth().signOut().then(() =>{
        window.location.href ="../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

firebase.auth().onAuthStateChanged(user =>{
    if(user){

        buscarDados(user);
    }
})


function buscarDados(user)
{
   dados_servicos.BuscarPorUsuario_Carrinho_de_Compras(user)
   .then(dados =>
    {
        Criar_Carrinho_de_Compras(dados);

    }).catch(error =>
    {
        removeLoading();
        console.log(error);
        alert("Erro ao recuperar dados");
   })
}



function additem(){
    Add_Item_Carrinho_de_Compras(carrinho, "10", "2", "Peixe", "20.00")
    //SOMA AS COLUNAS DA TABELA EXIBINDO O VALOR TOTAL
const total_carrinho = document.getElementById('total_carrinho');
total_carrinho.innerHTML = somar_Colunas("carrinho",4).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function Add_Item_Carrinho(){
    window.location.href ="../add_item_carrinho/add_item_carrinho.html";
}



function Criar_Carrinho_de_Compras(dados){
    const carrinho = document.getElementById('carrinho');

    const caption = document.createElement('caption');
    caption.classList.add('evidente_destaque_1');
    caption.innerHTML = "ENDEREÇO:<br> AVENIDA RIVER Nº 465 - AGUA CHATA";
    carrinho.appendChild(caption);

Criar_Colunas_Carrinho_de_Compras(carrinho);


dados.forEach(dados => {    
    Add_Item_Carrinho_de_Compras(carrinho,dados.codigo,dados.quantidade,dados.item_nome,dados.unidade_preco);    
console.log(dados.date_criacao);
    
});

//SOMA AS COLUNAS DA TABELA EXIBINDO O VALOR TOTAL
const total_carrinho = document.getElementById('total_carrinho');
total_carrinho.innerHTML = somar_Colunas("carrinho",4).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

}

function Criar_Colunas_Carrinho_de_Compras(carrinho){
    

    const thead = document.createElement('thead');
    carrinho.appendChild(thead);

    const tr_thead = document.createElement('tr');
    thead.appendChild(tr_thead);

    const th_codigo = document.createElement('th');
    th_codigo.innerHTML ="COD.";
    tr_thead.appendChild(th_codigo);

    const th_quant = document.createElement('th');
    th_quant.innerHTML ="QUANT.";
    tr_thead.appendChild(th_quant);

    const th_produtos = document.createElement('th');
    th_produtos.innerHTML ="PRODUTO";
    tr_thead.appendChild(th_produtos);

    const th_uni_preco = document.createElement('th');
    th_uni_preco.innerHTML ="uni. PREÇO";
    tr_thead.appendChild(th_uni_preco);

    const th_preco = document.createElement('th');
    th_preco.innerHTML ="PREÇO";
    tr_thead.appendChild(th_preco);


}


function Add_Item_Carrinho_de_Compras(carrinho, th_codigo, th_quant, th_produtos, th_preco){

    const tbody = document.createElement('tbody');
    carrinho.appendChild(tbody);

    const tr_tbody = document.createElement('tr');
    tbody.appendChild(tr_tbody);

    const td_item_1_cod = document.createElement('td');
    td_item_1_cod.innerHTML =th_codigo;
    tr_tbody.appendChild(td_item_1_cod);

    const td_item_1_quant = document.createElement('td');
    td_item_1_quant.innerHTML =th_quant;
    td_item_1_quant.classList.add('evidente');
    
    tr_tbody.appendChild(td_item_1_quant);

    const td_item_1_produtos = document.createElement('td');
    td_item_1_produtos.innerHTML =th_produtos;
    td_item_1_produtos.classList.add('evidente');
    td_item_1_produtos.classList.add('nome_item');
    tr_tbody.appendChild(td_item_1_produtos);

    const td_item_1_uni_preco = document.createElement('td');
    td_item_1_uni_preco.innerHTML =(th_preco).toLocaleString('pt-br', {minimumFractionDigits: 2});
    tr_tbody.appendChild(td_item_1_uni_preco);

    const td_item_1_preco = document.createElement('td');
    td_item_1_preco.classList.add('evidente');
    td_item_1_preco.innerHTML =(th_preco * th_quant).toLocaleString('pt-br', {minimumFractionDigits: 2});
    tr_tbody.appendChild(td_item_1_preco);
 }


 function somar_Colunas(tabela_id,indice_Coluna){

    const tabela = document.getElementById(tabela_id);

    let soma = 0;

    for(let i =1; i< tabela.rows.length;i++){

        const valorCelula = tabela.rows[i].cells[indice_Coluna].innerText;

        soma+= parseFloat(valorCelula) || 0;
    }

    return soma;

 }





