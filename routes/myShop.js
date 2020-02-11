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
    const {address, phone, description} = req.body.shopInfos;
    // const image = req.file.url;
    shopModel.findByIdAndUpdate(req.params.id, {
      address,
      phone,
      description
    }, {new :true })
    .then(dbRes => {
      res.json(dbRes)})
    .catch(next)
     // +image + transformer les input en form dans createShop view
  }
);


router.get("/myshelves/:id",(req, res, next) => {
    shopModel
      .findById(req.params.id, {list_products:1}).populate("list_products")
        .then(shop => {
          res.render('sellers/myShelves.hbs', {shop: shop, css:["my-shelves"],scripts:["myShelves"]})
        })
    // })
      .catch(next);
  });

router.get("/delete-item/:shop_id/:id",(req, res, next) => {
  console.log("heyyyy")
   const removeShopProduct = shopModel.findByIdAndUpdate(req.params.shop_id, {$pull: {list_products: req.params.id}},{new:true});
   const removeProduct= productModel.findByIdAndRemove(req.params.id);
      Promise.all([removeShopProduct, removeProduct])
      .then( dbRes => {
        res.json(dbRes[0])})
      .catch(next);
  });

router.post("/edit-item/:shop_id/:id",(req, res, next) => {
  const {description, name, prix} = req.body
  productModel.findByIdAndUpdate(req.params.id, {description, name, prix})
      .then(updatedProduct => {
        res.json(updatedProduct)})
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
