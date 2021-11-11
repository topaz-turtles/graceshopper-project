import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DUMMY_DATA = [
  {
    id: 1,
    type: 'Guitar',
    brand: 'Gibson',
    model: 'Les Paul',

    //Price in cents
    price: 10000,
    imageUrl:
      'https://images.reverb.com/image/upload/s--eL1LjCeA--/f_auto,t_large/v1635547543/umviwjty2t3fbe68fi6a.jpg',
  },
  {
    id: 2,
    type: 'Piano',
    brand: 'Donner',
    model: 'DDP-100',

    //Price in cents
    price: 62599,
    imageUrl: 'https://m.media-amazon.com/images/I/618Bsj-lf4L._AC_SL1500_.jpg',
  },
];

const AllProducts = () => {
  const [products, setProducts] = useState([]);

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

  //Maps products before return. Replace DUMMY_DATA later with products.
  const mappedProducts = DUMMY_DATA.map(product => {
    //Converting cents to dollars
    let price = product.price / 100;
    //Fixing at 2 decimal places
    price = price.toFixed(2);

    return (
      <div key={product.id}>
        <img
          className="product-thumbnail"
          src={product.imageUrl}
          alt={`a ${product.type}`}
        />
        <h3>{`${product.brand} ${product.model}`}</h3>
        <p>{`in ${product.type}s`}</p>
        <p>{`$${price}`}</p>
        <button className="add-to-cart-btn" type="button">
          Add To Cart
        </button>
      </div>
    );
  });
  return <div className="products-flexbox">{mappedProducts}</div>;
};

export default AllProducts;
