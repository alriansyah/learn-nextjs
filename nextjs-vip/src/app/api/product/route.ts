import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id);

  const dataProduct = [
    { id: 1, name: "Sepatu Baru", price: 100 },
    { id: 2, name: "Sepatu Lama", price: 150 },
    { id: 3, name: "Sepatu Bekas", price: 200 },
  ];

  if (id) {
    const detailProduct = dataProduct.find((item) => item.id === Number(id));
    if (detailProduct) {
      return NextResponse.json({
        status: 200,
        message: "Product by ID",
        data: detailProduct,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Not Found",
      data: {},
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Hello Product API",
    data: dataProduct,
  });
}
