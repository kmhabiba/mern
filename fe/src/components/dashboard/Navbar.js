import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ user, logout }) {
    return (
        <AppBar 
            position="fixed"
            >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Grocery Shopping App
                </Typography>
                {!user ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={logout}>Logout</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
