import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  category: string;
  subcategory: string;
  name: string;
  imageURL: string;
  properties: string[];
}

const ProductSchema: Schema = new mongoose.Schema({
  category: String,
  subcategory: String,
  name: String,
  imageURL: String,
  properties: [String],
});

export default mongoose.model<IProduct>('Product', ProductSchema);
