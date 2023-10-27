import React, { useState } from "react";

function Item({ item }) {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <h3>
        {item.nome} - R$ {item.preco}
      </h3>
      <div>
        <button onClick={decrement}>-</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Item;
