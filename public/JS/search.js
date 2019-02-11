const symbolTags = document.querySelector('#symbolTags')

// // Init a timeout variable to be used below
// let timeout = null

// // Listen for keystroke events
// symbolTags.oninput = function (e) {
//   // Clear the timeout if it has already been set.
//   // This will prevent the previous task from executing
//   // if it has been less than <MILLISECONDS>
//   clearTimeout(timeout)

//   // Make a new timeout set to go off in 800ms
//   timeout = setTimeout(function () {
//     requestSymbolSearch()
//   }, 500)
// }

symbolTags.oninput = function (e) {
  requestSymbolSearch()
}

function requestSymbolSearch() {
  let curValueSymbol = symbolTags.value
  fetch(`/dbsearch/${curValueSymbol}`)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      $('#symbolTags').autocomplete({
        source: data.map(item => item.symbol),
        autoFocus: true
      })
    })
    .catch(error => console.error('Error:', error))
}





















