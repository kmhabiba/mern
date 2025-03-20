import React, { createContext, useState, useEffect } from 'react';
 
export const WishlistCartContext = createContext();
 
export const WishlistCartProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
 
  // Load data from localStorage when app loads
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setWishlist(storedWishlist);
    setCart(storedCart);
  }, []);
 
  // Save wishlist & cart to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
 
  // Toggle Wishlist Item (Add/Remove)
  const toggleWishlist = (item) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((product) => product._id === item._id)) {
        return prevWishlist.filter((product) => product._id !== item._id);
      }
      return [...prevWishlist, item];
    });
  };

const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((product) => product._id === item._id);
      if (existingItem) {
        return prevCart.map((product) =>
          product._id === item._id ? { ...product, quantity: product.quantity + 1 } : product
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };
 
  // const removeFromCart = (itemId) => {
  //   setCart(cart.filter((item) => item._id !== itemId));
  // };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== itemId);
      console.log("Updated cart after removal:", updatedCart); // Debugging log
      return updatedCart;
    });
  };
 
  const moveToWishlist = (item) => {
    removeFromCart(item._id); // Remove from cart
    toggleWishlist(item); // Add to wishlist
  };
 
  const updateQuantity = (itemId, qty) => {
    if (qty < 1) return;
    setCart(cart.map((item) => (item._id === itemId ? { ...item, quantity: qty } : item)));
  };
 
  return (
<WishlistCartContext.Provider value={{ wishlist, toggleWishlist, cart, addToCart, removeFromCart, moveToWishlist,updateQuantity }}>
      {children}
</WishlistCartContext.Provider>
  );
};
