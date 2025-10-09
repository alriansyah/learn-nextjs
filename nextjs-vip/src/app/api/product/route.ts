import { NextResponse, NextRequest } from "next/server";
import { retrieveData, retriveDataById } from "@/lib/firebase/service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id);

  const dataProduct = [
    {
      id: 1,
      title: "Sepatu Baru",
      price: 100,
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a80d1905-5296-4aa9-855a-1d617e3c98f6/AIR+FORCE+1+LOW+RETRO+PRM.png",
    },
    {
      id: 2,
      title: "Sepatu Lama",
      price: 150,
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8402dfb2-01b5-4b10-bffb-742d6e327d9b/NIKE+AVA+ROVER.png",
    },
    {
      id: 3,
      title: "Sepatu Bekas",
      price: 200,
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/64bf6a02-62db-4b07-99b5-da0f803261dd/LBJ+NXXT+GENISUS+QS+EP.png",
    },
  ];

  if (id) {
    const detailProduct = await retriveDataById("products", id);
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

  const products = await retrieveData("products");

  return NextResponse.json({
    status: 200,
    message: "Hello Product API",
    data: products,
  });
}
