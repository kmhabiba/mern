import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { Favorite, ShoppingCart } from '@mui/icons-material'; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        alert(`${product.name} has been added to your cart.`);
    };

    const handleAddToWishlist = (product) => {
        if (!wishlist.some((item) => item._id === product._id)) {
            setWishlist([...wishlist, product]);
            alert(`${product.name} has been added to your wishlist.`);
        } else {
            alert(`${product.name} is already in your wishlist.`);
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" component="h2" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                Product List
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <ProductGrid>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Grid item key={product._id} xs={12} sm={6} md={4}>
                                <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                                    {/* Product Image */}
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image || 'https://via.placeholder.com/200'}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${product.price}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAddToCart(product)}
                                            startIcon={<ShoppingCart />} 
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleAddToWishlist(product)}
                                            startIcon={<Favorite />} 
                                        >
                                            Add to Wishlist
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
                            No products available
                        </Typography>
                    )}
                </ProductGrid>
            )}
        </Box>
    );
};
const ProductGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 200px)',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '4px',
    },
}));

export default ProductList;