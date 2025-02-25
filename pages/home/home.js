function imprimirCupom() {
    // Atualiza a data e hora
    const dataElement = document.getElementById('data');
    const horaElement = document.getElementById('hora');
    const agora = new Date();

    dataElement.textContent = agora.toLocaleDateString();
    horaElement.textContent = agora.toLocaleTimeString();

    // Aciona a impressão
    window.print();
}