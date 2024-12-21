import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from "@mui/material";

const Dashboard = () => {
  const cards = [
    {
      title: "Manage Products",
      image: "https://source.unsplash.com/300x200/?groceries,shopping",
      route: "/products/add",
    },
    {
      title: "Manage Categories",
      image: "https://source.unsplash.com/300x200/?categories,shopping",
      route: "/categories",
    },
    {
      title: "Manage Orders",
      image: "https://source.unsplash.com/300x200/?orders,ecommerce",
      route: "/orders/manage",
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      {/* Main Heading */}
      <Typography variant="h4" textAlign="center" marginBottom={2}>
        Welcome to the Admin Dashboard
      </Typography>

      {/* Subheading */}
      <Typography
        variant="subtitle1"
        textAlign="center"
        marginBottom={4}
        color="text.secondary"
      >
        Hi, Admin! Here you can manage your products, orders, and reports.
      </Typography>

      {/* Cards Section */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{ maxWidth: 345, padding: 2, textAlign: "center" }}
          >
            <CardMedia
              component="img"
              height="150"
              image={card.image}
              alt={card.title}
              sx={{ marginBottom: 2 }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click below to {card.title.toLowerCase()}.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to={card.route}
              >
                Manage
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Box>
  );
};

export default Dashboard;