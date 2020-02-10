var express = require('express');
var router = express.Router();

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


module.exports = router;