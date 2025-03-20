import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAddress = ({
  userId,
  onAddressAdded,
  editAddress,
  setEditAddress,
}) => {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // ✅ Prefill form when editing an address
  useEffect(() => {
    if (editAddress) {
      setAddress(editAddress);
    } else {
      // Reset the form when not editing
      setAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
    }
  }, [editAddress]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const storedUserId = user?._id || userId;

      if (!storedUserId || storedUserId.length !== 24) {
        alert("Error: Invalid or missing User ID.");
        return;
      }

      const newAddress = { ...address, userId: storedUserId };

      let response;
      if (editAddress && editAddress._id) {
        // ✅ Update address
        response = await axios.put(
          `http://localhost:5001/api/addresses/${editAddress._id}`,
          newAddress
        );
        console.log("Address updated:", response.data);
        alert("Address updated successfully!");
      } else {
        // ✅ Add new address
        response = await axios.post(
          "http://localhost:5001/api/addresses",
          newAddress
        );
        console.log("Address added:", response.data);
        alert("Address added successfully!");
      }

      // ✅ Ensure onAddressAdded is a function before calling it
      if (typeof onAddressAdded === "function") {
        onAddressAdded(response.data);
      }

      // ✅ Reset form only if not editing
      if (!editAddress) {
        setAddress({
          name: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
      }

      // ✅ Ensure setEditAddress is a function before calling it
      if (typeof setEditAddress === "function") {
        setEditAddress(null);
      }
    } catch (error) {
      console.error(
        "Error adding/updating address:",
        error.response?.data || error.message
      );
      alert(
        `Failed to add/update address: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <h3>{editAddress ? "Edit Address" : "Add New Address"}</h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={address.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="street"
        placeholder="Street"
        value={address.street}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="zip"
        placeholder="Zip Code"
        value={address.zip}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={address.country}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {editAddress ? "Update Address" : "Save Address"}
      </button>
    </form>
  );
};

export default AddAddress;
