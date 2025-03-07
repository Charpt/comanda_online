class Cronometro {
    constructor(elementId, hours, minutes, seconds) {
        this.elementId = elementId; // ID do elemento HTML onde o cronômetro será exibido
        this.initialTime = (hours * 3600 + minutes * 60 + seconds) * 1000; // Tempo inicial em milissegundos
        this.totalTime = this.initialTime; // Tempo restante
        this.startTime = null; // Momento em que o cronômetro foi iniciado
        this.timerInterval = null;

        // Recupera o estado do cronômetro do localStorage, se existir
        const storedState = localStorage.getItem(this.elementId);
        if (storedState) {
            const { totalTime, startTime } = JSON.parse(storedState);
            this.totalTime = totalTime;
            this.startTime = startTime;

            // Se o cronômetro estava em execução, ajusta o tempo restante com base no tempo decorrido
            if (this.startTime) {
                const elapsedTime = Date.now() - this.startTime;
                this.totalTime -= elapsedTime;
                if (this.totalTime <= 0) {
                    this.totalTime = 0;
                    this.playAlarm();
                }
            }
        }

        this.updateDisplay(); // Exibe o tempo inicial no elemento
    }

    // Inicia o cronômetro
    start() {
        if (this.timerInterval) return; // Evita múltiplos intervalos

        this.startTime = Date.now(); // Registra o momento em que o cronômetro foi iniciado
        this.timerInterval = setInterval(() => {
            if (this.totalTime <= 0) {
                this.stop();
                this.playAlarm();
                return;
            }

            this.totalTime -= 1000; // Reduz 1 segundo
            this.updateDisplay();
            this.saveState(); // Salva o estado atual no localStorage
        }, 1000);

        this.saveState(); // Salva o estado inicial no localStorage
    }

    // Atualiza a exibição do tempo no elemento HTML
    updateDisplay() {
        const timerElement = document.getElementById(this.elementId);
        if (timerElement) {
            timerElement.textContent = this.formatTime(this.totalTime);
        }
    }

    // Formata o tempo em HH:MM:SS
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Toca um alarme quando o tempo acaba
    playAlarm() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frequência do beep (440 Hz)
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1); // Toca por 1 segundo
    }

    // Para o cronômetro
    stop() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.startTime = null; // Reseta o momento de início
        this.saveState(); // Salva o estado atual no localStorage
    }

    // Reseta o cronômetro para o tempo inicial
    reset() {
        this.stop();
        this.totalTime = this.initialTime; // Reinicia para o tempo inicial
        this.updateDisplay();
        localStorage.removeItem(this.elementId); // Remove o estado armazenado
    }

    // Salva o estado atual do cronômetro no localStorage
    saveState() {
        const state = {
            totalTime: this.totalTime,
            startTime: this.startTime,
        };
        localStorage.setItem(this.elementId, JSON.stringify(state));
    }
}

// Armazena todos os cronômetros ativos
const cronometros = {};

// Função para iniciar um novo cronômetro em um elemento específico
function startTimer(elementId, hours, minutes, seconds) {
    if (cronometros[elementId]) {
        cronometros[elementId].stop(); // Para o cronômetro existente, se houver
    }
    cronometros[elementId] = new Cronometro(elementId, hours, minutes, seconds);
    cronometros[elementId].start();
}

// Função para parar um cronômetro específico
function stopTimer(elementId) {
    if (cronometros[elementId]) {
        cronometros[elementId].stop();
    }
}

// Função para resetar um cronômetro específico
function resetTimer(elementId) {
    if (cronometros[elementId]) {
        cronometros[elementId].reset();
    }
}

// Restaura o conteúdo do elemento ao carregar a página
function restoreElementContent(elementId) {
    const storedState = localStorage.getItem(elementId);
    if (storedState) {
        const { totalTime } = JSON.parse(storedState);
        const timerElement = document.getElementById(elementId);
        if (timerElement) {
            timerElement.textContent = new Cronometro(elementId, 0, 0, 0).formatTime(totalTime);
        }
    }
}

// Restaura todos os elementos ao carregar a página
window.addEventListener('load', () => {
    restoreElementContent('cronometro1'); // Restaura o conteúdo do elemento com ID 'cronometro1'
    restoreElementContent('cronometro2'); // Restaura o conteúdo do elemento com ID 'cronometro2'
});