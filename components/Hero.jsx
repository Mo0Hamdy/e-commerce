import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="bg-linear-to-b from-[#d9ffe3] to-[#00c5ff] flex flex-col items-center px-2 pt-48 md:pt-60">
      <h2 className="text-textColor text-3xl md:text-4xl font-semibold w-full md:w-150 text-center md:leading-14 pb-2">
        Sit back, relax, and let great products impress you
      </h2>
      <Link href="/landing/Allproducts">
        <button className="cursor-pointer bg-black text-white p-1.5 md:p-3 rounded-xl my-4 md:my-10 font-bold hover:scale-110 duration-300">
          Go to products
        </button>
      </Link>
      <div className="w-full md:w-4/5">
        <Image
          src="/images/shopping-bag-cart.jpg"
          alt=""
          className="rounded-t-4xl"
          priority
          width={6085}
          height={3423}
        />
      </div>
    </div>
  );
}
