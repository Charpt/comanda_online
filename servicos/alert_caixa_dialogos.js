function Caixa_dialogo_deletar(elemento_botaoDeleta_id,pagina){
    // script.js
document.addEventListener('DOMContentLoaded', function() {
    // Pegar elementos do DOM
    var modal = document.getElementById('customAlert');
    var modal1 = document.getElementById('customAlert1');
    var modal2 = document.getElementById('customAlert2');

    var btn = document.getElementById(elemento_botaoDeleta_id);
    var btn_ok = document.getElementById('botao_ok_id');
    var btn_deletar = document.getElementById('botao_deletar_id');
    var botao_cancelar = document.getElementById('botao_cancelar_id');
    var span = document.getElementsByClassName('close');
    var submitBtn = document.getElementById('submitPassword');
    var passwordInput = document.getElementById('passwordInput');

    // Abrir o modal quando o botão é clicado
    btn_deletar.onclick = function() {
        modal1.style.display = 'none';
        if(pagina == 'cadastrar_item'){
            Deseja_Deletar_item('itens',Obter_informacao_url_uid());
        }
        
        modal2.style.display = 'block';
       
    }

    // Abrir o modal quando o botão é clicado
    btn_ok.onclick = function() {
        modal2.style.display = 'none';
       
    }
    // Abrir o modal quando o botão é clicado
    botao_cancelar.onclick = function() {
        modal1.style.display = 'none';
       
    }

    btn.onclick = function() {
        modal.style.display = 'block';
       
    }

    // Fechar o modal quando o botão de fechar é clicado
    span[0].onclick = function() {
        modal.style.display = 'none';
        modal1.style.display = 'none';
        modal2.style.display = 'none';
    }
    span[1].onclick = function() {
        modal.style.display = 'none';
        modal1.style.display = 'none';
        modal2.style.display = 'none';
    }
    span[2].onclick = function() {
        modal.style.display = 'none';
        modal1.style.display = 'none';
        modal2.style.display = 'none';
    }

    // Fechar o modal quando o usuário clica fora dele
    window.onclick = function(event) {
        if (event.target == modal ||event.target == modal1 || event.target == modal2 ) {
            modal.style.display = 'none';
        modal1.style.display = 'none';
        modal2.style.display = 'none';
        }
    }

    // Validar a senha quando o botão de enviar é clicado
    submitBtn.onclick = function() {
        var password = passwordInput.value;
        if (password === "123") { // Substitua "senha123" pela senha desejada
            
            modal.style.display = 'none';
            modal1.style.display = 'block';
        } else {
            alert('Senha incorreta! Tente novamente.');
        }
    }
});







}