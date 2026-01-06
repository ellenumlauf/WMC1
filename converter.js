document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript funktioniert!");
});

const form = document.getElementById("converterForm");
const systemSelect = document.getElementById("systemSelect");
const numberInput = document.getElementById("numberInput");
const output = document.getElementById("output");

// Hilfsfunktion: Dezimal -> Binär
function decimalToBinary(decimalStr) {
    const num = parseFloat(decimalStr);
    if (isNaN(num)) return "Invalid decimal number";

    const integerPart = Math.floor(num);
    let fractionalPart = num - integerPart;

    let binaryInt = integerPart.toString(2);

    if (fractionalPart === 0) return binaryInt;

    let binaryFrac = '';
    let count = 0;
    while (fractionalPart > 0 && count < 16) { // max 16 Nachkommastellen
        fractionalPart *= 2;
        if (fractionalPart >= 1) {
            binaryFrac += '1';
            fractionalPart -= 1;
        } else {
            binaryFrac += '0';
        }
        count++;
    }

    return `${binaryInt}.${binaryFrac}`;
}

// Hilfsfunktion: Binär -> Dezimal
function binaryToDecimal(binaryStr) {
    if (!/^[01]+(\.[01]+)?$/.test(binaryStr)) return "Invalid binary number";

    const [intPart, fracPart = ""] = binaryStr.split(".");
    const integer = parseInt(intPart, 2);

    let fraction = 0;
    for (let i = 0; i < fracPart.length; i++) {
        fraction += parseInt(fracPart[i], 10) / Math.pow(2, i + 1);
    }

    return integer + fraction;
}

// Event Listener für Submit
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Formular nicht abschicken

    // Variablen speichern
    const selectedSystem = systemSelect.value; // "binary" oder "decimal"
    const inputNumber = numberInput.value.trim(); // Text der Zahl

    // Umrechnungsfunktion wird aufgerufen
    let result;
    if (selectedSystem === "decimal") {
        result = decimalToBinary(inputNumber);
        output.textContent = `Decimal → Binary: ${result}`;
    } else if (selectedSystem === "binary") {
        result = binaryToDecimal(inputNumber);
        output.textContent = `Binary → Decimal: ${result}`;
    } else {
        output.textContent = "Please select a valid input type";
    }
});

// Reset: Ausgabe leeren
form.addEventListener("reset", function() {
    output.textContent = "";
});
document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript funktioniert!");
});