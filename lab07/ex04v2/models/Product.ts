import db from "../mongo.config.ts";

interface Product {
  _id: { $oid: string };
  category: string;
  subcategory: string;
  name: string;
  imageURL: string;
  properties: string[];
}

const productCollection = db.collection<Product>("products");

export { productCollection };
