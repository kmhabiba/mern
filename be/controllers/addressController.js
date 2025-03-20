const Address = require("../Models/Address");
 
// Get all addresses for a user
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses", error });
  }
};
 
// Add a new address
const addAddress = async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: "Error adding address", error });
  }
};
 
// Update an existing address
const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true, // ✅ Ensures the updated address is returned
      runValidators: true, // ✅ Runs model validations
    });
 
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
 
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Error updating address", error });
  }
};
 
// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await Address.findByIdAndDelete(id);
 
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
 
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address", error });
  }
};
 
module.exports = { getAddresses, addAddress, updateAddress, deleteAddress };

// const Address = require("../Models/Address");
 
// exports.getAddresses = async (req, res) => {
//   try {
//     const addresses = await Address.find({ userId: req.params.userId });
//     res.json(addresses);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching addresses", error });
//   }
// };
 
// const mongoose = require("mongoose");
 
// exports.addAddress = async (req, res) => {

//   try {

//     let { userId, name, street, city, state, zip, country } = req.body;
 

//     if (!mongoose.Types.ObjectId.isValid(userId)) {

//       return res.status(400).json({ message: "Invalid User ID format." });

//     }
 
//     userId = new mongoose.Types.ObjectId(userId); 
 
//     const newAddress = new Address({

//       userId,

//       name,

//       street,

//       city,

//       state,

//       zip,

//       country,

//     });
 
//     await newAddress.save();

//     res.status(201).json({ message: "Address added successfully!", newAddress });

//   } catch (error) {

//     res.status(500).json({ message: "Error adding address", error });

//   }

// };
// exports.updateAddress = async (req, res) => {
//   try {
//     const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedAddress);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating address", error });
//   }
// };
 
// exports.deleteAddress = async (req, res) => {
//   try {
//     await Address.findByIdAndDelete(req.params.id);
//     res.json({ message: "Address deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting address", error });
//   }
// };

