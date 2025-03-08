
const dados_servicos ={ 

/*************************************************************
 * CADASTRAR PRODUTOS
 **************************************************************/

//BUSCA OS PRODUTOS JA CADASTRADOS
    BuscarPorUsuario: user  =>{
        
       return firebase.firestore()
        .collection('produtos')
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

// DELETA OS ITEM CADASTRADOS
    DeleteDados: dados_produtos =>{
        return firebase.firestore()
        .collection('produtos')
        .doc(dados_produtos.uid)
        .delete();
    },

//CADASTRA NOVOS ITENS
    Cadastrar_novo_dado: dados_produtos => {
        return firebase.firestore()
        .collection('produtos')
        .add(dados_produtos);
    },

// ATUALIZA OS ITEN JA CADASTRADOS
    Atualizar_dados: dados_produtos =>{
        return firebase.firestore()
        .collection('produtos')
        .doc(Obter_informacao_url_uid())
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



// busca quantos carrinhos de compras ja foram vendidos finalizados fechados
    Buscar_Carrinho_de_Compras_quantidade: user  =>{
        
        return firebase.firestore()
         .collection('quant_carrinhos_compra')
         .where('user.uid','==', user.uid)
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
// atualiza a quantidade de carrinhos ja vendidos pra dar o novo numero ao carrinho atual
     Atualizar_quantidade_carrinho_finalizado: quantidade_para_atualizar => {
        return firebase.firestore()
        .collection('quant_carrinhos_compra')
        .doc('2DSs00ACRiil1spiwPM4')
        .update(quantidade_para_atualizar);
    },
   
    //CADASTRA NOVOS ITENS
    Cadastrar_novo_pedido: (dados_produtos,caminho_colecao) => {
        return firebase.firestore()
        .collection(caminho_colecao)
        .add(dados_produtos);
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




// ATUALIZA OS ITEN JA CADASTRADOS nos pedidos
Atualizar_dados_pedidos: (colecao,doc,dados_produtos) =>{
    return firebase.firestore()
    .collection(colecao)
    .doc(doc)
    .update(dados_produtos);
},

}

// Função para deletar uma coleção ASSIM É PSSOVEL LIMPAR A COLECAO E COMEÇAR OUTRA 
const deleteCollection = async (collectionPath) => {
    try {

        console.log(`Iniciando exclusão da coleção: ${collectionPath}`);

        // Obtém todos os documentos da coleção
        const querySnapshot = await db.collection(collectionPath).get();

        // Verifica se há documentos para deletar
        if (querySnapshot.empty) {
            alert("O CARRINHO ESTA VAZIO .");
            return;
        }else{
            criar_comanda_pedido();
        }

        // Confirmação do usuário
        const userConfirmed = confirm(`DESEJA FINALIZAR COMPRA?`);
        if (!userConfirmed) {
            console.log("OPERACAO CANCELADA PELO USUARIO.");
            return;
        }

        // Deleta cada documento
        const batch = db.batch(); // Usa um batch para deletar em lote
        querySnapshot.forEach(doc => {
            batch.delete(doc.ref); // Adiciona a operação de exclusão ao batch
        });

        // Executa o batch
        await batch.commit();
        
        alert("COMPRA FINALIZADA COM SUCESSO!!!");

        
        Add_quantidade_de_carrinhos_fechados();
       // window.location.href = "../tela_pedidos/tela_pedidos.html?status_selecao=preparando";
       location.reload();
       
    } catch (error) {
        console.error("Erro ao deletar a coleção: ", error);
        alert("Erro ao deletar a coleção. Verifique o console para mais detalhes.");
    }
};


function playBeep() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = context.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, context.currentTime); // valor em Hz
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1); // duração do beep em segundos
}

