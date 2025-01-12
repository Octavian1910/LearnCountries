let name,capital,details,SideNav,SideNav2,play,question,playMode,playModeCountry,playModeAnswer,countries;
let previousSelectedCountries = [];
let Europe = [];
let Asia = [];
let Africa = [];
let Americas = [];
let Antarctica = []; 
let Australia = [];
let paragraph=document.createElement("p");
let imgElement=document.createElement('img');

const selectedContinent = {
    isAfrica: false,
    isAsia: false,
    isEurope: false,
    isAmericas: false,
    isAustralia: false,
    isAntarctica: false,
};



async function fetchCountries() {
    const url = 'https://restcountries.com/v3.1/all'; // REST Countries endpoint
    try {
        const response = await fetch(url);
        const countries = await response.json();
        console.log(countries);
        console.log('Succesfully fetched!');
        return countries.map(country => ({
            id: country.cca2.toUpperCase(), 
            name: country.name.common,
            capital: country.capital ? country.capital[0] : "No capital",
            region : country.region,
            flags : country.flags.png,
            details: `Located in ${country.region}`,
            area: country.area, 
            language: country.languages ? Object.values(country.languages).join(', ') : "No languages listed",
            
        }));
        
    } catch (error) {
        console.error('Failed to fetch countries:', error);
    }
}





window.onload = async () => {

   

    EuropeButton=document.getElementById("Europe");  
    AsiaButton=document.getElementById("Asia");;
    AfricaButton=document.getElementById("Africa");
    AmericasButton=document.getElementById("Americas");
    AustraliaButton=document.getElementById("Australia");
    AntarcticaButton=document.getElementById("Antarctica");

    
    SideNav = document.getElementById("mySidenav");
    SideNav2 = document.getElementById("mySidenav2");
    menu=document.getElementById("menu");
    question=document.getElementById("question");



    countries = await fetchCountries();
    console.log(countries.length);
    countries.forEach(country => {
       // console.log(country.id+' '+country.name+' '+country.region);
        const element = document.getElementById(country.id);
        if (element) 
          {
            //element.classList.add('hoverEffect');
            element.addEventListener("click", () =>  displayCountryDetails(country));

            switch (country.region) {
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
              case "Oceania":
                  Australia.push(element);
                  break;
              case "Antarctica": 
                  Antarctica.push(element);
                  break;
              default:       
                  console.log("Region not recognized or not applicable for this list:", country.region);
                  break;
          }


        }
    });



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


function toggleOffContinentClass(continentArray, className) {
    toggleContinentClass(Antarctica, 'Antarctica1', false);
    toggleContinentClass(Australia, 'Australia1', false);
    toggleContinentClass(Americas, 'Americas1', false);
    toggleContinentClass(Africa, 'Africa1', false);
    toggleContinentClass(Asia, 'Asia1', false);
    toggleContinentClass(Europe, 'Europe1', false);
}


EuropeButton.addEventListener("change", function() {
    toggleContinentClass(Europe, 'Europe1', this.checked);
    selectedContinent["isEurope"] = this.checked;
});

AsiaButton.addEventListener("change", function() {
    toggleContinentClass(Asia, 'Asia1', this.checked);
    selectedContinent["isAsia"] = this.checked;
});

AfricaButton.addEventListener("change", function() {
    toggleContinentClass(Africa, 'Africa1', this.checked);
    selectedContinent["isAfrica"] = this.checked;
});

AmericasButton.addEventListener("change", function() {
    toggleContinentClass(Americas, 'Americas1', this.checked);
    selectedContinent["isAmericas"] = this.checked;
});

AustraliaButton.addEventListener("change", function() {
    toggleContinentClass(Australia, 'Australia1', this.checked);
    selectedContinent["isAustralia"] = this.checked;
});

AntarcticaButton.addEventListener("change", function() {
    toggleContinentClass(Antarctica, 'Antarctica1', this.checked);
    selectedContinent["isAntarctica"] = this.checked;
});


hamburgerButton=document.getElementById("hamburger-button");
hamburgerButton.addEventListener("click", toggleMenu);
function toggleMenu() {
    var menu = document.getElementById("menu1");
    if (menu.style.display === "block") {  ///closed
        menu.style.display = "none";
        toggleOffContinentClass();
        
    } else {  ///opened
        menu.style.display = "block";
        for (const continent in selectedContinent) {
            if(selectedContinent[continent])
            {
                switch (continent) {
                    case "isEurope":
                        toggleContinentClass(Europe, 'Europe1',true);
                        break;
                    case "isAsia":
                        toggleContinentClass(Asia, 'Asia1',true);
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
                    case "isAntarctic":
                        toggleContinentClass(Antarctic, 'Antarctica1', true); 
                        break;
                    default:       
                        console.log("Region not recognized or not applicable for this list:", continent );
                        break;
                }
            }
                        
        }
        

    }
}

function somethingIsSelected()
{
    for (const continent in selectedContinent) {
        if (selectedContinent[continent]) {
            return true;
        }
    }
    return false;
}

  
playButton=document.getElementById("play");
playText=document.getElementById("play_text"); 

playButton.addEventListener("click",    () =>  {

    playMode=1;
    toggleOffContinentClass();

    ///trying to find a country which is selected
    let itsok=false;
    if(somethingIsSelected()==true)
    {
        let randomIndex = Math.floor(Math.random() * countries.length);
        while(itsok==false)
        {
            randomIndex = Math.floor(Math.random() * countries.length) ;
            if(selectedContinent["is"+countries[randomIndex].region]==true && countries[randomIndex].area>20000 )
                itsok=true;
        

        }
        console.log(countries[randomIndex].name+'-'+("is"+countries[randomIndex].region));
        playText.textContent = "Select " + countries[randomIndex].name;
        playModeCountry=countries[randomIndex].name;
        playModeAnswer=countries[randomIndex];
        
    }
    else console.log("Select atleast one continent;")


    ///remove previous game
    previousSelectedCountries.forEach(el => {
        el.classList.remove("correctAnswer");
        el.classList.remove("wrongAnswer");
    });
    closeNav()

    

});


};


     function displayCountryDetails(country) {
        const { name, capital, details , language } = country;
        //console.log(country.flags);
        imgElement.src = country.flags;
        imgElement.width = 350; //  in pixels
        imgElement.height = 200; //  in pixels
        paragraph.textContent="";
        paragraph.innerHTML = `${name} - ${capital} - ${details} <br> Spoken languages: ${language}`;
        SideNav.appendChild(paragraph);
        SideNav.appendChild(imgElement);


        if(!playMode)
        {
            openNav();
        }
        else
        {
            let choosedCountry=document.getElementById(country.id);
            if(playModeCountry==name)
            {
                playText.textContent = "🎉 Correct Answer 🎉";
                choosedCountry.classList.add("correctAnswer");
                openNav();
                previousSelectedCountries.push(choosedCountry);

            }
            else
            {
                playText.textContent = "🫠 Wrong Answer 🫠";
                choosedCountry.classList.add("wrongAnswer");
                let correctCountry=document.getElementById(playModeAnswer.id);
                correctCountry.classList.add("correctAnswer");
                openNav();
                previousSelectedCountries.push(choosedCountry,correctCountry);
            }
        }
     
  }



  function openNav() {
    SideNav.style.width = "350px";
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    SideNav.style.width = "0";
  }

