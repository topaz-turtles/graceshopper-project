<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, removeItemFromCart } from '../store/cart/cart';

const Cart = () => {
  const user = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
=======
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../store/cart/allItems";
import reducer from "../store/index";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state.auth);
  console.log(user.id);
  const cart = useSelector((state) => state.allCartItems);
  console.log("Cart", cart);
  console.log(user);
>>>>>>> f8d90be63e21765ea682ce3f40cb81e6dece38e3
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== undefined) dispatch(fetchItems(user.id));
  }, [user]);
<<<<<<< HEAD

  const deleteHandler = (itemId, userId) => {
    dispatch(removeItemFromCart(itemId, userId));
  };

  const mappedCart = cart.map(item => {
    console.log(item);
=======

  //const cart = useSelctor(state => state.cart)
  const mappedCart = cart.map((item) => {
>>>>>>> f8d90be63e21765ea682ce3f40cb81e6dece38e3
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
        <button onClick={() => deleteHandler(item.id, user.id)} type="button">
          Delete
        </button>
      </div>
    );
  });

  let totalPrice = cart.reduce((accumultator, item) => {
    return accumultator + (item.price * item.quantity) / 100;
  }, 0);

  return (
    <div className="cart-container">
      <h1>{`${
<<<<<<< HEAD
        user.username ? user.username.toUpperCase() : 'Guest'
=======
        user.username ? user.username.toUpperCase() : "Guest"
>>>>>>> f8d90be63e21765ea682ce3f40cb81e6dece38e3
      }'s Cart'`}</h1>
      {mappedCart}
      <div className="cart-checkout">
        <h3>
          Total: $<b>{totalPrice.toFixed(2)}</b>
        </h3>
        {/*Button to checkout */}
        <Link to="/checkout">
          <button type="button">Checkout</button>
        </Link>
      </div>
    </div>
  );
};
export default Cart;
