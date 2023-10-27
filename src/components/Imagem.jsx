import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CardComImagem({ imagemSrc, slogan }) {
  return (
    <Card
      style={{
        backgroundColor: "transparent",
        marginTop: "30px",
        boxShadow: "none",
        border: "none",
      }}
    >
      <CardMedia
        component="img"
        alt="Conquista Logo"
        image={imagemSrc}
        style={{ margin: "0 auto", width: "40%" }} // Centraliza horizontalmente
      />
      <CardContent>
        <Typography textAlign="center" variant="body2" sx={{color: "#FFF",  fontFamily: "Poetsen"}}>
          {slogan}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardComImagem;
