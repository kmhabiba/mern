import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {ShopContext} from "../../../Context/ShopContext"
import logo from "../Assets/logo.png";

const Navbar = ({ user, userRole, logout }) => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={logo} alt="logo" style={{ marginRight: "10px" }} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {userRole === "admin" ? "Grocery Shopping App (Admin)" : "SHOPPER"}
        </Typography>

        {userRole !== "admin" && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
             <MenuItem onClick={() => { setMenu("shop"); handleClose(); }}>
                        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
                    </MenuItem>
                    <MenuItem onClick={() => { setMenu("mens"); handleClose(); }}>
                        <Link to='/mens' style={{ textDecoration: 'none', color: 'inherit' }}>Men</Link>
                    </MenuItem>
                    <MenuItem onClick={() => { setMenu("womens"); handleClose(); }}>
                        <Link to='/womens' style={{ textDecoration: 'none', color: 'inherit' }}>Womens</Link>
                    </MenuItem>
                    <MenuItem onClick={() => { setMenu("kids"); handleClose(); }}>
                        <Link to='/kids' style={{ textDecoration: 'none', color: 'inherit' }}>Kids</Link>
                    </MenuItem>
            </Menu>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={getTotalCartItems()} color="secondary">
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
};

export default Navbar;
