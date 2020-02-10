var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const productModel = require("../models/product");

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

// to add in the  sign up part : .then(createdShop => res.redirect(`/createShop/${createdShop}`))
router.get("/signup", (req, res) => {
    res.render("sellers/signup");
});


// Get all the products for Shelves
router.get('/createShop/:id', (req, res, next) => {
    shopModel.findById(req.params.id)
        .then(shop => res.render('/sellers/createItem', {
            shop
        }))
})

router.get('/myshelves'), (req, res, next) => {
    productModel.find({
            id_store: Schema.Types.ObjectId
        })
        .then(dbRes => {
            // Put all data into an obj called products:
            res.render('sellers/myShelves', {
                products: dbRes
            });
            console.log(dbRes);
        })
        .catch(next)
};



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