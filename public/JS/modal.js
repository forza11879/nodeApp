const buySellTicket = document.querySelector(".jsBtnList")
buySellTicket.addEventListener("click", getModalInfo)

class UI {
  constructor() {
    this.show = document.querySelector("#modalContent")
  }
  showData(e) {
    let qtyAskValue = document.querySelector("#qtyAsk").value.trim()
    let qtyBidValue = document.querySelector("#qtyBid").value.trim()
    let askPriceValue = document.querySelector("#askPrice").value
    let bidPriceValue = document.querySelector("#bidPrice").value
    const nameSymbolValue = document.querySelector("#nameSymbol").value

    const btnObject = {
      buy: 'Buy',
      sell: 'Sell'
    }
    const target = e.target
    const arg = btnObject[target.dataset.fetcher]

    if (arg !== 'Buy') (qtyAskValue = qtyBidValue) && (askPriceValue = bidPriceValue)

    this.show.innerHTML = `<div class="modal-header">
      <h5 class="modal-title" id="exampleModalCenterTitle">${arg} order</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body">
      <p>You are placing a ${arg} order for ${nameSymbolValue} - ${qtyAskValue} shares at $${askPriceValue}. Please Confirm to send the order.</p>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary">Confirm</button>
      </div>`
  }
}
const ui = new UI()
//Model
function getModalInfo(e) {
  ui.showData(e)
}


