import React from "react";

interface Product {
  id: string;
  name: string;
  data?: {
    price?: number;
    color?: string;
    capacity?: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      {product.data ? (
        <>
          {product.data.price && (
            <div className="mb-2">
              <strong className="text-gray-700">Price:</strong>{" "}
              <span className="text-gray-900">${product.data.price}</span>
            </div>
          )}
          {product.data.color && (
            <div className="mb-2">
              <strong className="text-gray-700">Color:</strong>{" "}
              <span className="text-gray-900">{product.data.color}</span>
            </div>
          )}
          {product.data.capacity && (
            <div>
              <strong className="text-gray-700">Capacity:</strong>{" "}
              <span className="text-gray-900">{product.data.capacity} GB</span>
            </div>
          )}
        </>
      ) : (
        <div>
          <strong className="text-gray-700">Data:</strong>{" "}
          <span className="text-gray-900">NA</span>
        </div>
      )}
    </li>
  );
};

export default ProductCard;
