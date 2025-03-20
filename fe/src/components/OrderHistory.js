import React, { useState, useEffect } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];

    setOrders(storedOrders);
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Typography>No past orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order.id} sx={{ marginBottom: 2, padding: 2 }}>
            
            <CardContent>
              <Typography variant="h6">Order ID: {order.id}</Typography>
              <Typography variant="body2">Date: {order.date}</Typography>
              <List>
                {order.items.map((item) => (
                  <ListItem key={item._id}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`http://localhost:5001${item.image}`}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = "/fallback-image.jpg";
                      }}
                      sx={{ width: 150, height: 150, marginRight:2}}
                    />
                    <ListItemText
                      primary={item.name}
                      secondary={`Qty: ${item.quantity} | ₹${item.price}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6">
                Total: ₹{order.total.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
