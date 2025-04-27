let name, continent, details, SideNav, SideNav2, play, question, playMode, playModeCountry, playModeAnswer, countries;
let previousSelectedCountries = [];


//Vectori pentru repartizarea tarilor pe continente
let Europe = [];
let Asia = [];
let Africa = [];
let Americas = [];
let Antarctica = [];
let Australia = [];


let paragraph = document.createElement("p");
let imgElement = document.createElement('img');


//Pentru joc !
const selectedContinent = {
    isAfrica: false,
    isAsia: false,
    isEurope: false,
    isAmericas: false,
    isAustralia: false,
    isAntarctica: false,
};

async function fetchCountries() {
    const url = 'https://restcountries.com/v3.1/all';
    try {
        const response = await fetch(url);
        const countries = await response.json();

        return countries.map(country => ({
            id: country.cca2.toUpperCase(),
            name: country.name.common,
            capital: country.capital ? country.capital[0] : "Nu are capitala.",
            continent: country.region === "Oceania" ? "Australia" : country.region,
            flags: country.flags.png,
            area: country.area,
            language: country.languages ? Object.values(country.languages).join(', ') : "Nu s-au gasit limbi vorbite!",
        }));

    } catch (error) {
        console.error(error);
    }
}



window.onload = async () => {

    ///Butoane care transmit ce continente sunt utilizate în joc
    let EuropeButton = document.getElementById("Europe");
    let AsiaButton = document.getElementById("Asia");;
    let AfricaButton = document.getElementById("Africa");
    let AmericasButton = document.getElementById("Americas");
    let AustraliaButton = document.getElementById("Australia");
    let AntarcticaButton = document.getElementById("Antarctica");


    SideNav = document.getElementById("mySidenav");
    SideNav2 = document.getElementById("mySidenav2");
    menu = document.getElementById("menu");
    question = document.getElementById("question");


    //Repartizarea fiecarei tari in vectorul potrivit continentului
    countries = await fetchCountries();
    countries.forEach(country => {
        const element = document.getElementById(country.id);
        if (element) {
            element.addEventListener("click", () => displayCountryDetails(country));
            switch (country.continent) {
                case "Europe":
                    Europe.push(element);
                    break;
                case "Asia":
                    Asia.push(element);
                    break;
                case "Africa":
                    Africa.push(element);
                    break;
                case "Americas":
                    Americas.push(element);
                    break;
                case "Australia":
                    Australia.push(element);
                    break;
                case "Antarctica":
                    Antarctica.push(element);
                    break;
                default:
                    console.log("Nu s-a gasit continentul.", country.continent);
                    break;
            }
        }
    });


    //Activarea sau dezactivarea efectului de hover
    function toggleContinentClass(continentArray, className, isChecked) {
        if (isChecked) {

            continentArray.forEach(country => {
                country.classList.add(className);

            });
        } else {
            continentArray.forEach(country => {
                country.classList.remove(className);
            });
        }
    }


    //Adaugare/Scoatere efect de hover in functie de ce se selecteaza în meniu

    EuropeButton.addEventListener("change", function () {
        toggleContinentClass(Europe, 'Europe1', this.checked);
        selectedContinent["isEurope"] = this.checked;
    });

    AsiaButton.addEventListener("change", function () {
        toggleContinentClass(Asia, 'Asia1', this.checked);
        selectedContinent["isAsia"] = this.checked;
    });

    AfricaButton.addEventListener("change", function () {
        toggleContinentClass(Africa, 'Africa1', this.checked);
        selectedContinent["isAfrica"] = this.checked;
    });

    AmericasButton.addEventListener("change", function () {
        toggleContinentClass(Americas, 'Americas1', this.checked);
        selectedContinent["isAmericas"] = this.checked;
    });

    AustraliaButton.addEventListener("change", function () {
        toggleContinentClass(Australia, 'Australia1', this.checked);
        selectedContinent["isAustralia"] = this.checked;
    });

    AntarcticaButton.addEventListener("change", function () {
        toggleContinentClass(Antarctica, 'Antarctica1', this.checked);
        selectedContinent["isAntarctica"] = this.checked;
    });


    //In momentul in care se inchide meniul efectul de hover este dezactivat pentru fiecare continent
    function toggleOffContinentClass() {
        toggleContinentClass(Antarctica, 'Antarctica1', false);
        toggleContinentClass(Australia, 'Australia1', false);
        toggleContinentClass(Americas, 'Americas1', false);
        toggleContinentClass(Africa, 'Africa1', false);
        toggleContinentClass(Asia, 'Asia1', false);
        toggleContinentClass(Europe, 'Europe1', false);
    }


    //Meniul pentru selectarea continentelor din care vor fi alese tari
    hamburgerButton = document.getElementById("hamburger-button");
    hamburgerButton.addEventListener("click", toggleMenu);
    function toggleMenu() {
        var menu = document.getElementById("menu1");
        if (menu.style.display === "block") {  //Inchide meniul
            menu.style.display = "none";
            toggleOffContinentClass();

        } else {  //deschide meniul
            menu.style.display = "block";
            for (const continent in selectedContinent) {   ///pentru fiecare continent  care este selectat parcruge toate tarile care ii apartin și le adauga effectul de hover
                if (selectedContinent[continent]) {
                    switch (continent) {
                        case "isEurope":
                            toggleContinentClass(Europe, 'Europe1', true);
                            break;
                        case "isAsia":
                            toggleContinentClass(Asia, 'Asia1', true);
                            break;
                        case "isAfrica":
                            toggleContinentClass(Africa, 'Africa1', true);
                            break;
                        case "isAmericas":
                            toggleContinentClass(Americas, 'Americas1', true);
                            break;
                        case "isAustralia":
                            toggleContinentClass(Australia, 'Australia1', true);
                            break;
                        case "isAntarctica":
                            toggleContinentClass(Antarctica, 'Antarctica1', true);
                            break;
                        default:
                            console.log("Continentul nu a fost găsit!", continent);
                            break;
                    }
                }

            }


        }
    }

    //verifica daca este selectat macar un continent
    function somethingIsSelected() {
        for (const continent in selectedContinent) {
            if (selectedContinent[continent]) {
                return true;
            }
        }
        return false;
    }


    playButton = document.getElementById("play");
    playText = document.getElementById("play_text");

    playButton.addEventListener("click", () => {

        playMode = true;
        toggleOffContinentClass();

        ///Cautam o tara care apartine unui continent selectat
        let itsok = false;
        if (somethingIsSelected() == true) {
            while (itsok == false) {
                randomIndex = Math.floor(Math.random() * countries.length);
                if (selectedContinent["is" + countries[randomIndex].continent] == true && countries[randomIndex].area > 20000)
                    itsok = true;
            }

            playText.textContent = "🌎" + countries[randomIndex].name + "🌏";
            playModeCountry = countries[randomIndex].name;
            playModeAnswer = countries[randomIndex];

        }
        else playText.textContent = "Selectează măcar un continent!";


        //resetare efecte de hover pentru tarile alese la jocul precedent
        previousSelectedCountries.forEach(el => {
            el.classList.remove("correctAnswer");
            el.classList.remove("wrongAnswer");
        });
        closeNav()
    });


};


