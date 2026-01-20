import Link from "next/link";
export default function Hero() {
  return (
    <div className="bg-primary-light flex items-center px-2">
      <div className="container m-auto flex items-center flex-col mt-64">
        <h2 className="text-textColor text-3xl md:text-5xl w-full md:w-150 text-center md:leading-14 pb-2">
          Sit back, relax, and let great products impress you
        </h2>
        <p className="text-textColor-light text-xl md:text-2xl w-full md:w-160 px-2 text-center md:leading-10 pt-2">
          Because boring is never an option. Shop smart, live stylish, and let
          your home speak volumes.
        </p>
        <Link href="/landing/Allproducts">
          <button className="cursor-pointer bg-black text-white p-3 rounded-xl my-4 md:my-10 font-bold hover:scale-110 duration-300">
            Go to products
          </button>
        </Link>
        <img
          className="rounded-t-4xl w-full md:w-4/5"
          src="/images/landing2.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
