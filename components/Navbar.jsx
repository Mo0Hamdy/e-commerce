"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../app/globals.css";
import * as React from "react";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import CircularProgress from "@mui/material/CircularProgress";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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
    // setPersonName(event.target.value)
    setOpenSelect(openSelect ? false : true);
  };
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      // typeof value === "string" ? value.split(",") : value
      value
    );
  };

  let [names, setNames] = useState([]);
  let [loading, setLoading] = useState(false);

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
      <div className="relative container m-auto bg-white flex justify-between items-center rounded-full">
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
          <li className="me-3 font-semibold duration-300">
            <a href="#">Products</a>
          </li>
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
                      // <Link
                      //   href={`/landing/products/${name.split(" ").join("-")}`}
                      //   key={name}
                      // >
                      // <a href="/landing/products">{name}</a>
                      <MenuItem
                        component={Link}
                        href="/landing/products"
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                      // </Link>
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
          <div className="cart py-4 px-3 flex cursor-pointer border-s-2 border-gray-300 text-black hover:bg-gray-100 rounded-e-full duration-300 transition-all">
            <ShoppingCartOutlinedIcon
              sx={{
                color: "gray",
              }}
            />
            <h4 className="hidden md:block">Cart</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
