// import React, { useContext, useRef, useState } from 'react'
// import { Link } from "react-router-dom";

// import "./Navbar.css";
// import logo from "../Assets/logo.png"
// import cart_icon from "../Assets/cart_icon.png";
// import { ShopContext } from '../../Context/ShopContext';
// import nav_dropdown from "../Assets/nav_dropdown.png";

// const Navbar = () => {

//     const [menu, setMenu] = useState("shop");
//     const {getTotalCartItems} = useContext(ShopContext);
//     const menuRef=useRef();

//     const dropdown_toggle =(e)=>{
//         menuRef.current.classList.toggle('nav-menu-visible');
//         e.target.classList.toggle('open');
//     }

//     return (
//         <div className='navbar'>
//             <div className='nav-logo'>
//                 <img src={logo} alt="" />
//                 <p>SHOPPER</p>
//             </div>
//             <img  className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
//             <ul ref={menuRef} className="nav-menu">
//                 <li onClick={() => { setMenu("shop") }}>
//                     <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
//                     {menu === 'shop' ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("mens") }}>
//                     <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>
//                     {menu === 'mens' ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("womens") }}>
//                     <Link style={{ textDecoration: 'none' }} to='/womens'>Womens</Link>
//                     {menu === 'womens' ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("kids") }}>
//                     <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
//                     {menu === 'kids' ? <hr /> : <></>}</li>
//             </ul>
//             <div className='nav-login-cart'>
//                 <Link to='/login'><button>Login</button></Link>
//                 <Link to='/cart'><img src={cart_icon} alt="" /></Link>
//                 <div className="nav-cart-count">{getTotalCartItems()}</div>
//             </div>
//         </div>
//     )
// }

// export default Navbar

import React, { useContext , useState } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShopContext } from '../../dashboard/context/ShopContext';
import logo from "../Assets/logo.png";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {
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
                <img src={logo} alt="logo" style={{ marginRight: '10px' }} />
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    SHOPPER
                </Typography>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
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
                <Button color="inherit" component={Link} to='/login'>Login</Button>
                <IconButton color="inherit" component={Link} to='/cart'>
                    <Badge badgeContent={getTotalCartItems()} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;