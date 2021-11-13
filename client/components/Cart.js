import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, removeItemFromCart } from '../store/cart/cart';

const Cart = () => {
  const state = useSelector(state => state);
  console.log('State: ', state);
  const user = useSelector(state => state.auth);
  const cart = useSelector(state => state.allCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== undefined) dispatch(fetchItems(user.id));
    console.log(cart);
  }, [user]);

  const deleteHandler = (itemId, userId) => {
    dispatch(removeItemFromCart(itemId, userId));
  };

  const mappedCart = cart.map(item => {
    let currentPrice = ((item.price * item.quantity) / 100).toFixed(2);
    return (
      <div key={item.id} className="cart-item">
        <img src={item.imageurl} />

        <h3>{`${item.brand} ${item.itemType}`}</h3>
        <div className="cart-item-price">
          Price:{' '}
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
        user.username ? user.username.toUpperCase() : 'Guest'
      }'s Cart'`}</h1>
      {mappedCart}
      <div className="cart-checkout">
        <h3>
          Total: $<b>{totalPrice.toFixed(2)}</b>
        </h3>
        {/*Button to checkout */}
        <button type="button">Checkout</button>
      </div>
    </div>
  );
};
export default Cart;
