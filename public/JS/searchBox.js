const symbolTagsList = document.querySelector('#symbolTagsList');
//search box
symbolTagsList.addEventListener(
  'input',
  _.debounce(() => {
    requestSymbolSearch();
  }, 1000)
);

async function requestSymbolSearch() {
  try {
    const dataList = await getDataSearchBox();
    console.log(dataList);
    $('#symbolTagsList').autocomplete({
      source: dataList.map(item => item.symbol),
      autoFocus: true
    });
  } catch (ex) {
    console.log(`requestSymbolSearch error: ${ex}`);
  }
}

function getDataSearchBox() {
  try {
    let curValueSymbol = symbolTagsList.value;
    let url = `/stock/websearch/${curValueSymbol}`;
    console.log(url);
    return fetchData(url);
  } catch (ex) {
    console.log(`getDataSearchBox error: ${ex}`);
  }
}

async function fetchData(url) {
  try {
    const dataResponse = await fetch(url);
    const dataJson = await dataResponse.json();
    return dataJson;
  } catch (ex) {
    console.log(`fetchData error: ${ex}`);
  }
}
