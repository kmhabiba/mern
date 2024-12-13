import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Typography,
    Collapse,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    ExpandLess,
    ExpandMore,
    Category as CategoryIcon,
    Inventory as InventoryIcon,
    Logout as LogoutIcon,
    AccountCircle as AccountCircleIcon,
    ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';

const Sidebar = () => {
    const navigate = useNavigate();
    const [openProducts, setOpenProducts] = useState(false);
    const [openOrders, setOpenOrders] = useState(false);

    const toggleProducts = () => setOpenProducts(!openProducts);
    const toggleOrders = () => setOpenOrders(!openOrders);

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };

    const role = localStorage.getItem('role'); // 'admin' or 'user'
    const username = localStorage.getItem('username');

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    marginTop: '64px',
                    color: 'black',
                },
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                <Avatar sx={{ bgcolor: '#4A90E2', marginRight: '10px' }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography variant="h6">Hello, {username}</Typography>
            </div>

            <List>
               {role === 'admin' && (
                <ListItem button onClick={handleDashboardClick}>
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: 'black' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                )}

                
                {role === 'admin' && (
                    <>
                        <ListItem button onClick={toggleProducts}>
                            <ListItemIcon>
                                <CategoryIcon sx={{ color: 'black' }} />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                            {openProducts ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openProducts} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button sx={{ pl: 4 }} component={Link} to="/products/add">
                                    <ListItemText primary="Add Products" />
                                </ListItem>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemText primary="Product Categories" />
                                </ListItem>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemText primary="Search Products" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </>
                )}

                
                 {role === 'user' && (
                        <ListItem button onClick={() => navigate ('/user-home')}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="User Dashboard" />
                        </ListItem>
                    )}

                {/* Show Orders section for both admins and users */}
                {role === 'admin' || role === 'user' ? (
                    <ListItem button onClick={toggleOrders}>
                        <ListItemIcon>
                            <ShoppingCartIcon sx={{ color: 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                        {openOrders ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                ) : null}

                {/* Only visible for admin */}
                {role === 'admin' && (
                    <>
                        {/* Supplier Section */}
                        <ListItem button>
                            <ListItemIcon>
                                <InventoryIcon sx={{ color: 'black' }} />
                            </ListItemIcon>
                            <ListItemText primary="Supplier" />
                        </ListItem>

                        {/* User Activity Logs */}
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon sx={{ color: 'black' }} />
                            </ListItemIcon>
                            <ListItemText primary="User Activity Logs" />
                        </ListItem>
                    </>
                )}

                {/* My Account (Always visible) */}
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon sx={{ color: 'black' }} />
                    </ListItemIcon>
                    <ListItemText primary="My Account" />
                </ListItem>

                {/* Logout (Always visible) */}
                <ListItem button>
                    <ListItemIcon>
                        <LogoutIcon sx={{ color: 'black' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;