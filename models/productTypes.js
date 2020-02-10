const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTypesSchema = new Schema({
  name: String,
  type:String,
  category: {
      type: String,
      enum : ["fruits", "vegetables", "fishes & seafood", "meats", "artisan goods", "growcery", "other"]
  },
  image: {
      type: String,
      default : "https://res.cloudinary.com/dyvosdvps/image/upload/v1581285962/tikok-pictures/photo_coq_e69qys.jpg"
  }
});

const productModel = mongoose.model("Product-types", productTypesSchema);

module.exports = productTypesModel;
