document.addEventListener('DOMContentLoaded', requestPortfolioList);
// const requestPortfolioList = document.querySelector('#portfolioList');
// const symbolTagsList = document.querySelector('#symbolTagsList');

// requestPortfolioList.addEventListener('click', requestSymbolSearchList);
// symbolTagsList.addEventListener('keyup', executeEnterKey);

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
    // const userId = '5d5f6afb11a620047486274d';
    // const userId = req.session.use._id;
    // console.log(portfolio);
    this.show.innerHTML = portfolio
      .map(item => {
        let sellPrice = parseFloat(
          item.symbolDb[0].transactionDb[0].totalBuySellTradeAmount
            .$numberDecimal
        );
        let buyPrice = parseFloat(
          item.symbolDb[0].transactionDb[1].totalBuySellTradeAmount
            .$numberDecimal
        );
        let avrPrice = (buyPrice - sellPrice) / parseInt(item.qtyPortfolio);
        // console.log(`sellPrice: ${typeof sellPrice}`);
        // console.log(`sellPrice: ${JSON.stringify(sellPrice)}`);
        // console.log(`buyPrice: ${typeof buyPrice}`);
        // console.log(`buyPrice: ${JSON.stringify(buyPrice)}`);
        // console.log(`avrPrice: ${typeof avrPrice}`);
        // console.log(`avrPrice: ${JSON.stringify(avrPrice)}`);
        return `<tr>
            <td>${item.symbolDb[0].symbol}</td>
            <td>${item.symbolDb[0].data[0].close.$numberDecimal}</td>
            <td>${item.qtyPortfolio}</td>
            <td>${avrPrice.toFixed(2)}</td>
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
