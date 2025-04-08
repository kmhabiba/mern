import React, { useContext, useEffect, useState } from "react";
 
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Badge,
  InputAdornment,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
 
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
 
import { Link, useNavigate } from "react-router-dom";
 
import { WishlistCartContext } from "./context/WishlistCartContext";
 
import { ProductContext } from "./context/ProductContext";
 
import { CategoryContext } from "./context/CategoryContext";
 
function Navbar({ user, logout }) {
  const { cart } = useContext(WishlistCartContext);
 
  const { categories } = useContext(CategoryContext);
 
  const { products, fetchProducts } = useContext(ProductContext);
 
  const [searchQuery, setSearchQuery] = useState("");
 
  const [tabValue, setTabValue] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarWidth = 240;
 
  const navigate = useNavigate();
 
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);
 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
 
    if (!searchQuery.trim()) return;
 
    const lowerCaseQuery = searchQuery.toLowerCase();
 
    const filteredProducts = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
 
      const category =
        typeof product.category === "string"
          ? product.category.toLowerCase()
          : "";
 
      return name.includes(lowerCaseQuery) || category.includes(lowerCaseQuery);
    });
 
    if (filteredProducts.length > 0) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
 
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
 
    navigate(`/categories/${categories[newValue]._id}`);
  };
 
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
 
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          ml: `240px`,
          width: openSidebar ? `calc(100% - ${sidebarWidth}px)` : "100%",
          transition: "margin 0.3s ease-in-out, width 0.3s ease-in-out",
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it's above the sidebar
        }}
      >
        <Toolbar sx={{ pl: `${sidebarWidth}px `}}>
 
 
          <Typography variant="h6" sx={{ flexGrow: 1 , ml:6}}>
            Grocery Shopping App
          </Typography>
         
         
 
          {user?.role === "user" && (
            <form onSubmit={handleSearchSubmit}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search by category or product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
 
          {user?.role === "user" && (
            <>
              <IconButton component={Link} to="/wishlist" color="inherit">
                <FavoriteIcon />
              </IconButton>
              <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent={cart?.length || 0} color="secondary">
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
 
      {user && categories?.length > 0 && (
        <Box
          sx={{
            marginTop: "64px",
            bgcolor: "background.paper",
            overflowX: "auto",
            display: "flex",
            ml:"240px",
            whiteSpace:"nowrap",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable category tabs"
            sx={{ width: "80%" }}
          >
            {categories.map((category, index) => (
              <Tab key={category._id} label={category.name} />
            ))}
          </Tabs>
        </Box>
      )}
    </>
  );
}
 
export default Navbar;