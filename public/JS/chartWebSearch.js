//GLOBAL value
// const symbolTagsChart = document.querySelector('#symbolTagsChart')
const symbolTagsOptionsChart = document.querySelector('#apiChart')

const urlsObjectChart = {
  websearch: '/stock/websearch/',
  dbsearch: '/stock/dbsearch/'
}

symbolTagsChart.addEventListener('input', _.debounce(() => {
  let symbolTagsOptionsChartValue = symbolTagsOptionsChart.value
  let arg = urlsObjectChart[symbolTagsOptionsChartValue]
  requestSymbolSearchChart(arg)
}, 2000))

async function requestSymbolSearchChart(arg) {
  try {
    const dataList = await getDataList(arg)
    console.log(dataList)
    $('#symbolTagsChart').autocomplete({
      source: dataList.map(item => item.symbol),
      autoFocus: true
    })
  } catch (ex) {
    console.log(`requestSymbolSearchChart error: ${ex}`)
  }
}

function getDataList(url) {
  try {
    let curValueSymbol = symbolTagsChart.value
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