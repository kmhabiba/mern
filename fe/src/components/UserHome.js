//with detail page
import React, { useContext } from "react";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ProductContext } from "../components/context/ProductContext";
import { WishlistCartContext } from "../components/context/WishlistCartContext";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserHome = () => {
  const { products, searchTerm, setSearchTerm } = useContext(ProductContext);
  const { addToCart } = useContext(WishlistCartContext);
  const navigate = useNavigate(); // Initialize navigate
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="navbar-align">Welcome to the User Home</h1>

      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ maxWidth: 300, boxShadow: 3, cursor: "pointer" }}>
                {/* Clicking on the image or name opens ProductDetail page */}
                <Box
                  onClick={() => navigate(`/product/${product._id}`)}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:5001${product.image}`}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => addToCart(product)}
                  sx={{ width: "100%", borderRadius: 0 }}
                >
                  Add to Cart
                </Button>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ margin: "20px auto" }}>
            No Products Available
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default UserHome;