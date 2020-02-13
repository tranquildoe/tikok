var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");
const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const orderModel = require("../models/order");

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next) {
  shopModel.find().limit(6)
  .then(sixShops => res.render('platform/home', {sixShops, css:["home"], scripts:['home']}))
});

function uniquifyArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array.indexOf(array[i]) !== i) {
      array.splice(i, 1);
    }
  }
  return array;
}


router.get('/shopping/search', function(req, res, next) {
  console.log(req.query)
productModel
.find({name: { $regex: req.query.q, $options: "i" }, isTemplate : false}).populate('id_shop')
.then(dbRes => res.json(dbRes))
.catch(next)
});

router.get('/shopping/order-item/:shop_id/:item_id', function(req, res, next) {
  console.log(req.session)
  const cust = req.session.currentUser.id;
  const shop = req.params.shop_id;

  orderModel.findOne({customer_id : cust, shop_id: shop})
  .then (orderExists => {
    console.log(orderExists)
    if (orderExists) {
      orderModel.findOneAndUpdate(orderExists, {$push: {list_products: req.params.item_id}})
      then(dbRes => res.json(dbRes))
    } else { orderModel.create({shop_id: shop,customer_id: cust, list_products: [req.params.item_i]}).then(dbRes => res.json(dbRes))}
  })

  // customerModel.findByIdAndUpdate(, { orders: {$push: {baskets :req.params.item_id }}})
  // .then(dbRes => console.log(dbRes))


router.get('/shopping/category/:cat', function(req, res, next) {
  productModel.find({category : req.params.cat, isTemplate: false}).populate('id_shop')
  .then(products => res.render('platform/category', {products}))
  });

})

module.exports = router;
