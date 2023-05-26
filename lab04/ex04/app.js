const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/products', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/products.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading products data');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/add-product', (req, res) => {
  fs.readFile('./data/products.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
          let products = JSON.parse(data);
          const maxId = Math.max(...products.map(p => p.id));
          const newId = maxId + 1;
          
          const newProduct = {
              id: newId,
              category: req.body.category,
              subcategory: req.body.subcategory,
              name: req.body.name,
              imageURL: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg",
              properties: req.body.properties.split(',').map(prop => prop.trim()) || ["Super produkt", "Super cena"]
          };

          products.push(newProduct);

          fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
              if (err) {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
              } else {
                  res.redirect('/');
              }
          });
      }
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
