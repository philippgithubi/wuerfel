let box = document.querySelector('.box');
// const color = ['#aa164a', '#232c37', '#0f7987', '#004c76', '#5e7349', '#964f52']; //Farben vom Würfel
const color = ['green', 'gold', 'darkred', 'grey', 'blue', 'darkorange'];
const directions = ['front', 'back', 'left', 'right', 'top', 'bottom'];
const MAX_ROTATION_SPEED = 0.2;  // Dies ist die maximale Geschwindigkeit in Grad pro Frame

const cubeText = [
    "Datencenter Rechnungswesen",
    "Datencenter Lohn",
    "Kommunikationscenter",
    "Jahresabschluss - Beratungscenter",
    "Premium-Beratungscenter",
    "Kanzlei im Blick"
];
const cubeText2 = [
    "Datencenter Rechnungswesen",
    "Datencenter Lohn",
    "Arbeitgeber-Monitoring",
    "Erfolgsmonitoring",
    "Kommunikationscenter",
    "Firmengruppen im Blick"
];

const BeschreibungDatencenterRechnungswesen =  `
<ul>
    <li>BWA/ Ergebnisreporting</li>
    <li>Kontennachweis</li>
    <li>Dashboard</li>
    <li>Kontenbuchungen im Detail</li>
    <li>Offene Posten</li>
    <li>Liquiditätsauswertungen</li>
    <li>Reports</li>
    <li>KPIs</li>
    <li>BP-Checks wie Geschenkeliste, fehlende Belege, Fragen</li>
</ul>
`;
const BeschreibungDatencenterLohn =  `
<ul>
    <li>Lohnjournal</li>
    <li>Detailanalysen Mitarbeiter - interaktiver Lohnzettel</li>
    <li>Lohnreport</li>
    <li>Personalreport (mit Fibu-daten)</li>
    <li>Mitarbeiter-Geburtstage</li>
    <li>Stundensatz-Indikatoren</li>
    <li>Mitarbeiter-Wertschöpfung</li>
    <li>Lohn-KPIs</li>
    <li>Lohnartennachweise</li>
</ul>
`;

const BeschreibungKommunikationscenter =  `
<ul>
    <li>Deeplinks</li>
    <li>Chats & Notizen</li>
    <li>News</li>
    <li>Lohnmeldecenter mit integrierten Lohnkonverter</li>
    <li>Mitarbeiter-Fragebögen Neueinstellungen interaktiv</li>
    <li>Maßnahmenüberwachung</li>
    <li>Geburtstage & Terminerinnerungen</li>
    <li>Steuerzahlungstermine</li>
    <li>Archiv für Dokumente z.B. Bilanzen, Steuererklärungen, Bescheide</li>
</ul>
`;

const BeschreibungJahresabschlussBeratungscenter =  `
<ul>
    <li>Bilanzbericht</li>
    <li>Zeitraumanalysen</li>
    <li>Unternehmenszeugnis</li>
    <li>Steuerzahlungskalender</li>
    <li>Maßnahmenplan</li>
    <li>Unternehmensplanung</li>
    <li>Kanzlei-Logbuch Big Points </li>
</ul>
`;
const BeschreibungPremiumBeratungscenter =  `
<ul>
    <li>Alles aus JAB-Beratung</li>
    <li>EFQM-Check</li>
    <li>StarUG-Frühwarnsystem</li>
    <li>ProfitCenter-Auswertungen</li>
    <li>Lohnplanungen</li>
    <li>Lohnanalysen & Bereichsauswertungen</li>
    <li>Vertragswächter & Kanzlei-IKS</li>
    <li>Kommentierter Erfolgsreport</li>
    <li>Stundensatzberechnung</li>
</ul>
`;
const BeschreibungKanzleiimBlick =  `
<ul>
    <li>Mandanten-Dashboard</li>
    <li>StaRUG-Risiko-Heatmap </li>
    <li>Bearbeitungsstände </li>
    <li>Nutzerstatistiken CT Mandanten & Mitarbeiter </li>
    <li>KPIs mandantenübergreifend </li>
    <li>Controlingübersicht kanzleiweit </li>
    <li>Lohnübersicht kanzleiweit </li>
    <li>Filteroptionen nach eignen Kriterien für Kanzlei</li>
    <li>Favoriten und tag-Funktionen </li>
</ul>
`;

