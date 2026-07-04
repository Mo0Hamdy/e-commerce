"use client";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "@/lib/hooks";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SignUpForm from "@/components/SignUpForm";
import SignInForm from "@/components/SignInForm";
export default function Profile() {
  const [signUp, setSignUp] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: null,
    severity: null,
  });
  const name = useAppSelector((state) => state.cart.firstName);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <div className="flex lg:flex-row gap-20 lg:gap-0 flex-col justify-evenly items-center py-30 px-5 md:py-40  bg-gray-300">
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
            <SignUpForm setSignUp={setSignUp} setSnackbar={setSnackbar} />
          ) : (
            <SignInForm setSnackbar={setSnackbar} />
          )}
        </div>
      ) : (
        <div className="flex flex-col bg-stone-100 py-10 px-5 shadow-gray-500 shadow-lg rounded-xl">
          <Avatar sx={{ bgcolor: blue[300], margin: "auto" }}>{name[0]}</Avatar>
          <p className="text-xl mt-3 text-start">welcome back {name} 👋</p>
          <p className="text-lg mt-3 text-start text-gray-500">
            You're already signed in to your account.
          </p>
          <p className="text-lg mt-1 mb-3 text-start text-gray-500">
            What would you like to do?
          </p>
          <Stack
            direction="column"
            spacing={3}
            sx={{ width: "80%", margin: "auto" }}
          >
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
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
      </Snackbar>
    </div>
  );
}
