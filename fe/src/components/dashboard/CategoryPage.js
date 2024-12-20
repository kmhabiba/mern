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
    TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: '',
        image: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Fetch categories from the API
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5001/api/categories', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setFilteredCategories(data);
            })
            .catch((err) => console.error(err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prev) => ({ ...prev, [name]: value }));
    };

    const handleDialogOpen = () => setIsDialogOpen(true);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setNewCategory({ name: '', image: '' });
        setIsEditing(false);
    };

    const handleAddCategory = () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          console.error('No token found. Please log in.');
          alert('You must be logged in to add a product.');
          return;
        }
    
        if (!newCategory.name  || !newCategory.image) {
          console.error('Please fill all the fields.');
          alert('All fields are required to add a product.');
          return;
        }
    
        const requestBody = {
          name: newCategory.name,
          image: newCategory.image,
        };
    
        fetch('http://localhost:5001/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        })
          .then((res) => {
            if (!res.ok) {
              console.error('API Response Error:', res);
              throw new Error('Failed to add product');
            }
            return res.json();
          })
          .then((data) => {
            console.log('Product added successfully:', data);
            alert('Product added successfully!');
            fetchCategories();
            handleDialogClose();
          })
          .catch((err) => {
            console.error('Error adding product:', err.message);
            alert(`Error: ${err.message || 'Failed to add product. Please try again later.'}`);
          });
      };

    const handleEditCategory = (id) => {
        const category = categories.find((c) => c._id === id);
        setIsEditing(true);
        setEditCategoryId(id);
        setNewCategory({
            name: category.name,
            image: category.image,
        });
        handleDialogOpen();
    };

    const handleUpdateCategory = () => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5001/api/categories/${editCategoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newCategory),
        }).then(fetchCategories).catch(console.error);

        handleDialogClose();
    };

    const handleDeleteCategory = (id) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5001/api/categories/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        }).then(fetchCategories).catch(console.error);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredCategories(
            categories.filter((cat) => cat.name.toLowerCase().includes(query))
        );
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayedCategories = filteredCategories.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Container>
            <Typography variant="h5" color="primary" gutterBottom>
                Categories
            </Typography>

            {/* Search and Add */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearch}
                    size="small"
                />
                <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                    Add Category
                </Button>
            </Box>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedCategories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell align="center">
                                    <img
                                        src={category.image || '/default-image.png'}
                                        alt={category.name}
                                        style={{ width: 50, height: 50 }}
                                    />
                                </TableCell>
                                <TableCell align="center">{category.name}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEditCategory(category._id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDeleteCategory(category._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={filteredCategories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{isEditing ? 'Edit Category' : 'Add Category'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={newCategory.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />

                    <TextField
                        label="Image URL"
                        name="image"
                        value={newCategory.image}
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
                        onClick={isEditing ? handleUpdateCategory : handleAddCategory}
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Categories;