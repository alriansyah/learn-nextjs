import React from "react";
import Image from "next/image";

type ProductPageProps = {
  params: Promise<{ slug: Array<string> }>;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

async function getData() {
  // const res = await fetch("https://fakestoreapi.com/products");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
    cache: "force-cache",
    // next: { revalidate: 60 },
    next: { tags: ["products"] },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // return data;
  return data.data;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getData();

  console.log("slug:", slug);
  console.log("products :", products);

  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5">
      {/* <h1>{slug ? "Detail Product Page" : "Product Page"}</h1> */}

      {products.length > 0 &&
        products.map((product: Product) => (
          <div
            key={product.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <Image
                className="p-8 rounded-t-lg object-cover h-96 w-full"
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
                  {product.title}
                </h5>
              </a>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
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
