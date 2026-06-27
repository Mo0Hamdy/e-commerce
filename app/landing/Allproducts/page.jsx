import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import Link from "next/link";
export default async function AllProducts() {
  const response = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error("all products has an error!");
  }
  const data = (await response.json()).products;
  const productCards = data.map((element) => {
    return (
      <div
        key={element.id}
        className="rounded-xl w-72 h-94 p-3 mx-3 bg-background-white flex flex-col justify-between shrink-0"
      >
        <Link href={`/landing/Allproducts/${element.id}`}>
          <Image
            className="hover:scale-105 duration-300 overflow-hidden"
            src={element.images[0]}
            alt={element.title}
            width={264}
            height={240}
            loading="eager"
          />
        </Link>
        <h2 className="text-md text-gray-700">{element.title}</h2>
        <div className="flex justify-between items-center">
          <p className="text-md text-red-500 font-bold">
            ${element.price}{" "}
            <span className="line-through ms-5 text-gray-500">
              $
              {Math.round(
                element.price * (1 + element.discountPercentage / 100),
              )}
            </span>{" "}
          </p>
          <AddToCart element={element} />
        </div>
      </div>
    );
  });

  return (
    <div className="py-40 bg-background-dark min-h-full">
      <div className="container m-auto gap-y-10 flex items-start justify-center flex-wrap">
        {productCards}
      </div>
    </div>
  );
}
