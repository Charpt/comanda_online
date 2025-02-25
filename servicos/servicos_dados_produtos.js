
const dados_servicos ={ 

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
    





    DeleteDados: dados_produtos =>{
        return firebase.firestore()
        .collection('produtos')
        .doc(dados_produtos.uid)
        .delete();
    },

    Cadastrar_novo_dado: dados_produtos => {
        return firebase.firestore()
        .collection('produtos')
        .add(dados_produtos);
    },

    Atualizar_dados: dados_produtos =>{
        return firebase.firestore()
        .collection('produtos')
        .doc(GetDadosProdutos())
        .update(dados_produtos);
    },

    // carrinho de compras
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

     
    

      

    Add_item_carrinho: dados_item_carrinho => {
        return firebase.firestore()
        .collection('carrinhos_de_compras')
        .add(dados_item_carrinho);
    },

    Delete_dados_carrinho_de_compras: dados_produtos =>{
        return firebase.firestore()
        .collection('carrinhos_de_compras')
        .doc(dados_produtos.uid)
        .delete();
    },




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

     Add_quantidade_carrinho_finalizado: quantidade_para_atualizar => {
        return firebase.firestore()
        .collection('quant_carrinhos_compra')
        .doc('2DSs00ACRiil1spiwPM4')
        .update(quantidade_para_atualizar);
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
            console.log("A coleção está vazia. Nada para deletar.");
            return;
        }

        // Confirmação do usuário
        const userConfirmed = confirm(`Tem certeza que deseja deletar a coleção "${collectionPath}"? Esta ação não pode ser desfeita.`);
        if (!userConfirmed) {
            console.log("Exclusão cancelada pelo usuário.");
            return;
        }

        // Deleta cada documento
        const batch = db.batch(); // Usa um batch para deletar em lote
        querySnapshot.forEach(doc => {
            batch.delete(doc.ref); // Adiciona a operação de exclusão ao batch
        });

        // Executa o batch
        await batch.commit();
        console.log(`Todos os documentos da coleção ${collectionPath} foram deletados.`);
        alert("Coleção deletada com sucesso!");
        AtualizarDadosDoProduto();
       location.reload();
    } catch (error) {
        console.error("Erro ao deletar a coleção: ", error);
        alert("Erro ao deletar a coleção. Verifique o console para mais detalhes.");
    }
};




