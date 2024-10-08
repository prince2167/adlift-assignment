"use client";

import { createProducts } from "@/lib/actions/products.action";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface ProductListProps {
  products: any[];
  setProducts: any;
}

interface ProductData {
  [key: string]: any;
}

interface Product {
  id: string;
  name: string;
  data: ProductData;
}

const ProductForm = ({ products, setProducts }: ProductListProps) => {
  const [productName, setProductName] = useState<string>("");
  const [productData, setProductData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleDataChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProductData(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const parsedData: ProductData = JSON.parse(productData);
      const newProduct: Product = {
        id: uuidv4(),
        name: productName,
        data: parsedData,
      };
      setProducts([...products, newProduct]);
      await createProducts(newProduct);
      setProductName("");
      setProductData("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Invalid JSON data:", error);
      alert("Please enter valid JSON data");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
      {error && <p>error</p>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Name:
        </label>
        <input
          type="text"
          value={productName}
          onChange={handleNameChange}
          placeholder="Enter product name"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Data (JSON):
        </label>
        <textarea
          value={productData}
          onChange={handleDataChange}
          placeholder='Enter nested JSON data, e.g., {"key": "value"}'
          required
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {isLoading ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};

export default ProductForm;
