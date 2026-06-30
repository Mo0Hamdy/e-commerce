"use client";
import * as React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { add, addToCart } from "../lib/features/CartSlice";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddToCart({ element }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: null,
    severity: null,
  });
  const { isLoading, loadingProductId } = useAppSelector((state) => state.cart);
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
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({
        open: true,
        message: "Please register first",
        severity: "warning",
      });
      return;
    }
    try {
      await dispatch(addToCart({ element, token })).unwrap();
      dispatch(add({ element }));
      setSnackbar({
        open: true,
        message: "Product Was added to cart successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Network error",
        severity: "error",
      });
    }
  };

  return (
    <div>
      {isLoading && loadingProductId === element.id ? (
        <button className="cursor-pointer bg-primary-light text-white p-1.5 rounded-xl w-22.5">
          <CircularProgress color="white" size={18} />
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="cursor-pointer bg-primary-light text-white p-1.5 rounded-xl"
        >
          Add to cart
        </button>
      )}
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
