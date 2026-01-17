"use client";
import * as React from "react";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAppSelector, useAppDispatch, useAppStore } from "../lib/hooks";
import { add } from "../lib/features/CartSlice";
export default function AddToCart({ element }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const dispatch = useAppDispatch();
  function handleAddClick() {
    dispatch(add({ element }));
  }

  return (
    <div>
      <button
        onClick={() => {
          handleClick();
          handleAddClick();
        }}
        className="cursor-pointer bg-cyan-800 text-white p-2 rounded-xl hover:scale-110 duration-300"
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
            minWidth: "300px",
          },
        }}
        anchorOrigin={{ horizontal: `center`, vertical: `top` }}
        message="Element was added to cart successfully"
      />
    </div>
  );
}
