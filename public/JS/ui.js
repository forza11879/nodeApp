document.addEventListener('DOMContentLoaded', requestSymbolSearchList)
const symbolTagsList = document.querySelector('#symbolTags')
const symbolTagsOptionsList = document.querySelector('#listBox')

class UI {
  constructor() {
    this.show = document.querySelector('#list')
  }
  static showData(data) {
    // this.show.innerHTML = ""
    // let data = arg.result // Get the results
console.log(`data from UI: ${data.symbol}`)
    this.show.innerHTML = `<tr>
        <td ><strong><a href="/chart/${data.symbol}">${data.symbol}</strong></td>
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
    

    // this.show.innerHTML =Object.keys(data).map(item => {
    //   return `<tr>
    //     <td ><strong><a href="/chart/${item.symbol}">${item.symbol}</strong></td>
    //     <td>${item.open}</td>
    //     <td>${item.high}</td>
    //     <td>${item.low}</td>
    //     <td>${item.price}</td>
    //     <td>${item.volume}</td>
    //     <td>${item.latestTrdDay}</td>
    //     <td>${item.previousClose}</td>
    //     <td>${item.change}</td>
    //     <td>${item.changePercent}</td> 
    //     <td><a href="/buysell/${item.symbol}">buy/sell</a></td>
    //                                   </tr>`
    // }).join('')
  }
}

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
      console.log(data)
      UI.showData(data)
      
    })
    .catch(error => console.error('Error:', error))
}

function getDataList() {
  let symbolTagsValue = symbolTagsList.value
  let curValueSymbol = (symbolTagsValue) ? symbolTagsValue : 'RY'

  // let curValueSymbol = symbolTagsList.value
  // let urlPlus = `${url}${curValueSymbol}`
  let urlPlus = `/list/${curValueSymbol}`
  console.log(urlPlus)
  return fetchDataList(urlPlus)
}

async function fetchDataList(urlPlus) {
  const dataResponse = await fetch(urlPlus)
  const dataJson = await dataResponse.json()
  return dataJson
}





