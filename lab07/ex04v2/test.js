const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Połącz się z bazą danych
MongoClient.connect('mongodb://your_database_url', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('your_database_name')
    const productsCollection = db.collection('products')

    // Pobieranie strony z formularzem (GET)
    app.get('/', (req, res) => {
      // Zakładając, że masz plik 'form.html' zawierający formularz
      res.sendFile(__dirname + '/form.html')
    })

    // Przetwarzanie formularza (POST)
    app.post('/products', (req, res) => {
      // Dodawanie informacji o produkcie do kolekcji produktów w bazie danych
      productsCollection.insertOne(req.body)
        .then(result => {
          console.log('Product Added')
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    
    // Nasłuchiwanie na określonym porcie
    app.listen(3000, function() {
      console.log('listening on 3000')
    })
  })
  .catch(error => console.error(error))