const EventEmitter = require("events");
const stockList = require("./stock-list.json");

class OrderProcessor extends EventEmitter {
  constructor() {
    super();
  }

  placeOrder = (order) => {
    const { orderNumber, lineItems } = order;
    let error = false;

    this.emit("PROCESSING_STARTED", orderNumber);

    if (!lineItems || lineItems.length === 0) {
      this.emit("PROCESSING_FAILED", {
        orderNumber,
        reason: "LINEITEMS_EMPTY",
      });
      error = true;
    }

    for (const key in lineItems) {
      stockList
        .filter((stockItem) => stockItem.id === lineItems[key].itemId)
        .forEach((stockItem) => {
          if (lineItems[key].quantity > stockItem.stock) {
            this.emit("PROCESSING_FAILED", {
              orderNumber,
              itemId: lineItems[key].itemId,
              reason: "INSUFFICIENT_STOCK",
            });
            error = true;
          }
        });
    }

    if (!error) {
      this.emit("PROCESSING_SUCCESS", orderNumber);
    }
  };
}

module.exports = OrderProcessor;
