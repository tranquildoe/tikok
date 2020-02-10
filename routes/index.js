var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next) {
  res.render('platform/home');
});

router.get('/shop/:id', function(req, res, next) {
// req.params.id
  res.render('platform/shop');
});

router.get('/shop/:id/product/:ref', function(req, res, next) {
// req.params.id // can we put 2 : in the url ?
  res.render('platform/product');
});

router.get('/search', function(req, res, next) {
// req.params.id // can we put 2 : in the url ?
  res.render('platform/search');
});





module.exports = router;
