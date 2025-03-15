
const dados_servicos ={ 

/*************************************************************
 * CADASTRAR PRODUTOS
 **************************************************************/

//BUSCA OS PRODUTOS JA CADASTRADOS
    Buscar_Item: (colecao,user,status,campo,ordem)  =>{
        
       return firebase.firestore()
        .collection(colecao)
        .where('user.uid','==', user.uid)
        .where('status','==', status)
        .orderBy(campo,ordem)
        .get()
        .then(snapshot =>
        {
            return snapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    uid: doc.id
                }));
        }) 
    },

// DELETA OS ITEM CADASTRADOS
    Delete_item: (colecao,uid_do_item) =>{
        return firebase.firestore()
        .collection(colecao)
        .doc(uid_do_item)
        .delete();
    },

    //CADASTRA NOVOS ITENS
    Salvar_no_Banco_Dados: (dados_produtos,caminho_colecao) => {
        return firebase.firestore()
        .collection(caminho_colecao)
        .add(dados_produtos);
    },



// ATUALIZA OS ITEN JA CADASTRADOS nos pedidos
Atualizar_dados: (colecao,doc,dados_produtos) =>{
    return firebase.firestore()
    .collection(colecao)
    .doc(doc)
    .update(dados_produtos);
},
    
/*************************************************************
 * CARRINHO DE COMPRAS
 **************************************************************/

    // BUSCA NO BANCO DE DADOS OS ITENS QUE JA ESTAO NO CARRINHO
    // DE COMPRA ATUAL, QUE FORAM ADICIONADOS PELO USUARIO QUE ESTA LOGADO
    // E MOSTRA NA ORDEM DOS CODIGOS DO MENOS PARA O MAIOR (ORDER BY ASC)
    BuscarPorUsuario_Carrinho_de_Compras: user  =>{
        
        return firebase.firestore()
         .collection('carrinhos_de_compras')
         .where('user.uid','==', user.uid)
         .orderBy('codigo','asc')
         .get()
         .then(snapshot =>
         {
              return snapshot.docs.map(doc => (
             {
                 ...doc.data(),
                 uid: doc.id
             }));
 
             
         })

     },

     
    // ADICIONA OS DADOS DO ITEM 
    Add_item_carrinho: dados_item_carrinho => {
        return firebase.firestore()
        .collection('carrinhos_de_compras')
        .add(dados_item_carrinho);
    },

    // DELETA UM ITEM ESPECIFICO DO CARRINHO DE COMPRAS
    Delete_dados_carrinho_de_compras: dados_produtos =>{
        return firebase.firestore()
        .collection('carrinhos_de_compras')
        .doc(dados_produtos.uid)
        .delete();
    },


   



//BUSCA OS PRODUTOS JA CADASTRADOS
Buscar_pedidos: (user,colecao,status)  =>{
        
    return firebase.firestore()
     .collection(colecao)
     .where('user.uid','==', user.uid)
     .where('status','==', status)
     .orderBy('numero_carrinho','asc')
     .onSnapshot((querySnapshot) => {
        
        removeLoading();
        return querySnapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    uid: doc.id
                }));
             }); 
 },






}




function playBeep() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = context.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, context.currentTime); // valor em Hz
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1); // duração do beep em segundos
}

/************************************************************************************************************** */
// funcao que cria o id do item verificando o ultimo id registrado no banco de dados
//  e adicionando mais um numero nele ou buscando o id para visualizar
/*************************************************************************************************************** */

async function add_ou_buscar_id_item(add_ou_busca,colecao,documento,elemento_id) {

    const docRef = db.collection(colecao).doc(documento);

    try {
        // Inicia uma transação para garantir que o número seja único
        const nextNumber = await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);

            let ultimoNumero;
            if (doc.exists) {
                ultimoNumero = doc.data().id;
            } else {
                ultimoNumero = 0; // Começa do zero se o documento não existir
            }

            const proximoNumero = ultimoNumero + 1;

            // Atualiza o último número no Firestore
            if(add_ou_busca == "add"){
                transaction.set(docRef, { id: proximoNumero });
                               
            }
            

            return proximoNumero;
        });

        // Exibe o próximo número para o usuário
        document.getElementById(elemento_id).innerText = "" + nextNumber;
    } catch (error) {
        console.error("Erro ao obter o próximo número: ", error);
    }
}


function recordar_dados(elemento_id,limpar_dados){
    // Verifica se há um valor salvo no localStorage
const input = document.getElementById(elemento_id);

const savedValue = localStorage.getItem(elemento_id);

if(limpar_dados == 'nao_limpar_dados'){
    if (savedValue) {
        input.value = savedValue; // Preenche o input com o valor salvo
    }
    
    // Salva o valor no localStorage sempre que o usuário digitar algo
    input.addEventListener('input', function() {
        localStorage.setItem(elemento_id, this.value);
    });

}else{

    localStorage.setItem(elemento_id, "");
}

}