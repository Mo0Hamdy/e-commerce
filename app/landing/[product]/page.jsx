import Image from "next/image";
import AddToCart from "@/components/AddToCart";
async function getProductsByCategory(category) {
  const data = await fetch("https://dummyjson.com/products", {
    next: {
      revalidate: 60,
    },
  });
  if (!data.ok) {
    throw new Error("couldn't find any element");
  }
  const response = await data.json();
  return response.products.filter((element) => element.category === category);
}
export default async function DynamicProduct({ params }) {
  const { product } = await params;
  const returnedProducts = await getProductsByCategory(product);
  const cards = returnedProducts.map((element) => {
    return (
      <div
        key={element.id}
        className="rounded-xl w-72 h-80 md:h-94 p-3 mx-2 shadow-2xl bg-white flex flex-col justify-between shrink-0"
      >
        <Image
          className="hover:scale-105 duration-300 overflow-hidden"
          src={element.images[0]}
          alt={element.title}
          width={264}
          height={240}
          loading="eager"
        />
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
    <div className="py-40 bg-blue-300 min-h-full">
      <h1 className="text-center py-5 text-2xl capitalize">{product}</h1>
      <div className="container m-auto gap-y-10 flex items-start justify-center flex-wrap">
        {cards}
      </div>
    </div>
  );
}
