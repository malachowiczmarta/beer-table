const API_URL = "https://api.punkapi.com/v2/beers/";
const beerId = '2';

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
      let beerDetails = data[0];
      displayBeerDetails(beerDetails);
    })
    .catch((error) => {
      console.log(error);
    });
};

const displayBeerDetails = (beer) => {
    const details = ["tagline", "first_brewed", "abv", "ibu", "ebc"];
    let header = document.querySelector(".details-container")
    let beerName = document.createElement("h2");
    beerName.innerText = beer.name;
    header.appendChild(beerName);
    details.map(item => {
        let beerDetailsItem = document.createElement("p"); 
        beerDetailsItem.innerText = `${item}: ${beer[item]}`;
        header.appendChild(beerDetailsItem);
    })

}


window.onload = () => {
    getBeer();
};
