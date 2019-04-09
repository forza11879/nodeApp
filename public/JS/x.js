// const qtyAskValue = document.querySelector("#qtyAsk").value.trim()
const buyTicket = document.querySelector("#buyTicket")
// const askPriceValue = document.querySelector("#askPrice").value
// const nameSymbolValue = document.querySelector("#nameSymbol").value

buyTicket.addEventListener("click", getModalInfo)


class UI {
  constructor() {
    this.show = document.querySelector("#modalContent")
    this.qtyAskValue = document.querySelector("#qtyAsk").value.trim()
    
  }
  showData() {
    // console.log(data)
    this.show.innerHTML = `<div class="modal-header">
      <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body">
      <p>You are placing an order for ${this.qtyAskValue} shares of  at</p>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
      </div>`
  }
}
const ui = new UI()
//Model
function getModalInfo() {
  ui.showData()
}
