"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import { getProducts } from "@/lib/actions/products.action";
import Loader from "./Loader";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await getProducts();
      const data = await res.data;
      // @ts-ignore
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("something went wrong. Please try again later.");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div>
      {error && <p>{error}</p>}
      <ProductForm products={products} setProducts={setProducts} />
      <ProductList products={products} />
    </div>
  );
};

export default Products;
