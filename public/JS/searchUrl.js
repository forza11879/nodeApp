//GLOBAL value
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
  // let arrowDown = event.keyCode
  // arrowDown = 40

}, 2000))

async function requestSymbolSearch(arg) {
  try {
    const dataList = await getDataList(arg)
    console.log(dataList)
    $('#symbolTags').autocomplete({
      source: dataList.map(item => item.symbol),
      autoFocus: true
    })
  } catch (ex) {
    console.log(`requestSymbolSearch error: ${ex}`)
  }
}

function getDataList(url) {
  try {
    let curValueSymbol = symbolTags.value
    let urlPlus = `${url}${curValueSymbol}`
    console.log(urlPlus)
    return fetchData(urlPlus)
  } catch (ex) {
    console.log(`getDataList error: ${ex}`)
  }
}

async function fetchData(urlPlus) {
  try {
    const dataResponse = await fetch(urlPlus)
    const dataJson = await dataResponse.json()
    return dataJson
  } catch (ex) {
    console.log(`fetchData error: ${ex}`)
  }
}