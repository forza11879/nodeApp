/* eslint-disable no-use-before-define */
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

  // eslint-disable-next-line class-methods-use-this
  showData(portfolio) {
    console.log(portfolio);
    this.show.innerHTML = portfolio
      .map(
        item =>
          `<tr>
       <td>${item.symbol}</td>
       <td>${item.data[0].close.$numberDecimal}</td>
       <td>${item.qtyPortfolio}</td>
       <td>${item.avgPrice.toFixed(2)}</td>
       <td>${item.symbol}</td>
    </tr>`
        // <td>${item.symbolDb[0].symbol}</td>
        // <td>${item.symbolDb[0].data[0].close.$numberDecimal}</td>
        // <td>${item.qtyPortfolio}</td>
        // <td>${item.avgPrice.toFixed(2)}</td>
        // <td>${item.symbolDb[0].symbol}</td>
      )
      .join('');
  }
}
const ui = new UI();
// List
function requestPortfolioList() {
  getDataList()
    .then(data => {
      // console.log(data);
      ui.showData(data);
    })
    .catch(error => console.error('Error:', error));
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

function getDataList() {
  const url = `/portfolio/list`;
  // console.log(url);
  return fetchData(url);
}
