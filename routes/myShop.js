var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const productModel = require("../models/product");

router.get('/select-items', function (req, res, next) {
    productModel.find({
            isTemplate: true
        })
        .then(templates => res.render('sellers/selectItems', {
            templates,
            css: ["select-items"]
        }))
});


const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
    res.render("sellers/signup");
});


// Get all the products for Shelves

router.get('/myshelves'), (req, res, next) => {
    productModel.find()
        .then(dbRes => {
            // Put all data into an obj called products:
            res.render('sellers/myShelves', {
                products: dbRes
            });
            console.log(dbRes);
        })
        .catch(next)
};


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


module.exports = router;