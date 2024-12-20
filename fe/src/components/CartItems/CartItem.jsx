import React, { useContext } from 'react';
import { Box, Typography, Button, Grid, Divider, TextField } from '@mui/material';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import './cartItem.css';

const CartItem = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
    return (
        <Box className='cartitems'>
            <Grid container className="cartitems-format-main">
                <Typography>Products</Typography>
                <Typography>Title</Typography>
                <Typography>Price</Typography>
                <Typography>Quantity</Typography>
                <Typography>Total</Typography>
                <Typography>Remove</Typography>
            </Grid>
            <Divider />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <Box key={e.id}>
                            <Grid container className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <Typography>{e.name}</Typography>
                                <Typography>${e.new_price}</Typography>
                                <Button variant="outlined" className='cartitems-quantity'>{cartItems[e.id]}</Button>
                                <Typography>${e.new_price * cartItems[e.id]}</Typography>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </Grid>
                            <Divider />
                        </Box>
                    );
                }
                return null;
            })}
            <Box className="cartitems-down">
                <Box className="cartitems-total">
                    <Typography variant="h1">Cart Totals</Typography>
                    <Box>
                        <Box className="cartitems-total-item">
                            <Typography>Sub Total</Typography>
                            <Typography>${getTotalCartAmount()}</Typography>
                        </Box>
                        <Divider />
                        <Box className="cartitems-total-item">
                            <Typography>Shipping Fee</Typography>
                            <Typography>Free</Typography>
                        </Box>
                        <Divider />
                        <Box className="cartitems-total-item">
                            <Typography variant="h3">Total</Typography>
                            <Typography variant="h3">${getTotalCartAmount()}</Typography>
                        </Box>
                    </Box>
                    <Button variant="contained">PROCEED TO CHECKOUT</Button>
                </Box>
                <Box className="cartitems-promocode">
                    <Typography>If you have a promo code, Enter it here</Typography>
                    <Box className="cartitems-promobox">
                        <TextField variant="outlined" placeholder='promo code' />
                        <Button variant="contained">Submit</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;