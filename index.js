const API_URL = "https://api.punkapi.com/v2/beers";
let PAGE_NUMBER = 1;
const PER_PAGE = 15;
let tableHeaders = [
  "id",
  "Name",
  "Tagline",
  "First brewed",
  "abv",
  "ibu",
  "ebc"
];

const getBeersList = (currentPageNumber) => {
  fetch(`${API_URL}?page=${currentPageNumber}&per_page=${PER_PAGE}`)
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
      let beersList = data;
      generateTable(beersList, tableHeaders);
    })
    .catch((error) => {
      console.log(error);
    });
};

function createTableHeaders(headers) {
  let tableHeader = document.querySelector(".table-header");
  headers.forEach((headerText) => {
    let header = document.createElement("th");
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    tableHeader.appendChild(header);
    
  });
}

//dodać zeby sie wstawiało z headres wartosci id , name itp

function generateTable(data) {
  let tableBody = document.querySelector(".table-body");
  tableBody.innerHTML = "";
  data.map((item) => {
    let row = `<tr onclick="window.location.href = 'details.html?beerId=${item.id}'">
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.tagline}</td>
                  <td>${item.first_brewed}</td>
                  <td>${item.abv}</td>
                  <td>${item.ibu}</td>
                  <td>${item.ebc}</td>
            </tr>`;

    return (tableBody.innerHTML += row);
  });
}

function createButton() {
  const btnContainer = document.querySelector(".btn-container");
  const nextBtn = document.createElement("button");
  nextBtn.id = "nextBtn";
  nextBtn.innerText = "next"
  nextBtn.setAttribute("onclick", "handleMovetoNextPage()");
  const prevBtn = document.createElement("button");
  prevBtn.id = "prevBtn";
  prevBtn.innerText = "previous"
  prevBtn.setAttribute("onclick", "handleMovetoPrevPage()");
  
  btnContainer.appendChild(prevBtn);
  btnContainer.appendChild(nextBtn);
}

function handleMovetoNextPage() {
  
  console.log(PAGE_NUMBER)
  PAGE_NUMBER ++; 
  // window.location.href = `index.html?page=${PAGE_NUMBER}`;
  console.log(PAGE_NUMBER);
  getBeersList(PAGE_NUMBER);
}

function handleMovetoPrevPage() {
 if (PAGE_NUMBER > 0) {
   PAGE_NUMBER --; 
    getBeersList(PAGE_NUMBER);
 }
 return PAGE_NUMBER;
  
}

window.onload = () => {
  createTableHeaders(tableHeaders);
  getBeersList(PAGE_NUMBER);
  createButton();
};


