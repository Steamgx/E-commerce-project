import React from "react";

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty</p> : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name} - Ksh{item.price} x {item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
