"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function AddToWishlist({ element }) {
  const [wishedState, setWishedState] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: null,
    severity: null,
  });
  const handleCloseWishList = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };
  useEffect(() => {
    const currentWished = JSON.parse(localStorage.getItem("wished")) || [];
    const isWished = currentWished.some((item) => item.id === element.id);
    setWishedState(!isWished);
  }, [element.id]);

  return (
    <div>
      {wishedState ? (
        <FavoriteBorderIcon
          sx={{ color: "red" }}
          onClick={() => {
            setWishedState(false);
            const currentWished =
              JSON.parse(localStorage.getItem("wished")) || [];
            const wishedProducts = [...currentWished, element];
            localStorage.setItem("wished", JSON.stringify(wishedProducts));
            setSnackbar({
              open: true,
              message: "Successfully added to wishlist",
              severity: "success",
            });
          }}
        />
      ) : (
        <FavoriteIcon
          sx={{ color: "red" }}
          onClick={() => {
            setWishedState(true);
            const currentWished =
              JSON.parse(localStorage.getItem("wished")) || [];
            const wishedProducts = currentWished.filter(
              (item) => item.id !== element.id,
            );
            localStorage.setItem("wished", JSON.stringify(wishedProducts));
            setSnackbar({
              open: true,
              message: "Successfully removed from wishlist",
              severity: "success",
            });
          }}
        />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseWishList}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
      </Snackbar>
    </div>
  );
}
