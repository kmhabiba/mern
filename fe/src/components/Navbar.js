import React ,{useContext }from "react";
import { AppBar, Toolbar, Typography, Button, IconButton , Badge } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { WishlistCartContext } from "./context/WishlistCartContext";

function Navbar({ user, logout }) {

    const {cart} = useContext(WishlistCartContext);

    console.log("Full User Object:",user);
    console.log("User Role:" ,user?.role);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Grocery Shopping App
        </Typography>

        {/* Show Wishlist & Cart Icons Only for Logged-in Users with Role 'user' */}
        {user?.role === "user" && (
          <>
            <IconButton component={Link} to="/wishlist" color="inherit">
              <FavoriteIcon />
            </IconButton>

            <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent = {cart.length}>
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
