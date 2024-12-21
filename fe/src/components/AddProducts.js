import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  TablePagination,
  TableSortLabel,
  Menu,
} from "@mui/material";
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterAlt";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
    quantity: "",
    category: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["fruits", "veggies", "snacks", "flour"];

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleFilterClose = () => {
    setAnchorEl(null);
  }

  const handleCategeorySelect = (category) => {
    setSelectedCategory(category);
    handleFilterClose();
  }

  useEffect(() => {
    if (newProduct.image instanceof File) {
      const imageUrl = URL.createObjectURL(newProduct.image);
      setNewProduct((prev) => ({ ...prev, imagePreview: imageUrl }));
    } else if (typeof newProduct.image === "string") {
      setNewProduct((prev) => ({ ...prev, imagePreview: newProduct.image }));
    }
  }, [newProduct.image]);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, products]);

  const fetchProducts = async (category) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:5001/api/products${category ? `?category=${category}` : ""}`, // Include category in the query
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data); 
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewProduct({ name: "", price: "", image: "", quantity: "", });
    setIsEditing(false);
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      alert("You must be logged in to add a product.");
      return;
    }

    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.quantity ||
      !newProduct.image ||
      !newProduct.category
    ) {
      console.error("Please fill all the fields.");
      alert("All fields are required to add a product.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("quantity", newProduct.quantity);
    formData.append("category", newProduct.category);
    formData.append("image", newProduct.image);

    try {
      const response = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("API Response Error:", response, errorDetails);
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      console.log("Product added successfully:", data);
      alert("Product added successfully!");
      fetchProducts();
      handleDialogClose();
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert(
        `Error: ${
          error.message || "Failed to add product. Please try again later."
        }`
      );
    }
  };

  const handleEditProduct = (id) => {
    const product = products.find((p) => p._id === id);
    setIsEditing(true);
    setEditProductId(id);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
      category: product.category,
    });
    handleDialogOpen();
  };

  const handleUpdateProduct = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("quantity", newProduct.quantity);
    formData.append("category", newProduct.category);

    if (newProduct.image instanceof File) {
      formData.append("image", newProduct.image);
    }

    fetch(`http://localhost:5001/api/products/${editProductId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(() => {
        fetchProducts();
        handleDialogClose();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleDeleteProduct = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5001/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        fetchProducts();
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    const sorted = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredProducts(sorted);
  };

  const displayedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container sx={{ marginTop: "30px" }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Products
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        alighItems="center"
      >
        <Tooltip title="Search products by name" arrow>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
        />
        </Tooltip>
        <Tooltip title="Add Product" arrow>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "50px" }}
          onClick={handleDialogOpen}
        >
          Add Product
        </Button>
        </Tooltip>
      </Box>
      <Box display="flex" justifyContent="flex-start" mb={2}>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f0f0f0" }}>
              {["image", "name", "price", "quantity", "category"].map((key) => (
                <TableCell key={key} align="center">
                  <Tooltip title={key.charAt(0).toUpperCase()+key.slice(1)}>
                  {key === "price" ? (
                    <TableSortLabel
                      active={sortConfig.key === key}
                      direction={
                        sortConfig.key === key ? sortConfig.direction : "asc"
                      }
                      onClick={() => handleSort(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableSortLabel>
                    ) : key ==="category"? (
                      
                      <>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <IconButton
                      size="small"
                      onClick={handleFilterClick}
                      style={{marginLeft: "8px"}}
                      >
                        <FilterListIcon/>
                      </IconButton>
                      <Menu
                        anchorE1={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleFilterClose}
                        >
                          <MenuItem onClick={() => handleCategeorySelect("")}>
                          All Categories
                          </MenuItem>
                          {categories.map((category) => (
                            <MenuItem
                            key={category}
                            onClick={() => handleCategeorySelect(category)}
                            >
                              {category}
                            </MenuItem>
                          ))}
                          </Menu>
                          </>
                    ) : (
                      key.charAt(0).toUpperCase() + key.slice(1)
                    )}
                    </Tooltip>
                </TableCell> 
              ))}
              <TableCell align="center">
                <Tooltip title= "Actions">
                  <span>Action</span>
                  </Tooltip>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell align="center">
                    <img
                      src={product.image || "placeholder-image-url.jfif"}
                      alt={product.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  
                  <TableCell align="center">
                  <Tooltip title="Edit Product" arrow>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditProduct(product._id)}
                    >
                      <EditIcon />
                    </IconButton>
                   </Tooltip>
                   <Tooltip title="Delete product" arrow>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[30, 40, 50]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={newProduct.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={newProduct.category || ""}
                onChange={handleInputChange}
              >
                <MenuItem value="fruits">Fruits</MenuItem>
                <MenuItem value="veggies">Veggies</MenuItem>
                <MenuItem value="flour">Flour</MenuItem>
                <MenuItem value="snacks">Snacks</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              component="label"
              sx={{ alignSelf: "start" }}
            >
              Upload Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {newProduct.image && (
              <Box mt={2}>
                <img
                  src={
                    typeof newProduct.image === "string"
                      ? newProduct.image
                      : URL.createObjectURL(newProduct.image)
                  }
                  alt="Product Thumbnail"
                  style={{
                    width: "100%",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={isEditing ? handleUpdateProduct : handleAddProduct}
              sx={{ mt: 2 }}
            >
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;
