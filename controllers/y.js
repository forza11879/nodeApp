const userTypesInSearchBox1 = Rx.Observable.fromEvent(
  $('#search-box-1'),
  'keyup'
).map(event => $('#search-box-1').val());

const userTypesInSearchBox2 = Rx.Observable.fromEvent(
  $('#search-box-2'),
  'keyup'
).map(event => $('#search-box-2').val());

const searchResult1 = userTypesInSearchBox1
  .debounce(250)
  .concatMap(searchTerm =>
    Rx.Observable.fromPromise(
      $.get(`https://api.github.com/users/${  searchTerm}`)
    ).catch(response => Rx.Observable.empty()));

const searchResult2 = userTypesInSearchBox2
  .debounce(250)
  .concatMap(searchTerm =>
    Rx.Observable.fromPromise(
      $.get(`https://api.github.com/users/${  searchTerm}`)
    ).catch(response => Rx.Observable.empty()));
  );

Rx.Observable.combineLatest(searchResult1, searchResult2).subscribe(results => {
  renderUsers(
    results[0].login,
    results[0].html_url,
    results[0].avatar_url,
    results[1].login,
    results[1].html_url,
    results[1].avatar_url
  );
});

function renderUsers(login1, href1, imgSrc1, login2, href2, imgSrc2) {
  $('#search-result-1').show();
  $('#search-result-1').attr('href', href1);
  $('#search-result-1__avatar').attr('src', imgSrc1);
  $('#search-result-1__login').text(login1);
  $('#search-result-2').show();
  $('#search-result-2').attr('href', href2);
  $('#search-result-2__avatar').attr('src', imgSrc2);
  $('#search-result-2__login').text(login2);
}

async function getWithRetry(url, numRetries) {
  let lastError = null;
  for (let i = 0; i < numRetries; ++i) {
    try {
      const response = await axios.get(url);
      const { data } = response;

      return data
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

createHttpObservable(url)
  .pipe(
      map(res => res["payload"])
  );

const fetchWebApiStock = async url => {
  try {
    // console.log('fetchWebApiStock url:', url);

    const response = await axios.get(url);
    const { data } = response;

    const result = Object.entries(data['Time Series (Daily)']).map(
      ([date, dateObj]) => ({
        date: Date.parse(date),
        open: Math.round(parseFloat(dateObj['1. open']) * 100) / 100,
        high: Math.round(parseFloat(dateObj['2. high']) * 100) / 100,
        low: Math.round(parseFloat(dateObj['3. low']) * 100) / 100,
        close: Math.round(parseFloat(dateObj['4. close']) * 100) / 100,
        volume: parseInt(dateObj['5. volume']),
        // parseInt vs unary plus  +dateObj["5. volume"]
      })
    );

    // const result = data.map(item => ({
    //   date: Date.parse(item.date),
    //   open: item.open,
    //   high: item.high,
    //   low: item.low,
    //   close: item.close,
    //   volume: item.volume,
    // }));

    // console.log('fetchWebApiStock result data:', result);

    return result;
  } catch (err) {
    console.log('fetchWebApiStock error: ', err);
  }
};

