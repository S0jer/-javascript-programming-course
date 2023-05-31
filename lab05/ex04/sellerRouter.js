const express = require('express');
const path = require('path');
const Product = require('./models/Product');

const sellerRouter = express.Router();

sellerRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

sellerRouter.post('/add-product', (req, res) => {
  const newProduct = {
    category: req.body.category,
    subcategory: req.body.subcategory,
    name: req.body.name,
    imageURL: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg",
    properties: req.body.properties.split(',').map(prop => prop.trim()) || ["Super produkt", "Super cena"]
  };

  Product.create(newProduct).then(product => {
    res.redirect('/seller');
  }).catch(err => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });
});

module.exports = sellerRouter;
