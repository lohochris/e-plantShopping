import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate subtotal for a single item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item?.cost?.substring(1)) || 0;
    return (price * item.quantity).toFixed(2);
  };

  // Calculate total cost of all items in cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseFloat(calculateTotalCost(item)), 0)
      .toFixed(2);
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement or remove item from cart
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item entirely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Continue shopping handler
  const handleContinueShopping = (e) => {
    if (typeof onContinueShopping === 'function') {
      onContinueShopping(e);
    } else {
      alert('Continue shopping handler not provided.');
    }
  };

  // Placeholder for checkout functionality
  const handleCheckoutShopping = () => {
    alert('Checkout functionality to be implemented later.');
  };

  // Fallback UI for empty cart
  if (!cart.length) {
    return (
      <div className="cart-container empty-cart">
        <h2 style={{ color: 'black' }}>Your cart is currently empty.</h2>
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">Unit: {item.cost}</div>

            <div className="cart-item-quantity">
              <button
                className="cart-item-button cart-item-button-dec"
                onClick={() => handleDecrement(item)}
              >
                -
              </button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button
                className="cart-item-button cart-item-button-inc"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>

            <div className="cart-item-total">
              Subtotal: ${calculateTotalCost(item)}
            </div>

            <button className="cart-item-delete" onClick={() => handleRemove(item)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="total_cart_amount" style={{ marginTop: '20px', color: 'black' }}>
        <strong>Total Items:</strong>{' '}
        {cart.reduce((total, item) => total + item.quantity, 0)}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