function displayCountryDetails(country) {

    ///Detalii care urmeaza sa fie afisate.
    const { name, capital, continent, language } = country;
    imgElement.src = country.flags;
    imgElement.width = 350;
    imgElement.height = 200;
    paragraph.textContent = "";
    paragraph.innerHTML = "Nume: " + name + "\n" +
        "Capitala: " + capital + "\n" +
        "Continent: " + continent + "\n" +
        "Limba: " + language;
    SideNav.appendChild(paragraph);
    SideNav.appendChild(imgElement);

    if (!playMode) {
        openNav();
    }
    else {
        let chosenCountry = document.getElementById(country.id);
        if (playModeCountry == name) {
            playText.textContent = "🎉 Răspuns corect! 🎉";
            chosenCountry.classList.add("correctAnswer");
            openNav();
            previousSelectedCountries.push(chosenCountry);
        } else {
            playText.textContent = "❌ Răspuns greșit! ❌";
            chosenCountry.classList.add("wrongAnswer");
            let correctCountry = document.getElementById(playModeAnswer.id);
            correctCountry.classList.add("correctAnswer");
            openNav();
            previousSelectedCountries.push(chosenCountry, correctCountry);
        }
    }  

}



//Deschidere si inchidere meniului care afiseaza detaliile despre tari
function openNav() {
    SideNav.style.width = "350px";
}

function closeNav() {
    SideNav.style.width = "0";
}

