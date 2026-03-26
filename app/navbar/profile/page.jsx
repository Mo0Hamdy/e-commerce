"use client";
import Link from "next/link";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Profile() {
  return (
    <div className="flex md:flex-row flex-col justify-evenly items-center py-30 px-2 md:pt-60 pb-32 bg-gray-300">
      <Image
        src="/images/Sign in-pana.png"
        width={500}
        height={500}
        alt="sign in"
        priority
        className="image px-4"
      />
      <div className="form">
        <form
          action=""
          className="flex flex-col bg-stone-100 items-center p-10 shadow-gray-500 shadow-lg rounded-xl"
        >
          <AccountCircleIcon
            sx={{
              width: "100px",
              height: "100px",
              color: "gray",
            }}
          />
          <input
            type="email"
            className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
            placeholder="enter username"
          />
          <input
            type="password"
            className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
            placeholder="enter password"
          />
          {/* <input type="file" className="bg-teal-500 rounded-md" /> */}
          <Link href="/landing">
            <button
              type="submit"
              className="cursor-pointer bg-accent rounded-md p-1 mt-3 hover:scale-110 transition-all duration-300"
            >
              Sign in
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
