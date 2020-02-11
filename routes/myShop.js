var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const productModel = require("../models/product");const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const uploadCloud = require("../config/cloudinary")


const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const bcrypt = require("bcrypt");






router.get('/select-items', function (req, res, next) {
    productModel.find({
            isTemplate: true
        })
        .then(templates => res.render('sellers/selectItems', {
            templates,
            css: ["select-items"]
        }))
});


router.get('/create-shop/:id', (req, res, next) => {
    shopModel.findById(req.params.id)
    .then( shop => res.render('sellers/createShop', {shop, scripts:["createShop"], css:["create-shop"]}))
})
router.patch('/create-shop/:id',uploadCloud.single("image"), (req, res, next) => {
    const {address, phone, description, type} = req.body
    // const image = req.file.url;
    shopModel.findByIdAndUpdate(req.params.id, {address, phone, description,type}) // +image + transformer les input en form dans createShop view
})

router.get('/myshelves/:id'), (req, res, next) => {
    sellerModel.findById(req.params.id).populate('list_products')
    .then (items => res.render('sellers/myShelves', {items}))
    .catch(next)
};

router.post('/create-shop/:id', (req, res, next) => {
    console.log("merde");
    res.send("merde")
});




router.get('/select-items', function (req, res, next) {
    productModel.find({
            isTemplate: true,
        })
        .then(templates => res.render('sellers/selectItems', {
            templates,
            css: ["select-items"]
        }))
});



router.post('/select-items', function (req, res, next) {
    console.log(req.body)
});


//create items

router.get("/createItem", (req, res, next) => {
    productModel.find({
            category: 1
        })
        .then(Products => {
            res.render("sellers/createItem", {
                Products: Products
            });
        })
        .catch(next)
});



router.post('/createItem', (req, res, next) => {
            const {
                category,
                name,
                price,
                description,
            } = req.body;

            productModel
                .create({
                    category,
                    name,
                    price,
                    description,
                })
                    .then((prod) => {
                        res.redirect('/myshop/dashboard');
                    })
                    .catch((next)
                    )
                });

            module.exports = router;