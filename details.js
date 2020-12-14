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
    let header = document.querySelector(".details-container")
    let beerName = document.createElement("h3");
    beerName.innerText = beer.name;
    header.appendChild(beerName);
    details.map(item => {
        let beerDetailsItem = document.createElement("p"); 
        beerDetailsItem.innerText = `${item}: ${beer[item]}`;
        header.appendChild(beerDetailsItem);
    })
    let img = document.createElement("img");
    img.href = beer.image_url;
    header.appendChild(img);

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
        }],
        labels: ingredientsKindName,
    };
    let hopsChart = document.getElementById(`chart${name}`).getContext("2d");
    let doughnutChart = new Chart(hopsChart, {
        type: 'doughnut',
        data: data,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        options: {
            title: {
                display: true,
                text: `${name} amount`
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
