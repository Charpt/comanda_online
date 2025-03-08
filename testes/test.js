// Escuta mudanças na coleção "minhaColecao"
db.collection("contador").onSnapshot((querySnapshot) => {
    // Limpa a lista atual (se necessário)
    const lista = document.getElementById("minhaLista");
    lista.innerHTML = "";
  
    // Itera sobre os documentos na coleção
    querySnapshot.forEach((doc) => {
      // Cria um novo elemento para exibir os dados
      const item = document.createElement("li");
      item.textContent = doc.data().numero; // Supondo que o campo se chame "nome"
      lista.appendChild(item);
      playBeep();

    });
  });


  function playBeep() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = context.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, context.currentTime); // valor em Hz
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1); // duração do beep em segundos
}