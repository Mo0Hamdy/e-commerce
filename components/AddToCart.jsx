"use client";
import * as React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch } from "../lib/hooks";
import { add } from "../lib/features/CartSlice";

export default function AddToCart({ element }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: null,
    severity: null,
  });

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const dispatch = useAppDispatch();
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSnackbar({
          open: true,
          message: "Please register first",
          severity: "warning",
        });
      } else {
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
          setSnackbar({
            open: true,
            message: result.message,
            severity: "error",
          });
        } else {
          dispatch(add({ element }));
          setSnackbar({
            open: true,
            message: "Product Was added to cart successfully",
            severity: "success",
          });
        }
      }
    } catch (error) {
      setSnackbar({ open: true, message: error, severity: "error" });
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="cursor-pointer bg-primary-light text-white p-1.5 rounded-xl hover:scale-110 duration-300"
      >
        Add to cart
      </button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
      </Snackbar>
    </div>
  );
}
