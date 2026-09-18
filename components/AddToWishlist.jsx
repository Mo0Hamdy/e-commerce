"use client";
import * as React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { add, addToCart } from "../lib/features/CartSlice";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function AddToWishlist({ element }) {
  const [wished, setWished] = useState(true);
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
  //   const { isLoading, loadingProductId } = useAppSelector((state) => state.cart);
  //   const handleClose = (reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }
  // setSnackbar((prev) => ({
  //   ...prev,
  //   open: false,
  // }));
  //   };

  //   const dispatch = useAppDispatch();
  //   const handleAddToCart = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setSnackbar({
  //         open: true,
  //         message: "Please register first",
  //         severity: "warning",
  //       });
  //       return;
  //     }
  //     try {
  //       await dispatch(addToCart({ element, token })).unwrap();
  //       dispatch(add({ element }));
  //       setSnackbar({
  //         open: true,
  //         message: "Product Was added to cart successfully",
  //         severity: "success",
  //       });
  //     } catch (error) {
  //       setSnackbar({
  //         open: true,
  //         message: "Network error",
  //         severity: "error",
  //       });
  //     }
  //   };

  return (
    <div>
      {wished ? (
        <FavoriteBorderIcon
          sx={{ color: "red" }}
          onClick={() => {
            setWished(true);
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
            setWished(false);
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
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
      </Snackbar>
    </div>
  );
}
