var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");
const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next) {
  shopModel.find().limit(6)
  .then(sixShops => res.render('platform/home', {sixShops, css:["home"]}))
});

router.get('/shop/:id', function(req, res, next) {
// req.params.id
  res.render('platform/shop');
});

router.get('/shop/:id/product/:ref', function(req, res, next) {
// req.params.id // can we put 2 : in the url ?
  res.render('platform/product');
});

router.get('/search', function(req, res, next) {
// req.params.id // can we put 2 : in the url ?
  res.render('platform/search');
});

// // get all the collections and Tags
// router.get('/sneakers/collection', (req, res, next) => {
//   Promise.all([
//     sneakersModel.find(),
//     tagModel.find()
//   ])
//       .then(dbRes => {
//           res.render('products', {
//               sneakers: dbRes[0],
//               tags: dbRes[1],
//           });
//           console.log(dbRes[0]);
//       })
//       .catch(next)
// });
// router.get('/sneakers/:cat', (req, res, next) => {
//   Promise.all([
//     // The following line: :cat above makes all after : in the url equal to cat var.
//     // req.params.cat accesses that var
//     sneakersModel.find({category: req.params.cat}),
//     tagModel.find()
//   ])
//       .then(dbRes => {
//           res.render('products', {
//               sneakers: dbRes[0],
//               tags: dbRes[1],
//           });
//           console.log(dbRes[0]);
//       })
//       .catch(next)
// });





module.exports = router;
