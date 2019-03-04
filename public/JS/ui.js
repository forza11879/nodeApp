const symbolTagsList = document.querySelector('#symbolTags')
const symbolTagsOptionsList = document.querySelector('#listBox')

class UI {
  constructor() {
    this.show = document.querySelector('#list')
  }
  static showData(data) {
    // this.show.innerHTML = ""
    // let data = arg.result // Get the results

    this.show.innerHTML = data.map(item => {
      return `<tr>
        <td ><strong><a href="/chart/${item.symbol}">${item.symbol}</strong></td>
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

symbolTagsList.addEventListener('input', _.debounce(() => {
  // let symbolTagsOptionsValue = symbolTagsOptionsList.value
  // let arg = urlsObjectList[symbolTagsOptionsValue]
  const arg = '/list/'
  if(symbolTagsOptionsList.checked){
    requestSymbolSearchList(arg)
  }
  
}, 2000))

function requestSymbolSearchList(arg) {
  getDataList(arg)
    .then(data => {
      console.log(data)
      showData(data)
    })
    .catch(error => console.error('Error:', error))
}

function getDataList(url) {
  let curValueSymbol = symbolTagsList.value
  let urlPlus = `${url}${curValueSymbol}`
  console.log(urlPlus)
  return fetchDataList(urlPlus)
}

async function fetchDataList(urlPlus) {
  const dataResponse = await fetch(urlPlus)
  const dataJson = await dataResponse.json()
  return dataJson
}





