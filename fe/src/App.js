//app.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/website/Navbar/Navbar";
import Sidebar from "./components/dashboard/Sidebar";
import Footer from "./components/website/Footer/Footer";
 
import Login from "./components/dashboard/Login";
import Registration from "./components/dashboard/Registration";
import ForgotPassword from "./components/dashboard/ForgotPassword";
import ResetPassword from "./components/dashboard/ResetPassword";
import Dashboard from "./components/dashboard/Dashboard";
import AddProducts from "./components/dashboard/AddProducts";
import CategoryPage from './components/dashboard/CategoryPage';
import Shop from "./pages/Website/Shop";
import ShopCategory from "./pages/Website/ShopCategory";
import Product from "./pages/Website/Product";
import Cart from "./pages/Website/Cart";
import Home from "./components/dashboard/UserHome";
import {CartProvider}  from "./components/dashboard/context/CartContext";
import ShopContextProvider from "./Context/ShopContext";
import men_banner from "./components/website/Assets/banner_mens.png";
import women_banner from "./components/website/Assets/banner_women.png";
import kid_banner from "./components/website/Assets/banner_kids.png";
const App = () => {
  const [user, setUser] = useState(null); // Contains user details, including role
  const [token, setToken] = useState(null);
 
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };
 
  const userRole = user?.role; // Assuming the `user` object contains a `role` field.
 
  return (
    <Router>
      <ShopContextProvider>
        <div style={{ display: "flex" }}>
          {user && <Sidebar role={userRole} />}
          <div style={{ flexGrow: 1, paddingLeft: "10px", marginTop: "64px" }}>
            <Navbar user={user} logout={logout} />
            <Container>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={<Login setUser={setUser} setToken={setToken} />}
                />
                <Route path="/signup" element={<Registration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
 
                <Route
                  path="/dashboard"
                  element={
                    token ? (
                      <Dashboard logout={logout} />
                    ) : (
                      <Login setUser={setUser} setToken={setToken} />
                    )
                  }
                />
 
                {/* User Routes */}
                {userRole === "user" && (
                  <>
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/category/:categoryName" element={<ShopCategory />} />      
                    <Route path="/product/:productId" element={<Product />} />
                    <Route
                      path="/mens"
                      element={
                        <ShopCategory banner={men_banner} category="men" />
                      }
                    />
                    <Route
                      path="/womens"
                      element={
                        <ShopCategory banner={women_banner} category="women" />
                      }
                    />
                    <Route
                      path="/kids"
                      element={
                        <ShopCategory banner={kid_banner} category="kids" />
                      }
                    />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                  </>
                )}
 
                {/* Redirect based on role */}
                <Route
                  path="/dashboard"
                  element={
                    userRole === "admin" ? (
                      <Navigate to="/dashboard" />
                    ) : (
                      <Navigate to="/shop" />
                    )
                  }
                />
 
                <Route
                  path="/products/add"
                  element={
                    user ? (
                      <AddProducts />
                    ) : (
                      <Login setUser={setUser} setToken={setToken} />
                    )
                  }
                />
                <Route path="/categories" element={<CategoryPage />} />
 
                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Container>
            <Footer />
          </div>
        </div>
      </ShopContextProvider>
    </Router>
  );
};

export default App;