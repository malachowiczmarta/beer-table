const API_URL = "https://api.punkapi.com/v2/beers/";
let beerId = '';


const getBeer = () => {
  fetch(`${API_URL}${beerId}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }else {
        let loader = document.querySelector('#loader');
        loader.classList.add("hide-loader"); 
        return response.json()
      }
      
    })
    .then((data) => {
      let beer = data[0];
      const {malt, hops, yeast} = beer.ingredients;
      displayBeerDetails(beer);
      createdHopsChart("Malt", malt);
      createdHopsChart("Hops", hops);
      createdHopsChart("Yeast", yeast);
    })
    .catch((error) => {
      console.log(error);
    });
};

const displayBeerDetails = (beer) => {
    const details = ["tagline", "description", "first_brewed", "abv", "ibu", "ebc", "food_pairing", "brewers_tips"];
    
    let beerName = document.getElementById("name");
    let beerNameHeader = document.createElement("h1");
    beerNameHeader.innerText = beer.name;
    beerName.appendChild(beerNameHeader);
    let beerTagline = document.createElement("h2");
    beerTagline.innerText = beer.tagline;
    beerName.appendChild(beerTagline);

    let beerDescWrapper = document.getElementById("description");
    let beerDescList = document.createElement("ul");
    beerDescWrapper.appendChild(beerDescList);

    let firstBrewed = document.createElement("li");
    firstBrewed.innerText = `First brewed: ${beer.first_brewed}`;
    firstBrewed.classList.add("brewed");
    beerDescList.appendChild(firstBrewed);

    let description = document.createElement("li");
    description.innerText = beer.description;
    description.classList.add("description");
    beerDescList.appendChild(description);
    
    let foodPairingContainer = document.createElement("li");
    let foodPairingArr = beer.food_pairing;
    let foodParWithoutFirstElem = foodPairingArr.filter( (item, index) => {
        if(index !== 0){
             return item;
        }
   }).map(item => {
        return " " + item.toLowerCase();
    });

    foodPairingContainer.innerText = foodPairingArr[0] + "," + foodParWithoutFirstElem + ".";
    foodPairingContainer.classList.add("food_pairing");
    beerDescList.appendChild(foodPairingContainer);

    let brewersTips = document.createElement("li");
    brewersTips.innerText = beer.brewers_tips;
    brewersTips.classList.add("brewers_tips");
    beerDescList.appendChild(brewersTips);

    let abvWrapper = document.querySelector(".grid-item-abv");
    let abvPara = document.createElement("p");
    abvPara.classList.add("number");
    abvPara.innerText = beer.abv + "%";
    abvWrapper.appendChild(abvPara);

    let ibuWrapper = document.querySelector(".grid-item-ibu");
    let ibuPara = document.createElement("p");
    ibuPara.classList.add("number");
    ibuPara.innerText = beer.ibu;
    ibuWrapper.appendChild(ibuPara);

    let ebcWrapper = document.querySelector(".grid-item-ebc");
    let ebcPara = document.createElement("p");
    ebcPara.classList.add("number");
    ebcPara.innerText = beer.ebc;
    ebcWrapper.appendChild(ebcPara);

}


const createdHopsChart = (ingrName, ingredientsKind) => {
    let ingredientsKindAmount = 0;
    let ingredientsKindName = "brak danych";
    if (ingrName === "Yeast") {
        ingredientsKindAmount = [1];
        ingredientsKindName = [ingredientsKind];
    }else {
        ingredientsKindAmount = ingredientsKind.map(kind => {
            return kind.amount.value;
        });
        ingredientsKindName = ingredientsKind.map(kind => {
            return kind.name;
        });
    }
    
    
    data = {
        datasets: [{
            data: ingredientsKindAmount,
            backgroundColor: [
                '#FFC300',
                '#FFEECA',
                '#FFBC52',
                '#CE9124',
                '#9E6800',
                '#FFC300'
            ],
        }],
        labels: ingredientsKindName,
    };
    let hopsChart = document.getElementById(`chart${ingrName}`).getContext("2d");
    let doughnutChart = new Chart(hopsChart, {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: `${ingrName}`
            },
            legend: {
                display: true,
                position: 'bottom',
                align: "start",
            },
            layout: {
                padding: {
                    left: 50,
                    right: 10,
                    top: 0,
                    bottom: 40
                }
            }
        }
    });
    doughnutChart;

}

const getUrl = () => {
    let currentHref = window.location.href;
    let splitedCurrentHref = currentHref.split("=");
    beerId =  splitedCurrentHref[1];
}


window.onload = () => {
    getUrl();
    getBeer();
};
