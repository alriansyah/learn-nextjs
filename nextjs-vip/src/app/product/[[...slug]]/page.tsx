import React from "react";

type DetailProductPageProps = {
  params: Promise<{ slug: Array<string> }>;
};

export default async function DetailProductPage({
  params,
}: DetailProductPageProps) {
  const { slug } = await params;
  console.log("slug:", slug);

  return (
    <div>
      <h1>{slug ? "Detail Product Page" : "Product Page"}</h1>
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
