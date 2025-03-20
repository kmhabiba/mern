import React, { useContext } from "react";
import { WishlistCartContext } from "../components/context/WishlistCartContext";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const WishlistPage = () => {
  const { wishlist, toggleWishlist , addToCart} = useContext(WishlistCartContext);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Wishlist
      </Typography>

      <Grid container spacing={3}>
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                 <CardMedia
                                  component="img"
                                  height="200"
                                  image={`http://localhost:5001${product.image}`}
                                  alt={product.name}
                                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">
                    Price: ${product.price}
                  </Typography>
                </CardContent>

                <IconButton onClick={() => toggleWishlist(product)}>
                  <FavoriteIcon color="error" />
                </IconButton>

                <IconButton onClick={() => addToCart(product)}>
                  <ShoppingCartIcon color="primary" />
                
                    
                </IconButton>

              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No items in wishlist.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default WishlistPage;
