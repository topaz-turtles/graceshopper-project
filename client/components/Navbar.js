import React, { useState } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { checkIsAdmin } from "../store/admin";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const user = useSelector((state) => state.auth);
  let cart = useSelector((state) => state.cart);
  if (!user.id) {
    cart = JSON.parse(localStorage.getItem("product"));
    // let [guestCart, setGuestCart] = useState(0);
    // setGuestCart(cart);
  }

  let cartItems = () => {
    if (cart) {
      return cart.reduce((accum, cur) => {
        accum += cur.quantity;
        return accum;
      }, 0);
    } else {
      return 0;
    }
  };

  return (
    <div className="nav-bar">
      <h1>Grace Music ♫♪</h1>
      <div className="cartItemsIcon">{cartItems()}</div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            {isAdmin ? <Link to="/admin">Admin</Link> : ""}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(checkIsAdmin());
      localStorage.clear();
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
