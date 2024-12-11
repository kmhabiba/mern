//code for the tabular form
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
  Grid,
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
        setNewProduct({ name: '', price: '', image: '', quantity: '' });
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
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || 'Failed to update product');
          });
        }
        return res.json();
      })
      .then(() => {
        fetchProducts(); // Refresh the product list
        setIsEditing(false);
        setEditProductId(null);
        setNewProduct({ name: '', price: '', image: '', quantity: '' }); // Reset the form
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
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || 'Failed to delete product');
          });
        }
        return res.json();
      })
      .then(() => {
        fetchProducts(); // Refresh the product list after deletion
      })
      .catch((err) => console.error('Delete failed:', err));
  };

  return (
    <Container sx={{ marginTop: '30px' }}>
      {/* Add Product Form */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {isEditing ? 'Edit Product' : 'Add Product'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color={isEditing ? 'secondary' : 'primary'}
              onClick={isEditing ? handleUpdateProduct : handleAddProduct}
              fullWidth
            >
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Actions</TableCell>
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
    </Container>
  );
};

export default Products;