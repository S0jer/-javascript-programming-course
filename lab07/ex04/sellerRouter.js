"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const Product_1 = __importDefault(require("./models/Product"));
const sellerRouter = express_1.default.Router();
exports.sellerRouter = sellerRouter;
sellerRouter.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
sellerRouter.post('/add-product', (req, res) => {
    const newProduct = {
        category: req.body.category,
        subcategory: req.body.subcategory,
        name: req.body.name,
        imageURL: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg",
        properties: req.body.properties.split(',').map((prop) => prop.trim()) || ["Super produkt", "Super cena"]
    };
    Product_1.default.create(newProduct).then(product => {
        res.redirect('/seller');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});
