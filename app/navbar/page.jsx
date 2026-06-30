"use client";
import Link from "next/link";
import * as React from "react";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import CartMenu from "@/components/CartMenu";
import MenuItem from "@mui/material/MenuItem";
import DrawerList from "@/components/DrawerList";
import CartMenuSm from "@/components/CartMenuSm";
import { styled, alpha } from "@mui/material/styles";
import { restore } from "../../lib/features/CartSlice";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CircularProgress from "@mui/material/CircularProgress";
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

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { defaultProductsCounter, firstName } = useAppSelector(
    (state) => state.cart,
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
                let total = result2.products.reduce(
                  (acc, curr) =>
                    acc + Number(curr.price) * Number(curr.quantity),
                  0,
                );
                dispatch(
                  restore({
                    firstName: result.firstName,
                    products: result2.products,
                    counter: counter,
                    total: total,
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

  return (
    <div className="fixed w-full navbar z-10">
      <div className="relative container m-auto bg-primary flex justify-between items-center rounded-full">
        <div className="block md:hidden ms-1 md:ms-2">
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
                <CartMenuSm cats={CATS} />
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
                  <CartMenu cats={CATS} />
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
            <div className="account py-3 md:py-4 px-3 flex cursor-pointer border-s-2 border-gray-300 hover:bg-primary-light duration-300 transition-all">
              {/* <CircularProgress sx={{ color: "yellow", fontSize:5}}/> */}
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
            className="cart py-3 md:py-4 px-3 flex items-center cursor-pointer border-s-2 border-gray-300 hover:bg-primary-light duration-300 transition-all rounded-e-full"
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
                <DrawerList setOpenDraw={setOpenDraw} />
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
