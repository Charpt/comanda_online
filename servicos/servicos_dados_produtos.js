const dados_servicos ={
    BuscarPorUsuario: user =>{
        
       return firebase.firestore()
        .collection('produtos')
        .where('user.uid','==', user.uid)
        .orderBy('codigo','desc')
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
        .doc(uid)
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
    }
    
}