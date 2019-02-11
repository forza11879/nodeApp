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