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
        window.location.href ="../../index.html";
    }).catch(() =>{
        alert("Erro ao deslogar");
    })
}

firebase.auth().onAuthStateChanged(user =>{
    if(user){

        Buscar_Dados(user,'carrinho');// BUSCA AS INFORMAÇÕES DOS ITENS JA CADASTRADOS NO CARRINHO ATUAL
        add_ou_buscar_id_item('busca','ultimo_id_carrinho_adicionado','ultimo_id_carrinho_adicionado','carrinho_id');
    }
})

/***************************************************************************
 *  BUSCA OS DADOS 
 * 
 */
var quantidade_de_itens_carrinho;
function Buscar_Dados(user,criar_carrinho_ou_comanda)
{
    
   dados_servicos.BuscarPorUsuario_Carrinho_de_Compras(user)
   .then(dados =>
    {
        if(criar_carrinho_ou_comanda == 'comanda'){

            
            deleteCollection('carrinhos_de_compras',dados)
            
            quantidade_de_itens_carrinho = dados.length;

        }else{

            if(criar_carrinho_ou_comanda == 'carrinho'){
              
                Criar_Carrinho_de_Compras(dados);
                quantidade_de_itens_carrinho = dados.length;
            }
        }
        
        
        

    }).catch(error =>
    {
        removeLoading();
        console.log(error);
        alert("Erro ao recuperar dados");
   })
}





function Add_Item_Carrinho(){
    window.location.href ="../add_item_carrinho/add_item_carrinho.html";
}


function salvar_comanda(){
    firebase.auth().onAuthStateChanged(user =>{
        if(user){
    
            Buscar_Dados(user,'comanda');
        }
    })
    
    
   }


