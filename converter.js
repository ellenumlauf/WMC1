document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript funktioniert!");
});

const form = document.getElementById("converterForm");
const systemSelect = document.getElementById("systemSelect");
const numberInput = document.getElementById("numberInput");
const output = document.getElementById("output");

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

function otherToDecimal(numberStr, baseType) {
    let [intPart="", fracPart = ""]= "";
    let base = 1;
    if (baseType === "octal") {
        if (!/^[01234567]+(\.[01234567]+)?$/.test(numberStr)) return "Invalid octal number";
        [intPart, fracPart = ""] = numberStr.split(".");
        base = 8;
    }
    else if (baseType === "binary"){
        if (!/^[01]+(\.[01]+)?$/.test(numberStr)) return "Invalid binary number";
        [intPart, fracPart = ""] = numberStr.split(".");
        base = 2;
    }
    else if (baseType === "hexadecimal"){
        if ((!/^[0123456789ABCDEF]+(\.[0123456789ABCDEF]+)?$/.test(numberStr)) || (!/^[0123456789abcdef]+(\.[0123456789abcdef]+)?$/.test(numberStr))) return "Invalid hexadecimal number";
        [intPart, fracPart = ""] = numberStr.split(".");
        base = 16;
    }
    const integer = parseInt(intPart, base);
    let fraction = 0;
    for (let i = 0; i < fracPart.length; i++) {
        fraction += parseInt(fracPart[i], 10) / Math.pow(base, i + 1);
    }
    return integer + fraction;
}

// Event Listener für Submit
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Formular nicht abschicken

    // Variablen speichern
    const selectedSystemInput = systemSelectInput.value;
    const selectedSystemOutput = systemSelectOutput.value;
    const inputNumber = numberInput.value.trim();

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
        console.log(result1);
        console.log(typeof result1);
        if(typeof result1 === "string") {
            output.textContent =  `${selectedSystemInput} → ${selectedSystemOutput}: ${result1}`;
        } else {
            let test = String(result1);
            console.log(typeof test);
            result = decimalToBase(String(result1), selectedSystemOutput);
            output.textContent =  `${selectedSystemInput} → ${selectedSystemOutput}: ${result}`;
        }
    } else {
        output.textContent = "Please select a valid input type";
    }
    /*output.textContent =  `${selectedSystemInput} → ${selectedSystemOutput}: ${result}`;*/
});

// Reset: Ausgabe leeren
form.addEventListener("reset", function() {
    output.textContent = "";
});
document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript funktioniert!");
});