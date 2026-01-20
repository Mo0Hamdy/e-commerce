"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Facebook from "./Skeleton";

export default function PopularAndCheap({ type }) {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const data = await fetch("https://dummyjson.com/products");
      if (!data.ok) {
        throw new Error("couldn't find any element");
      }
      let response = (await data.json()).products;
      setLoading(false);
      if (type === "best") {
        setSelected(response.filter((element) => element.rating >= 4.5));
      } else if (type === "cheap") {
        setSelected(
          response.filter((element) => element.discountPercentage >= 10),
        );
      }
    }
    fetchData().then(() => {
      setLoading(false);
    });
  }, [type]);

  const data = selected.map((element) => {
    return (
      <div
        key={element.id}
        className={`overflow-hidden rounded-xl relative md:w-72 md:h-94 w-64 h-80 p-3 md:mx-10 bg-background-white flex flex-col justify-between ${type === "best" ? "before:absolute before:content-[] before:-top-6.5 before:-left-1.5 before:w-10 before:h-20 before:rounded-s-xl before:bg-accent before:rotate-45" : null}`}
      >
        <span
          className={`absolute top-0 ${type === "best" ? "left-0" : "right-0 bg-accent rounded-bl-xl"} p-1 text-black`}
        >
          {type === "best"
            ? element.rating
            : "-" + Math.round(element.discountPercentage) + "% off"}
        </span>
        <div className="relative h-60 flex items-center justify-center">
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
              $
              {Math.round(
                (element.price * (element.discountPercentage + 100)) / 100,
              )}
            </span>{" "}
          </h1>
          {/* <AddToCart element={element} /> */}
        </div>
      </div>
    );
  });

  return (
    <>
      {!loading ? (
        <div className="flex flex-wrap justify-evenly gap-y-8 md:gap-y-16">{data} </div>
      ) : (
                  // <Facebook />
                  <div className="min-h-100 flex items-center justify-center">
                      
                      <img src="/images/Blocks@1x-1.0s-200px-200px.svg" alt="" />
                  </div>
      )}
    </>
  );
}
