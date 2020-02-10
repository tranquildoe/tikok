var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const productModel = require("../models/product");

const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const bcrypt = require("bcrypt");

// to add in the  sign up part : .then(createdShop => res.redirect(`/createShop/${createdShop}`))

// Get all the products for Shelves
router.get('/createShop/:id', (req, res, next) => {
    shopModel.findById(req.params.id)
    .then( shop => res.render('/sellers/createItem', {shop}))
})

router.get('/myshelves'), (req, res, next) => {
    productModel.find()
        .then(dbRes => {
            // Put all data into an obj called products:
            res.render('sellers/myShelves',{products: dbRes});
            console.log(dbRes);  
        })
        .catch(next)
};



router.get('/select-items', function(req, res, next) {
    productModel.find({isTemplate : true, })
    .then(templates => res.render('sellers/selectItems', {templates, css: ["select-items"]}))
  });

router.post('/select-items', function(req, res, next) {
    console.log(req.body)
  });
  

module.exports = router;