export const getData = async (url: string) => {
  // const res = await fetch("https://fakestoreapi.com/products");
  const res = await fetch(`${url}`, {
    // cache: "force-cache",
    // next: { revalidate: 60 },
    next: { tags: ["products"] },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // return data;
  return data.data;
};
