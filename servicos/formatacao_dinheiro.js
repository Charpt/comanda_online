function formatarDinheiro(valor) {
    // Converte o valor para string
    let valorStr = valor.toString();

    // Substitui o ponto por vírgula
    valorStr = valorStr.replace(',', '.');

    return valorStr;
}