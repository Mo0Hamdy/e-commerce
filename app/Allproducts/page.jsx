import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import AddToWishlist from "@/components/AddToWishlist";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
        className="rounded-xl w-72 h-96 p-3 mx-3 bg-background-white flex flex-col justify-between shrink-0"
      >
        <Link href={`/Allproducts/${element.id}`}>
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
        <div className="flex justify-between my-2">
          <div className="flex">
            <StarIcon style={{ color: "#F59E0B" }} />
            <p className="ms-2 text-gray-700 font-bold">{element.rating}</p>
          </div>
          <p className="text-md text-red-400 font-bold">
            ${element.price}{" "}
            <span className="line-through ms-5 text-gray-500">
              $
              {(element.price * (1 + element.discountPercentage / 100)).toFixed(
                2,
              )}
            </span>{" "}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <AddToCart element={element} />
          <AddToWishlist/>
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
