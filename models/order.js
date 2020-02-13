const mongoose = require("mongoose");
const Schema = mongoose.Schema; // adding reg ex for contact field

const orderSchema = new Schema({
  ref: String,
  shop_id: {
    type: Schema.Types.ObjectId,
    ref: "Shop"
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  list_products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  creation_date: Date,
  status: {
    type: String,
    enum: ["basket", "entered", "confirmed", "completed", "archived"] // entered = valider
  }
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
