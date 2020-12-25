var express = require('express');
var router = express.Router();

const products = require('../routes/products');
router.use('/product', products);

module.exports = router;
