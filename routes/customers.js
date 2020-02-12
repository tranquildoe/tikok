var express = require('express');
var router = express.Router();
const productModel = require("../models/product");
const shopModel = require("../models/shop");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/platform/:shop_id", (req, res, next) => {
    shopModel.findById(req.params.shop_id).populate("list_products")
    .then(shop => {
      res.render("platform/shop", {shop})})
    .catch(next)
})

router.get("plaform/:shop_id/:id" , (req,res,next) => {
    productModel.findById(req.params.id)
    .then(shop => {
      res.render("platform/product" , {shop})})
      .catch(next)
})



module.exports = router;
