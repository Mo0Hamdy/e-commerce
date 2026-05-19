"use client";
import Image from "next/image";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useAppDispatch } from "@/lib/hooks";
import Snackbar from "@mui/material/Snackbar";
import { changeUser } from "@/lib/features/UserSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Profile() {
  const dispatch = useAppDispatch();
  const [signUp, setSignUp] = useState(true);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState("");
  const [severity, setSeverity] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const res = await fetch(
        "https://e-commerce-backend-production-1.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.userName,
            password: data.password,
          }),
        },
      );
      const result = await res.json();

      if (!res.ok) {
        setSeverity("warning");
        setSnack(result.message);
        handleClick();
        return;
      }
      localStorage.setItem("token", result.token);
      dispatch(changeUser({ firstName: result.firstName }));
      setSnack(result.message);
      setSeverity("success");
      handleClick();
    } catch (error) {
      setSeverity("error");
      setSnack("Network Error");
      handleClick();
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const res = await fetch(
        "https://e-commerce-backend-production-1.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.userName,
            password: data.password,
          }),
        },
      );
      const result = await res.json();
      if (!res.ok) {
        setSeverity("warning");
        setSnack(result.message);
        handleClick();
        return;
      }
      localStorage.setItem("token", result.token);
      dispatch(changeUser({ firstName: result.firstName }));
      setSeverity("success");
      setSnack(result.message);
      handleClick();
    } catch (error) {
      setSeverity("error");
      setSnack("Network Error");
      handleClick();
    }
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
              placeholder="email"
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
              placeholder="email"
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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity}>{snack} </Alert>
      </Snackbar>
    </div>
  );
}
