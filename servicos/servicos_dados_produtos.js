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
    


    //nao consegui fazer o uid funcioanr por aqui devo verifiar o codigo para saber oque impede o funcionamento
    BuscarPorUid: uid =>{
        return firebase.firestore()
        .collection('produtos')
        .where
        .get()
        .then(doc => {           
            
            return doc.data();

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
    
}