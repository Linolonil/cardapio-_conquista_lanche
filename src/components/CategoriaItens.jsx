import React from "react";

function CategoriaItens({
  categoria,
  itens,
  quantidadeItens,
  handleItemQuantity,
}) {
  return (
    <div>
      <h3>{categoria}</h3>
      <ul className="list-group">
        {itens.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.nome}
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleItemQuantity(index, categoria, false)}
              >
                -
              </button>
              <span className="mx-2">{quantidadeItens[index]}</span>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleItemQuantity(index, categoria, true)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriaItens;
