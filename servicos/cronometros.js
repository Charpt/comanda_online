let timers = {};

function addTimer(hours,minutes,seconds,comanda_id) {
   
    // Converte o tempo total para milissegundos
    const totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    // Cria um ID único para o cronômetro
    const timerId = `timer-${Date.now()}`;

    // Define o tempo final (momento em que o cronômetro chega a zero)
    const targetTime = Date.now() + totalTime;

    // Salva o cronômetro no localStorage
    saveTimer(timerId, targetTime);

    // Renderiza o cronômetro na tela
    renderTimer(timerId, targetTime,comanda_id);
}

function renderTimer(timerId, targetTime,comanda_id) {
    const timersContainer = document.getElementById(comanda_id);
    
    // Cria um elemento para o cronômetro
    const timerElement = document.createElement('div');
    timerElement.id = timerId;
    timerElement.innerHTML = `
        <div class="timer-display">${formatTime(targetTime - Date.now())}</div>
        <button onclick="startTimer('${timerId}')">Iniciar</button>
        <button onclick="resetTimer('${timerId}')">Resetar</button>
        <button onclick="removeTimer('${timerId}')">Remover</button>
    `;
    timersContainer.appendChild(timerElement);

    // Inicia o cronômetro
    startTimer(timerId);
}

function startTimer(timerId) {
    if (timers[timerId]) clearInterval(timers[timerId]);

    timers[timerId] = setInterval(() => {
        const targetTime = parseInt(localStorage.getItem(timerId), 10);
        const remainingTime = targetTime - Date.now();

        if (remainingTime <= 0) {
            clearInterval(timers[timerId]);
            document.querySelector(`#${timerId} .timer-display`).textContent = '00:00:00';
            playBeep();
            localStorage.removeItem(timerId);
            return;
        }

        // Atualiza o tempo exibido
        document.querySelector(`#${timerId} .timer-display`).textContent = formatTime(remainingTime);
    }, 1000);
}

function resetTimer(timerId) {
    clearInterval(timers[timerId]);
    localStorage.removeItem(timerId);
    document.getElementById(timerId).remove();
}

function removeTimer(timerId) {
    clearInterval(timers[timerId]);
    localStorage.removeItem(timerId);
    document.getElementById(timerId).remove();
}

function saveTimer(timerId, targetTime) {
    localStorage.setItem(timerId, targetTime);
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

function playBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Frequência do beep
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Duração do beep (0.5 segundos)
}

// Carrega os cronômetros salvos ao carregar a página
window.onload = function () {
    for (let i = 0; i < localStorage.length; i++) {
        const timerId = localStorage.key(i);
        const targetTime = parseInt(localStorage.getItem(timerId), 10);

        if (targetTime > Date.now()) {
            renderTimer(timerId, targetTime);
        } else {
            localStorage.removeItem(timerId); // Remove se o tempo já passou
        }
    }
};