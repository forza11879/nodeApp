// const show = document.getElementById("modalContent")
// const qtyAskValueById = document.getElementById("qtyAsk").value.trim()
// // const qtyAskValue = parseInt(document.getElementById("qtyAsk").value.trim())
// const qtyAskValue = document.getElementById("qtyAsk").value.trim()

const buyTicket = document.querySelector("#buyTicket")
// const askPriceValue = document.querySelector("#askPrice").value
// const nameSymbolValue = document.querySelector("#nameSymbol").value

buyTicket.addEventListener("click", getModalInfo)


class UI {
  constructor() {
    this.show = document.querySelector("#modalContent")
  }
  showData() {
    // const show = document.querySelector("#modalContent")
    const qtyAskValue = document.querySelector("#qtyAsk").value.trim()
    const askPriceValue = document.querySelector("#askPrice").value
    const nameSymbolValue = document.querySelector("#nameSymbol").value

    this.show.innerHTML = `<div class="modal-header">
      <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body">
      <p>You are placing an order for ${nameSymbolValue} - ${qtyAskValue} shares at $${askPriceValue}. Please Confirm to send the order.</p>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary">Confirm</button>
      </div>`
  }
}
const ui = new UI()
//Model
function getModalInfo() {
  ui.showData()
}

// function getModalInfo() {
//   getTradingValues()
//     .then(data => {
//       console.log(data)
//       ui.showData(data)
//     })
//     .catch(error => console.error("Error:", error))
// }

// function getTradingValues() {
//   return {
//     qtyBidValue: document.querySelector("#qtyBid").value.trim()
//     // buyTicketValue: document.querySelector("#buyTicket").value,
//     // askPriceValue: document.querySelector("#askPrice").value,
//     // nameSymbolValue: document.querySelector("#nameSymbol").value
//   }
// }

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

