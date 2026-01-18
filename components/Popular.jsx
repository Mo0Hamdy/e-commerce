"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PopularAndCheap from "./PopularAndCheapProducts";
export default function Popular() {
  const [type, setType] = useState("best");

  return (
    <div className="container m-auto pt-24 flex flex-col items-center">
      <ButtonGroup aria-label="Basic button group">
        <Button
          variant={type === "best" ? "contained" : "outlined"}
          onClick={() => {
            setType("best");
          }}
        >
          Best Selling
        </Button>
        <Button
          variant={type === "cheap" ? "contained" : "outlined"}
          onClick={() => {
            setType("cheap");
          }}
        >
          Low Prices
        </Button>
      </ButtonGroup>

      <PopularAndCheap type={type} />
    </div>
  );
}
