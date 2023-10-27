import React from "react";
import { Paper, Typography, Container } from "@mui/material";

function Footer() {
  return (
    <Paper
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "#ffffff",
        padding: "20px 0",
        textAlign: "center",
      }}
      sx={{ mt: 4 }}
    >
      <Container>
        <Typography variant="body2">
          &copy; 2023 Conquista Lanche & Grill
        </Typography>
      </Container>
    </Paper>
  );
}

export default Footer;
