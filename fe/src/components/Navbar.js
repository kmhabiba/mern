import React, { useContext , useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Badge,
  InputAdornment
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { WishlistCartContext } from "./context/WishlistCartContext";
import { ProductContext} from "./context/ProductContext";

function Navbar({ user, logout }) {
  const { cart } = useContext(WishlistCartContext);
  const {products , fetchProducts} = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {searchTerm , setSearchTerm} = useContext(ProductContext);

  useEffect(() =>{
    if(products.length === 0){
      fetchProducts();
    }
  },[products , fetchProducts]);

  console.log("Full User Object:", user);
  console.log("User Role:", user?.role);
  console.log("Products in Context:", products);


  const handleSearchChange = (e) => {

    setSearchQuery(e.target.value);

  };
 
  const handleSearchSubmit = (e) => {

    e.preventDefault();
 
    if (!searchQuery.trim()) {

      console.warn("Search query is empty!");

      return;

    }
 
    if (!Array.isArray(products) || products.length === 0) {

      console.warn("No products available or products is not an array");

      return;

    }
 
    const lowerCaseQuery = searchQuery.toLowerCase();
    products.forEach(product => console.log("Category:", product.category, typeof product.category));

    const filteredProducts = products.filter((product) =>{

      // const nameMatch = product?.name? String(product.name).toLowerCase() : "";

      // const categoryMatch = product?.category? String(product.category).toLowerCase(): "";
      // return nameMatch.includes(lowerCaseQuery) || categoryMatch.includes(lowerCaseQuery) ;
      const name = product.name?.toLowerCase() || "";
      const category = typeof product.category === "string" ? product.category.toLowerCase() : "";
 
      return name.includes(lowerCaseQuery) || category.includes(lowerCaseQuery);
  });
 
    if (filteredProducts.length > 0) {

      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);

    } else {

      console.warn("No matching products found.");

    }

  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Grocery Shopping App
        </Typography>

        {/* Show Search Bar Only for Logged-in Users */}
        {user?.role === "user" && (
          <form onSubmit={handleSearchSubmit}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by category or product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              width: 250,
              mr: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          </form>
        )}

        {/* Show Wishlist & Cart Icons Only for Logged-in Users with Role 'user' */}
        {user?.role === "user" && (
          <>
            <IconButton component={Link} to="/wishlist" color="inherit">
              <FavoriteIcon />
            </IconButton>

            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={cart.length}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </>
        )}

        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
