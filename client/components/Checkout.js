import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../store/cart/allItems";
import reducer from "../store/index";
import { Cart } from "./Cart";
import { Link } from "react-router-dom";

const Checkout = () => {
  const user = useSelector((state) => state.auth);
  console.log(user.id);
  const cart = useSelector((state) => state.allCartItems);
  console.log("Cart", cart);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== undefined) dispatch(fetchItems(user.id));
  }, [user]);

  const mappedCart = cart.map((item) => {
    let currentPrice = ((item.price * item.quantity) / 100).toFixed(2);
    return (
      <div key={item.id} className="cart-item">
        {/* <img src={item.imageurl} /> */}
        <h2>Item:{`${item.brand}`}</h2>
        <h2>Type:{item.itemType}</h2>
        Price:{" "}
        <b>
          {currentPrice} Quantity:{item.quantity}
        </b>
        {/* <button type="button">Delete</button> */}
      </div>
    );
  });

  let totalPrice = cart.reduce((accumultator, item) => {
    return accumultator + (item.price * item.quantity) / 100;
  }, 0);

  return (
    <div className="cart-container">
      <h1>Order Summary:</h1>
      {mappedCart}
      <div className="cart-checkout">
        <h3>
          Total: $<b>{totalPrice.toFixed(2)}</b>
        </h3>
        {/*Button to checkout */}
        <Link to="/cart">
          <button type="button">Edit Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
