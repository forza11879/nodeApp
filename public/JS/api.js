const requestSymbol = document.querySelector('#requestSymbol')
// const ui = new UI
document.addEventListener('DOMContentLoaded', getSymbolWebApi)
requestSymbol.addEventListener('click', getSymbolWebApi)
symbolTags.addEventListener("keyup", executeEnterKey)

function executeEnterKey(event) {
  event.preventDefault()
  if (event.keyCode === 13) {
    requestSymbol.click()
  }
}

function getSymbolWebApi() {
  // let symbolTagsValue = symbolTags.value
  // let curValueAjax = (symbolTagsValue) ? symbolTagsValue : 'RY'

  fetch(`/app/${curValueAjax}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drawChart(data)
    })
    .catch(error => console.error('Error:', error))
}
















