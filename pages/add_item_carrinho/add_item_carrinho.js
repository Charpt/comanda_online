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

// Referência para o campo de pesquisa e a lista de resultados
const pesquisa_codigo_name = document.getElementById('pesquisa_codigo_name');
const resultsList = document.getElementById('results');


 // Adiciona um evento de digitação
 pesquisa_codigo_name.addEventListener('input', function () {
     // Converte o valor do input para maiúsculas
     this.value = this.value.toUpperCase();
 });

// Função para pesquisar no Firestore
const searchFirestore = async (searchText) => {
    resultsList.innerHTML = ''; // Limpa os resultados anteriores

    if (searchText.length > 0) {
        
        // Consulta o Firestore
        db.collection('produtos')
            .where('produto', '>=', searchText)
            .where('produto', '<=', searchText +'\uf8ff')
            .get()
            .then((querySnapshot) => {
                                
                    if(querySnapshot.empty){
                        console.log("Item nao existe");
                        const li = document.createElement('li');                                          
                        li.textContent = " Item Não encontrado "; // Substitua pelo campo que deseja exibir;
                        resultsList.appendChild(li);

                    }else{
                    
                        querySnapshot.forEach((doc) => {
                            
                        // Exibe os resultados
                        const li = document.createElement('li');
                        li.addEventListener('click',()=> {

                            console.log(doc.id);

                            const item_codigo_id =document.getElementById('item_codigo_id');
                            
                            item_codigo_id.textContent = doc.data().codigo;

                            const item_uid_principal_id =document.getElementById('item_uid_principal_id');
                            
                            item_uid_principal_id.textContent = doc.id;                            

                            const item_selecionado_id =document.getElementById('item_selecionado_id');
                            item_selecionado_id.textContent = doc.data().produto;

                            const item_unidade_medida_id =document.getElementById('item_unidade_medida_id');
                            const item_quantidade_id =document.getElementById('item_quantidade_id');
                            const item_preco_id = document.getElementById('item_preco_id');
                           
                            const item_valor_total_id = document.getElementById('item_valor_total_id');

                            item_unidade_medida_id.textContent =doc.data().unidade_medida;
                            item_quantidade_id.value = doc.data().quantidade;
                            item_preco_id.textContent = doc.data().preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                            item_valor_total_id.textContent = doc.data().preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+" x "+item_quantidade_id.value +" = "+ (doc.data().preco * item_quantidade_id.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) ;

                            item_quantidade_id.addEventListener('input',()=>{
                            item_valor_total_id.textContent = doc.data().preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+" x "+item_quantidade_id.value +" = "+ (doc.data().preco * item_quantidade_id.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) ;
                                
                            })

                            resultsList.innerHTML = ''; // Limpa os resultados anteriores
                            
                           

                            
                        })
                        li.textContent = doc.data().codigo+" - "+doc.data().produto; // Substitua pelo campo que deseja exibir
                        resultsList.appendChild(li);
                    });
                }
                
            })
            .catch((error) => {
                console.error("Erro ao pesquisar: ", error);
            });
    }
};

// Função debounce para atrasar a execução da pesquisa
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId); // Cancela o timeout anterior
        timeoutId = setTimeout(() => {
            func.apply(this, args); // Executa a função após o delay
        }, delay);
    };
}

// Aplica o debounce à função de pesquisa (300ms de delay)
const debouncedSearch = debounce(searchFirestore, 300);

// Evento de digitação no campo de pesquisa
pesquisa_codigo_name.addEventListener('input', (e) => {
    const searchText = e.target.value.trim();
    debouncedSearch(searchText); // Chama a função debounced

    console.log(pesquisa_codigo_name.value);
});



function inserir_item_carrinho(){

    ShowLoading();
    
        const dados = criarProduto();        
        Add_Item_Carrinho_bd(dados);
    }


function Add_Item_Carrinho_bd(dados){
    

    dados_servicos.Add_item_carrinho(dados)
    .then(()=>{
        removeLoading();
       window.location.href = "../carrinho_compras/carrinho_compras.html";

    }).catch(()=>{
       removeLoading();
       alert("Erro ao salvar Produto");
    })
}


function criarProduto(){


    
    return{

        
        cliente: "felipe",
        desconto: 0,
        codigo: parseInt(document.getElementById('item_codigo_id').textContent),
        item_nome: document.getElementById('item_selecionado_id').textContent,
        unidade_medida: document.getElementById('item_unidade_medida_id').textContent,
        quantidade: parseInt(document.getElementById('item_quantidade_id').value),
        unidade_preco: parseFloat(document.getElementById('item_preco_id').textContent),
        observacao: document.getElementById('item_observacao_id').value,
        uid_principal: document.getElementById('item_uid_principal_id').textContent,
        user:{
            uid: firebase.auth().currentUser.uid

        }
    }
}





  













