document.addEventListener('DOMContentLoaded', requestSymbolSearchList)
const symbolTagsList = document.querySelector('#symbolTags')
const symbolTagsOptionsList = document.querySelector('#listBox')

class UI {
  constructor() {
    this.show = document.querySelector('#list')
  }
  showData(data) {
    // this.show.innerHTML = ""
    // let data = arg // Get the results
    console.log(`data from UI: ${data.symbol} ${data.price}`)
    console.log(data)
    this.show.innerHTML += `<tr>
        <td ><strong><a href="/chart/${data.symbol}">${data.symbol}</a></strong></td>
        <td>${data.open}</td>
        <td>${data.high}</td>
        <td>${data.low}</td>
        <td>${data.price}</td>
        <td>${data.volume}</td>
        <td>${data.latestTrdDay}</td>
        <td>${data.previousClose}</td>
        <td>${data.change}</td>
        <td>${data.changePercent}</td> 
        <td><a href="/buysell/${data.symbol}">buy/sell</a></td>
                                      </tr>`
  }
}

const ui = new UI

symbolTagsList.addEventListener('input', _.debounce(() => {
  // let symbolTagsOptionsValue = symbolTagsOptionsList.value
  // let arg = urlsObjectList[symbolTagsOptionsValue]
  // const arg = '/list/'
  if (symbolTagsOptionsList.checked) {
    // requestSymbolSearchList(arg)
    requestSymbolSearchList()
  }

}, 2000))

function requestSymbolSearchList() {
  // console.log(arg)
  // getDataList(arg)
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





