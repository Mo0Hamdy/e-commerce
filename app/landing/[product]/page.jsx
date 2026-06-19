import Image from "next/image";
import AddToCart from "@/components/AddToCart";
async function getProducts(cat) {
  const data = await fetch("https://dummyjson.com/products", {
    next: {
      revalidate: 60,
    },
  });
  if (!data.ok) {
    throw new Error("couldn't find any element");
  }
  let response = await data.json();
  return response.products.filter((element) => element.category === cat);
}
export default async function dynamicProduct({ params }) {
  let response = await params;
  
  let returnedProducts = await getProducts(response.product);
  const cards = returnedProducts.map((element) => {
    return (
      <div
        key={element.id}
        className="rounded-xl w-72 h-80 md:h-94 p-3 mx-2 shadow-2xl bg-white flex flex-col justify-between shrink-0"
      >
        <div className="relative h-52 md:h-60 flex items-center justify-center">
          <Image
            className="max-w-full max-h-full object-contain hover:scale-105 duration-300 overflow-hidden"
            src={element.images[0]}
            alt={element.title}
            fill
            sizes="full"
            loading="eager"
          />
        </div>
        <h1 className="text-md text-gray-700">{element.title}</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-md text-red-500 font-bold">
            ${element.price}{" "}
            <span className="line-through ms-5 text-gray-500">
              ${Math.round(element.price * 1.2)}
            </span>{" "}
          </h1>
          {/* <button className="cursor-pointer bg-cyan-800 text-white p-1.5 rounded-xl hover:scale-110 duration-300">
            Add to cart
          </button> */}

             <AddToCart element={element} />

        </div>
      </div>
    );
  });
  return (
    <div className="py-40 bg-blue-300 min-h-full">
      <div className="text-center py-5 text-2xl capitalize">{response.product}</div>
      <div className="container m-auto gap-y-10 flex items-start justify-center flex-wrap">
        {cards}
      </div>
    </div>
  );
}
