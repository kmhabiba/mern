//....
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data.items || []);
      localStorage.setItem("cart", JSON.stringify(response.data.items || []));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Add item to the cart
  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCart(response.data.items || []);
      localStorage.setItem("cart", JSON.stringify(response.data.items || []));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item from the cart
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/cart/remove",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCart(response.data.items || []);
      localStorage.setItem("cart", JSON.stringify(response.data.items || []));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Update item quantity in the cart
  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/cart/update",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCart(response.data.items || []);
      localStorage.setItem("cart", JSON.stringify(response.data.items || []));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Move item to wishlist
  const moveToWishlist = async (productId) => {
    try {
      // Placeholder API call (replace with your actual endpoint)
      await axios.post(
        "http://localhost:5001/api/wishlist/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Remove item from the cart after moving to the wishlist
      removeFromCart(productId);
    } catch (error) {
      console.error("Error moving to wishlist:", error);
    }
  };

  // useEffect(() => {
  //   fetchCart();
  // }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length > 0) {
      setCart(storedCart);
    } else {
      fetchCart(); // Fetch from API only if localStorage is empty
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        moveToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
