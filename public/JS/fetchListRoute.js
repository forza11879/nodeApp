document.addEventListener('DOMContentLoaded', requestSymbolSearchList);

const requestSymbolList = document.querySelector('#requestSymbolList');
const symbolTagsList = document.querySelector('#symbolTagsList');

requestSymbolList.addEventListener('click', requestSymbolSearchList);
symbolTagsList.addEventListener('keyup', executeEnterKey);

function executeEnterKey(event) {
  // event.preventDefault()
  if (event.keyCode === 13) {
    requestSymbolList.click();
  }
}

class UI {
  constructor() {
    this.show = document.querySelector('#list');
  }

  showData(data) {
    // const userId = '5d5f6afb11a620047486274d';
    // const userId = req.session.use._id;
    // console.log(data)
    this.show.innerHTML = data
      .map(
        item =>
          `<tr>
              <td><strong><a href="/api/v1/stock/chart/${item.symbol}">${item.symbol}</a></strong></td>
              <td>${item.open}</td>
              <td>${item.high}</td>
              <td>${item.low}</td>
              <td>${item.price}</td>
              <td>${item.volume}</td>
              <td>${item.latestTrdDay}</td>
              <td>${item.previousClose}</td>
              <td>${item.change}</td>
              <td>${item.changePercent}</td>
              <td><strong><a href="/api/v1/portfolio/buysell/${item.symbol}">buy/sell</a></strong></td>
              </tr>`
      )
      .join('');
  }
}
const ui = new UI();
// List
function requestSymbolSearchList() {
  getDataList()
    .then(data => {
      console.log(data);
      ui.showData(data);
    })
    .catch(error => console.error('Error:', error));
}

function getDataList() {
  const symbolTagsValue = symbolTagsList.value;
  const curValueSymbol = symbolTagsValue || 'RY';
  const url = `/api/v1/list/add/${curValueSymbol}`;
  console.log(url);
  return fetchData(url);
}
// search box
symbolTagsList.addEventListener(
  'input',
  _.debounce(() => {
    requestSymbolSearch();
  }, 1000)
);

async function requestSymbolSearch() {
  try {
    const dataList = await getDataSearchBox();
    console.log(dataList);
    $('#symbolTagsList').autocomplete({
      source: dataList.map(item => item.symbol),
      autoFocus: true,
    });
  } catch (ex) {
    console.log(`requestSymbolSearch error: ${ex}`);
  }
}

function getDataSearchBox() {
  try {
    const curValueSymbol = symbolTagsList.value;
    const url = `/api/v1/stock/websearch/${curValueSymbol}`;
    console.log(url);
    return fetchData(url);
  } catch (ex) {
    console.log(`getDataSearchBox error: ${ex}`);
  }
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

// async function fetchData(url) {
//   try {
//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     headers.append('Accept', 'application/json');
//     const dataResponse = await fetch(url, {
//       method: 'GET',
//       mode: 'same-origin',
//       redirect: 'follow',
//       credentials: 'include', // Don't forget to specify this if you need cookies
//       headers: headers,
//       body: JSON.stringify({
//         first_name: 'John',
//         last_name: 'Doe'
//       })
//     });
//     const dataJson = await dataResponse.json();
//     return dataJson;
//   } catch (ex) {
//     console.log(`fetchData error: ${ex}`);
//   }
// }
