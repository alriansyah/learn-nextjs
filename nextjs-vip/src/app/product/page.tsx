import { getData } from "@/services/products";
import React from "react";
import Link from "next/link";
import Image from "next/image";

type ProductPageProps = {
  params: Promise<{ slug: Array<string> }>;
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getData(`${process.env.NEXT_PUBLIC_API_URL}/product`);

  console.log("slug:", slug);
  console.log("products :", products);

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {/* <h1>{slug ? "Detail Product Page" : "Product Page"}</h1> */}

      {products.length > 0 &&
        products.map((product: Product) => (
          <Link
            href={`/product/detail/${product.id}`}
            key={product.id}
            className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <Image
              className="h-96 w-full rounded-t-lg object-cover p-8"
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
            />

            <div className="p-5">
              <h5 className="truncate text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <button
                  type="button"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </Link>
        ))}

      {slug && (
        <>
          <p>Category: {slug[0]}</p>
          <p>Gender: {slug[1]}</p>
          <p>Id: {slug[2]}</p>
        </>
      )}
    </div>
  );
}
