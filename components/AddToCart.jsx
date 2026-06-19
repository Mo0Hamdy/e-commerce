"use client";
import * as React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch } from "../lib/hooks";
import { add } from "../lib/features/CartSlice";

export default function AddToCart({ element }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please register first");
        setSeverity("warning")
        setOpen(true);
      } else {
        dispatch(add({ element }));
        setMessage("Product Was added to cart successfully");
        setSeverity("success")
        setOpen(true);
        let res = await fetch(
          "https://e-commerce-backend-nine-olive.vercel.app/api/cart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
              products: [
                {
                  id: element.id,
                  title: element.title,
                  price: element.price,
                  category: element.category,
                  discount: element.discountPercentage,
                  image: element.images[0],
                  quantity: 1,
                },
              ],
            }),
          },
        );
        const result = await res.json();
        if (!res.ok) {
          console.log(result.message);
        }
      }
    } catch (error) {
      console.log("an error has occurred", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          handleAddToCart();
        }}
        className="cursor-pointer bg-primary-light text-white p-1.5 rounded-xl hover:scale-110 duration-300"
      >
        Add to cart
      </button>
      <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity={severity}>{message} </Alert>
            </Snackbar>
    </div>
  );
}
