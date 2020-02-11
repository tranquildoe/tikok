var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const productModel = require("../models/product");const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const uploadCloud = require("../config/cloudinary")


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




router.get('/select-items', function(req, res, next) {
    productModel.find({isTemplate : true, })
    .then(templates => res.render('sellers/selectItems', {templates, css: ["select-items"]}))
  });


router.post("/signup", (req, res, next) => {
    const newSeller = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    const newShop = {
        name: req.body.name
    }


    // if (req.file) user.avatar = req.file.secure_url;
    shopModel
    if (!newSeller.username || !newSeller.username || !newSeller.email || !newSeller.password) {
        res.redirect("/myshop/signup"); // flash
        return;

    } else {

        Promise.all([
                shopModel.findOne({
                    name: newShop.name,
                }),
                sellerModel.findOne({
                    email: newSeller.email,
                })
            ])
            .then(dbRes => {
                if (dbRes[0]) {
                    console.log("nom déjà pris")
                    return res.redirect("/signup")
                } //flash : ce nom est déjà pris
                if (dbRes[1]) {
                    console.log(" a déjà un email")
                    return res.redirect("/signup")
                } //flash : cet email est déjà affilié à une boutique => pour qu'il se login 
                
                    const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
                    const hashed = bcrypt.hashSync(newSeller.password, salt); // generates a secured random hashed password
                    newSeller.password = hashed // new user is ready for db
                    Promise.all([
                        shopModel.create(newShop), sellerModel.create(newSeller)])
                        .then(() => res.redirect("/login"))
                }
            )
            .catch(next)
    }})


//         sellerModel.findOne({email: newSeller.email,})
//         .then(dbRes => {
//             if (dbRes) return res.redirect("/signup");

//             const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
//             const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
//             user.password = hashed; // new user is ready for db

//             sellerModel
//                 .create(newSeller)
//                 .then(() => res.redirect("/login"))

//         })
//         .catch(next);
// })

router.post('/select-items', function(req, res, next) {
    console.log(req.body)
  });
  

module.exports = router;