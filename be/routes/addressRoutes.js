const express = require("express");
const router = express.Router();
const { getAddresses, addAddress, updateAddress, deleteAddress } = require("../controllers/addressController");
 
// Get all addresses for a user
router.get("/:userId", getAddresses);
 
// Add a new address
router.post("/", addAddress);
 
// Update an existing address
router.put("/:id", updateAddress);
 
// Delete an address
router.delete("/:id", deleteAddress);
 
module.exports = router;