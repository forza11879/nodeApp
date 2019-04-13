const buySellTicket = document.querySelector('.jsBtnList');
buySellTicket.addEventListener('click', getModalInfo);

class UI {
  constructor() {
    this.show = document.querySelector('#modalContent');
  }
  showData(e) {
    const userId = '5cb018905f293858a48565fe';
    let qtyAskValue = document.querySelector('#qtyAsk').value.trim();
    let qtyBidValue = document.querySelector('#qtyBid').value.trim();
    let askPriceValue = document.querySelector('#askPrice').value;
    let bidPriceValue = document.querySelector('#bidPrice').value;
    const companyNameValue = document.querySelector('#companyName').value;
    const companySymbolValue = document.querySelector('#companySymbol').value;

    const btnObject = {
      buy: 'Buy',
      sell: 'Sell'
    };
    const target = e.target;
    const arg = btnObject[target.dataset.fetcher];

    if (arg !== 'Buy')
      (qtyAskValue = qtyBidValue) && (askPriceValue = bidPriceValue);

    this.show.innerHTML = `<form action="/transaction/add" method="post">
    <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">${arg} order</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          <div class="modal-body">
          <p>You are placing a ${arg} order for ${qtyAskValue} shares of ${companyNameValue} - symbol ${companySymbolValue} at $${askPriceValue} per share. Please Confirm to send the order.</p>
          </div>
          <div class="modal-footer">
          <input type="hidden" name="userId" value="${userId}"></input>
          <input type="hidden" name="symbol" value="${companySymbolValue}"></input>
          <input type="hidden" name="price" value="${askPriceValue}"></input>
          <input type="hidden" name="qty" value="${qtyAskValue}"></input>
          <input type="hidden" name="orderType" value="${arg}"></input>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary">Confirm</button>
          </div>
    </form>`;
  }
}
const ui = new UI();
//Model
function getModalInfo(e) {
  ui.showData(e);
}
