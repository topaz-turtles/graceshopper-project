import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { addItemToCart } from '../../store/cart/cart';
import { Link } from 'react-router-dom';

const AllProducts = props => {
  const user = useSelector(state => state.auth);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // if localStorage.product, load it as guestCart, else let guestCart be []
  let guestCart = localStorage.product ? JSON.parse(localStorage.product) : [];

  //Acts as component did mount to get products.
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    try {
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const productClickHandler = productId => {
    props.history.push(`/products/${productId}`);
  };

  const clickHandler = (product, event) => {
    event.stopPropagation();
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

  //Maps products before return. Replace DUMMY_DATA later with products.
  const mappedProducts = products.map(product => {
    //Converting cents to dollars
    let price = product.price / 100;
    //Fixing at 2 decimal places
    price = price.toFixed(2);
    return (
      <div
        className="product-container"
        key={product.id}
        onClick={() => productClickHandler(product.id)}
      >
        <h3 className="product-container-name">{`${product.brand} ${product.model}`}</h3>

        <h3 className="product-container-price">{`$${price}`}</h3>

        <img
          className="product-thumbnail"
          src={product.imageurl}
          alt={`a ${product.itemType}`}
        />

        <button
          className="add-to-cart-btn"
          type="button"
          onClick={event => clickHandler(product, event)}
        >
          Add To Cart
        </button>
      </div>
    );
  });
  return <div className="products-flexbox">{mappedProducts}</div>;
};

export default AllProducts;
