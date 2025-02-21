// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvG43_YP5QIvEsRFRaVvJoxG6jgXNAsX4",
    authDomain: "pdvrnpets.firebaseapp.com",
    projectId: "pdvrnpets",
    storageBucket: "pdvrnpets.firebasestorage.app",
    messagingSenderId: "48261565819",
    appId: "1:48261565819:web:99cab59825d3e3ecb301de"
};

// Inicializa o Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Referência para o campo de pesquisa e a lista de resultados
const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('results');




 // Adiciona um evento de digitação
 searchInput.addEventListener('input', function () {
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
                        li.textContent = " Item Não encontrado "; // Substitua pelo campo que deseja exibir
                        resultsList.appendChild(li);

                    }else{
                    
                        querySnapshot.forEach((doc) => {
                        // Exibe os resultados
                        const li = document.createElement('li');
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
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.trim();
    debouncedSearch(searchText); // Chama a função debounced

    console.log(searchInput.value);
});


  




