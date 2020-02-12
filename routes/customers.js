var express = require('express');
var router = express.Router();
const productModel = require("../models/product");
const shopModel = require("../models/shop");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get("/shop/:shop_id", (req, res, next) => {
  shopModel.findById(req.params.shop_id).populate("list_products")
    .then(shop => {
      res.render("platform/shop", {
        shop
      })
    })
    .catch(next)
})

router.get("/:shop_id/:id", (req, res, next) => {
  Promise.all([
      shopModel.findById(req.params.shop_id).limit(4).populate("list_products"),
      productModel.findById(req.params.id)
    ])
    .then(dbRes => {
      res.render("platform/product", {
          shop: dbRes[0],
          product: dbRes[1],
        })
        .catch(next)
    })
})




module.exports = router;