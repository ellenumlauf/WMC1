document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript funktioniert!");
});

const form = document.getElementById("converterForm");
const systemSelect = document.getElementById("systemSelect");
const numberInput = document.getElementById("numberInput");
const output = document.getElementById("output");
//CHECK DIESE 4 CONST!!!
// Hilfsfunktion: convert Decimal to base 2, 8, or 16; Binary, Octal or Hexadecimal number
// baseType is String, defines which conversion
function decimalToBase(decimalStr, baseType) {
    const num = parseFloat(decimalStr);
    if (isNaN(num)) {
        return "Invalid decimal number";
    }

    // Unterstützte Zahlensysteme
    const bases = {
        binary: 2,
        decimal: 10,
        octal: 8,
        hexadecimal: 16
    };

    const base = bases[baseType.toLowerCase()];

    if (!base) {
        return "Invalid base type. Use 'binary', 'octal' 'decimal' or 'hexadecimal'.";
    }

    const integerPart = Math.floor(num);
    let fractionalPart = num - integerPart;

    // Ganzzahlanteil umwandeln
    let convertedInt = integerPart.toString(base).toUpperCase();
    console.log(convertedInt);

    // Falls keine Nachkommastellen vorhanden sind
    if (fractionalPart === 0) {
        return convertedInt;
    }

    // Zeichen für Hexadezimalzahlen
    const digits = "0123456789ABCDEF";

    let convertedFrac = '';
    let count = 0;

    // Nachkommateil umwandeln (max. 16 Stellen)
    while (fractionalPart > 0 && count < 16) {
        fractionalPart *= base;

        const digit = Math.floor(fractionalPart);
        convertedFrac += digits[digit];

        fractionalPart -= digit;
        count++;
    }
    console.log(convertedInt);
    return `${convertedInt}.${convertedFrac}`;
}
/*
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
*/
// Hilfsfunktion: other -> Dezimal
function otherToDecimal(numberStr, baseType) {
    let [intPart="", fracPart = ""]= "";
    let base = 1;
    if (baseType === "octal") {
        if (!/^[01234567]+(\.[01234567]+)?$/.test(numberStr)) return "Invalid octal number";
        [intPart, fracPart = ""] = numberStr.split(".");
        base = 8;
        //const integer = parseInt(intPart, 8);
    }
    else if (baseType === "binary"){
        if (!/^[01]+(\.[01]+)?$/.test(numberStr)) return "Invalid binary number";
        [intPart, fracPart = ""] = numberStr.split(".");
        base = 2;
        //const integer = parseInt(intPart, 2);
    }
    else if (baseType === "hexadecimal"){
        if ((!/^[0123456789ABCDEF]+(\.[0123456789ABCDEF]+)?$/.test(numberStr)) || (!/^[0123456789abcdef]+(\.[0123456789abcdef]+)?$/.test(octalStr))) return "Invalid binary number";
        [intPart, fracPart = ""] = numberStr.split(".");
        base = 16;
    }
    console.log(intPart);
    const integer = parseInt(intPart, base);
    console.log(integer);
    let fraction = 0;
    for (let i = 0; i < fracPart.length; i++) {
        fraction += parseInt(fracPart[i], 10) / Math.pow(base, i + 1);
    }

    return integer + fraction;
}

// Hilfsfunktion: Octal -> Dezimal
function octalToDecimal(octalStr) {
    if (!/^[01234567]+(\.[01234567]+)?$/.test(octalStr)) return "Invalid octal number";

    const [intPart, fracPart = ""] = octalStr.split(".");
    const integer = parseInt(intPart, 8);

    let fraction = 0;
    for (let i = 0; i < fracPart.length; i++) {
        fraction += parseInt(fracPart[i], 10) / Math.pow(8, i + 1);
    }

    return integer + fraction;
}

function HexadecimalToDecimal(hexadecimalStr, targetOutput) {
    if ((!/^[0123456789ABCDEF]+(\.[0123456789ABCDEF]+)?$/.test(octalStr)) || (!/^[0123456789abcdef]+(\.[0123456789abcdef]+)?$/.test(octalStr))) return "Invalid octal number";

    const [intPart, fracPart = ""] = hexadecimalStr.split(".");
    const integer = parseInt(intPart, 16);

    let fraction = 0;
    for (let i = 0; i < fracPart.length; i++) {
        fraction += parseInt(fracPart[i], 10) / Math.pow(16, i + 1);
    }

    return integer + fraction;
}

// Event Listener für Submit
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Formular nicht abschicken

    // Variablen speichern
    const selectedSystemInput = systemSelectInput.value; // "binary", "octal", "decimal" or "hexadecimal"
    const selectedSystemOutput = systemSelectOutput.value; // as input
    const inputNumber = numberInput.value.trim(); // Text der Zahl

    // Umrechnungsfunktion wird aufgerufen
    let result;
    if (selectedSystemInput === "decimal") {
        result = decimalToBase(inputNumber, selectedSystemOutput);
        output.textContent =  `${selectedSystemInput} → ${selectedSystemOutput}: ${result}`;
    } else if (selectedSystemOutput === "decimal") {
        result = otherToDecimal(inputNumber, selectedSystemInput);
        output.textContent =  `${selectedSystemInput} → ${selectedSystemOutput}: ${result}`;
    } else if (selectedSystemInput !== "decimal" && selectedSystemOutput !== "decimal") {
        result1 = otherToDecimal(inputNumber, selectedSystemInput);
        result = decimalToBase(result1, selectedSystemOutput);
    } else {
        output.textContent = "Please select a valid input type";
    }
    output.textContent =  `${selectedSystemInput} → ${selectedSystemOutput}: ${result}`;
});

// Reset: Ausgabe leeren
form.addEventListener("reset", function() {
    output.textContent = "";
});
document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript funktioniert!");
});