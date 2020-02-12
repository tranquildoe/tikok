var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");
const shopModel = require("../models/shop");
const customerModel = require("../models/customer");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// sign up customer

router.get("/customer/signup", (req, res) => {
  res.render("customer/signup");
});

router.post("/customer/signup", (req, res, next) => {
  const newclient = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
    // if (req.file) user.avatar = req.file.secure_url;

    customerModel;
  if (
    !newclient.username ||
    !newclient.email ||
    !newclient.password
  ) {
    req.flash("error", "Please fill the inputs");
    res.redirect("/shopping/customer/signup")
    return;
  } else {
    customerModel
    .findOne({
      email : newclient.email,
    })
    .then(dbRes => {
      if (dbRes) return res.redirect("/shopping/customer/signup"); //
      req.flash("error", "This email already exists");

      const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
      const hashed = bcrypt.hashSync(newclient.password, salt); // generates a secured random hashed password
      newclient.password = hashed; // new user is ready for db
     
      customerModel
        .create({username : newclient.username})
        .then(() => res.redirect("/lol")) // where ?
    })
    .catch(next);
}
});





// display product of a shop 

router.get("/shop/:shop_id", (req, res, next) => {
  shopModel.findById(req.params.shop_id).populate("list_products")
    .then(shop => {
      res.render("platform/shop", {
        shop
      })
    })
    .catch(next)
})

// display one product of a specific shop

router.get("/:shop_id/:id", (req, res, next) => {
  console.log("id product ====>" , req.params.id);
  
  Promise.all([
      shopModel.findById(req.params.shop_id).populate("list_products").limit(4),
      productModel.findById(req.params.id)
    ])
    .then(dbRes => {
      const copy = JSON.parse(JSON.stringify(dbRes[0].list_products))
      const filteredProducts = copy.filter(p => p._id !== req.params.id);

      res.render("platform/product", {
        shop: filteredProducts,
        product: dbRes[1],
      })

    })
    .catch(next)
})




module.exports = router;