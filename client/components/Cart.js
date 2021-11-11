import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../store/cart/allItems';
import reducer from '../store/index';



const Cart = () => {
  const user = useSelector(state => state.auth);
  console.log(user.id);
  const cart = useSelector(state => state.allCartItems)
  console.log('Cart', cart)

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== undefined)
      dispatch(fetchItems(user.id))
  }, [user])

  //const cart = useSelctor(state => state.cart)
  const mappedCart = cart.map(item => {
    let currentPrice = ((item.price * item.quantity) / 100).toFixed(2);
    return (
      <div key={item.id}>
        <img src={item.imageurl} />
        <h3>{`Type: ${item.itemType}`}</h3>
        <h3>{`Item: ${item.brand} ${item.model}`}</h3>
        <p>
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
        </p>
        <button type="button">Delete</button>
      </div>
    );
  });
  let totalPrice = cart.reduce((accumultator, item) => {
    return accumultator + (item.price * item.quantity) / 100;
  }, 0);

  return (
    <div>
      <h1>Cart Page</h1>
      {mappedCart}
      <h3>
        Total: $<b>{totalPrice.toFixed(2)}</b>
      </h3>
      {/*Button to checkout */}
      <button type="button">Checkout</button>
    </div>
  );
};
export default Cart;
