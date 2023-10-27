function Carrinho({ cart, total }) {
  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul>
        {Object.keys(cart).map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            <ul>
              {Object.keys(cart[category]).map((itemId) => (
                <li key={itemId}>
                  {itemId} - Quantidade: {cart[category][itemId]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
      <p>Total: R$ {total}</p>
    </div>
  );
}

export default Carrinho;
