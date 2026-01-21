"use client";
// import "../app/globals.css"
import { useState, useEffect } from "react";
import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import Fade from "@mui/material/Fade";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useAppSelector, useAppDispatch, useAppStore } from "../lib/hooks";
import { increase, decrease } from "../lib/features/CartSlice";

// const MenuProps = {
//   PaperProps: {
//     style: {
//       width: 200,
//     },
//   },
// };

export default function Navbar() {
  const dispatch = useAppDispatch();
  function handlePlusClick(id) {
    dispatch(increase({ id }));
  }

  function handleMinusClick(id) {
    dispatch(decrease({ id }));
  }

  const [open, setOpen] = useState(false);
  // const [openSelect, setOpenSelect] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);
  // const [personName, setPersonName] = useState([]);
  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpen(open ? false : true);
  };
  // const theme = useTheme();


  let [names, setNames] = useState([]);
  let [loading, setLoading] = useState(false);
  let [openDraw, setOpenDraw] = useState(false);

  const cartProducts = useAppSelector((state) => {
    return state.cart.cartProducts;
  });
  const defaultProductsCounter = useAppSelector((state) => {
    return state.cart.defaultProductsCounter;
  });

  const DrawerList = (
    <Box
      /*sx={{ maxWidth: 400, padding: "20px" }}*/ className="w-full md:w-[400px] p-5"
      role="presentation"
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-gray-700 text-xl tracking-wide font-bold">
          Shopping cart
        </h3>
        <CloseIcon
          onClick={(event) => {
            event.stopPropagation();
            setOpenDraw(false);
          }}
          style={{ cursor: "pointer", fontSize: "30px" }}
        />
      </div>
      {cartProducts.length == 0 ? (
        <h3>Your Cart is empty</h3>
      ) : (
        <List>
          {cartProducts.map((item) => (
            <div
              className="h-20 mb-4 flex bg-accent-dark rounded-xl gap-3"
              key={item.id}
            >
              <img
                className="w-20 h-20 bg-gray-300 rounded-l-lg"
                src={item.image}
                alt=""
              />
              <div className="info flex flex-col items-start justify-between w-full">
                <h2>{item.title}</h2>
                <div className="flex justify-between w-full mb-2">
                  <div className="count text-center flex items-center">
                    <RemoveIcon
                      onClick={() => {
                        handleMinusClick(item.id);
                      }}
                      style={{
                        fontSize: "18px",
                        color: "#6a7282",
                        cursor: "pointer",
                        border: "1px solid black",
                        borderRadius: "2px",
                        marginRight: "15px",
                      }}
                    />
                    <span>{item.counter}</span>
                    <AddIcon
                      onClick={() => {
                        handlePlusClick(item.id);
                      }}
                      style={{
                        fontSize: "18px",
                        color: "#6a7282",
                        cursor: "pointer",
                        border: "1px solid black",
                        borderRadius: "2px",
                        marginLeft: "15px",
                      }}
                    />
                  </div>
                  <span className="text-gray-700 mr-5">
                    ${item.counter * item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </List>
      )}
    </Box>
  );

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        "https://fakestoreapi.com/products/categories",
      );
      let data = await response.json();
      setLoading(true);
      setNames(data);
    };
    fetchData();
  }, []);

  return (
    <div className="fixed w-full navbar z-10">
      <div className="relative container m-auto bg-primary flex justify-between items-center rounded-full">
        <div className="block md:hidden ms-2">
          <button
            onClick={handleClickAnchor}
            className="me-5 rounded-full bg-black text-white px-4 py-2 font-bold tracking-widest"
          >
            PixelCraft
          </button>
          <Menu
            id="fade-menu"
            slotProps={{
              list: {
                "aria-labelledby": "fade-button",
              },
            }}
            slots={{ transition: Fade }}
            disableScrollLock={true}
            anchorEl={anchorEl}
            open={openAnchor}
            onClose={handleCloseAnchor}
          >
            <MenuItem
              component={Link}
              href="/landing"
              onClick={handleCloseAnchor}
            >
              Pixel Craft
            </MenuItem>
            <MenuItem
              component={Link}
              href="/landing/home"
              onClick={handleCloseAnchor}
            >
              Home
            </MenuItem>
            <MenuItem
              component={Link}
              href="/landing/Allproducts"
              onClick={handleCloseAnchor}
            >
              Products
            </MenuItem>
          </Menu>
        </div>
        <ul className="hidden md:flex items-center ms-2">
          <Link href="/landing">
            <li className="me-3 rounded-full bg-accent-light text-primary-dark px-4 py-2 font-bold tracking-widest ">
              PixelCraft
            </li>
          </Link>
          <Link href="/landing/home">
            <li className="me-3 font-bold text-white">Home</li>
          </Link>
          <Link href="/landing/Allproducts">
            <li className="me-3 font-bold text-white">Products</li>
          </Link>
        </ul>
        <div className="flex items-center">
          <Button
            style={{
              padding: "0",
              margin: "0 20px",
              borderRadius: "20px",
              border: "2px solid #D8DBE0",
            }}
            onClick={handleClick}
          >
            <SearchOutlinedIcon className="text-accent-dark" />
          </Button>
          <div
            onBlur={handleClick}
            className={` ${
              open ? "flex" : "hidden"
            } justify-start absolute left-1/2 -translate-x-1/2 top-16 w-80 sm:w-lg text-gray-600 bg-white rounded-xl px-3 py-3 border-gray-500`}
          >
            <SearchOutlinedIcon style={{ color: "#99a1af" }} />
            <input
              placeholder="search for products"
              type="text"
              className="placeholder:text-gray-400 outline-0 w-full"
            />
          </div>

          <div className="account py-4 px-3 flex cursor-pointer border-s-2 border-gray-300 hover:bg-primary-light duration-300 transition-all">
            <PermIdentityOutlinedIcon className="text-accent-dark" />
            <h4 className="hidden md:block font-bold text-white">Account</h4>
          </div>
          <div
            onClick={() => {
              setOpenDraw(true);
            }}
            className="cart py-4 px-3 flex items-center cursor-pointer border-s-2 border-gray-300 hover:bg-primary-light duration-300 transition-all rounded-e-full"
          >
            <ShoppingCartOutlinedIcon className="text-accent-dark" />
            <h4 className="hidden md:block font-bold text-white">Cart</h4>
            <div>
              <Drawer
                anchor="right"
                open={openDraw}
                onClose={(event) => {
                  event.stopPropagation();
                  setOpenDraw(false);
                }}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "400px",
                    },
                    maxWidth: "400px",
                  },
                }}
              >
                {DrawerList}
              </Drawer>
            </div>
            <span
              className={"rounded-md bg-accent-light text-primary ms-2 px-1"}
              style={{
                display: defaultProductsCounter <= 0 ? "none" : "block",
              }}
            >
              {defaultProductsCounter}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
