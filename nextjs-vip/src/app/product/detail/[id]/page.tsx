import Image from "next/image";
import { getData } from "@/services/products";

export default async function DetailProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(
    `${process.env.NEXT_PUBLIC_API_URL}/product/?id=${id}`,
  );

  // console.log("params :", params);

  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto w-1/2 border border-gray-700">
        <Image
          className="col-span-2 aspect-square w-full object-cover"
          src={data.image}
          alt={data.name}
          width={500}
          height={500}
          loading="lazy"
        />
        <div className="bg-white p-4 px-6">
          <h3>{data.name}</h3>
          <p>Price : {data.price}</p>
        </div>
      </div>
    </div>
  );
}
