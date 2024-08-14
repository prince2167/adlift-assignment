"use server"

import Product from "../../../database/product.model";
import { connectToDatabase } from "../mongoose";

export async function createProducts(data: any) {
    try {
        await connectToDatabase();
        const product = await Product.create(data);
        return { success: true, data: product };
    } catch (error) {
        console.error('Error creating product:', error);
        return { success: false, error: error };
    }
}

export async function getProducts() {
    try {
        await connectToDatabase();
        const products = await Product.find({});
        return { success: true, data: products };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { success: false, error: error };
    }
}