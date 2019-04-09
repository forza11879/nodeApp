const qtyBidValue = document.querySelector("#qtyBid").value
const buyTicketValue = document.querySelector("#buyTicket").value
const askPriceValue = document.querySelector("#askPrice").value
const nameSymbolValue = document.querySelector("#nameSymbol").value

buyTicket.addEventListener("click", getModalInfo)


class UI {
  constructor() {
    this.show = document.querySelector("#modalContent")
  }
  showData(qtyBidValue) {
    // console.log(data)
    this.show.innerHTML = `<div class="modal-header">
    <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    You are placing an order for ${qtyBidValue} shares of  at 
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
  ui.showData(qtyBidValue)
}


// const ui = new UI()
// //Model
// function getModalInfo() {
//   ui.showData(buyTicketValue, qtyBidValue, nameSymbolValue, askPriceValue)
// }


// showData(buyTicketValue, qtyBidValue, nameSymbolValue, askPriceValue)

        // `<div class="modal-header">
        // <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        // <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //   <span aria-hidden="true">&times;</span>
        // </button>
        // </div>
        // <div class="modal-body">
        // You are placing an ${buyTicketValue} order for ${qtyBidValue} shares of  ${nameSymbolValue} at ${askPriceValue}
        // </div>
        // <div class="modal-footer">
        // <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        // <button type="button" class="btn btn-primary">Save changes</button>
        // </div>`

