import React, { useState } from "react";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";

const App = () => {
  // Define products directly in App.jsx with image URLs as strings
  const products = [
    { id: 1, name: "T-Shirt", price: 20, image: "https://imgs.search.brave.com/OWoEEARJZVbqbiNL-iXFEN1OWaY80u1UENx6_2Y6Wpo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTE0M1hJalBhTEwu/anBn" },
    { id: 2, name: "Jeans", price: 40, image: "https://imgs.search.brave.com/4qLJeU6c2-uBhEwpretkt6FbttRWYl_PPNeXn3eatWs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM0/MDA2MTI5Ny9waG90/by9kZW5pbS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9dzNw/S29Odjk3bmgwQzFj/MDRQdy1YYkJRamNK/bzJqVk5PdWNPM29N/d2xwQT0" },
    { id: 3, name: "Sneakers", price: 60, image: "https://imgs.search.brave.com/zAWRI-QA0v4jIH_Ijjfr-e2qFtSG6Vaas1wIoyiE0ko/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzcwLzYyLzA5/LzM2MF9GXzI3MDYy/MDkwMV96R3M0QTBY/ZU5Qb2VPWk94Rkpx/RGlpNE5aZXk2QXpa/MC5qcGc" },
    { id: 4, name: "Hat", price: 15, image: "https://imgs.search.brave.com/UbQzb9Jj_B-t_KYGPyD7OJHBKEwhNSfAZRUjfSSt6xY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg4/NDA2OTIyL3Bob3Rv/L3N0cmF3LWhhdHMu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVUzR0NsV3pMNTlf/Y0FUamtlTmpRdWtE/SmNyOFN6LWJ0RWJV/SFhydjByNlE9" },
    { id: 5, name: "Socks", price: 5, image: "https://imgs.search.brave.com/zlfXd5QlwLrKmbq5xUjP6CkRB9nNhEEgnYHTxf35Dpc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzEwLzY1Lzc4/LzM2MF9GXzYxMDY1/NzgzNF9RRWI1Z29h/bnllOGRGaGtYOXo0/U2dEMGNsQmhwM1R1/QS5qcGc" },
  ];

  const [cart, setCart] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("name");

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && newQuantity > 0
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Sort products based on selected criteria
  const sortedProducts = [...products].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="app">
      <h1>Simple E-Commerce Cart</h1>
      
      {/* Sorting Controls */}
      <div className="sorting">
        <label>Sort By:</label>
        <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      <ProductList products={sortedProducts} onAddToCart={handleAddToCart} />
      <Cart
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default App;
