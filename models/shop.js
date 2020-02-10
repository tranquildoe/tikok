const mongoose = require("mongoose");
const Schema = mongoose.Schema; // adding reg ex for contact field

const shopSchema = new Schema({
  name: {
      type: String,
      required : true
    },
  email: {
      type : String, // add reg ex
    },
  phone:String , // ?? string ? or number or other ?
  address: String,
  location : {type: { type: String }, coordinates: [Number] },// Synthax for Google map coordonates
  orders : {
    active_orders : [Schema.Types.ObjectId],
    past_orders : [Schema.Types.ObjectId]
    },
  likes: Number,
  status: {
    enum : [finalized, online, closed]
  },
  visibility: {
    enum : [visible, hidden]
  },
  control: {
    enum : [unseen, checked, blocked]
  }
});

shopSchema.index({location: '2dsphere'});
const shopModel = mongoose.model("Shop", shopSchema);

module.exports = shopModel;
