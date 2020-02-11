var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const bcrypt = require("bcrypt");

//sign up

router.get("/myshop/signup", (req, res) => {
  res.render("sellers/signup");
});

router.post("/myshop/signup", (req, res, next) => {
  const newSeller = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  const newShop = {
    name: req.body.name
  };

  // if (req.file) user.avatar = req.file.secure_url;
  shopModel;
  if (
    !newSeller.username ||
    !newSeller.username ||
    !newSeller.email ||
    !newSeller.password
  ) {
    res.redirect("/myshop/signup"); // flash
    return;
  } else {
    Promise.all([
      shopModel.findOne({
        name: newShop.name
      }),
      sellerModel.findOne({
        email: newSeller.email
      })
    ])
      .then(dbRes => {
        if (dbRes[0]) {
          console.log("nom déjà pris");
          return res.redirect("/myshop/signup");
        } //flash : ce nom est déjà pris
        if (dbRes[1]) {
          console.log(" a déjà un email");
          return res.redirect("/myshop/signup");
        } //flash : cet email est déjà affilié à une boutique => pour qu'il se login

        const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
        const hashed = bcrypt.hashSync(newSeller.password, salt); // generates a secured random hashed password
        newSeller.password = hashed; // new user is ready for db
        Promise.all([
          shopModel.create(newShop),
          sellerModel.create(newSeller)
        ]).then(dbRes => {
          res.redirect(`/myshop/create-shop/${dbRes[0].id}`);
        });
      })
      .catch(next);
  }
});

//sign in

router.get("/myshop/login", (req, res) => {
  res.render("sellers/signin");
});

router.post("/myshop/login", (req, res, next) => {
  const seller = req.body;
  if (!seller.email || !seller.password) {
    // req.flash("error", "wrong credentials");
    return res.redirect("/myshop/login");
  } else {
    sellerModel
      .findOne({ email: seller.email })
      .then(dbRes => {
        if (!dbRes) {
          // req.flash("error", "wrong credentials");
          console.log("va te sign up");
          return res.redirect("/myshop/login");
        }
        if (bcrypt.compareSync(seller.password, dbRes.password)) {
          const { _doc: clone } = { ...dbRes };
          delete clone.password;
          console.log(req.session)
          req.session.currentUser = clone;
          // req.flash("success", "access granted")
          return res.redirect("/myshop/login");
        } else {
          // req.flash("error", "wrong credentials");
          console.log("mauvais mdp");
          return res.redirect("/auth/login");
        }
      })
      .catch(err => console.log(err));
  }
});

module.exports = router;
