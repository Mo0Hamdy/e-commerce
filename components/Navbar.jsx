"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../app/globals.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import Fade from "@mui/material/Fade";
import Select from "@mui/material/Select";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import MailIcon from "@mui/icons-material/Mail";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import OutlinedInput from "@mui/material/OutlinedInput";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemButton from "@mui/material/ListItemButton";
import CircularProgress from "@mui/material/CircularProgress";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseIcon from '@mui/icons-material/Close';

const MenuProps = {
  PaperProps: {
    style: {
      width: 200,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

import { useAppSelector, useAppDispatch, useAppStore } from "../lib/hooks";
// import { add } from "../lib/features/CartSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAnchor = Boolean(anchorEl);
  const [personName, setPersonName] = useState([]);
  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpen(open ? false : true);
  };
  const handleSelectClick = (event) => {
    setOpenSelect(openSelect ? false : true);
  };
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };

  let [names, setNames] = useState([]);
  let [loading, setLoading] = useState(false);
  let [openDraw, setOpenDraw] = useState(false);

   const resultState = useAppSelector((state) => {
    return state.cart.result;
   });
  const cartProducts = useAppSelector((state) => {
    return state.cart.cartProducts
  })

  const DrawerList = (
    <Box
      sx={{ width: 400 ,padding:"20px"}}
      role="presentation"
      onClick={(event) => {
        event.stopPropagation();
        setOpenDraw(false);
      }}
    >
      <div className="flex justify-between items-center mb-5">

      <h3 className="text-gray-700 text-xl tracking-wide font-bold">Shopping cart</h3>
        <CloseIcon style={{cursor:"pointer",fontSize:"30px"}} />
      </div>
      {cartProducts.length == 0 ?<ListItem disablePadding>Your Cart is empty</ListItem> :
        <List>
          {cartProducts.map((item) => (
            <ListItem className="pb-3" key={item.element.id} disablePadding>
              <img className="w-28 bg-gray-300 rounded-lg" src={item.element.images[0]} alt="" />          
                <ListItemText primary={item.element.title} />
              {/* </ListItemButton> */}
            </ListItem>
          ))}
          {/* <Divider /> */}
        </List>
      }
      
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}

     
    </Box>
  );

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      let data = await response.json();
      setLoading(true);
      setNames(data);
    };
    fetchData();
  }, []);
 
  return (
    <div className="fixed w-full navbar z-10">
      <div className="relative container m-auto bg-white flex justify-between items-center rounded-full border border-cyan-800">
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
            <MenuItem onClick={handleCloseAnchor}>Home</MenuItem>
            <MenuItem onClick={handleCloseAnchor}>Products</MenuItem>
            <MenuItem onClick={handleCloseAnchor}>Categories</MenuItem>
          </Menu>
        </div>
        <ul className="hidden md:flex text-black items-center ms-2">
          <Link href="/landing">
            <li className="me-3 rounded-full bg-black text-white px-4 py-2 font-bold tracking-widest ">
              PixelCraft
            </li>
          </Link>
          <li className="me-3 font-semibold duration-300">
            <a href="#">Home</a>
          </li>
          <Link href="/landing/Allproducts">
            <li className="me-3 font-semibold duration-300">Products</li>
          </Link>
          <li className="me-3 duration-300">
            <div className=" flex items-center">
              <FormControl sx={{ padding: 0 }}>
                <Select
                  open={openSelect}
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  onClick={handleSelectClick}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em className="font-semibold">Categories</em>;
                    }
                    return selected[selected.length - 1];
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    "& fieldset": { border: "none" },
                    "& .MuiOutlinedInput-input": {
                      padding: "0",
                    },
                  }}
                >
                  <MenuItem disabled value="">
                    <em className="font-semibold">Categories</em>
                  </MenuItem>
                  {loading ? (
                    names.map((name) => (
                      <MenuItem
                        component={Link}
                        href={`/landing/${name.split(" ").join("-")}`}
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      <CircularProgress style={{ color: "#eee" }} />
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          </li>
        </ul>
        <div className="flex items-center">
          <Button
            style={{
              padding: "0",
              margin: "0 20px",
              color: "#D8DBE0",
              borderRadius: "20px",
              border: "2px solid #D8DBE0",
            }}
            onClick={handleClick}
          >
            <SearchOutlinedIcon />
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

          <div className="account py-4 px-3 flex cursor-pointer border-s-2 border-gray-300 text-black hover:bg-gray-100 duration-300 transition-all">
            <PermIdentityOutlinedIcon
              sx={{
                color: "gray",
              }}
            />
            <h4 className="hidden md:block">Account</h4>
          </div>
          <div
            onClick={() => {
              setOpenDraw(true);
      
            }}
            className="cart py-4 px-3 flex items-center cursor-pointer border-s-2 border-gray-300 text-black hover:bg-gray-100 duration-300 transition-all rounded-e-full"
          >
            <ShoppingCartOutlinedIcon
              sx={{
                color: "gray",
              }}
            />
            <h4 className="hidden md:block">Cart</h4>
            <div>
              <Drawer
                anchor="right"
                open={openDraw}
                onClose={(event) => {
                  event.stopPropagation();
                  setOpenDraw(false);
                }}
                sx={{
                  "& .MuiDrawer-paper": { width: 400 },
                }}
              >
                {DrawerList}
              </Drawer>
            </div>
            <span
              className={"rounded-md bg-red-500 text-white ms-2 px-1"}
              style={{ display: resultState <= 0 ? "none" : "block" }}
            >
              {resultState}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