function Criar_Carrinho_de_Compras(dados){ 


    
    const carrinho = document.getElementById('carrinho');

    const caption = document.createElement('caption');
    caption.classList.add('evidente_destaque_1');
    caption.id = ('capition_carrinho_vazio');
    caption.innerHTML = "CARRINHO VAZIO";
    carrinho.appendChild(caption);

Criar_Colunas_Carrinho_de_Compras(carrinho);

i=0;
dados.forEach(dados => {    
    Add_Item_Carrinho_de_Compras(carrinho,dados,i++);
    
//console.log(dados.date_criacao);
    
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



function Add_Item_Carrinho_de_Compras(carrinho, dados,numero_item){


    const capition = document.getElementById('capition_carrinho_vazio');
    capition.style.display = 'none';

// dados que precisa ser recordados
recordar_dados_formulario('nao_limpar_dados');


    const tbody = document.createElement('tbody');
    carrinho.appendChild(tbody);
    tbody.id = dados.uid;
    tbody.addEventListener('click',Event => {
        Event.stopPropagation();
        Deseja_Deletar_Produto_carrinho_de_compras(dados);
    });

    const tr_tbody = document.createElement('tr');
    tbody.appendChild(tr_tbody);

    const td_item_1_cod = document.createElement('td');
    td_item_1_cod.innerHTML =dados.codigo;
    td_item_1_cod.id ='item_codigo_tb_' + numero_item;
    tr_tbody.appendChild(td_item_1_cod);

    const td_item_1_quant = document.createElement('td');
    td_item_1_quant.innerHTML =dados.quantidade;
    td_item_1_quant.id ='item_quant_tb_' + numero_item;
    td_item_1_quant.classList.add('evidente');
    tr_tbody.appendChild(td_item_1_quant);

    const td_item_1_produtos = document.createElement('td');
    td_item_1_produtos.innerHTML = dados.item_nome +"<br><b class=obs>"+ dados.observacao;
    td_item_1_produtos.id ='item_produto_tb_' + numero_item;
    td_item_1_produtos.classList.add('evidente');
    td_item_1_produtos.classList.add('nome_item');
    tr_tbody.appendChild(td_item_1_produtos);

    const td_item_1_uni_preco = document.createElement('td');
    td_item_1_uni_preco.innerHTML =(dados.unidade_preco).toLocaleString('pt-br', {minimumFractionDigits: 2});
    td_item_1_uni_preco.id ='item_uni_preco_tb_' + numero_item;
    tr_tbody.appendChild(td_item_1_uni_preco);

    const td_item_1_preco = document.createElement('td');
    td_item_1_preco.classList.add('evidente');
    td_item_1_preco.innerHTML =(dados.unidade_preco * dados.quantidade).toLocaleString('pt-br', {minimumFractionDigits: 2});
    td_item_1_preco.id ='item_preco_tb_' + numero_item;
    tr_tbody.appendChild(td_item_1_preco);
 
    const total_carrinho = document.getElementById('total_carrinho');    
    total_carrinho.innerHTML = somar_Colunas("carrinho",4).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    
}





// funcao pra somar as colunas 

 function somar_Colunas(tabela_id,indice_Coluna){

    const tabela = document.getElementById(tabela_id);

    let soma = 0;

    for(let i =1; i< tabela.rows.length;i++){

        const valorCelula = String(formatarDinheiro(tabela.rows[i].cells[indice_Coluna].innerHTML));
//console.log(formatarDinheiro(tabela.rows[i].cells[indice_Coluna].innerHTML));

        soma+= parseFloat(valorCelula) || 0;
        //console.log(parseFloat(valorCelula).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        
    }

    return soma;

 }






// funcao para perguntar se deseja deletar produtotos do carrinho
 function Deseja_Deletar_Produto_carrinho_de_compras(dados)
{
    const desejaDeletarProduto = confirm('DESEJA DELETAR O PRODUTO');
    if(desejaDeletarProduto == true){
        Deletar_Produto_carrinho_de_compras(dados);
    }

}

function Deletar_Produto_carrinho_de_compras(dados){
    ShowLoading();

    dados_servicos.Delete_dados_carrinho_de_compras(dados)
   .then(snapshot =>{
    
    removeLoading();
            // faz esperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
            setTimeout(() => {

                location.reload();
                
            }, 1000); // 1000 milissegundos = 1 segundos
    

   }).catch(error =>{
    removeLoading();
    console.log(error);
    alert("Erro ao deletar dados");
   })
}






function Alerta_compra(){


    const desejaDeletarProduto = confirm();    
    
    if(desejaDeletarProduto == true){
       alert("Compra Finalizada");
    }
}







/*******************************************************************************************/
/****************** FUNÇÃO PARA ESCONDER OU MOSTRAR AS OPÇOES DE ENTREGA OU RETIRADA *****************************************/
/*******************************************************************************************/


document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[name="opcao"]');
    const opcao_entrega_id = document.getElementById('opcao_entrega_id');
    const opcao_retirada_id = document.getElementById('opcao_retirada_id');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'entrega') {
                esconder_select_lugares_id.style.display = "block";
            esconder_select_condominios_id.style.display = "block";
            esconder_select_bloco_id.style.display = "block";
            esconder_select_ap_id.style.display = "block";
            digite_endereco_id.style.display = "none";

            } else if (this.value === 'retirada') {

            esconder_select_lugares_id.style.display = "none";
            esconder_select_condominios_id.style.display = "none";
            esconder_select_bloco_id.style.display = "none";
            esconder_select_ap_id.style.display = "none";
            digite_endereco_id.style.display = "none";
                
            }
        });
    });
});

/*******************************************************************************************/
/****************** FUNÇÃO PARA ESCONDER OU MOSTRAR AS OPÇOES DE ENTREGAR NO CONDOMINIO *****************************************/
/*******************************************************************************************/


document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.querySelector('select[name="opcao_endereco"]');
    const digite_endereco_id = document.getElementById('digite_endereco_id');
    const esconder_select_lugares_id = document.getElementById('esconder_select_lugares_id');
    const esconder_select_condominios_id = document.getElementById('esconder_select_condominios_id'); 
    const esconder_select_bloco_id = document.getElementById('esconder_select_bloco_id');
    const esconder_select_ap_id = document.getElementById('esconder_select_ap_id');

    selectElement.addEventListener('change', function() {
        if (this.value === 'condominio') {
            esconder_select_lugares_id.style.display = "block";
            esconder_select_condominios_id.style.display = "block";
            esconder_select_bloco_id.style.display = "block";
            esconder_select_ap_id.style.display = "block";
            digite_endereco_id.style.display = "none";

        } else if (this.value === 'casa') {
            esconder_select_lugares_id.style.display = "block";
            esconder_select_bloco_id.style.display = "none";
            esconder_select_ap_id.style.display = "none";
            digite_endereco_id.style.display = "block";
           
            esconder_select_condominios_id.style.display = "none";
        } else if (this.value === 'empresa') {
            esconder_select_lugares_id.style.display = "none";
            esconder_select_condominios_id.style.display = "none";
            esconder_select_bloco_id.style.display = "none";
            esconder_select_ap_id.style.display = "none";
            digite_endereco_id.style.display = "block";
            
        }
    });
});




