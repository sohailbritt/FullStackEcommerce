"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";

// Skeleton component for loading state
const ProductSkeleton = () => (
  <div className="group relative w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] overflow-hidden rounded-xl bg-white shadow-lg animate-pulse">
    <div className="aspect-[4/3] overflow-hidden bg-gray-200" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-6 w-2/3 bg-gray-300 rounded mb-2" />
        <div className="flex justify-between items-center">
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  // const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.replace("/signin");
    //   return;
    // }
    console.log(isAuthenticated);
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`
          : "/api/products";

        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-[#00eaa0] h-[500px] mt-16">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to Our Store
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Discover amazing products at unbeatable prices. Shop now and enjoy
            exclusive deals!
          </p>
          <div className="flex gap-4">
            <Link
              href="/categories"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Categories
            </Link>
            {!isAuthenticated && (
              <Link
                href="/signin"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              id: "0b1b77bd-2094-4deb-a3ea-b2f34703755f",
              category: "Electronics",
              link: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
            },
            {
              id: "45a31b34-a5a8-4c83-95da-624110f3ae00",
              category: "Fashion",
              link: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500",
            },
            {
              id: "ca9ceab5-90dc-4226-9324-062c63d01b65",
              category: "Home & Kitchen",
              link: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500",
            },
            {
              id: "870a19df-941a-48d3-91a8-56657220f8b3",
              category: "Books",
              link: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
            },
            {
              id: "f6388c15-5e3f-4d11-b8c2-a8efc613cc39",
              category: "Sports & Outdoors",
              link: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500",
            },
          ].map((item, index) => (
            <Link
              key={index}
              href={`/categories/${item.id}`}
              className="group relative h-40 rounded-xl overflow-hidden"
            >
              <img
                src={item.link}
                alt={item.category}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white font-semibold text-lg">
                  {item.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Products
        </h2>
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

      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Delivery",
                description:
                  "Get your products delivered at your doorstep within 24 hours",
                icon: "🚚",
              },
              {
                title: "Secure Payments",
                description: "We ensure secure payment with PCI DSS compliance",
                icon: "🔒",
              },
              {
                title: "24/7 Support",
                description: "Round the clock support for any of your queries",
                icon: "💬",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Stay updated with our latest products and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
