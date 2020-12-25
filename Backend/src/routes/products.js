const express = require('express');
const route = express.Router();
const ProductController = require('../controllers/products')

route.get('/getProductByProperty', ProductController.getProductByProperties);

route.get('/getHighPricedProductByCategory', ProductController.getHighPricedProductByCategory);

route.get('/getNthHighestPrice', ProductController.getNthHighestPrice);

route.post('/bulkUpload', ProductController.uploadBulkFiles);

module.exports = route;