let isKeyDown = false;
let angleX = 0;
let angleY = 0;
let isRotating = true;
let startX = 0;
let startY = 0;


function restartRotationAfterDelay() {
    setTimeout(() => {
        isRotating = true;
        autoRotate();
    }, 500);  // Wartet 0,5 Sekunden (500 Millisekunden) bevor der Würfel sich wieder zu drehen beginnt
}
function autoRotate() {
    if (isRotating) {
        angleX += MAX_ROTATION_SPEED;
        angleY += MAX_ROTATION_SPEED;
        box.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        requestAnimationFrame(autoRotate);
        updateDescriptionText(angleX, angleY);
    }
}


for (var i of directions) {
    let direction = document.createElement('div');
    box.appendChild(direction);
    direction.classList.add(i,'side');
    direction.setAttribute('style', `--clr:${color[directions.indexOf(i)]}`);

    for (let j = 0; j < 9; j++) {
        let span = document.createElement('span');
        if (j == 4) {  
            span.textContent = cubeText[directions.indexOf(i)];
        } else {
            span.innerHTML = "&nbsp;"; // Nicht zerstörender Raum, um die Größe beizubehalten
        }
        direction.appendChild(span);
    }
}

box.addEventListener('mousedown', function (e) {
    e.preventDefault(); 
    isRotating = false; 
    isKeyDown = true;
    
    startX = e.clientX;
    startY = e.clientY;
});

autoRotate();
updateDescriptionText(angleX, angleY);


document.documentElement.addEventListener('mouseup', function (e) {
    isKeyDown = false;
    restartRotationAfterDelay();
});

document.documentElement.addEventListener('mousemove', function (e) {
    if (isKeyDown) {
        rotateCube(e.clientX, e.clientY);
    }
});


// ... [Der Rest Ihres Skripts bleibt unverändert bis zur rotateCube-Funktion]


function rotateCube(x, y) {
    let deltaX = (x - startX) / 6; // Geschwindigkeit beim Drehen mit der Maus
    let deltaY = (y - startY) / 6;

    angleX += deltaY;
    angleY += deltaX;

    box.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;

    // Aktualisieren Sie die Startwerte für das nächste Mal, wenn diese Funktion aufgerufen wird
    startX = x;
    startY = y;

    updateDescriptionText(angleX, angleY);

    updateZIndices();
}


function updateZIndexes() {
    // Dies ist eine grobe Überprüfung. Sie könnten dies verfeinern, um genauer zu bestimmen, welche Seite des Würfels sichtbar ist.
    if (angleX % 360 > 45 && angleX % 360 < 135) {
        // Oberseite des Würfels ist sichtbar
        document.querySelector('.top').style.zIndex = 6;
    } else if (angleX % 360 > 225 && angleX % 360 < 315) {
        // Unterseite des Würfels ist sichtbar
        document.querySelector('.bottom').style.zIndex = 6;
    } else {
        document.querySelector('.top').style.zIndex = 3;
        document.querySelector('.bottom').style.zIndex = 3;
    }
}



