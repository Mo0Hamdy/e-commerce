"use client";
import * as React from "react";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch } from "../lib/hooks";
import { add } from "../lib/features/CartSlice";
export default function AddToCart({ element }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

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
        setOpen(true);
      } else {
        dispatch(add({ element }));
        setMessage("Product Was added to cart successfully");
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
        className="cursor-pointer bg-primary-light text-white p-2 rounded-xl hover:scale-110 duration-300"
      >
        Add to cart
      </button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#1e293b",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            minWidth: "341px",
            position: "absolute",
            textAlign:"center",
            top: { xs: "70px", sm: "70px" },
          },
        }}
        anchorOrigin={{ horizontal: `center`, vertical: `top` }}
        message={message}
      />
    </div>
  );
}
