import Image from "next/image";
import { getData } from "@/services/products";
import Modal from "@/components/modal";

export default async function DetailProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getData(
    `${process.env.NEXT_PUBLIC_API_URL}/product/?id=${id}`,
  );

  return (
    <Modal>
      <Image
        className="col-span-2 aspect-square w-full object-cover"
        src={product.image}
        alt={product.name}
        priority
        width={500}
        height={500}
      />
      <div className="bg-white p-4 px-6">
        <h3>{product.name}</h3>
        <p>Price : {product.price}</p>
      </div>
    </Modal>
  );
}
