var express = require('express');
var router = express.Router();


const mongoose = require("mongoose");
const productModel = require("../models/product");


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
                    return res.redirect("/myshop/signup")
                } //flash : ce nom est déjà pris
                if (dbRes[1]) {
                    console.log(" a déjà un email")
                    return res.redirect("/myshop/signup")
                } //flash : cet email est déjà affilié à une boutique => pour qu'il se login 
                
                    const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
                    const hashed = bcrypt.hashSync(newSeller.password, salt); // generates a secured random hashed password
                    newSeller.password = hashed // new user is ready for db
                    Promise.all([
                        shopModel.create(newShop), sellerModel.create(newSeller)])
                        .then(dbRes => {res.redirect(`/myshop/createShop/${dbRes[0].id}`)})
                }
            )
            .catch(next)
    }})

//sign in

router.get("/myshop/login", (req, res) => {
    res.render("sellers/signin");
  });

  router.post("/myshop/login", (req, res, next) => {
    const {email, password} = req.body;
 
    if (!email || !password) {
      // one or more field is missing
      return res.redirect("/myshop/login");
    }
    sellerModel
      .findOne({
        email: email
      })
      .then(dbRes => {
        if (!dbRes) {
          // no user found with this email, flsh : wrong credentials
          return res.redirect("/myshop/login")
        }
        // user has been found in DB !
        if (bcrypt.compareSync(password, dbRes.password)) {
          // req.session.currentUser = user;
          // encryption says : password match succes
          const {
            _doc: clone
          } = {
            ...dbRes
          }; // make a clone of db user
  
          delete clone.password; // remove password from clone
          // // console.log(clone);
  
          req.session.currentUser = clone; // user is now in session... until session.destroy
          return res.redirect("/");
  
  
        } else {
          // encrypted password match failed
  
          return res.redirect("/myshop/login"); // wrong credential
        }
      })
      .catch(next);
  });


module.exports = router;
