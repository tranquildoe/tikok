var express = require('express');
var router = express.Router();
const productModel = require("../models/product");
const shopModel = require("../models/shop");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/:shop_id", (req, res, next) => {
    shopModel.findById(req.params.shop_id).populate("list_products")
    .then(shop => {
      res.render("platform/shop", {shop})})
    .catch(next)
})

router.get("/:shop_id/:id" , (req,res,next) => {
    productModel.findById(req.params.id)
    .then(product => {
      res.render("platform/product" , {product})})
      .catch(next)
})



module.exports = router;
