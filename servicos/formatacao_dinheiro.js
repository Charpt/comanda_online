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