/*************************************************
 * CRIAR A COMANDA DO PEDIDO
 */
function criar_comanda_pedido(dados_itens){

        
    
    const dados = obter_dados_comanda_pedido(dados_itens);

    Cadastrar_Pedido(dados);
}

function obter_dados_comanda_pedido(dados_itens) {

    console.log(dados_itens);
    var dados = {}; // Objeto para armazenar os dados

    dados.user = {
        uid: firebase.auth().currentUser.uid
    };

   
    
    if(form.entrega().checked == true){

        if(form.reserva().checked == true){
            dados['reserva'] =   "sim";
        }else{
            if(form.reserva().checked == false){
                dados['reserva'] =   "nao";
            }

        }
        
        dados['numero_carrinho'] = form.carrinho_id().textContent;

        dados['status'] =   "preparando";

        dados['forma_envio'] =   "entrega";

        dados['endereco'] = form.endereco().value;

        dados['nome_condominios'] = form.nome_condominio().value;

        dados['bloco'] = form.bloco().value;

        dados['apartamento'] = form.apartamento().value;

        dados['nome_cliente'] = form.nome_cliente().value;
        
        dados['forma_pagamento'] = form.forma_pagamento().value;

        dados['tempo_preparo'] =   "00:40:00";

        dados['data_pedido'] =   "2025-02-21T00:05";

    }

    if(form.retirada().checked == true){

        if(form.reserva().checked == true){
            dados['reserva'] =   "sim";
        }else{
            if(form.reserva().checked == false){
                dados['reserva'] =   "nao";
            }

        }

    dados['numero_carrinho'] = form.carrinho_id().textContent;
    dados['status'] =   "preparando";
    dados['forma_envio'] =   "retirada";
    dados['nome_cliente'] = form.nome_cliente().value;
    dados['forma_pagamento'] = form.forma_pagamento().value;
    dados['tempo_preparo'] =   "00:40:00";
    dados['data_pedido'] =   "2025-02-21T00:05";

    }
    
    
//dados dos itens produtos, todos os itens que foram pedidos no carrinho de compras
i=0;
dados_itens.forEach(dados_itens => {    
       
        dados['codigo' + (i + 1)] = String(dados_itens.codigo);
        dados['item_nome' + (i + 1)] = String(dados_itens.item_nome);
        dados['desconto' + (i + 1)] = String(dados_itens.desconto);
        dados['observacao' + (i + 1)] = String(dados_itens.observacao);
        dados['quantidade' + (i + 1)] = String(dados_itens.quantidade);
        dados['uid_principal' + (i + 1)] = String(dados_itens.uid_principal);
        dados['unidade_medida' + (i + 1)] = String(dados_itens.unidade_medida);
        dados['unidade_preco' + (i + 1)] = String(dados_itens.unidade_preco);
        dados['quantidade_de_item_na_comanda'] = i + 1;
        i++;
         
});
    

    return dados; // Retorna o objeto com todos os dados
}




    const form = {


        //date_criacao:() => document.getElementById('date_criacao_id'),
       // date_criacaoInvalido:() => document.getElementById('date_criacaoInvalido_id'),
    
       reserva:() => document.getElementById('reserva_id'),

        entrega:() => document.getElementById('entrega_id'),
    
        retirada:() => document.getElementById('retirada_id'),
    
        endereco:() => document.getElementById('selecao_endereco_id'), 
        nome_condominio:() => document.getElementById('selecao_condominio_id'),      
        
        nome_cliente:() => document.getElementById('nome_cliente_id'),  
        

        bloco:() => document.getElementById('bloco_id'),
        apartamento:() => document.getElementById('apartamento_id'),
       
        forma_pagamento:() => document.getElementById('selecao_forma_pagamento_id'),

        //observacao:() => document.getElementById('observacao_id'),   
        carrinho_id:() => document.getElementById('carrinho_id'),
        
        
    }



/******************************************************
 * CADASTRA NOVOS pedidos no bacnod e dados
 *********************************************/
