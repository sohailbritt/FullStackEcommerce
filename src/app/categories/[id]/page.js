"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Skeleton component for loading state
const ProductSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden w-[300px] animate-pulse">
    <div className="aspect-[4/3] bg-gray-200 rounded mb-4" />
    <div className="space-y-2">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-8 bg-gray-200 rounded w-8" />
      </div>
    </div>
  </div>
);

export default function CategoryProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products?categoryId=${id}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-[100px]">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {loading
            ? [...Array(8)].map((_, index) => <ProductSkeleton key={index} />)
            : products.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="group relative w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={
                          product.imageurl ||
                          "https://via.placeholder.com/400x300"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                        <p className="text-blue-600 font-semibold text-sm">
                          New
                        </p>
                      </div>
                      <div className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                        <p className="text-white font-semibold text-sm">-20%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                        {product.description || "No description available"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 font-bold text-lg">
                          ₹{product.price.toFixed(2)}
                        </p>
                        <p className="text-gray-400 text-sm line-through">
                          ₹{(product.price * 1.2).toFixed(2)}
                        </p>
                      </div>
                      <div className="group-hover:translate-x-1 transition-transform duration-300">
                        <div className="bg-blue-600 text-white p-2 rounded-lg shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < 4 ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">(4.0)</span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
