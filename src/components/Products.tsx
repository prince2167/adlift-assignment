"use client";

import { useState } from "react";
import { data } from "../../public/dummyData";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

const Products = () => {
  const [products, setProducts] = useState<any[]>(data);
  return (
    <div>
      <ProductForm products={products} setProducts={setProducts} />
      <ProductList products={products} />
    </div>
  );
};

export default Products;
