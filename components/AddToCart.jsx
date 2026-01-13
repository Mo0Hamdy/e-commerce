"use client";
export default function AddToCart({element}) {
  return (
    <button
      onClick={() => {
        console.log(element.title);
      }}
      className="cursor-pointer bg-cyan-800 text-white p-2 rounded-xl hover:scale-110 duration-300"
    >
      Add to cart
    </button>
  );
}
