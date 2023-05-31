const express = require('express');
const path = require('path');
const Product = require('./models/Product');  // Import your model

const buyerRouter = express.Router();

buyerRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'buyer.html'));
});

buyerRouter.get('/products', (req, res) => {
  Product.find({}).then(products => {
    res.send(products);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error retrieving products data');
  });
});

module.exports = buyerRouter;
