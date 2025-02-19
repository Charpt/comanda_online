function calcular() {
    var num1 = document.getElementById("num1");
    var num2 = document.getElementById("num2");
    var elemResult = document.getElementById("resultado");

    var label1 = parseInt(num1.textContent.toString());
    var label2 = parseInt(num2.textContent.toString());

   console.log(label1 + label2);
    if (elemResult.textContent === undefined) {
       elemResult.textContent = "O resultado é " + String(label1 + label2) + ".";
    }
    else { // IE
       elemResult.innerText = "O resultado é " + String(label1 + label2) + ".";
    }

   
}


console.log(Date());


   // script.js


// Função para calcular a cor com base no tempo restante
function updateColor(startTime, totalDuration) {
   const card = document.getElementById('card_id');
    const now = new Date().getTime(); // Tempo atual em milissegundos
    const elapsedTime = now - startTime; // Tempo decorrido desde o início
    const progress = elapsedTime / totalDuration; // Progresso (0 a 1)

    // Limita o progresso a 1 (100%)
    if (progress >= 1) {
        card.style.backgroundColor = 'red'; // Cor final
        return;
    }

    // Calcula a cor intermediária
    const red = Math.floor(255 * progress); // Aumenta o vermelho
    const green = Math.floor(255 * (1 - progress)); // Diminui o verde
    card.style.backgroundColor = `rgb(${red}, ${green}, 0)`; // Aplica a cor

    // Atualiza a cor a cada segundo
    requestAnimationFrame(() => updateColor(startTime, totalDuration));
}

// Simulação de um pedido feito às 12:00
const startTime = new Date("2025-02-17T19:46:00").getTime(); // Tempo atual (pode ser substituído por um horário fixo)
const totalDuration = 1 * 60 * 1000; // 40 minutos em milissegundos

// Inicia a animação
updateColor(startTime, totalDuration);


  




