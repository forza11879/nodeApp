class UI {
  constructor() {
    this.show = document.querySelector('#list')
  }
  showData(arg) {
    // this.show.innerHTML = ""
    let data = arg.result // Get the results

    this.show.innerHTML = data.map(item => {
      return `<tr>
      <td ><strong><a href="/chart/{{item.symbol}}">${item.symbol}</strong></td>
        <td>${item.name}</td>
        <td>${item.bid}</td>
        <td>${item.ask}</td>
        <td>${item.open}</td>
        <td>${item.previousClose}</td>
        <td>${item.lastTrade}</td>
        <td>${item.high}</td>
        <td>${item.low}</td>
        <td>${item.volume}</td>
        <td>${item.high52}</td>
        <td>${item.low52}</td>
        <td><a href="/buysell/{{item.id}}">buy/sell </a>
                                      </tr>`
    }).join('')
  }
}

const symbolTags = document.querySelector('#symbolTags')
const symbolTagsOptions = document.querySelector('#api')

const urlsObject = {
  dbsearch: '/dbsearch/',
  search: '/search/'
}

symbolTags.addEventListener('input', _.debounce(() => {
  let symbolTagsOptionsValue = symbolTagsOptions.value
  let arg = urlsObject[symbolTagsOptionsValue]
  requestSymbolSearch(arg)
}, 2000))

function requestSymbolSearch(arg) {
  getData(arg)
    .then(data => {
      console.log(data)
      $('#symbolTags').autocomplete({
        source: data.map(item => item.symbol),
        autoFocus: true
      })
    })
    .catch(error => console.error('Error:', error))
}

 function getData(url) {
  let curValueSymbol = symbolTags.value
  let urlPlus = `${url}${curValueSymbol}`
  console.log(urlPlus)
  return  fetchData(urlPlus)
}

async function fetchData(urlPlus) {
  const dataResponse = await fetch(urlPlus)
  const dataJson = await dataResponse.json()
  return dataJson
}





