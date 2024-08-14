import { Schema, models, model, Document } from "mongoose"

export interface ProductData {
    [key: string]: any;
}

export interface Product extends Document {
    id: string;
    name: string;
    data: ProductData;
    createdAt: Date;
}

const ProductSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: false },
    createdAt: { type: Date, default: Date.now }
})

const Product = models.Product || model("Product", ProductSchema)

export default Product;