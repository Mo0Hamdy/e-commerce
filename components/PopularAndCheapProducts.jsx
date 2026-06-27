"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function PopularAndCheap({ type }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("couldn't find any element");
        }
        const response = (await res.json()).products;
        setProducts(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const selected =
    type === "best"
      ? products.filter((element) => element.rating >= 4.5)
      : products.filter((element) => element.discountPercentage >= 10);

  const data = selected.map((element) => {
    return (
      <div
        key={element.id}
        className={`overflow-hidden rounded-xl shadow-2xl relative md:w-72 md:h-94 w-64 h-80 p-3 md:mx-10 bg-background-white flex flex-col justify-between ${type === "best" ? "before:absolute before:content-[] before:-top-16 before:-left-5 before:w-20 before:h-40 before:rounded-s-xl before:bg-accent before:rotate-45" : null}`}
      >
        <span
          className={`absolute top-0 ${type === "best" ? "left-0" : "right-0 bg-accent rounded-bl-xl"} p-1 text-black`}
        >
          {type === "best" ? (
            <>
              {" "}
              {element.rating}{" "}
              <StarRateIcon sx={{ color: "white", fontSize: 17 }} />{" "}
            </>
          ) : (
            "-" + Math.round(element.discountPercentage) + "% off"
          )}
        </span>
        <Image
          className="hover:scale-105 duration-300 overflow-hidden"
          src={element.images[0]}
          alt={element.title}
          width={264}
          height={240}
          loading="eager"
        />
        <h1 className="text-md text-gray-700">{element.title}</h1>
        {type === "cheap" && (
          <div className="flex justify-between items-center">
            <h1 className="text-md text-red-500 font-bold">
              ${element.price}{" "}
              <span className="line-through ms-5 text-gray-500">
                $
                {Math.round(
                  (element.price * (element.discountPercentage + 100)) / 100,
                )}
              </span>{" "}
            </h1>
          </div>
        )}
      </div>
    );
  });
  return (
    <>
      {!loading ? (
        <div className="flex flex-wrap justify-evenly gap-y-8 md:gap-y-16">
          {data}{" "}
        </div>
      ) : (
        <div className="min-h-100 flex items-center justify-center">
          <img src="/images/Blocks@1x-1.0s-200px-200px.svg" alt="" />
        </div>
      )}
    </>
  );
}
