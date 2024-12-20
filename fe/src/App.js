import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Container, Box, Typography, Grid } from '@mui/material';
import Navbar from './components/dashboard/Navbar';
import Sidebar from './components/dashboard/Sidebar';
import Login from './components/dashboard/Login';
import Dashboard from './components/dashboard/Dashboard';
import AddProducts from './components/dashboard/AddProducts';
import Registration from './components/dashboard/Registration';
import ForgotPassword from "./components/dashboard/ForgotPassword";
import ResetPassword from "./components/dashboard/ResetPassword";
//import ProductList from './components/ProductList';
//import Cart from './components/Cart';
import { CartProvider } from './components/dashboard/context/CartContext';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Shop from './pages/Website/Shop';
import ShopCategory from './pages/Website/ShopCategory';
import Product from './pages/Website/Product';
import Cart from './pages/Website/Cart';
import LoginSignup from './pages/Website/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png'
import ProtectedRoute from './components/dashboard/ProtectedRoute';
import UserHome from './components/dashboard/UserHome';
import { Navigate } from 'react-router-dom';
import CategoryPage from './components/dashboard/CategoryPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Router>
      <CartProvider>
        <div style={{ display: 'flex' }}>
          {user && <Sidebar />}
          <div style={{ flexGrow: 1, paddingLeft: '10px', marginTop: '64px' }}>
            <Navbar user={user} logout={logout} />
            <Container>
              <Routes>
                <Route path="/" element={<Login setToken={setToken} setUser={setUser}/>} />
                <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />
                <Route path="/signup" element={<Registration />} />
                <Route path="/dashboard" element={token ? <Dashboard logout={logout} /> : <Login setUser={setUser} setToken={setToken} />} />
                <Route path="/user-home" element={<UserHome />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              {/* <Route path="/products" element={user ? <Products /> : <Login setUser={setUser} setToken={setToken} />} /> */}
              <Route path="/products/add" element={user ? <AddProducts /> : <Login setUser={setUser} setToken={setToken} />} />
              <Route path="/categories" element={<CategoryPage />} />
            </Routes>
          </Container>
        </div>
      </div>
    </CartProvider>
    </Router >
      <Router>
        <CartProvider>
          <div style={{ display: 'flex' }}>
            {user && <Sidebar />}
            <div style={{ flexGrow: 1, paddingLeft: '10px', marginTop: '64px' }}>
              <Navbar user={user} logout={logout} />
              <Container>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path='/' element={<Shop />} />
                  <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
                  <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
                  <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
                  <Route path='product' element={<Product />}>
                    <Route path=':productId' element={<Product />} />
                  </Route>
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/login' element={<LoginSignup />} />
                  <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />
                  <Route path="/signup" element={<Registration />} />
                {/* // routes for normal user */}
                  <Route path="/dashboard" element={token && userRole == 'customer' ? <Dashboard logout={logout} /> : <Login setUser={setUser} setToken={setToken} />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  {/* <Route path="/products" element={user ? <Products /> : <Login setUser={setUser} setToken={setToken} />} /> */}
                  <Route path="/products/add" element={user ? <AddProducts /> : <Login setUser={setUser} setToken={setToken} />} />
                </Routes>
              </Container>
            </div>
          </div>
        </CartProvider>
      </Router>
      <Footer />
    </BrowserRouter>
  );
};

const Home = () => {   // Home Component with Background Image
  return (
    <Box
      sx={{
        backgroundImage: 'url(https://th.bing.com/th?id=OIP.TLnAjZeghpqjliFtQ9zaxgHaFb&w=291&h=214&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'brown',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h3" component="h1" sx={{ marginBottom: '20px' }}>
        Welcome to Habiba's Grocery Shopping App!
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '30px' }}>
        A convenient and easy way to shop for all your daily groceries. Explore fresh veggies and much more.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: '10px' }}>
          Start your shopping journey by logging in or signing up.
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
