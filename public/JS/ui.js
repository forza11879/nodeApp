document.addEventListener('DOMContentLoaded', requestSymbolSearchList)
const symbolTagsList = document.querySelector('#symbolTags')
const symbolTagsOptionsList = document.querySelector('#listBox')

class UI {
  constructor() {
    this.show = document.querySelector('#list')
  }
  showData(data) {
    console.log(data)
    this.show.innerHTML = data.map(item => {
      return `<tr>
              <td><strong><a href="/chart/${item.symbol}">${item.symbol}</a></strong></td>
              <td>${item.open}</td>
              <td>${item.high}</td>
              <td>${item.low}</td>
              <td>${item.price}</td>
              <td>${item.volume}</td>
              <td>${item.latestTrdDay}</td>
              <td>${item.previousClose}</td>
              <td>${item.change}</td>
              <td>${item.changePercent}</td>
              <td><a href="/buysell/${item.symbol}">buy/sell</a></td>
              </tr>`
    }).join('')
  }
}
const ui = new UI
symbolTagsList.addEventListener('input', _.debounce(() => {
  if (symbolTagsOptionsList.checked) {
    requestSymbolSearchList()
  }

}, 2000))

function requestSymbolSearchList() {
  getDataList()
    .then(data => {
      // console.log(data)
      ui.showData(data)
    })
    .catch(error => console.error('Error:', error))
}

function getDataList() {
  let symbolTagsValue = symbolTagsList.value
  let curValueSymbol = (symbolTagsValue) ? symbolTagsValue : 'RY'

  let urlPlus = `/list/${curValueSymbol}`
  console.log(urlPlus)
  return fetchDataList(urlPlus)
}

async function fetchDataList(urlPlus) {
  const dataResponse = await fetch(urlPlus)
  const dataJson = await dataResponse.json()
  return dataJson
}






