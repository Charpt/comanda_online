// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Pegar elementos do DOM
    var modal = document.getElementById('customAlert');
    var btn = document.getElementById('openModal');
    var span = document.getElementsByClassName('close')[0];
    var submitBtn = document.getElementById('submitPassword');
    var passwordInput = document.getElementById('passwordInput');

    // Abrir o modal quando o botão é clicado
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // Fechar o modal quando o botão de fechar é clicado
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Fechar o modal quando o usuário clica fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Validar a senha quando o botão de enviar é clicado
    submitBtn.onclick = function() {
        var password = passwordInput.value;
        if (password === "123") { // Substitua "senha123" pela senha desejada
            alert('Senha correta!');
            modal.style.display = 'none';
        } else {
            alert('Senha incorreta! Tente novamente.');
        }
    }
});