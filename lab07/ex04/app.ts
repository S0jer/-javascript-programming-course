import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import Product from './models/Product';
import { buyerRouter } from './buyerRouter';
import { sellerRouter } from './sellerRouter';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const uri = "mongodb://user:user@localhost:27017/AGH?authSource=AGH&readPreference=primary&ssl=false&directConnection=true";

mongoose
  .connect(uri)
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
