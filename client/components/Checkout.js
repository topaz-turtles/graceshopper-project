import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkoutCart, fetchItems } from "../store/cart/cart";
import reducer from "../store/index";
import { Cart } from "./Cart";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";

const Checkout = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user.id !== undefined) dispatch(fetchItems(user.id));
  }, [user]);

  // if local storage.product then we are a guest and need local stor. cart, else we are logged in and need user cart from redux
  //not functional, not console.logging
  let cart = [];

  //if not user id, then get and parse items from LS, else cart is []
  if (!user.id) {
    cart =
      // localStorage.product ?
      JSON.parse(localStorage.getItem("product"));
    // : [];
  }
  //if user id then we are a user and need our logged in user cart
  if (user.id) {
    cart = useSelector((state) => state.cart);
  }

  let mappedCart = [];
  let totalPrice = 0;
  if (cart) {
    mappedCart = cart.map((item) => {
      let currentPrice = ((item.price * item.quantity) / 100).toFixed(2);
      return (
        <div key={item.id} className="checkout-item">
          {/* <img src={item.imageurl} /> */}
          <h4>Item:{`${item.brand}`}</h4>
          <h4>Type:{item.itemType}</h4>
          Price:{" "}
          <b>
            {currentPrice} Quantity:{item.quantity}
          </b>
          {/* <button type="button">Delete</button> */}
        </div>
      );
    });
    totalPrice = cart.reduce((accumultator, item) => {
      return accumultator + (item.price * item.quantity) / 100;
    }, 0);
  }

  const submitHandler = () => {
    if (!user.id) {
      localStorage.clear();
    } else {
      dispatch(checkoutCart(user.id));
    }
    setShow(true);
  };

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
      <div className="checkout-form">
        <h1>Shipping Information:</h1>

        <form>
          <div className="flex-grid">
            <div className="col">
              <label htmlFor="name" /> Name:
              <input name="name" />
              <label htmlFor="email" /> Email:
              <input name="email" />
              <label htmlFor="phone-number" /> Phone:
              <input name="phone-number" />
              <button
                type="submit"
                className="submit-order-button"
                onClick={() => submitHandler()}
              >
                Place Order
              </button>
            </div>
            <div className="col">
              <label htmlFor="address" /> Address:
              <input name="address" />
              <label htmlFor="city" /> City:
              <input name="city" />
            </div>
            <div className="col">
              <label htmlFor="state" /> State:
              <input name="state" />
              <label htmlFor="zipcode" /> Zip Code:
              <input name="zipcode" />
            </div>
          </div>
        </form>
      </div>

      <CheckoutModal show={show} />
    </div>
  );
};

export default Checkout;
