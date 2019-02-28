class UI {
  constructor() {
    this.show = document.querySelector('#list')
  }
  showData(arg) {
    this.show.innerHTML = ""
    let data = arg.result // Get the results

    this.show.innerHTML = data.map(item => {
      return `<tr>
      <td ><strong><a href="/chart/{{item.symbol}}">${item.symbol}</strong></td>
        <td>${item.name}</td>
        <td>${item.bid}</td>
        <td>${item.ask}</td>
        <td>${item.open}</td>
        <td>${item.previousClose}</td>
        <td>${item.lastTrade}</td>
        <td>${item.high}</td>
        <td>${item.low}</td>
        <td>${item.volume}</td>
        <td>${item.high52}</td>
        <td>${item.low52}</td>
        <td><a href="/buysell/{{item.id}}">buy/sell </a>
                                      </tr>`
    }).join('')
  }
}





