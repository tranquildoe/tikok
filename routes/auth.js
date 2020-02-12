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
    !newShop.name ||
    !newSeller.username ||
    !newSeller.email ||
    !newSeller.password
  ) {
    req.flash("error", "Please fill the inputs");
    res.redirect("/myshop/signup")
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
          req.flash("error", "This name already exists");
          return res.redirect("/myshop/signup");
        } 
        if (dbRes[1]) {
          req.flash("error", "This email already exists");
          return res.redirect("/myshop/signup");
        } 

        const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
        const hashed = bcrypt.hashSync(newSeller.password, salt); // generates a secured random hashed password
        newSeller.password = hashed; // new user is ready for db
        shopModel.create(newShop)
          .then(shop => {
            newSeller.shop_id = shop.id
            sellerModel.create(newSeller)
              .then(dbRes => res.redirect(`/myshop/create-shop/${dbRes.shop_id}`))
          })
      })
      .catch(next);
  }
});

//sign in

router.get("/myshop/login", (req, res) => {
  res.render("sellers/signin");
});

router.post("/myshop/login", (req, res, next) => {
  const seller = {
    email: req.body.email,
    password: req.body.password
  };

  sellerModel
  if (!seller.email || !seller.password) {
    req.flash("error", "Please fill everything");
    return res.redirect("/myshop/login");
  } else {
    sellerModel
      .findOne({ email: seller.email })
      .then(dbRes => {
        if (!dbRes) {
          req.flash("error", "You didn't signup with this e-mail");
          return res.redirect("/myshop/login");
        }
        if (bcrypt.compareSync(seller.password, dbRes.password)) {
          const { _doc: clone } = { ...dbRes };
          delete clone.password;
          // console.log(req.session)
          req.session.currentUser = clone;
          req.flash("success", "access garanted")
          return res.redirect(`/myshop/dashboard/${dbRes.shop_id}`);
        } else {
          req.flash("error", "wrong credentials");
          return res.redirect("/myshop/login");
        }
      })
      .catch(err => console.log(err));
  }
});


// seller logout

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


module.exports = router;
