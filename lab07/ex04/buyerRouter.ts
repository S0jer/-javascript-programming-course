import express, { Request, Response } from 'express';
import path from 'path';
import Product from './models/Product';

const buyerRouter = express.Router();

buyerRouter.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'buyer.html'));
});

buyerRouter.get('/products', (req: Request, res: Response) => {
  Product.find({}).then(products => {
    res.send(products);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error retrieving products data');
  });
});

export { buyerRouter };

