function muunna(roomalainen) {

    viesti("");
    roomalainen = roomalainen.toUpperCase();

    let numerot = {
        "I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000
    };

    let edellinen, nyt;
    let samoja = temp = tulos = 0;

    //Käydään läpi roomalainen numero 
    for (let i in roomalainen) {

        nyt = numerot[roomalainen[i]]

        if (!nyt) { //Väärä merkki
            viesti("Syöte saa sisältää vain merkkejä IVXLCDM.", "red")
            return;
        }

        if (edellinen < nyt) { //Vain tietyt luvut voi vähentää toisistaan
            if (temp == 1 & [5, 10].includes(nyt) |
                temp == 10 & [50, 100].includes(nyt) |
                temp == 100 & [500, 1000].includes(nyt)) {
                tulos += nyt - temp;
                temp = 0;
                samoja = 0;
            } else {
                viesti("Numeroa ei ole olemassa.", "red");
                return;
            }
        } else if (edellinen > nyt) {
            tulos += temp;
            temp = nyt;
            samoja = 0;
        } else {
            samoja++;
            if (samoja > 3) { //Liian monta samaa peräkkäin
                viesti("Syötteessä ei voi olla yli kolmea samaa merkkiä peräkkäin.", "red")
                return;
            } else if (samoja == 2 & [5, 50, 500].includes(nyt)) { //Ei voi olla kahta 5, 50 tai 500 peräkkäin
                viesti(`Numero ${roomalainen[i]} ei voi olla kahta kertaa peräkkäin.`, "red")
                return;
            }
            temp += nyt;
        }
        edellinen = nyt;
    }
    tulos += temp;
    viesti("Muunnettu: " + tulos)
    return;
}

function viesti(viesti, vari = "black") {
    document.getElementById("viesti").innerHTML = `<p id="virhe" class="viesti" style="color:${vari};">${viesti}</p>`
}