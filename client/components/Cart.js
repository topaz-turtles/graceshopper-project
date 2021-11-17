import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchItems,
  removeItemFromCart,
  editItemInCart,
} from "../store/cart/cart";
import { Link } from "react-router-dom";
import { setCartItemsAmount } from "../store/cart/cartItems";

const Cart = () => {
  const user = useSelector((state) => state.auth);
  let cart = useSelector((state) => state.cart);
  const [cartState, setCartState] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== undefined) {
      dispatch(fetchItems(user.id));
    }
  }, [user]);

  const deleteHandler = (itemId, userId) => {
    // if not user id then we are a guest and need to delete in ls.
    if (!user.id) {
      //convert local storage to array of objects from string
      let cartArr = JSON.parse(localStorage.product);
      //filter out items which are not the itemid
      let items = cartArr.filter((instrument) => instrument.id !== itemId);
      //save cart state before converting to string
      setCartState(items);
      //convert new array to string
      let cart_items = items;
      items = JSON.stringify(items);
      //set localStorage to new array without deleted items
      localStorage.setItem("product", items);
      let totalItems = cart_items.reduce((prev, curr) => prev + Number(curr.quantity), 0)
      console.log("total items amount", totalItems)
      dispatch(setCartItemsAmount(totalItems))
      //else we are a user logged in and need to dispatch:
    } else {
      dispatch(removeItemFromCart(itemId, userId));
    }
  };

  const quantityChangeHandler = (userId, itemId, event) => {
    if (parseInt(event.target.value) === 0 || event.target.value === "")
      event.target.value = 1;
    if (event.target.value < 0) {
      event.target.value = Math.abs(event.target.value);
    }
    if (!user.id) {
      //quantity to change to
      const quantity = Number(event.target.value);
      //convert local storage to array of objects from string
      let cartArr = JSON.parse(localStorage.product);
      //filter out items which are not the itemid
      let items = cartArr.map((instrument) => {
        if (instrument.id == itemId) {
          instrument.quantity = quantity;
        }
        return instrument;
      });
      //save cart state before converting to string
      let cart_items = items;
      setCartState(items);
      //convert new array to string
      items = JSON.stringify(items);
      
      localStorage.setItem("product", items);
      let totalItems = cart_items.reduce((prev, curr) => prev + Number(curr.quantity), 0)
      console.log("total items amount", totalItems)
      dispatch(setCartItemsAmount(totalItems))
    } else {
      dispatch(editItemInCart(userId, itemId, event.target.value));
    }
  };

  //if not user id, then get and parse items from LS, else cart is []
  if (!user.id) {
    cart = localStorage.product
      ? JSON.parse(localStorage.getItem("product"))
      : [];
  }

  // let cartItems = () => {
  //   return cart.reduce((accum, cur) => {
  //     accum += cur.quantity;
  //     return accum;
  //   }, 0);
  // };

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
              min="1"
              step="1"
              onChange={(event) =>
                quantityChangeHandler(user.id, item.id, event)
              }
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

  const checkoutButton = () => {
    if (cart.length === 0 || totalPrice === 0) {
      return <button type="button">Checkout</button>;
    } else {
      return (
        <Link to="/checkout">
          <button type="button">Checkout</button>
        </Link>
      );
    }
  };

  return (
    <div>
      <div className="cart-container">
        <h1>{`${
          user.username ? user.username.toUpperCase() : "Guest"
        }'s Cart`}</h1>

        {mappedCart}
        <div className="cart-checkout">
          <h3>
            Total: $<b>{totalPrice.toFixed(2)}</b>
          </h3>
          {/*Button to checkout */}
          {checkoutButton()}
        </div>
      </div>
    </div>
  );
};
export default Cart;
