var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");

router.get('/select-items', function(req, res, next) {
    productModel.find({isTemplate : true})
    .then(templates => res.render('sellers/selectItems', {templates, css: ["select-items"]}))
  });
  

module.exports = router;
