const userClicksSearchButton = Rx.Observable.fromEvent(
  $('#search-button'),
  'click'
).map(event => $('#search-box').val());

userClicksSearchButton.subscribe(searchTerm => {
  alert(searchTerm);
});

async function getWithRetry(url, numRetries) {
  let lastError = null;
  for (let i = 0; i < numRetries; ++i) {
    try {
      // Note that `await superagent.get(url).body` doesn't work
      const res = await superagent.get(url); // Early return with async functions works as you'd expect
      return res.body;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function run() {
  const root = 'https://jsonplaceholder.typicode.com';
  const posts = await getWithRetry(`${root}/posts`, 3);
  for (const { id } of posts) {
    const comments = await getWithRetry(`${root}/comments?postId=${id}`, 3);
    console.log(comments);
  }
}
