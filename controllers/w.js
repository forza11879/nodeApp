import { fromEvent, empty, from } from 'rxjs';
import { debounce, concatMap } from 'rxjs/operators';

const userTypesInSearchBox = fromEvent($('#search-box'), 'keyup').map(event =>
  $('#search-box').val()
);

userTypesInSearchBox
  .pipe(
    debounce(250),
    concatMap(searchTerm =>
      from($.get(`https://api.github.com/users/${searchTerm}`))
        .map(response => ({
          response,
          searchTerm,
        }))
        .catch(() => empty())
    )
  )
  .subscribe(result => {
    renderUser(
      result.response.login,
      result.response.html_url,
      result.response.avatar_url,
      result.searchTerm
    );
  });

function renderUser(login, href, imgSrc, searchTerm) {
  $('#search-result').show();
  $('#search-result').attr('href', href);
  $('#search-result__avatar').attr('src', imgSrc);
  $('#search-result__login').text(login);
  $('#search-term-text').text(searchTerm);
}

const uri =
  'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=aapl&outputsize=compact&apikey=6BUYSS9QR8Y9HH15';

async function getWithRetry(url, numRetries) {
  let lastError = null;
  for (let i = 0; i < numRetries; ++i) {
    try {
      const response = await fetch(url);
      const myJson = await response.json();
      console.log('result data one:', myJson['Time Series (Daily)']);
      return myJson;
    } catch (error) {
      console.log('getWithRetry error: ', error);
      lastError = error;
    }
  }
  throw lastError;
}

getWithRetry(uri, 3);
