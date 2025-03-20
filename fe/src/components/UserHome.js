// UserHome.js
// import React from 'react';

// const UserHome = () => {
//     return (
//         <div>
//             <h1 className = "navbar-align">Welcome to the User Home</h1>
//             {/* Add more content for the user */}
//         </div>
//     );
// };

// export default UserHome;

//
import React, { useContext } from "react";
import { ProductContext } from "../components/context/ProductContext";
import { WishlistCartContext } from "../components/context/WishlistCartContext";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserHome = () => {
  const { products } = useContext(ProductContext); // Get products from context
  const { addToCart } = useContext(WishlistCartContext); // Get addToCart function

  return (
    <div>
      <h1 className="navbar-align">Welcome to the User Home</h1>

      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ maxWidth: 300, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  //image={product.image}  Ensure the backend provides an `image` field
                  image={`http://localhost:5001${product.image}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    ₹{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
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