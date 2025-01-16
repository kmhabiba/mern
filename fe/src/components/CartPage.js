//---------------------adding  qty/movetowishlist/select in cart-----------------

import React, { useContext, useState } from "react";
import { WishlistCartContext } from "../components/context/WishlistCartContext";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CartPage = () => {
  const { cart, removeFromCart, moveToWishlist, updateQuantity } =
    useContext(WishlistCartContext);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const placeOrder = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to order.");
      return;
    }
    alert(`Order placed for items: ${selectedItems.join(", ")}`);
    setSelectedItems([]); // Clear selection after ordering
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {/* Selected items count display */}       
      {selectedItems.length > 0 && (        
        <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", color: "green", marginBottom: "10px" }}         
        > 
        {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected for order 
        </Typography> )}

      <Grid container spacing={3}>
        {cart.length > 0 ? (
          cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedItems.includes(product._id)}
                        onChange={() => handleSelectItem(product._id)}
                      />
                    }
                    label="Select to Order"
                  />
                  <Typography variant="h6">{product.name}</Typography>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        Price: ${product.price}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id={`quantity-label-${product._id}`}>
                          Qty
                        </InputLabel>
                        <Select
                          labelId={`quantity-label-${product._id}`}
                          id={`quantity-select-${product._id}`}
                          value={product.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              product._id,
                              parseInt(e.target.value)
                            )
                          }
                          label="Qty"
                          sx={{
                            fontSize: "14px",
                          }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                            <MenuItem key={quantity} value={quantity}>
                              {quantity}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>

                {/* Move to Wishlist */}
                <IconButton onClick={() => moveToWishlist(product)}>
                  <FavoriteIcon color="secondary" />
                </IconButton>

                {/* Remove from Cart */}
                <IconButton onClick={() => removeFromCart(product._id)}>
                  <RemoveShoppingCartIcon color="primary" />
                </IconButton>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No items in cart.</Typography>
        )}
      </Grid>

      {/* Place Order Button */}
      {cart.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={placeOrder}
          style={{ marginTop: "20px" }}
        >
          Place Order
        </Button>
      )}
    </Container>
  );
};

export default CartPage;