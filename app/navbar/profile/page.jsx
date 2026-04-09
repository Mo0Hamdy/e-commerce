"use client";
// import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch } from "@/lib/hooks";
import { changeUser } from "@/lib/features/UserSlice";
export default function Profile() {
  const dispatch = useAppDispatch();
  const [signUp, setSignUp] = useState(true);
  const [profiles, setProfiles] = useState([]);
  
  useEffect(() => {
    setProfiles(JSON.parse(window.localStorage.getItem("user")) || []);
  }, []);
  const handleSignUp = (e) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    dispatch(changeUser(data));
    const updatedProfiles = [...profiles, data];
    setProfiles(updatedProfiles);
    window.localStorage.setItem("user", JSON.stringify(updatedProfiles));
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const foundProfile = profiles.find(
      (profile) =>
        profile.userName == data.userName && profile.password == data.password,
    );
    dispatch(changeUser(foundProfile));
  };

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
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp(e);
            }}
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
            <button
              type="submit"
              className="cursor-pointer bg-accent rounded-md p-2 my-3 hover:scale-110 transition-all duration-300 text-white"
            >
              Sign up
            </button>
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
            onSubmit={(e) => {
              handleSignIn(e);
            }}
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
            <button
              type="submit"
              className="cursor-pointer bg-accent rounded-md p-2 mt-3 hover:scale-110 transition-all duration-300"
            >
              Sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
