var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
    res.render("sellers/signup");
});
=======
const productModel = require("../models/product")

// Get all the products for Shelves

router.get('/myshelves'), (req, res, next) => {
    productModel.find()
        .then(dbRes => {
            // Put all data into an obj called products:
            res.render('sellers/myShelves',{products: dbRes});
            console.log(dbRes);  
        })
        .catch(next)
};
>>>>>>> 8fa441ea7e2eb6f730e65e158842910db329b9e4




router.post("/signup", (req, res, next) => {
    const user = req.body;

    // if (req.file) user.avatar = req.file.secure_url;

    if (!user.name /* || !user.username || !user.email || !user.password*/) {
        res.redirect("/myshop/signup");
        return;

    } else {

        shopModel
            .findOne({
                name: user.name,
            })
            .then(dbRes => {
                if (dbRes) return res.redirect("/signup"); //

                shopModel
                    .create(user)
                    .then(() => res.redirect("/signin"))

                // .catch(dbErr => console.log(dbErr));
            })
            .catch(next);
        }

        // sellerModel
        // .findOne({
        //     email: user.email,
        // })
        // .then(dbRes => {
        //     if (dbRes) return res.redirect("/signup");

        //     const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
        //     const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
        //     user.password = hashed; // new user is ready for db

        //     sellerModel
        //         .create(user)
        //         .then(() => res.redirect("/signin"))

        // })
        // .catch(next);
})


module.exports = router;