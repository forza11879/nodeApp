document.addEventListener("DOMContentLoaded", requestSymbolSearchList)

const requestSymbolList = document.querySelector("#requestSymbolList")
const symbolTagsList = document.querySelector("#symbolTagsList")

requestSymbolList.addEventListener("click", requestSymbolSearchList)
symbolTagsList.addEventListener("keyup", executeEnterKey)

function executeEnterKey(event) {
  // event.preventDefault()
  if (event.keyCode === 13) {
    requestSymbolList.click()
  }
}

class UI {
  constructor() {
    this.show = document.querySelector("#list")
  }
  showData(data) {
    // console.log(data)
    this.show.innerHTML = data
      .map(
        item =>
          `<tr>
              <td><strong><a href="/stock/chart/${item.symbol}">${
            item.symbol
          }</a></strong></td>
              <td>${item.open}</td>
              <td>${item.high}</td>
              <td>${item.low}</td>
              <td>${item.price}</td>
              <td>${item.volume}</td>
              <td>${item.latestTrdDay}</td>
              <td>${item.previousClose}</td>
              <td>${item.change}</td>
              <td>${item.changePercent}</td>
              <td><strong><a href="/portfolio/buysell/${item.symbol}">buy/sell</a></strong></td>
              </tr>`
      )
      .join("")
  }
}
const ui = new UI()
//List
function requestSymbolSearchList() {
  getDataList()
    .then(data => {
      console.log(data)
      ui.showData(data)
    })
    .catch(error => console.error("Error:", error))
}

function getDataList() {
  let symbolTagsValue = symbolTagsList.value
  let curValueSymbol = symbolTagsValue ? symbolTagsValue : "RY"
  let url = `/list/add/${curValueSymbol}`
  console.log(url)
  return fetchData(url)
}
//search box
symbolTagsList.addEventListener(
  "input",
  _.debounce(() => {
    requestSymbolSearch()
  }, 1000)
)

async function requestSymbolSearch() {
  try {
    const dataList = await getDataSearchBox()
    console.log(dataList)
    $("#symbolTagsList").autocomplete({
      source: dataList.map(item => item.symbol),
      autoFocus: true
    })
  } catch (ex) {
    console.log(`requestSymbolSearch error: ${ex}`)
  }
}

function getDataSearchBox() {
  try {
    let curValueSymbol = symbolTagsList.value
    let url = `/stock/websearch/${curValueSymbol}`
    console.log(url)
    return fetchData(url)
  } catch (ex) {
    console.log(`getDataSearchBox error: ${ex}`)
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
