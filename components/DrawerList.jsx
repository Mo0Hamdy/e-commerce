import * as React from "react";
import Lottie from "lottie-react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import sleepingCat from "../animations/Sleeping Cat Breathing Loop.json";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { increase, decrease } from "../lib/features/CartSlice";
export default function DrawerList({ setOpenDraw }) {
  const dispatch = useAppDispatch();
  const { cartProducts, firstName, total } = useAppSelector(
    (state) => state.cart,
  );
  async function updateQuantity(id, amount) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://e-commerce-backend-nine-olive.vercel.app/api/cart",
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            id,
            amount,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Update Failed");
      }
      if (amount === 1) dispatch(increase({ id }));
      else dispatch(decrease({ id }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box className="w-full md:w-100" role="presentation">
      <div className="flex justify-between items-center mb-5 px-5 pt-5">
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
      {cartProducts.length === 0 ? (
        <div className="px-5">
          <h3>
            {" "}
            {firstName === "Account"
              ? "Please Register first to access your Cart"
              : `${firstName}, Your Cart is empty!`}
          </h3>
          <Lottie
            animationData={sleepingCat}
            loop={true}
            style={{ width: 270, height: 270, margin: "auto" }}
          />
        </div>
      ) : (
        <div>
          <List sx={{ padding: "20px",marginBottom:5 }}>
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
                        onClick={() => updateQuantity(item.id, -1)}
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
                        onClick={() => updateQuantity(item.id, 1)}
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
                      {(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </List>
          <footer className="bg-teal-50 p-5 flex justify-center w-full md:w-100 font-bold text-gray-500 border-teal-100 border fixed bottom-0">
            Total : $<span>{total.toFixed(2)}</span>
          </footer>
        </div>
      )}
    </Box>
  );
}
