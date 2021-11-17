import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart';
import axios from 'axios';

const SingleProduct = props => {
  const user = useSelector(state => state.auth);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  // if localStorage.product, load it as guestCart, else let guestCart be []
  let guestCart = localStorage.product ? JSON.parse(localStorage.product) : [];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/${props.match.params.id}`
        );
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, []);

  const clickHandler = product => {
    if (user.id) {
      dispatch(addItemToCart(product, user.id));
    }
    // if not user id then we are a guest. the following adds to the guestCart and stores it locally.
    let found = false;
    guestCart.map(item => {
      if (item.id === product.id) {
        item.quantity += 1;
        found = true;
      }
      return item;
    });
    if (!found) {
      guestCart.push(product);
    }
    localStorage.setItem('product', JSON.stringify(guestCart));
  };

  return (
    <div className="single-product">
      <h2>{`${product.brand} ${product.itemType} ${
        product.model ? ', ' + product.model : ''
      }`}</h2>
      <img src={product.imageurl} />

      <div className="single-product-detail">
        <p>{product.description ? product.description : 'No Description.'}</p>
        <h3>{'$' + (product.price / 100).toFixed(2)}</h3>
        <button
          className="add-to-cart-button"
          type="button"
          onClick={() => clickHandler(product)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
