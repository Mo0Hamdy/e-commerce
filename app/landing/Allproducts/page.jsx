import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import Link from "next/link";
export default async function AllProducts() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    },7000)
  })
  let response = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error("all products has an error!");
  }
  let data = (await response.json()).products;
  const cards = data.map((element) => {
    return (
      <div
        key={element.id}
        className="rounded-xl w-72 h-94 p-3 mx-10 bg-background-white flex flex-col justify-between shrink-0"
      >
        <Link href={`/landing/Allproducts/${element.id}`}>
          <div className="relative h-60 flex items-center justify-center">
            <Image
              className="max-w-full max-h-full object-contain hover:scale-105 duration-300 overflow-hidden"
              src={element.images[0]}
              alt={element.title}
              fill
              sizes="full"
              loading="lazy"
            />
          </div>
        </Link>
        <h1 className="text-md text-gray-700">{element.title}</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-md text-red-500 font-bold">
            ${element.price}{" "}
            <span className="line-through ms-5 text-gray-500">
              ${Math.round(element.price * 1.2)}
            </span>{" "}
          </h1>
          <AddToCart element={element} />
        </div>
      </div>
    );
  });

  return (
    <div className="py-40 bg-background-dark min-h-full">
      <div className="container m-auto gap-y-10 flex items-start justify-center flex-wrap">
        {cards}
      </div>
    </div>
  );
}
