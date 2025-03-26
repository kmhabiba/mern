import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 3,
        mt: "auto",
        textAlign: "center",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} My App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
