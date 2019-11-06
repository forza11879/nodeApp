document.addEventListener('DOMContentLoaded', requestPortfolioList);

function executeEnterKey(event) {
  // event.preventDefault()
  if (event.keyCode === 13) {
    requestPortfolioList.click();
  }
}

class UI {
  constructor() {
    this.show = document.querySelector('#porfolioList');
  }
  showData(portfolio) {
    console.log(portfolio);
    this.show.innerHTML = portfolio
      .map(item => {
        // console.log(`avgPrice: ${typeof item.avgPrice}`);
        // console.log(`avgPrice: ${JSON.stringify(item.avgPrice)}`);
        return `<tr>
            <td>${item.symbolDb[0].symbol}</td>
            <td>${item.symbolDb[0].data[0].close.$numberDecimal}</td>
            <td>${item.qtyPortfolio}</td>
            <td>${item.avgPrice.toFixed(2)}</td>
            <td>${item.symbolDb[0].symbol}</td>
         </tr>`;
      })
      .join('');
  }
}
const ui = new UI();
//List
function requestPortfolioList() {
  getDataList()
    .then(data => {
      // console.log(data);
      ui.showData(data);
    })
    .catch(error => console.error('Error:', error));
}

function getDataList() {
  let url = `/portfolio/list`;
  // console.log(url);
  return fetchData(url);
}

async function fetchData(url) {
  try {
    const dataResponse = await fetch(url);
    const dataJson = await dataResponse.json();
    return dataJson;
  } catch (ex) {
    console.log(`fetchData error: ${ex}`);
  }
}
