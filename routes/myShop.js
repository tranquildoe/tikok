var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const productModel = require("../models/product");
const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const uploadCloud = require("../config/cloudinary");

router.get("/create-shop/:id", (req, res, next) => {
  shopModel
    .findById(req.params.id)
    .then(shop =>
      res.render("sellers/createShop", {
        shop,
        scripts: ["createShop"],
        css: ["create-shop"]
      })
    );
});
router.post("/create-shop/:id",uploadCloud.single("image"),
  (req, res, next) => {
    console.log("heye", req.body);
    const {address, phone, description} = req.body;
    // const image = req.file.url;
    shopModel.findByIdAndUpdate(req.params.id, {
      address,
      phone,
      description
    }, {new :true })
    .then(dbRes => {
      debugger
      res.json(dbRes)})
    .catch(next)
     // +image + transformer les input en form dans createShop view
  }
);


router.get("/myshelves/:id",(req, res, next) => {
    shopModel
      .findById(req.params.id, {list_products:1})
      .then(list => { list.populate('list_products').execPopulate()
        .then(items => {res.render('sellers/myShelves.hbs', {items, css:["my-shelves"]}); console.log(items)})
    })
      .catch(next);
  });

//   .findById(req.params.id, {list_products:1}).populate()
//   .execPopulate()

//create items

router.get("/create-item/:shop_id", (req, res, next) => {
    shopModel
    .findById(req.params.shop_id)
      .then(shop => res.render("sellers/createItem", {shop}));
    })

router.post("/create-item/:shop_id", (req, res, next) => {
  const {category, name, price, description } = req.body;
  productModel
    .create({
      category,
      name,
      price,
      description,
      id_shop : req.params.shop_id
    })
    .then(createdProduct => {
        shopModel.findByIdAndUpdate(req.params.shop_id, {$push: {list_products : createdProduct.id}})
        .then(insertedInShop => {
            res.redirect(`/myshop/myshelves/${req.params.shop_id}`)})
    .catch(next);
    })
});

router.get("/select-items", function(req, res, next) {
  productModel
    .find({
      isTemplate: true
    })
    .then(templates =>
      res.render("sellers/selectItems", {
        templates,
        css: ["select-items"]
      })
    );
});

router.post("/select-items", function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
