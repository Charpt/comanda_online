function formatar_date(data){

   console.log(data);
    const dataString = data;
    
        const date = new Date(dataString);
        
        const dia = String(date.getDate()).padStart(2,'0');
        const mes = String(date.getMonth()+1).padStart(2,'0');
        const ano = date.getFullYear();
        const horas = String(date.getHours()).padStart(2,'0');
        const minutos = String(date.getMinutes()).padStart(2,'0');
    
        
    
        const dataformatada =`${dia} / ${mes} / ${ano} ás ${horas}:${minutos}`;
    
    
        console.log(dataformatada);
        return dataformatada
    
}

function Inserir_date(elemento_id){
            // Obtém o elemento input
            const datetimeInput = document.getElementById(elemento_id);

            // Obtém a data e hora atuais
            const now = new Date();
    
            // Ajusta o fuso horário para o local do navegador
            const timezoneOffset = now.getTimezoneOffset() * 60000; // Converte o offset para milissegundos
            const localISOTime = (new Date(now - timezoneOffset)).toISOString().slice(0, 16);
    
            // Define o valor do input com a data e hora atuais
            datetimeInput.value = localISOTime;
}

function formatarDinheiro(valor) {
    // Converte o valor para string
    let valorStr = valor.toString();

    // Substitui o ponto por vírgula
    valorStr = valorStr.replace(',', '.');

    return valorStr;
}

function Mascara_monetaria_input(elemento_id){


    document.getElementById(elemento_id).addEventListener('input', function (e) {
        let valor = e.target.value;
    
        // Remove tudo que não é número
        valor = valor.replace(/\D/g, '');
    
        // Se não houver valor, define como "0,00"
        if (valor === '') {
            e.target.value = '0,00';
            return;
        }
    
        // Garante que o valor tenha pelo menos 2 dígitos (para centavos)
        if (valor.length === 1) {
            valor = '0' + valor;
        }
    
        // Separa reais e centavos
        const reais = valor.slice(0, -2) || '0'; // Se não houver reais, define como "0"
        const centavos = valor.slice(-2);
    
        // Remove zeros à frente dos reais
        const reaisSemZeros = String(Number(reais)); // Converte para número e depois para string para remover zeros à frente
    
        // Formata os reais com pontos para milhares
        const reaisFormatados = reaisSemZeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
        // Atualiza o valor no campo de entrada
        e.target.value = `${reaisFormatados},${centavos}`;
    });
}

