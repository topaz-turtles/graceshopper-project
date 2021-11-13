import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../store/cart/cart';
import reducer from '../store/index';
import { Cart } from './Cart';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const user = useSelector(state => state.auth);
  console.log(user.id);
  const cart = useSelector(state => state.cart);
  console.log('Cart', cart);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== undefined) dispatch(fetchItems(user.id));
  }, [user]);

  const mappedCart = cart.map(item => {
    let currentPrice = ((item.price * item.quantity) / 100).toFixed(2);
    return (
      <div key={item.id} className="checkout-item">
        {/* <img src={item.imageurl} /> */}
        <h4>Item:{`${item.brand}`}</h4>
        <h4>Type:{item.itemType}</h4>
        Price:{' '}
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
      <h1> Shipping Information:</h1>
      <form>
        <label for="name"> Name:</label>
        <input name="name" />
        <label for="name"> Address:</label>
        <input name="name" />
        <label for="name"> Addres:</label>
        <input name="name" />
      </form>
      <button type="button" onClick={() => console.log('submitted')}>
        Submit Order
      </button>
    </div>
  );
};

export default Checkout;
