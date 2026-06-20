"use client";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Snackbar from "@mui/material/Snackbar";
import { restore } from "@/lib/features/CartSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Avatar from "@mui/material/Avatar";
import {
  deepPurple,
  deepOrange,
  teal,
  yellow,
  blue,
} from "@mui/material/colors";
export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signUp, setSignUp] = useState(true);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState("");
  const [severity, setSeverity] = useState("");
  const handleClick = () => {
    setOpen(true);
  };
  const name = useAppSelector((state) => state.cart.firstName);

  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handleClose = (reason) => {
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
        "https://e-commerce-backend-nine-olive.vercel.app/api/auth/register",
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
      dispatch(restore({ firstName: result.firstName }));
      setSnack(result.message);
      setSeverity("success");
      handleClick();
      setTimeout(() => {
        router.push("/landing");
      }, 3000);
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
        "https://e-commerce-backend-nine-olive.vercel.app/api/auth/login",
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
      dispatch(restore({ firstName: result.firstName }));
      setSeverity("success");
      setSnack(result.message);
      handleClick();
      setTimeout(() => {
        router.push("/landing");
      }, 2000);
    } catch (error) {
      setSeverity("error");
      setSnack("Network Error");
      handleClick();
    }
  };

  return (
    <div className="flex lg:flex-row gap-20 lg:gap-0 flex-col justify-evenly items-center py-30 px-2 md:pt-60 pb-32 bg-gray-300">
      <Image
        src={!token ? "/images/Sign in-pana.png" : "/images/Welcome-cuate.png"}
        width={450}
        height={450}
        alt="sign in"
        priority
        className="image"
      />
      {!token ? (
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
      ) : (
        <div className="bg-white rounded-xl p-10 w-96">
          <Avatar sx={{ bgcolor: blue[300], margin: "auto" }}>{name[0]}</Avatar>
          <p className="text-xl mt-3 text-start">welcome back {name} 👋</p>
          <p className="text-lg mt-3 text-start text-gray-500">
            You're already signed in to your account.
          </p>
          <p className="text-lg mt-1 text-start text-gray-500">
            What would you like to do?
          </p>
          <Stack direction="column" spacing={3} sx={{ padding: "35px" }}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                window.location.href = "/landing/Allproducts";
              }}
              startIcon={<ShoppingBagOutlinedIcon />}
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                setTimeout(() => {
                  window.location.href = "/navbar/profile";
                }, 2000);
              }}
              variant="outlined"
              color="primary"
              startIcon={<SwitchAccountIcon />}
            >
              Switch user
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                setTimeout(() => {
                  window.location.href = "/landing";
                }, 2000);
              }}
              variant="outlined"
              color="error"
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Stack>
        </div>
      )}
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
