document.addEventListener('DOMContentLoaded', requestSymbolSearchList)

const checkBoxList = document.querySelector('#ckeckBoxList')

const requestSymbolList = document.querySelector('#requestSymbolList')
const symbolTagsList = document.querySelector('#symbolTagsList')


requestSymbolList.addEventListener('click', requestSymbolSearchList)
symbolTagsList.addEventListener("keyup", executeEnterKey)

function executeEnterKey(event) {
  // event.preventDefault()
  if (event.keyCode === 13) {
    requestSymbolList.click()
  }
}


class UI {
  constructor() {
    this.show = document.querySelector('#list')
  }
  showData(data) {
    // console.log(data)
    this.show.innerHTML = data.map(item => {
      return `<tr>
              <td><strong><a href="/stock/chart/${item.symbol}">${item.symbol}</a></strong></td>
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

function requestSymbolSearchList() {
  getDataList()
    .then(data => {
      console.log(data)
      ui.showData(data)
    })
    .catch(error => console.error('Error:', error))
}

function getDataList() {
  let symbolTagsValue = symbolTagsList.value
  let curValueSymbol = (symbolTagsValue) ? symbolTagsValue : 'RY'

  let urlPlus = `/list/add/${curValueSymbol}`
  console.log(urlPlus)
  return fetchDataList(urlPlus)
}

async function fetchDataList(urlPlus) {
  try {
    const dataResponse = await fetch(urlPlus)
    const dataJson = await dataResponse.json()
    return dataJson
  } catch (ex) {
    console.log(`fetchDataList error: ${ex}`)
  }
}



symbolTagsList.addEventListener('input', _.debounce(() => {
   requestSymbolSearch()
}, 2000))

async function requestSymbolSearch() {
  try {
    const dataList = await getData()
    $('#symbolTagsList').autocomplete({
      source: dataList.map(item => item.symbol),
      autoFocus: true
    })
  } catch (ex) {
    console.log(`requestSymbolSearch error: ${ex}`)
  }
}

function getData() {
  try {
    let curValueSymbol = symbolTagsList.value
    let url = `/stock/websearch/${curValueSymbol}`
    console.log(url)
    return fetchData(url)
  } catch (ex) {
    console.log(`getDataList error: ${ex}`)
  }
}

async function fetchData(url) {
  try {
    const dataResponse = await fetch(url)
    const dataJson = await dataResponse.json()
    return dataJson
  } catch (ex) {
    console.log(`fetchData error: ${ex}`)
  }
}






