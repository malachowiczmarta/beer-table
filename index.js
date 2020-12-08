const API_URL = "https://api.punkapi.com/v2/beers";

let tableHeaders = [
  "id",
  "Name",
  "Tagline",
  "First brewed",
  "abv",
  "ibu",
  "ebc"
];

const getBeersList = () => {
  fetch(`${API_URL}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let beersList = data;
      createTableHeaders(tableHeaders);
      generateTable(beersList, tableHeaders);
    })
    .catch((error) => {
      console.log(error);
    });
};

function createTableHeaders(headers) {
  let tableHeader = document.querySelector(".table-header");
  let headerRow = document.createElement("tr");

  headers.forEach((headerText) => {
    let header = document.createElement("th");
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });
  tableHeader.appendChild(headerRow);
}

//dodać zeby sie wstawiało z headres wartosci id , name itp

function generateTable(data, headers) {
  let table = document.querySelector(".table-body");
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

    return (table.innerHTML += row);
  });
}

getBeersList();
