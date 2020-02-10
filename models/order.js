const mongoose = require("mongoose");
const Schema = mongoose.Schema; // adding reg ex for contact field

const orderSchema = new Schema({
ref : String,
store_id : Schema.Types.ObjectId,
list_products: [{product_id :Schema.Types.ObjectId,
                 quantity: Number}],
order_date : Date,
status: String,
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
