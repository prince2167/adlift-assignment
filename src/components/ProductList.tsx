import React, { useState, useMemo } from "react";
import FilterDropdown from "./FilterDropdown";
import ProductCard from "./ProductCard";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Product {
  id: string;
  name: string;
  data?: {
    price?: number;
    color?: string;
    capacity?: number;
  };
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedColor, setSelectedColor] = useState<string | "">("");
  const [selectedCapacity, setSelectedCapacity] = useState<number | "">("");

  const uniqueColors = useMemo(() => {
    const colors = new Set(products.map((p) => p.data?.color).filter(Boolean));
    return Array.from(colors);
  }, [products]);

  const uniqueCapacities = useMemo(() => {
    const capacities = new Set(
      products.map((p) => p.data?.capacity).filter(Boolean)
    );
    return Array.from(capacities);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesColor =
        !selectedColor || product.data?.color === selectedColor;
      const matchesCapacity =
        !selectedCapacity ||
        product?.data?.capacity === Number(selectedCapacity);
      return matchesColor && matchesCapacity;
    });
  }, [products, selectedColor, selectedCapacity]);

  // Data for charts
  const colorCounts = useMemo(() => {
    const colorCountMap: Record<string, number> = {};
    filteredProducts.forEach((product) => {
      const color = product.data?.color;
      if (color) {
        colorCountMap[color] = (colorCountMap[color] || 0) + 1;
      }
    });
    return Object.entries(colorCountMap).map(([color, count]) => ({
      color,
      count,
    }));
  }, [filteredProducts]);

  const capacityCounts = useMemo(() => {
    const capacityCountMap: Record<number, number> = {};
    filteredProducts.forEach((product) => {
      const capacity = product.data?.capacity;
      if (capacity !== undefined) {
        capacityCountMap[capacity] = (capacityCountMap[capacity] || 0) + 1;
      }
    });
    return Object.entries(capacityCountMap).map(([capacity, count]) => ({
      capacity: Number(capacity),
      count,
    }));
  }, [filteredProducts]);

  const colorChartData = {
    labels: colorCounts.map(({ color }) => color),
    datasets: [
      {
        label: "Number of Products",
        data: colorCounts.map(({ count }) => count),
        backgroundColor: colorCounts.map(({ color }) => color || "#ccc"), // Use color or fallback
      },
    ],
  };

  const capacityChartData = {
    labels: capacityCounts.map(({ capacity }) => `${capacity} GB`),
    datasets: [
      {
        label: "Number of Products",
        data: capacityCounts.map(({ count }) => count),
        backgroundColor: capacityCounts.map(
          (_, index) =>
            `hsl(${(index / capacityCounts.length) * 360}, 70%, 70%)`
        ),
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products:</h2>

      {/* filters */}
      <div className="mb-4 flex gap-4">
        <FilterDropdown
          label="Filter by Color"
          options={uniqueColors}
          selectedValue={selectedColor}
          onChange={(value) => setSelectedColor(value)}
        />
        <FilterDropdown
          label="Filter by Capacity"
          options={uniqueCapacities.map(String)}
          selectedValue={selectedCapacity.toString()}
          onChange={(value) => setSelectedCapacity(Number(value))}
        />
      </div>

      {/* Product List */}
      <ul className="space-y-4 mt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <strong>Product Not Found</strong>
        )}
      </ul>

      {/* Charts */}
      <div className="my-8 flex gap-4 justify-evenly">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h3 className="text-xl font-semibold mb-4">
            Product Distribution By Color
          </h3>
          <Bar
            data={colorChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Products by Color" },
              },
            }}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h3 className="text-xl font-semibold mb-4">
            Product Distribution By Capacity{" "}
          </h3>
          <Pie
            data={capacityChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Products by Capacity" },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
