const requestPortfolioList = document.querySelector('#portfolioList');

requestSymbolList.addEventListener('click', getDataList);

function getDataList() {
  let url = `portfolio/list`;
  console.log(url);
  return fetchData(url);
}

async function fetchData(url) {
  try {
    const dataResponse = await fetch(url);
    const dataJson = await dataResponse.json();
    console.log(`fetchData Portfolio List: ${dataJson}`);
    return dataJson;
  } catch (ex) {
    console.log(`fetchData error: ${ex}`);
  }
}
