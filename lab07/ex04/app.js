"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const buyerRouter_1 = require("./buyerRouter");
const sellerRouter_1 = require("./sellerRouter");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
const uri = "mongodb://user:user@localhost:27017/AGH?authSource=AGH&readPreference=primary&ssl=false&directConnection=true";
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log("MongoDB Connected...");
    app.use('/buyer', buyerRouter_1.buyerRouter);
    app.use('/seller', sellerRouter_1.sellerRouter);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
    .catch((err) => console.log(err));
