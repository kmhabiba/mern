//Dialog
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    quantity: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5001/api/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
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
    setNewProduct({ name: '', price: '', image: '', quantity: '' });
    setIsEditing(false);
  };

  const handleAddProduct = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5001/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then(() => {
        fetchProducts();
        handleDialogClose();
      })
      .catch((err) => console.error(err));
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
    });
    handleDialogOpen();
  };

  const handleUpdateProduct = () => {
    const token = localStorage.getItem('token');
    if (!editProductId) {
      console.error('No product selected for editing');
      return;
    }
    fetch(`http://localhost:5001/api/products/${editProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then(() => {
        fetchProducts();
        handleDialogClose();
      })
      .catch((err) => console.error('Update failed:', err));
  };

  const handleDeleteProduct = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5001/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        fetchProducts();
      })
      .catch((err) => console.error('Delete failed:', err));
  };

  return (
    <Container sx={{ marginTop: '30px' }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Products
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        sx={{ marginBottom: '20px' }}
      >
        Add Product
      </Button>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{backgroundColor:"#f0f0f0"}}>
              <TableCell align="center">
                <Tooltip title="This is the product image" placement="top">
                  <span> Image </span>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="This is the product name" placement="top">
                  <span> Product Name </span>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="This is the product price" placement="top">
                  <span> Price </span>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="This is the product quantity" placement="top">
                  <span> Quantity </span>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="This is the Action" placement="top">
                  <span> Action </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell align="center">
                  <img
                    src={product.image || '/default-image.png'}
                    alt={product.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Product */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={isEditing ? handleUpdateProduct : handleAddProduct}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;