function Cadastrar_Pedido(dados){
    dados_servicos.Salvar_no_Banco_Dados(dados,"pedidos")
    .then(()=>{

    }).catch(()=>{
       removeLoading();
       alert("Erro ao salvar Produto");
    })
}



// Função para deletar uma coleção ASSIM É PSSOVEL LIMPAR A COLECAO E COMEÇAR OUTRA 
const deleteCollection = async (collectionPath,dados) => {
    try {

        console.log(`Iniciando exclusão da coleção: ${collectionPath}`);

        // Obtém todos os documentos da coleção
        const querySnapshot = await db.collection(collectionPath).get();

        // Verifica se há documentos para deletar
        if (querySnapshot.empty) {
            alert("O CARRINHO ESTA VAZIO .");
            return;
        }else{
            
            criar_comanda_pedido(dados);
            
        }

        // Confirmação do usuário
        const userConfirmed = confirm(`DESEJA FINALIZAR COMPRA?`);

        if (!userConfirmed) {
            console.log("OPERACAO CANCELADA PELO USUARIO.");
            return;
        }

        // faz esperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
            // Deleta cada documento
        const batch = db.batch(); // Usa um batch para deletar em lote
        querySnapshot.forEach(doc => {
            batch.delete(doc.ref); // Adiciona a operação de exclusão ao batch
        });
        // Executa o batch
        await batch.commit();

        alert("COMPRA FINALIZADA COM SUCESSO!!!");

        recordar_dados_formulario('limpar_dados');
        add_ou_buscar_id_item('add','ultimo_id_carrinho_adicionado','ultimo_id_carrinho_adicionado','carrinho_id');
       
        // faz esperar um tempo antes de execultar o codigo dentro dele no caso ele espera um tempo antes de ir apra a proxima pagina
        setTimeout(() => {

            location.reload();

        }, 1000); // 1000 milissegundos = 1 segundos
       
       
    } catch (error) {
        console.error("Erro ao deletar a coleção: ", error);
        alert("Erro ao deletar a coleção. Verifique o console para mais detalhes.");
    }
};

function recordar_dados_formulario(limpar){

    recordar_dados('bloco_id',limpar);
    recordar_dados('apartamento_id',limpar);
    recordar_dados('nome_cliente_id',limpar);

}

// FUNCAO PARA CRIAR UMA MASCARA MONETARIA NO CAMPO PREÇO, EM UM INPUT DO TIPO TEXT, VOCE SO PRECISA PASSAR O ID DO ELEMENTO INPUT TEXT
// A FUNCAO COMPLETA ESTA NO ARQUIVO serviços_dados_produtos.js
Mascara_monetaria_input('input_troco_id');



const input_troco = document.getElementById('input_troco_id');
const label_troco = document.getElementById('label_troco_id');

// Função para converter string monetária para número
function parseDinheiro(valor) {
    if (typeof valor === 'number') return valor;
    if (!valor) return 0;
    
    // Remove tudo exceto números, vírgula e ponto
    const numeroString = valor.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numeroString) || 0;
}

// Evento de digitação no campo de troco
input_troco.addEventListener('input', (e) => {
    // Obtém valores numéricos
    const valorRecebido = parseDinheiro(input_troco.value);
    const totalCarrinho = somar_Colunas("carrinho", 4); // Assumindo que já retorna número
    
    // Calcula a diferença
    const diferenca = valorRecebido - totalCarrinho;
    
    // Formata a mensagem conforme o valor
    if (diferenca >= 0) {
        // Troco positivo (valor a devolver)
        label_troco.textContent = `Troco: ${formatarDinheiro(diferenca)}`;
        label_troco.style.color = '#0f5c0c'; // Verde
    } else {
        // Troco negativo (valor que falta)
        label_troco.textContent = `Faltam: ${formatarDinheiro(Math.abs(diferenca))}`;
        label_troco.style.color = '#860202'; // Vermelho
    }
    
    // Para debug (opcional)
    console.log(`Recebido: ${formatarDinheiro(valorRecebido)}`);
    console.log(`Total: ${formatarDinheiro(totalCarrinho)}`);
    console.log(`Diferença: ${formatarDinheiro(diferenca)}`);
});

// Função de formatação (exemplo)
function formatarDinheiro(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}