"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Profile() {
  let profiles = JSON.parse(localStorage.getItem("user")) || [];
  const [signUp, setSignUp] = useState(true);
  const handleSignUp = (e) => {
    // e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    profiles.push(data)
    localStorage.setItem("user", JSON.stringify(profiles))
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const foundProfile = profiles.find((profile) =>
      (profile.userName == data.userName && profile.password == data.password)
    )
    console.log(foundProfile)
  }

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
        {signUp ? (
          <form
            onSubmit={handleSignUp}
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
              required
              type="text"
              name="firstName"
              placeholder="first name"
              className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
            />
            <input
              required
              type="text"
              name="lastName"
              placeholder="last name"
              className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
            />
            <input
              required
              type="email"
              name="userName"
              className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
              placeholder="username"
            />
            <input
              required
              type="password"
              name="password"
              className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
              placeholder="password"
            />
            <Link href="/landing">
            <button
              type="submit"
              className="cursor-pointer bg-accent rounded-md p-2 my-3 hover:scale-110 transition-all duration-300 text-white"
            >
              Sign up
            </button>
            </Link>
            <p>
              Already have an account?{" "}
              <span
                className="text-accent-dark cursor-pointer"
                onClick={() => {
                  setSignUp(false);
                }}
              >
                sign in
              </span>
            </p>
          </form>
        ) : (
          <form
            onSubmit={handleSignIn}
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
              required
              type="email"
              name="userName"
              className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
              placeholder="username"
            />
            <input
              required
              type="password"
              name="password"
              className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
              placeholder="password"
            />
            {/* <Link href="/landing"> */}
            <button
              type="submit"
              className="cursor-pointer bg-accent rounded-md p-2 mt-3 hover:scale-110 transition-all duration-300"
            >
              Sign in
            </button>
            {/* </Link> */}
          </form>
        )}
      </div>
    </div>
  );
}
