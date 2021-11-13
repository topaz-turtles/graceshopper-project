import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, removeItemFromCart } from '../store/cart/cart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const user = useSelector(state => state.auth);
  console.log(user.id);
  const cart = useSelector(state => state.cart);
  console.log('Cart', cart);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== undefined) dispatch(fetchItems(user.id));
  }, [user]);

  const deleteHandler = (itemId, userId) => {
    dispatch(removeItemFromCart(itemId, userId));
  };

  const quantityChangeHandler = (itemId, event) => {
    console.log(event.target.value);
  };

  const mappedCart = cart.map(item => {
    console.log(item);
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
              onChange={event => quantityChangeHandler(item.id, event)}
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
        <Link to="/checkout">
          <button type="button">Checkout</button>
        </Link>
      </div>
    </div>
  );
};
export default Cart;
