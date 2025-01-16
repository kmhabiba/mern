import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { WishlistCartContext } from "../components/context/WishlistCartContext";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const { wishlist, cart, addToCart, toggleWishlist } =
    useContext(WishlistCartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  const fetchProducts = async (categoryId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5001/api/products${
          categoryId ? `?category=${categoryId}` : ""
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products in Category
      </Typography>

      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">
                    Price: ${product.price}
                  </Typography>
                </CardContent>

                <CardActions>
                  <IconButton onClick={() => toggleWishlist(product)}>
                    {wishlist.some((item) => item._id === product._id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>

                  <IconButton onClick={() => addToCart(product)}>
                    {cart.some((item) => item._id === product._id) ? (
                      <RemoveShoppingCartIcon color="primary" />
                    ) : (
                      <ShoppingCartIcon />
                    )}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No products available in this category.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CategoryProducts;