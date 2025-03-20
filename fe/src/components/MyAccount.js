import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
} from "@mui/material";

import {
  LocalShipping as LocalShippingIcon,
  Support as SupportIcon,
  Home as HomeIcon,
  MonetizationOn as MonetizationOnIcon,
  AccountCircle as AccountCircleIcon,
  CardGiftcard as CardGiftcardIcon,
  ShoppingCart as ShoppingCartIcon,
  Info as InfoIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import AddAddress from "./AddAddress";

const MyAccount = () => {
  const [addresses, setAddresses] = useState([]);

  const [showAddresses, setShowAddresses] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editAddress, setEditAddress] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user?._id;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const savedAddresses = localStorage.getItem("addresses");

      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));

        return;
      }

      const response = await axios.get(
        `http://localhost:5001/api/addresses/${userId}`
      );

      setAddresses(response.data);

      localStorage.setItem("addresses", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching addresses", error);
    }
  };

  const handleAddressAdded = (newAddress) => {
    if (newAddress && newAddress._id) {
      const updatedAddresses = addresses.some(
        (addr) => addr._id === newAddress._id
      )
        ? addresses.map((addr) =>
            addr._id === newAddress._id ? newAddress : addr
          )
        : [...addresses, newAddress];

      setAddresses(updatedAddresses);

      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    }

    setShowForm(false);

    setEditAddress(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/addresses/${id}`);

      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  const handleEdit = (address) => {
    setEditAddress(address);

    setShowForm(true);
  };

  return (
    <Box p={1}>
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>

      <Box mt={5} display="flex" justifyContent="flex-start" sx={{marginLeft:"0%"}}>
        <Card sx={{width:"500px" , padding:3 }}>
          <CardContent>
            <List>
              <ListItem button component={Link} to="/orders">
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
              <ListItem button component={Link} to="/support">
                <ListItemIcon>
                  <SupportIcon />
                </ListItemIcon>
                <ListItemText primary="Customer Support & FAQ" />
              </ListItem>
              <ListItem button onClick={() => setShowAddresses(!showAddresses)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Addresses" />
              </ListItem>
              <ListItem button component={Link} to="/refunds">
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Refunds" />
              </ListItem>
              <ListItem button component={Link} to="/profile-details">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile Details" />
              </ListItem>
              <ListItem button component={Link} to="/rewards">
                <ListItemIcon>
                  <CardGiftcardIcon />
                </ListItemIcon>
                <ListItemText primary="Rewards" />
              </ListItem>
              <ListItem button component={Link} to="/suggested-products">
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Suggested Products" />
              </ListItem>
              <ListItem button component={Link} to="/general-info">
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="General Info" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>

      {showAddresses && (
        <Box mt={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowForm(true)}
          >
            Add New Address
          </Button>

          {addresses.length > 0 ? (
            <List>
              {addresses.map((address) => (
                <ListItem key={address._id || address.zip}>
                  <ListItemText
                    primary={address.name}
                    secondary={`${address.street}, ${address.city}, ${address.state} - ${address.zip}, ${address.country}`}
                  />
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(address._id)}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No addresses found.</Typography>
          )}
        </Box>
      )}

      {showForm && (
        <AddAddress
          userId={userId}
          setAddresses={setAddresses}
          editAddress={editAddress}
          setEditAddress={setEditAddress}
          setShowForm={setShowForm}
          onAddressAdded={handleAddressAdded}
        />
      )}
    </Box>
  );
};

export default MyAccount;