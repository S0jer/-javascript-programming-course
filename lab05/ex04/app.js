// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const mongoose = require('mongoose');

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// const uri = "mongodb://user:user@localhost:27017/AGH?authSource=AGH&readPreference=primary&ssl=false&directConnection=true";

// mongoose
//   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("MongoDB Connected...");

//     const productSchema = new mongoose.Schema({
//       category: String,
//       subcategory: String,
//       name: String,
//       imageURL: String,
//       properties: [String],
//     });

//     const Product = mongoose.model('Product', productSchema);

//     app.get('/', (req, res) => {
//       res.sendFile(path.join(__dirname, 'public', 'index.html'));
//     });

//     app.get('/products', (req, res) => {
//       Product.find({}).then(products => {
//         res.send(products);
//       }).catch(err => {
//         console.error(err);
//         res.status(500).send('Error retrieving products data');
//       });
//     });
    
//     app.post('/add-product', (req, res) => {
//       const newProduct = {
//         category: req.body.category,
//         subcategory: req.body.subcategory,
//         name: req.body.name,
//         imageURL: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg",
//         properties: req.body.properties.split(',').map(prop => prop.trim()) || ["Super produkt", "Super cena"]
//       };
    
//       Product.create(newProduct).then(product => {
//         res.redirect('/');
//       }).catch(err => {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//       });
//     });

//     const PORT = process.env.PORT || 3000;

//     app.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));


const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const buyerRouter = require('./buyerRouter.js');
const sellerRouter = require('./sellerRouter.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const uri = "mongodb://user:user@localhost:27017/AGH?authSource=AGH&readPreference=primary&ssl=false&directConnection=true";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected...");

    app.use('/buyer', buyerRouter);
    app.use('/seller', sellerRouter);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

