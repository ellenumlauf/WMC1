const SPIELFELD_KLASSE = "spielfeld";
const SPIELANZEIGE_KLASSE = "spielanzeige";
const FELD_KLASSE = "feld";
const KREIS_KLASSE = "kreis";
const KREUZ_KLASSE = "kreuz";

const scoreOverlay = document.getElementById("scoreOverlay");

const startForm = document.getElementById("StartTicForm");

let spielerKreuz;
let spielerKreis;
let spielNr = 1;

function zeigeStartscreen() {

    setStatsVisible(false);

    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";

    document.getElementById("startscreen").style.display = "flex";
}

function starteSpiel() {


    document.getElementById("startscreen").style.display = "flex";

    spielerKreuz = document.getElementById("player1").value.trim();
    spielerKreis = document.getElementById("player2").value.trim();

    if (!spielerKreuz) spielerKreuz = "Spieler 1";
    if (!spielerKreis) spielerKreis = "Spieler 2";

    document.getElementById("startscreen").style.display = "none";

    spielStarten();
}

startForm.addEventListener("submit", function(event) {
    event.preventDefault();
    starteSpiel();
});


/* markiert die drei felder in einer Reihe, die gewonnen haben*/
const GEWINNER_KLASSE = "gewinnerKlasse";

const OVERLAY_KLASSE = "overlay";
const OVERLAY_TEXT_KLASSE = "overlay-text";
const OVERLAY_BUTTON1_KLASSE = "overlay-button1";
const OVERLAY_BUTTON2_KLASSE = "overlay-button2";
const OVERLAY_BUTTON3_KLASSE = "overlay-button3";
const OVERLAY_BUTTON4_KLASSE = "overlay-button4";
const SICHTBAR_KLASSE = "sichtbar";

const UNSICHTBAR_KLASSE = "unsichtbar";

/* wählt das erste Element aus, das gefunden wird */
const spielfeld = document.querySelector("." + SPIELFELD_KLASSE);
const spielanzeige = document.querySelector("." + SPIELANZEIGE_KLASSE);

/* holt die Referenzen auf das overlay selbst auf den overlayText und auf den overlayButton über eine Konstante */
const overlay = document.querySelector("." + OVERLAY_KLASSE);
const overlayText = document.querySelector("." + OVERLAY_TEXT_KLASSE);
const overlayButton1 = document.querySelector("." + OVERLAY_BUTTON1_KLASSE);
const overlayButton2 = document.querySelector("." + OVERLAY_BUTTON2_KLASSE);
const overlayButton3 = document.querySelector("." + OVERLAY_BUTTON3_KLASSE);
const overlayButton4 = document.querySelector("." + OVERLAY_BUTTON4_KLASSE);

/* gibt Liste aller HTML Elemente zurück auf die die Sucheigenschaft passt*/
const felder = document.querySelectorAll("." + FELD_KLASSE);

const SIEG_KOMBINATIONEN = [
    [felder[0], felder[1], felder[2]],
    [felder[3], felder[4], felder[5]],
    [felder[6], felder[7], felder[8]],
    [felder[0], felder[3], felder[6]],
    [felder[1], felder[4], felder[7]],
    [felder[2], felder[5], felder[8]],
    [felder[0], felder[4], felder[8]],
    [felder[2], felder[4], felder[6]],
];

/* wer ist am Zug, ist noch nicht initialisiert, bekommt Wert erst während des Spiels, ändert sich ständig */
let aktuelleKlasse;

overlayButton1.addEventListener("click", spielStarten);
overlayButton2.addEventListener("click", zeigeStartscreen);

overlayButton3.addEventListener("click", function () {
    setStatsVisible(scoreOverlay.classList.contains("unsichtbar"));
});

overlayButton4.addEventListener("click", function () {
    const tbody = document.querySelector("#scoreTable tbody");
    tbody.innerHTML = "";
    spielNr = 1;
});


spielStarten();

function setStatsVisible(visible) {
    scoreOverlay.classList.toggle("unsichtbar", !visible);
    overlayButton3.innerText = visible ? "Hide Stats" : "Show Stats";
};

function spielStarten() {

    setStatsVisible(false);

    overlay.classList.remove(SICHTBAR_KLASSE);
    spielanzeige.classList.remove(UNSICHTBAR_KLASSE);
    overlayText.classList.remove(KREUZ_KLASSE, KREIS_KLASSE);

    aktuelleKlasse = null;
    for(const feld of felder) {
        feld.classList.remove(KREIS_KLASSE, KREUZ_KLASSE,GEWINNER_KLASSE);
        feld.disabled = false;

        feld.addEventListener("click", klickVerarbeiten);
    }

    zugBeenden();
}

