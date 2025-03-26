import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddProducts from "./components/AddProducts";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { CartProvider } from "./components/context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UserHome from "./components/UserHome";
import CategoryPage from "./components/CategoryPage";
import CategoryProducts from "./components/CategoryProducts";
import ProductDetail from "./components/ProductDetail";
import WishlistPage from "./components/WishlistPage";
import CartPage from "./components/CartPage";
import { WishlistCartProvider } from "./components/context/WishlistCartContext";
import { ProductProvider } from "./components/context/ProductContext";
import MyAccount from "./components/MyAccount";
import OrderHistory from "./components/OrderHistory";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <Router>
      <CartProvider>
        <WishlistCartProvider>
          <ProductProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", // Ensures full height of viewport
              }}
            >
              {/* Navbar & Sidebar */}
              {user && <Sidebar />}
            <Navbar user={user} logout={logout} />
              <Box sx={{ flex: 1, paddingLeft: user ? "10px" : 0, mt: "64px" }}>
                <Container>
                  <Routes>
                    <Route
                      path="/"element={<Login setToken={setToken} setUser={setUser}/>}/>
                    <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />}/>
                    <Route path="/signup" element={<Registration />} />
                    <Route path="/dashboard" element={
                        token ? (
                          <Dashboard logout={logout} />
                        ) : (
                          <Login setUser={setUser} setToken={setToken} />
                        )
                      }
                    />
                    <Route path="/user-home" element={<UserHome />} />
                    <Route path="/forgot-password" element={<ForgotPassword />}/>
                    <Route path="/reset-password/:token" element={<ResetPassword />}/>
                    <Route path="/products/add" element={
                        user ? (
                          <AddProducts />
                        ) : (
                          <Login setUser={setUser} setToken={setToken} />
                        )
                      }
                    />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="/categories/:categoryId" element={<CategoryProducts />}/>
                    <Route path="/product/:productId" element={<ProductDetail />}/>
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/myaccount" element={<MyAccount />} />
                  </Routes>
                </Container>
              </Box>

              {/* Footer (Fixed at the bottom) */}
              <Footer />
            </Box>
          </ProductProvider>
        </WishlistCartProvider>
      </CartProvider>
    </Router>

  );
};

export default App;