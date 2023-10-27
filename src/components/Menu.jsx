import React, { useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";

function Item({ item, onTotalChange }) {
  const [quantidade, setQuantidade] = useState(0);

  const adicionarItem = () => {
    setQuantidade(quantidade + 1);
    onTotalChange(item.preco, 1, item._id, determinarCategoria(item.nome));
  };

  const removerItem = () => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
      onTotalChange(item.preco, -1, item._id, determinarCategoria(item.nome));
    }
  };

  // Função para determinar a categoria com base no nome do item
  const determinarCategoria = (nome) => {
    if (nome.includes("Combo")) {
      return "Combos";
    }
    if (nome.includes("Lanche")) {
      return "Lanches";
    }
    if (nome.includes("Refeicao")) {
      return "Refeicao";
    }
    if (nome.includes("Bebidas")) {
      return "Bebidas";
    }
    // Adicione mais verificações conforme necessário

    return "Outros";
  };

  return (
    <Paper
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.374)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ color: "#ffbd59" }}>
          {item.nome}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: "#ffbd59" }}>
          R$ {item.preco}
        </Typography>
      </div>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 1, color: "#fff" }}
      >
        {item.ingredientes}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button variant="contained" color="error" onClick={removerItem}>
          Remover
        </Button>
        <Typography variant="body1" sx={{ color: "#ffbd59" }}>
          {quantidade}
        </Typography>
        <Button variant="contained" color="success" onClick={adicionarItem}>
          Adicionar
        </Button>
      </div>
    </Paper>
  );
}

function Menu({ data, title, color, onTotalChange }) {
  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <Typography
          align="center"
          variant="h5"
          component="div"
          sx={{ color, fontFamily: "Poetsen" }}
        >
          {title}
        </Typography>
      </Grid>
      {data.map((item) => (
        <Grid item xs={12} sm={4} key={item.id}>
          <Item item={item} onTotalChange={onTotalChange} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Menu;
