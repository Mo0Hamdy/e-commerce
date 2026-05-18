import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="bg-linear-to-b from-[#efe7da] to-[#d6c0b3] flex items-center px-2">
      <div className="container m-auto flex items-center flex-col mt-60">
        <h2 className="text-textColor text-3xl md:text-5xl w-full md:w-150 text-center md:leading-14 pb-2">
          Sit back, relax, and let great products impress you
        </h2>
        <Link href="/landing/Allproducts">
          <button className="cursor-pointer bg-black text-white p-3 rounded-xl my-4 md:my-10 font-bold hover:scale-110 duration-300">
            Go to products
          </button>
        </Link>
        <div className="w-full md:w-4/5">
          <Image
            src="/images/shopping-bag-cart.jpg"
            alt=""
            className="rounded-t-4xl"
            loading="eager"
            width={6085}
            height={3423}
          />
        </div>
      </div>
    </div>
  );
}
