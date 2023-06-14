"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyerRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const Product_1 = __importDefault(require("./models/Product"));
const buyerRouter = express_1.default.Router();
exports.buyerRouter = buyerRouter;
buyerRouter.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'buyer.html'));
});
buyerRouter.get('/products', (req, res) => {
    Product_1.default.find({}).then(products => {
        res.send(products);
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving products data');
    });
});
