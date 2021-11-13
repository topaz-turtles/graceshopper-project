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
        <img src={item.imageurl} />

        <h3>{`${item.brand} ${item.itemType}`}</h3>
        <div className="cart-item-price">
          Price:{" "}
          <b>
            ${currentPrice} (
            <input
              type="number"
              size="2"
              name="quantity"
              id="item-quantity"
              defaultValue={item.quantity}
              min="0"
              step="1"
            />
            x)
          </b>
        </div>
        <button type="button">Delete</button>
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
    </div>
  );
};

export default Checkout;
