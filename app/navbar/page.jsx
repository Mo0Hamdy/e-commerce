"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled, alpha } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import Lottie from "lottie-react";
import sleepingCat from "../../animations/Sleeping Cat Breathing Loop.json";

import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { restore, increase, decrease } from "../../lib/features/CartSlice";
export default function Navbar() {
  const dispatch = useAppDispatch();
  const { cartProducts, defaultProductsCounter, firstName } = useAppSelector(
    (state) => {
      return state.cart;
    },
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) return;
    const getData = async () => {
      if (token) {
        try {
          const res = await fetch(
            "https://e-commerce-backend-nine-olive.vercel.app/api/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (!res.ok) {
            dispatch(restore({ firstName: "Account" }));
            localStorage.removeItem("token");
            return;
          }
          const result = await res.json();
          if (result && result.firstName) {
            try {
              const res2 = await fetch(
                "https://e-commerce-backend-nine-olive.vercel.app/api/cart",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              if (!res2.ok) {
                dispatch(
                  restore({ firstName: "Account", products: [], counter: 0 }),
                );
                return;
              }

              const result2 = await res2.json();
              if (result2) {
                let counter = result2.products.reduce(
                  (acc, curr) => acc + Number(curr.quantity),
                  0,
                );
                dispatch(
                  restore({
                    firstName: result.firstName,
                    products: result2.products,
                    counter: counter,
                  }),
                );
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            dispatch(restore({ firstName: "Account" }));
          }
        } catch (err) {
          dispatch(restore({ firstName: "Account" }));
        }
      } else {
        dispatch(restore({ firstName: "Account" }));
      }
    };

    getData();
  }, [dispatch, firstName]);

  useEffect(() => {
    const catFetch = async () => {
      try {
        const cats = await categories();
        setCATS(cats);
      } catch (error) {
        throw new Error(error);
      }
    };
    catFetch();
  }, []);

  async function handlePlusMinusClick(id, amount) {
    const token = localStorage.getItem("token");
    const product = await fetch(
      "https://e-commerce-backend-nine-olive.vercel.app/api/cart",
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          amount: amount,
        }),
      },
    );
    if (product.ok) {
      if (amount == 1) dispatch(increase({ id }));
      else dispatch(decrease({ id }));
    }
  }

  const [visible, setVisible] = useState("none");
  const [CATS, setCATS] = useState([]);

  const categories = async () => {
    let data = await fetch("https://dummyjson.com/products", {
      next: {
        revalidate: 60,
      },
    });
    if (!data.ok) {
      throw new Error("couldn't find any element");
    }
    let response = await data.json();
    return [...new Set(response.products.map((element) => element.category))];
  };
  /**
   * main menu event handlers and state controls
   */
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);
  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpen(open ? false : true);
  };

  const [openDraw, setOpenDraw] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  /**
   * nested menu event handlers and state controls
   */

  const [anchorEl2, setAnchorEl2] = useState(null);
  const [open2, setOpen2] = useState(false);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
    setOpen2(open2 ? false : true);
  };
  const handleClose = () => {
    setAnchorEl2(null);
  };

  let cartMenu = CATS.map((element, index) => {
    return (
      <ListItemButton
        component={Link}
        key={index}
        href={`/landing/${element}`}
        selected
        aria-current="page"
      >
        <ListItemText primary={element} />
      </ListItemButton>
    );
  });

  let cartMenuSm = CATS.map((element, index) => {
    return (
      <Link key={index} href={`/landing/${element}`}>
        <MenuItem disableRipple>{element}</MenuItem>
      </Link>
    );
  });

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: "rgb(55, 65, 81)",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
          ...theme.applyStyles("dark", {
            color: "inherit",
          }),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[300],
      }),
    },
  }));

  const DrawerList = (
    <Box className="w-full md:w-100 p-5" role="presentation">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-gray-700 text-xl tracking-wide font-bold">
          Shopping cart
        </h3>
        <Fab
          sx={{ width: "40px", height: "40px" }}
          color="warning"
          onClick={(event) => {
            event.stopPropagation();
            setOpenDraw(false);
          }}
          aria-label="add"
        >
          <CloseIcon style={{ cursor: "pointer", fontSize: "25px" }} />
        </Fab>
      </div>
      {cartProducts.length == 0 ? (
        <div>
          <h3>
            {" "}
            {firstName == "Account"
              ? "Please Register first to access your Cart"
              : `${firstName}, Your Cart is empty!`}
          </h3>
          <Lottie
            animationData={sleepingCat}
            loop={true}
            style={{ width: 270, height: 270 ,margin:"auto"}}

          />
        </div>
      ) : (
        <List>
          {cartProducts.map((item) => (
            <div
              className="h-24 mb-4 flex bg-emerald-500 rounded-xl gap-3"
              key={item.id}
            >
              <img
                className="w-24 h-24 bg-gray-300 rounded-l-lg"
                src={item.image}
                alt=""
              />
              <div className="info flex flex-col items-start justify-between w-full">
                <h2 className="text-white font-bold">{item.title}</h2>
                <div className="flex justify-between w-full mb-2">
                  <div className="count text-center flex items-center">
                    <RemoveIcon
                      onClick={() => {
                        handlePlusMinusClick(item.id, -1);
                      }}
                      style={{
                        fontSize: "18px",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "2px",
                        marginRight: "15px",
                        backgroundColor: "teal",
                      }}
                    />
                    <span className="text-white font-bold">
                      {item.quantity}
                    </span>
                    <AddIcon
                      onClick={() => {
                        handlePlusMinusClick(item.id, 1);
                      }}
                      style={{
                        fontSize: "18px",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "2px",
                        marginLeft: "15px",
                        backgroundColor: "teal",
                      }}
                    />
                  </div>
                  <span className="mr-5 text-white">
                    ${item.quantity * item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <div className="fixed w-full navbar z-10">
      <div className="relative container m-auto bg-primary flex justify-between items-center rounded-full">
        <div className="block md:hidden ms-2">
          <button
            onClick={handleClickAnchor}
            className="rounded-full bg-black text-white px-4 py-2 font-bold tracking-widest font-EmilysCandy"
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
              className="hover:text-red-500"
            >
              Home
            </MenuItem>

            <MenuItem
              onClick={handleClick2}
              aria-expanded={open2}
              className="relative overflow-visible"
            >
              Categories
              <StyledMenu
                id="demo-customized-menu"
                slotProps={{
                  list: {
                    "aria-labelledby": "demo-customized-button",
                  },
                }}
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose}
              >
                {cartMenuSm}
              </StyledMenu>
            </MenuItem>

            <MenuItem
              component={Link}
              href="/landing/Allproducts"
              onClick={handleCloseAnchor}
            >
              Products
            </MenuItem>
            <MenuItem
              component={Link}
              href="/landing/home"
              onClick={handleCloseAnchor}
            >
              Special
            </MenuItem>
          </Menu>
        </div>
        <ul className="hidden md:flex items-center ms-2">
          <Link href="/landing">
            <li className="me-3 hover:text-blue-500 transition-all duration-300 rounded-full bg-accent-light text-primary-dark px-4 py-2 font-bold tracking-widest ">
              PixelCraft
            </li>
          </Link>
          <ClickAwayListener
            onClickAway={() => {
              setVisible("none");
            }}
          >
            <li
              className="me-3 font-bold text-white cursor-pointer hover:text-teal-400 transition-all duration-300"
              onClick={() => {
                visible === "none" ? setVisible("block") : setVisible("none");
              }}
              tabIndex={0}
            >
              Categories
              <Paper
                variant="outlined"
                sx={{
                  maxWidth: "100%",
                  position: "absolute",
                  display: visible,
                  top: "50px",
                }}
              >
                <List component="nav" aria-label="mail folders" sx={{ py: 0 }}>
                  {cartMenu}
                </List>
              </Paper>
            </li>
          </ClickAwayListener>
          <Link href="/landing/Allproducts">
            <li className="me-3 font-bold text-white hover:text-teal-400 transition-all duration-300">
              Products
            </li>
          </Link>
          <Link href="/landing/home">
            <li className="me-3 font-bold text-white hover:text-teal-400 transition-all duration-300">
              Special
            </li>
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
            <button className="cursor-pointer">
              <SearchOutlinedIcon style={{ color: "#99a1af" }} />
            </button>
            <input
              placeholder="search for products"
              type="text"
              value={searchProduct}
              onChange={(e) => {
                setSearchProduct(e.target.value);
              }}
              className="placeholder:text-gray-400 outline-0 w-full"
            />
          </div>
          <Link href={"/navbar/profile"}>
            <div className="account py-4 px-3 flex cursor-pointer border-s-2 border-gray-300 hover:bg-primary-light duration-300 transition-all">
              <PermIdentityOutlinedIcon className="text-accent-dark" />
              <h4 className="hidden md:block font-bold text-white">
                {firstName}
              </h4>
            </div>
          </Link>
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
                      sm: "400px",
                    },
                  },
                }}
              >
                {DrawerList}
              </Drawer>
            </div>
            <span
              className={"rounded-md bg-accent-light text-primary mx-2 px-1"}
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
