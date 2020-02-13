var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");
const shopModel = require("../models/shop");
const customerModel = require("../models/customer");
const bcrypt = require("bcrypt");


// sign up customer

router.get("/signup", (req, res) => {
  res.render("customer/signup");
});

router.post("/signup", (req, res, next) => {
  const newClient = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

    // if (req.file) newClient.avatar = req.file.secure_url;
  if (
    !newClient.username ||
    !newClient.email ||
    !newClient.password
  ) {
    req.flash("error", "Please fill all the inputs");
    res.redirect("/shopping/signup")
    return;
  } else {
    customerModel
    .findOne({
      email : newClient.email,
    })
    .then(dbRes => {
      if (dbRes) return res.redirect("/shopping/signup"); //
      req.flash("error", "This email already exists");
      const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
      const hashed = bcrypt.hashSync(newClient.password, salt); // generates a secured random hashed password
      newClient.password = hashed; // new newClient is ready for db
      customerModel
        .create(newClient)
        .then(() => res.redirect("/home")) // where ?
  })
    .catch(next);
}});


//sign in customer

router.get("/login", (req, res) => {
  res.render("customer/signin");
});


router.post("/login", (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    req.flash("error", "Please fill everything");
    return res.redirect("/shopping/login");
  }

  customerModel
    .findOne({
      email: user.email
    })
    .then(dbRes => {
      if (!dbRes) {
        req.flash("error", "No user found with this e-mail");
        return res.redirect("/shopping/login");
      }
  
      if (bcrypt.compareSync(user.password, dbRes.password)) {
  
        const {
          _doc: clone
        } = {
          ...dbRes
        }; 
        delete clone.password;
        req.session.currentUser = clone;
        return res.redirect("/home");
      } else {
        req.flash("error", "wrong credentials");

        return res.redirect("/shopping/login");
      }
    })
    .catch(next);
});

// customer logout

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/home");
  });
});

// display products of a shop 

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

router.get("/shop/:shop_id/:id", (req, res, next) => {
  console.log("id product ====>" , req.params.id);
  
  Promise.all([
      shopModel.findById(req.params.shop_id).populate("list_products").limit(4),
      productModel.findById(req.params.id)
    ])
    .then(dbRes => {
      const copy = JSON.parse(JSON.stringify(dbRes[0].list_products))
      const filteredProducts = copy.filter(p => p._id !== req.params.id);

      res.render("platform/product", {
        shop: dbRes[0],
        otherProducts: filteredProducts,
        product: dbRes[1],
        scripts: ["product"]})

    })
    .catch(next)
})

module.exports = router;