import React, { useState, useEffect, useContext } from "react";
import { useParams , Link } from "react-router-dom";
import axios from "axios";
import { WishlistCartContext } from "../components/context/WishlistCartContext";
import { ProductContext } from "../components/context/ProductContext";
import {
  Container,
  Typography,
  Grid,
  CardMedia,
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
  const { wishlist, cart, addToCart, toggleWishlist } = useContext(WishlistCartContext);
  const { searchTerm} = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 

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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                {product._id && (
                <Link to = {`/product/${product._id}`} style={{ textDecoration: "none" , color:"inherit"}}>
                  <CardMedia 
                  component="img" 
                  height="200" 
                  image={`http://localhost:5001${product.image}`}
                  alt={product.name}
                  onError={(e) => {e.target.src="/fallback-image.jpg"}}
                  />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">Price: INR {product.price}</Typography>
                </CardContent>
                </Link>
                )}

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