function updateDescriptionText(rotateX, rotateY) {
    let currentRotateY = (rotateY % 360 + 360) % 360;  // Erstelle immer einen positiven Wert
    let currentRotateX = (rotateX % 360 + 360) % 360;  // Erstelle immer einen positiven Wert


        if (currentRotateX > 45 && currentRotateX <= 135) {
            document.getElementById('descriptionText').innerHTML = BeschreibungKanzleiimBlick;
            return;
        } else if (currentRotateX > 225 && currentRotateX <= 315) {
            document.getElementById('descriptionText').innerHTML = BeschreibungPremiumBeratungscenter;
            return;
        }
    
        // Würfel steht aufrecht
        if ((currentRotateX >= 0 && currentRotateX <= 45) || (currentRotateX >= 315 && currentRotateX < 360)) {
            if (currentRotateY <= 45 || currentRotateY > 315) {
                document.getElementById('descriptionText').innerHTML = BeschreibungDatencenterRechnungswesen;
            } else if (currentRotateY > 45 && currentRotateY <= 135) {
                document.getElementById('descriptionText').innerHTML = BeschreibungKommunikationscenter;
            } else if (currentRotateY > 135 && currentRotateY <= 225) {
                document.getElementById('descriptionText').innerHTML = BeschreibungDatencenterLohn;
            } else {
                document.getElementById('descriptionText').innerHTML = BeschreibungJahresabschlussBeratungscenter;
            }
        }
    
        // Würfel steht auf dem Kopf
        if (currentRotateX > 135 && currentRotateX < 225) {
            if (currentRotateY <= 45 || currentRotateY > 315) {
                document.getElementById('descriptionText').innerHTML = BeschreibungDatencenterLohn;
            } else if (currentRotateY > 45 && currentRotateY <= 135) {
                document.getElementById('descriptionText').innerHTML = BeschreibungJahresabschlussBeratungscenter;
            } else if (currentRotateY > 135 && currentRotateY <= 225) {
                document.getElementById('descriptionText').innerHTML = BeschreibungDatencenterRechnungswesen;
            } else {
                document.getElementById('descriptionText').innerHTML = BeschreibungKommunikationscenter;
            }
        }

}


// PopUp
// ... [Der restliche Code bleibt unverändert]

document.addEventListener('DOMContentLoaded', function() {
    const sides = document.querySelectorAll('.box div');
    let timeout;

    function removeAllPopupsExcept(current) {
        sides.forEach(s => {
            if (s !== current) {
                s.querySelector('span:nth-child(5)').classList.remove('text-popup');
            }
        });
    }

    sides.forEach(side => {
        side.addEventListener('mouseover', function(e) {
            clearTimeout(timeout); // Löscht bestehenden Timeout
            removeAllPopupsExcept(e.currentTarget); // Entfernt alle Popups außer dem aktuellen
            const middleSpan = e.currentTarget.querySelector('span:nth-child(5)');
            if (isElementInViewport(middleSpan)) {
                middleSpan.classList.add('text-popup');
            }
        });

        side.addEventListener('mouseout', function(e) {
            const middleSpan = e.currentTarget.querySelector('span:nth-child(5)');
            timeout = setTimeout(() => { // Startet einen Timeout
                middleSpan.classList.remove('text-popup');
            }, 100); // Wartet 10 Sekunden (10000 Millisekunden)
        });
    });
});




// Diese Funktion überprüft, ob ein Element im Viewport sichtbar ist
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.querySelectorAll('.side').forEach(side => {
    side.addEventListener('mouseover', function(e) {
        const sideClass = e.currentTarget.classList[1]; // z.B. "front", "back", usw.
        const color = getComputedStyle(e.currentTarget).getPropertyValue('--clr'); // Holt die Hintergrundfarbe der Würfelseite

        // Farbe für die kleinen Vierecke setzen
        e.currentTarget.querySelectorAll('span').forEach(span => {
            span.style.backgroundColor = color;
        });
    });

    // Beim Verlassen der Würfelseite, die Farbe der Vierecke zurücksetzen
    side.addEventListener('mouseout', function(e) {
        e.currentTarget.querySelectorAll('span').forEach(span => {
            span.style.backgroundColor = ''; // Farbe zurücksetzen
        });
    });
});

// Erstes Update der Beschreibung beim Laden
updateDescriptionText(angleX, angleY);

