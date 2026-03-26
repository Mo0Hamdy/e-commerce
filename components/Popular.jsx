"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PopularAndCheap from "./PopularAndCheapProducts";
export default function Popular() {
  const [type, setType] = useState("best");
  return (
    <div className="container m-auto py-28 flex flex-col items-center">
      <ButtonGroup
        className="mb-10 border-cyan-300 border"
        aria-label="Basic button group"
      >
        <Button
          onClick={() => {
            setType("best");
          }}
          style={{
            color: type === "best" ? "#2d3748" : "black",
            backgroundColor: type === "best" ? "#fbd38d" : "transparent",
            border: "none",
          }}
          variant={type === "best" ? "contained" : "outlined"}
        >
          Best Selling
        </Button>
        <Button
          onClick={() => {
            setType("cheap");
          }}
          style={{
            color: type === "cheap" ? "#2d3748" : "black",
            backgroundColor: type === "cheap" ? "#fbd38d" : "transparent",
            border: "none",
          }}
          variant={type === "cheap" ? "contained" : "outlined"}
        >
          Low Prices
        </Button>
      </ButtonGroup>
      <PopularAndCheap type={type} />
    </div>
  );
}
