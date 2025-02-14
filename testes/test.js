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