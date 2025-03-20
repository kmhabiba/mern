import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { WishlistCartContext } from "../components/context/WishlistCartContext";
import {
  Container,
  Typography,
  Grid,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Radio,
  RadioGroup,
  CardContent,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  const { cart, removeFromCart, moveToWishlist, updateQuantity } =
    useContext(WishlistCartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [orderHistory , setOrderHistory] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [editAddress, setEditAddress] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/addresses/${userId}`)
      .then((response) => {
        setAddresses(response.data);
        if (response.data.length > 0) {
          setSelectedAddress(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
      });
  }, [userId]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cart]);

  // useEffect(() => {
  //   const savedOrders = JSON.parse(localStorage.getItem("orderHistory"));
  //   if (savedOrders) {
  //     setOrderHistory(savedOrders);
  //   }
  // }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShowAllAddresses(false);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleAddAddress = () => {
    axios
      .post(`http://localhost:5001/api/addresses`, { ...newAddress, userId })
      .then((response) => {
        setAddresses([...addresses, response.data]);
        setOpenAddressDialog(false);
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  };

  const handleEditAddress = (address) => {
    setEditAddress(address);
    setNewAddress(address);
    setOpenAddressDialog(true);
  };

  const handleUpdateAddress = () => {
    axios
      .put(`http://localhost:5001/api/addresses/${editAddress._id}`, newAddress)
      .then(() => {
        setAddresses(
          addresses.map((addr) =>
            addr._id === editAddress._id ? newAddress : addr
          )
        );
        setEditAddress(null);
        setOpenAddressDialog(false);
      })
      .catch((error) => console.error("Error updating address:", error));
  };

  const handleDeleteAddress = (id) => {
    axios
      .delete(`http://localhost:5001/api/addresses/${id}`)
      .then(() => {
        setAddresses(addresses.filter((addr) => addr._id !== id));
      })
      .catch((error) => console.error("Error deleting address:", error));
  };

  const handleOpenAddressDialog = (address = null) => {
    if (address) {
      // Editing an existing address
      setNewAddress(address);
      setEditAddress(true);
    } else {
      // Adding a new address (Reset form)
      setNewAddress({
        name: "",
        mobile: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      });
      setEditAddress(false);
    }
    setOpenAddressDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddressDialog(false);
    setNewAddress({
      name: "",
      mobile: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    });
  };


  const PLATFORM_FEE = 20; // Example platform fee

  const SHIPPING_FEE = 50; // Example shipping fee

  // Calculate total price of selected items

  const totalPrice = selectedItems.reduce((sum, itemId) => {
    const item = cart.find((product) => product._id === itemId);

    return sum + (item ? item.price * item.quantity : 0);
  }, 0);

  const finalAmount = totalPrice + PLATFORM_FEE + SHIPPING_FEE;

  // const placeOrder = () => {
  //   if (selectedItems.length === 0) {
  //     alert("Please select at least one item to order.");
  //     return;
  //   }
  //   alert(`Order placed for items: ${selectedItems.join(", ")}`);
  //   selectedItems.forEach((itemId) => {
  //     removeFromCart(itemId);
  //   });
  //   setSelectedItems([]);
  // };

  const placeOrder = () => {

    if (selectedItems.length === 0) {
  
      alert("Please select at least one item to order.");
  
      return;
  
    }
   
    // Get cart items for selected products
  
    const orderedItems = cart.filter((item) => selectedItems.includes(item._id));
   
    if (orderedItems.length === 0) {
  
      alert("No valid items found in the cart.");
  
      return;
  
    }
   
    // Calculate total price
  
    const totalPrice = orderedItems.reduce(
  
      (acc, item) => acc + item.price * item.quantity,
  
      0
  
    );
   
    // Create order object
  
    const newOrder = {
  
      id: new Date().getTime(), // Unique order ID
  
      date: new Date().toLocaleString(),
  
      items: orderedItems,
  
      total: totalPrice,
  
    };
   
    // Store in order history (localStorage)
  
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
  
    localStorage.setItem("orderHistory", JSON.stringify([...orderHistory, newOrder]));
   
    alert(`Order placed successfully!`);
   
    console.log("Removing items:", selectedItems); // Debugging log
   
    // Remove selected items from the cart
  
    selectedItems.forEach((itemId) => {
  
      removeFromCart(itemId);
  
    });
   
    // Reset selected items
  
    setSelectedItems([]);
  
  };
  
   
 

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {selectedItems.length > 0 && (
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "green", marginBottom: "10px" }}
        >
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"}{" "}
          selected for order
        </Typography>
      )}
      {addresses.length > 0 ? (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6">Shipping Address</Typography>
          {selectedAddress ? (
            <Card
              variant="outlined"
              sx={{ padding: "10px", marginTop: "10px" }}
            >
              <Typography>
                {selectedAddress.name} - {selectedAddress.street},{" "}
                {selectedAddress.city}, {selectedAddress.state},{" "}
                {selectedAddress.country}, {selectedAddress.zip}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShowAllAddresses(true)}
              >
                Change Address
              </Button>
            </Card>
          ) : (
            <Typography color="error">No address selected.</Typography>
          )}
          {showAllAddresses && (
            <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Action</TableCell>
                    {/* <TableCell>City</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>ZIP</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses.map((address) => (
                    <TableRow key={address._id}>
                      <TableCell>
                        <Radio
                          checked={selectedAddress?._id === address._id}
                          onChange={() => handleSelectAddress(address)}
                        />
                      </TableCell>
                      <TableCell>
                        {address.name},{address.street},{address.city},
                        {address.state},{address.country},{address.zip}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditAddress(address)}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteAddress(address._id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {showAllAddresses && (
            <Button onClick={() => handleOpenAddressDialog(null)}>
              Add New Address
            </Button>
          )}
        </div>
      ) : (
        <Typography color="error">
          No addresses found. Please add an address.
        </Typography>
      )}
      <Dialog open={openAddressDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editAddress ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={newAddress.name}
            onChange={(e) =>
              setNewAddress({ ...newAddress, name: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Street"
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="City"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="State"
            value={newAddress.state}
            onChange={(e) =>
              setNewAddress({ ...newAddress, state: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Country"
            value={newAddress.country}
            onChange={(e) =>
              setNewAddress({ ...newAddress, country: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="ZIP Code"
            value={newAddress.zip}
            onChange={(e) =>
              setNewAddress({ ...newAddress, zip: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Mobile Number"
            value={newAddress.mobile}
            onChange={(e) =>
              setNewAddress({ ...newAddress, mobile: e.target.value })
            }
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={editAddress ? handleUpdateAddress : handleAddAddress}
            color="primary"
          >
            {editAddress ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {cart.length > 0 ? (
          cart.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card sx={{ maxWidth: 300, boxShadow: 3 }}>
                {/* Product Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5001${product.image}`}
                  alt={product.name}
                />
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
                  <Typography variant="body2">
                    Price: ₹{product.price}
                  </Typography>

                  {/* Quantity Selector */}
                  <FormControl fullWidth>
                    <InputLabel id={`quantity-label-${product._id}`}>
                      Qty
                    </InputLabel>
                    <Select
                      labelId={`quantity-label-${product._id}`}
                      id={`quantity-select-${product._id}`}
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product._id, parseInt(e.target.value))
                      }
                      label="Qty"
                    >
                      {[...Array(10).keys()].map((quantity) => (
                        <MenuItem key={quantity + 1} value={quantity + 1}>
                          {quantity + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>

                {/* Wishlist & Remove Icons */}
                <IconButton onClick={() => moveToWishlist(product)}>
                  <FavoriteIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => removeFromCart(product._id)}>
                  <RemoveShoppingCartIcon color="primary" />
                </IconButton>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No items in cart.</Typography>
        )}

        {/* Order Summary */}

        {cart.length > 0 && (
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{ padding: "15px", marginTop: "20px" }}
            >
              <Typography variant="h6">Order Summary</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Price</TableCell>
                      <TableCell align="right">
                        ₹{totalPrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Platform Fee</TableCell>
                      <TableCell align="right">
                        ₹{PLATFORM_FEE.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Shipping Fee</TableCell>
                      <TableCell align="right">
                        ₹{SHIPPING_FEE.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Final Amount</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>₹{finalAmount.toFixed(2)}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        )}

        {/* Place Order Button */}

        {cart.length > 0 && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={placeOrder}
              sx={{ marginTop: "20px" }}
            >
              Place Order
            </Button>
          </Grid>
        )}
      </Grid>

      {/* {cart.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={placeOrder}
          style={{ marginTop: "20px" }}
        >
          Place Order
        </Button>
      )} */}
    </Container>
  );
};
export default CartPage;

// //---------------------adding  qty/movetowishlist/select in cart-----------------

// import React, { useEffect ,useContext, useState } from "react";
// import axios from "axios";
// import { WishlistCartContext } from "../components/context/WishlistCartContext";
// import {
//   Container,
//   Typography,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Card,
//   Radio,
//   RadioGroup,
//   CardContent,
//   IconButton,
//   Button,
//   TextField,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import FavoriteIcon from "@mui/icons-material/Favorite";

// const CartPage = () => {
//   const { cart, removeFromCart, moveToWishlist, updateQuantity } =
//     useContext(WishlistCartContext);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress , setSelectedAddress] = useState(null);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5001/api/addresses/${userId}`)
//       .then((response) => {
//         setAddresses(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching addresses:", error);
//       });
//   }, []);

//   const handleSelectAddress = (address) => {
//     setSelectedAddress(address);
//     console.log("Selected Address:", address);
//   };

//   const handleSelectItem = (itemId) => {
//     setSelectedItems((prevSelected) =>
//       prevSelected.includes(itemId)
//         ? prevSelected.filter((id) => id !== itemId)
//         : [...prevSelected, itemId]
//     );
//   };

//   const placeOrder = () => {
//     if (selectedItems.length === 0) {
//       alert("Please select at least one item to order.");
//       return;
//     }
//     alert(`Order placed for items: ${selectedItems.join(", ")}`);

//     // Remove items from cart after placing the order
//     selectedItems.forEach((itemId) => {
//       removeFromCart(itemId);
//     });

//     setSelectedItems([]); // Clear selection after ordering
//   };

// return (
//   <Container>
//   <Typography variant="h4" gutterBottom>
//           Shopping Cart
//   </Typography>

//         {/* Selected items count display */}
//         {selectedItems.length > 0 && (
//   <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "green", marginBottom: "10px" }}>
//             {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected for order
//   </Typography>
//         )}

//         {/* Address Selection Section */}
//         {addresses.length > 0 ? (
//   <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "10px" }}>
//   <Typography variant="h6">Select an Address</Typography>
//   <RadioGroup value={selectedAddress?._id || ""} onChange={(e) => handleSelectAddress(addresses.find((addr) => addr._id === e.target.value))}>
//               {addresses.map((address) => (
//   <Card key={address._id} variant="outlined" sx={{ padding: "10px", marginTop: "10px" }}>
//   <FormControlLabel
//                     value={address._id}
//                     control={<Radio />}
//                     label={`${address.name} - ${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`}
//                   />
//   </Card>
//               ))}
//   </RadioGroup>
//   </div>
//         ) : (
//   <Typography color="error">No addresses found. Please add an address.</Typography>
//         )}

//         {/* Cart Items */}
//   <Grid container spacing={3}>
//           {cart.length > 0 ? (
//             cart.map((product) => (
//   <Grid item xs={12} sm={6} md={4} key={product._id}>
//   <Card>
//   <CardContent>
//   <FormControlLabel
//                       control={
//   <Checkbox checked={selectedItems.includes(product._id)} onChange={() => handleSelectItem(product._id)} />
//                       }
//                       label="Select to Order"
//                     />
//   <Typography variant="h6">{product.name}</Typography>
//   <Grid container spacing={1} alignItems="center">
//   <Grid item xs={12} sm={6}>
//   <Typography variant="body2">Price: ${product.price}</Typography>
//   </Grid>
//   <Grid item xs={12} sm={6}>
//   <FormControl fullWidth>
//   <InputLabel id={`quantity-label-${product._id}`}>Qty</InputLabel>
//   <Select
//                             labelId={`quantity-label-${product._id}`}
//                             id={`quantity-select-${product._id}`}
//                             value={product.quantity}
//                             onChange={(e) => updateQuantity(product._id, parseInt(e.target.value))}
//                             label="Qty"
//                             sx={{ fontSize: "14px" }}
//   >
//                             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
//   <MenuItem key={quantity} value={quantity}>
//                                 {quantity}
//   </MenuItem>
//                             ))}
//   </Select>
//   </FormControl>
//   </Grid>
//   </Grid>
//   </CardContent>

//                   {/* Move to Wishlist */}
//   <IconButton onClick={() => moveToWishlist(product)}>
//   <FavoriteIcon color="secondary" />
//   </IconButton>

//                   {/* Remove from Cart */}
//   <IconButton onClick={() => removeFromCart(product._id)}>
//   <RemoveShoppingCartIcon color="primary" />
//   </IconButton>
//   </Card>
//   </Grid>
//             ))
//           ) : (
//   <Typography>No items in cart.</Typography>
//           )}
//   </Grid>

//         {/* Place Order Button */}
//         {cart.length > 0 && (
//   <Button variant="contained" color="primary" onClick={placeOrder} style={{ marginTop: "20px" }}>
//             Place Order
//   </Button>
//         )}
//   </Container>
//     );
//   };

// export default CartPage;
