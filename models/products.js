const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  ref: String,
  price: Number,
  quantity: Number,
  description : String,
  type:String, /// necessary to put it here again ?
  category: {
      type: String,
      enum : ["fruits", "vegetables", "fishes & seafood", "meats", "artisan goods", "growcery", "other"]
  },
likes :Number,
  image: {
      type: String,
      default : "https://res.cloudinary.com/dyvosdvps/image/upload/v1581285962/tikok-pictures/photo_coq_e69qys.jpg"
  },
});

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
