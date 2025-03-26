import React, { useEffect, useState, useContext } from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import { WishlistCartContext } from "../components/context/WishlistCartContext";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // Fast Delivery

import BlockIcon from "@mui/icons-material/Block"; // No Return

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Cart

import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back

import SupportAgentIcon from "@mui/icons-material/SupportAgent"; // Customer Support

import InfoIcon from "@mui/icons-material/Info"; // Info

const ProductDetail = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useContext(WishlistCartContext);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = "";

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5001/api/products/${productId}`
      );

      setProduct(response.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);

      setError("Failed to fetch product details.");

      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);

      alert(`${product.name} added to cart! 🛒`);
    }
  };

  if (loading) return <div>Loading product details...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Card sx={{ maxWidth: 400, padding: 2, boxShadow: 3 }}>
        <CardContent>
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            size="small"
            sx={{ mb: 2 }}
          >
            Back
          </Button>

          {/* Product Image */}

          {product?.image && (
            <Box display="flex" justifyContent="center" mb={2}>
              <img
                src={`http://localhost:5001${product.image}`}
                alt={product.name}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Box>
          )}

          {/* Product Name */}
          <Typography variant="h5" textAlign="center" gutterBottom>
            {product.name}
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Product Details in Grid */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Price:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">₹{product.price}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Quantity:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{product.quantity}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Category:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {product.category?.name || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 1 }} />

          {/* Icons Section (Reduced Space) */}
          <Box display="flex" justifyContent="center" gap={4} mt={1} mb={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <LocalShippingIcon color="primary" />
              <Typography variant="caption">Fast Delivery</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <BlockIcon color="error" />
              <Typography variant="caption">No Return</Typography>
            </Box>
          </Box>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            fullWidth
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Divider sx={{ my: 2 }} />

          {/* Additional Information */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <InfoIcon color="action" />
            <Typography variant="subtitle2" mt={1}>
              This product is quality assured and tested before delivery.
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Customer Care Details */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <SupportAgentIcon color="primary" />
            <Typography variant="subtitle2" mt={1}>
              Need help? Call us at: <strong>1800-123-456</strong>
            </Typography>
            <Typography variant="subtitle2">Email: support@shop.com</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;

// import React, { useEffect, useState, useContext } from "react";

// import axios from "axios";

// import { useParams, useNavigate } from "react-router-dom";

// import { WishlistCartContext } from "../components/context/WishlistCartContext";

// import {
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Box,
//   Divider,
// } from "@mui/material";

// import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // Fast Delivery

// import BlockIcon from "@mui/icons-material/Block"; // No Return

// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Cart

// import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back

// const ProductDetail = () => {
//   const { productId } = useParams();

//   const navigate = useNavigate();

//   const { addToCart } = useContext(WishlistCartContext);

//   const [product, setProduct] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchProductDetails(productId);
//   }, [productId]);

//   const fetchProductDetails = async (productId) => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `http://localhost:5001/api/products/${productId}`
//       );

//       setProduct(response.data);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product details:", error);

//       setError("Failed to fetch product details.");

//       setLoading(false);
//     }
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart(product);

//       alert(`${product.name} added to cart! 🛒`);
//     }
//   };

//   if (loading) return <div>Loading product details...</div>;

//   if (error) return <div>Error: {error}</div>;

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
//       <Card sx={{ maxWidth: 400, padding: 2, boxShadow: 3 }}>
//         <CardContent>
//           {/* Back Button */}
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(-1)}
//             size="small"
//             sx={{ mb: 2 }}
//           >
//             Back
//           </Button>

//           {/* Product Image */}

//           {product?.image && (
//             <Box display="flex" justifyContent="center" mb={2}>
//               <img
//                 src={`http://localhost:5001${product.image}`}
//                 alt={product.name}
//                 style={{ width: "100%", borderRadius: "10px" }}
//               />
//             </Box>
//           )}

//           {/* Product Name */}
//           <Typography variant="h5" textAlign="center" gutterBottom>
//             {product.name}
//           </Typography>

//           <Divider sx={{ my: 1 }} />

//           {/* Product Details in Grid */}
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography variant="body1">
//                 <strong>Price:</strong>
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">₹{product.price}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">
//                 <strong>Quantity:</strong>
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">{product.quantity}</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">
//                 <strong>Category:</strong>
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">
//                 {product.category?.name || "N/A"}
//               </Typography>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 1 }} />

//           {/* Icons Section (Reduced Space) */}
//           <Box display="flex" justifyContent="center" gap={4} mt={1} mb={2}>
//             <Box display="flex" flexDirection="column" alignItems="center">
//               <LocalShippingIcon color="primary" />
//               <Typography variant="caption">Fast Delivery</Typography>
//             </Box>
//             <Box display="flex" flexDirection="column" alignItems="center">
//               <BlockIcon color="error" />
//               <Typography variant="caption">No Return</Typography>
//             </Box>
//           </Box>

//           {/* Add to Cart Button */}
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<ShoppingCartIcon />}
//             fullWidth
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default ProductDetail;
