import React from "react";
import { Link } from "react-router-dom";
export default function CheckoutModal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Success!</h2>
        </div>
        <div className="modal-body">
          Thank you for shopping with Grace Music. Your order has been
          submitted!
        </div>
        <div className="modal-footer">
          <Link to="/products">
            <button type="button" className="button">
              Return to All Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
