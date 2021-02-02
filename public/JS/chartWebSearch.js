// GLOBAL value
// const symbolTagsChart = document.querySelector('#symbolTagsChart')
const symbolTagsOptionsChart = document.querySelector('#apiChart');

const urlsObjectChart = {
  websearch: '/api/v1/stock/websearch/',
  dbsearch: '/api/v1/stock/dbsearch/',
};

symbolTagsChart.addEventListener(
  'input',
  _.debounce(() => {
    const symbolTagsOptionsChartValue = symbolTagsOptionsChart.value;
    const arg = urlsObjectChart[symbolTagsOptionsChartValue];
    requestSymbolSearchChart(arg);
  }, 1000)
);

async function requestSymbolSearchChart(arg) {
  try {
    const dataList = await getDataList(arg);
    console.log(dataList);
    $('#symbolTagsChart').autocomplete({
      source: dataList.map(item => item.symbol),
      autoFocus: true,
    });
  } catch (ex) {
    console.log(`requestSymbolSearchChart error: ${ex}`);
  }
}

function getDataList(url) {
  try {
    const curValueSymbol = symbolTagsChart.value;
    const urlPlus = `${url}${curValueSymbol}`;
    console.log(urlPlus);
    return fetchData(urlPlus);
  } catch (ex) {
    console.log(`getDataList error: ${ex}`);
  }
}

async function fetchData(urlPlus) {
  try {
    const dataResponse = await fetch(urlPlus);
    const dataJson = await dataResponse.json();
    return dataJson;
  } catch (ex) {
    console.log(`fetchData error: ${ex}`);
  }
}