function klickVerarbeiten(ereignis) {
    const feld = ereignis.target;

    if(spielsteinSetzen(feld) === true) {
        zugBeenden();
    }
}

function spielsteinSetzen(feld) {
    if(feld.classList.contains(KREIS_KLASSE) || feld.classList.contains(KREUZ_KLASSE)) {
        return false;
    }
    feld.classList.add(aktuelleKlasse);
    // deaktiviert den button
    feld.disabled = true;
    // spielstein wurde erfolgreich gesetzt
    return true;
}

function zugBeenden() {
    // prüfen, ob der aktuelle Spieler gewonnen hat bevor zum anderen Spieler gewechselt wird
    if(siegPruefen() === true) {
        spielBeenden(false);
        return;
    }

    // liegt ein Unentschieden vor?
    if (unentschiedenPruefen() === true) {
        spielBeenden(true);
        return;
    }

    if(aktuelleKlasse === KREUZ_KLASSE) {
        aktuelleKlasse = KREIS_KLASSE;
    } else if(aktuelleKlasse === KREIS_KLASSE) {
        aktuelleKlasse = KREUZ_KLASSE;
    } else {
        aktuelleKlasse = Math.random() < 0.5 ? KREUZ_KLASSE : KREIS_KLASSE;
    }

    spielanzeigeAktualisieren();
}

function spielanzeigeAktualisieren() {

    spielanzeige.classList.remove(KREUZ_KLASSE, KREIS_KLASSE);
    spielanzeige.classList.add(aktuelleKlasse);

    if(aktuelleKlasse === KREUZ_KLASSE) {
        spielanzeige.innerText = spielerKreuz + " (Kreuz) ist dran.";
    } else {
        spielanzeige.innerText = spielerKreis + " (Kreis) ist dran.";
    }
}

function siegPruefen() {
    let count = 0;
    for(const kombination of SIEG_KOMBINATIONEN) {
        count++;
        const gewonnen = kombination.every(function (feld) {
            return feld.classList.contains(aktuelleKlasse);
        });

        if(gewonnen === true) {
            const gelbgemacht = SIEG_KOMBINATIONEN[count-1].every(function (feld) {
                feld.classList.add(GEWINNER_KLASSE);
                return feld.classList.contains(GEWINNER_KLASSE);
            });
            return true;
        }
    }
    return false;
}

function spielBeenden(unentschieden) {
    if(unentschieden === true) {
        overlayText.innerText = "Draw";
        addToScoreTable("Draw");
    } else if (aktuelleKlasse === KREUZ_KLASSE) {
        
        // nachricht wer gewonnen hat im overlay text, hänge in classList die Spielerklasse an, damit ich d. Nachricht mit richtiger Farbe einfärben kann
        overlayText.innerText = spielerKreuz + " (Kreuz) won!";
        overlayText.classList.add(KREUZ_KLASSE);
        addToScoreTable(spielerKreuz + " won");
    } else {
        overlayText.innerText = spielerKreis + " (Kreis) won!";
        overlayText.classList.add(KREIS_KLASSE);
        addToScoreTable(spielerKreis + " won");
    }
  
    overlay.classList.add(SICHTBAR_KLASSE);
    spielanzeige.classList.add(UNSICHTBAR_KLASSE);  // will die Anzeige am Schluss des Spiels verschwinden lassen

    setStatsVisible(true);
}

function unentschiedenPruefen() {
    // wird nur aufgerufen, wenn keiner der beiden Spieler gewonnen hat
    // alle Felder werden durchgegangen und ueberprueft, ob sie nicht bereits besetzt sind (von Kreis oder Kreuz)
    for(const feld of felder) {
        if (!feld.classList.contains(KREIS_KLASSE) && !feld.classList.contains(KREUZ_KLASSE)) {
            return false;
        }
    }
    return true;
}


function addToScoreTable(resultText) {
    const tbody = document.querySelector("#scoreTable tbody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${spielNr}</td>
        <td>${spielerKreuz}</td>
        <td>${spielerKreis}</td>
        <td>${resultText}</td>
    `;

    tbody.appendChild(row);

    spielNr++;
}