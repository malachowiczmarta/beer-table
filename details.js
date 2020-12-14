const API_URL = "https://api.punkapi.com/v2/beers/";
let beerId = '';


const getBeer = () => {
  fetch(`${API_URL}${beerId}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let beer = data[0];
      const {malt, hops, yeast} = beer.ingredients;
      displayBeerDetails(beer);
      createdHopsChart("Malt", malt);
      createdHopsChart("Hops", hops);
      createdHopsChart("Yeast", hops);
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

    let foodPairing = document.createElement("li");
    foodPairing.innerText = beer.food_pairing;
    foodPairing.classList.add("food_pairing");
    beerDescList.appendChild(foodPairing);

    let brewersTips = document.createElement("li");
    brewersTips.innerText = beer.brewers_tips;
    brewersTips.classList.add("brewers_tips");
    beerDescList.appendChild(brewersTips);

    let abvWrapper = document.querySelector(".grid-item-abv");
    let abvPara = document.createElement("p");
    abvPara.classList.add("number");
    abvPara.innerText = beer.abv + " %";
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


const createdHopsChart = (name, ingredientsKind) => {
    console.log(ingredientsKind)
    
    const ingredientsKindName = ingredientsKind.map(kind => {
        return kind.name;
    });
    const ingredientsKindAmount = ingredientsKind.map(kind => {
        return kind.amount.value;
    });
    
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
    let hopsChart = document.getElementById(`chart${name}`).getContext("2d");
    let doughnutChart = new Chart(hopsChart, {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: `${name} amount`
            },
            legend: {
                display: true,
                position: 'right',
                align: "start",
                // boxWidth: 3,
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
    console.log(beerId)
}


window.onload = () => {
    getUrl();
    getBeer();
};
