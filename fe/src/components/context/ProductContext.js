import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  //Global search state
  const [searchTerm , setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5001/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts , searchTerm , setSearchTerm}}>
      {children}
    </ProductContext.Provider>
  );
};
