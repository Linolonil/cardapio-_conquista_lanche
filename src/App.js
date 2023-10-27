import React, { useState, useEffect } from "react";
import CategoriaItens from "./components/CategoriaItens";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./App.css";
import axios from "axios";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [pedidoTexto, setPedidoTexto] = useState("");
  const [entregaDomicilio, setEntregaDomicilio] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [retiradaRestaurante, setRetiradaRestaurante] = useState(false);
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const [descricaoAlteracao, setDescricaoAlteracao] = useState("");
  const [lanches, setLanches] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [refeicoes, setRefeicoes] = useState([]);
  const [combos, setCombos] = useState([]);
  const [quantidadeLanches, setQuantidadeLanches] = useState([]);
  const [quantidadeBebidas, setQuantidadeBebidas] = useState([]);
  const [quantidadeRefeicoes, setQuantidadeRefeicoes] = useState([]);
  const [quantidadeCombos, setQuantidadeCombos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://banco-z4xk.onrender.com/cart/todos-itens"
        );
        const data = response.data;
        setLanches(data.lanches);
        setBebidas(data.bebidas);
        setRefeicoes(data.refeicoes);
        setCombos(data.combos);

        // Inicialize os arrays de quantidade com 0 para cada item
        setQuantidadeLanches(Array(data.lanches.length).fill(0));
        setQuantidadeBebidas(Array(data.bebidas.length).fill(0));
        setQuantidadeRefeicoes(Array(data.refeicoes.length).fill(0));
        setQuantidadeCombos(Array(data.combos.length).fill(0));
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  const handleItemQuantity = (index, categoria, increment = true) => {
    if (categoria === "Lanches") {
      const newQuantidadeArray = [...quantidadeLanches];
      if (increment) {
        newQuantidadeArray[index]++;
      } else if (newQuantidadeArray[index] > 0) {
        newQuantidadeArray[index]--;
      }
      setQuantidadeLanches(newQuantidadeArray);
    } else if (categoria === "Bebidas") {
      const newQuantidadeArray = [...quantidadeBebidas];
      if (increment) {
        newQuantidadeArray[index]++;
      } else if (newQuantidadeArray[index] > 0) {
        newQuantidadeArray[index]--;
      }
      setQuantidadeBebidas(newQuantidadeArray);
    } else if (categoria === "Refeicoes") {
      const newQuantidadeArray = [...quantidadeRefeicoes];
      if (increment) {
        newQuantidadeArray[index]++;
      } else if (newQuantidadeArray[index] > 0) {
        newQuantidadeArray[index]--;
      }
      setQuantidadeRefeicoes(newQuantidadeArray);
    } else if (categoria === "Combos") {
      const newQuantidadeArray = [...quantidadeCombos];
      if (increment) {
        newQuantidadeArray[index]++;
      } else if (newQuantidadeArray[index] > 0) {
        newQuantidadeArray[index]--;
      }
      setQuantidadeCombos(newQuantidadeArray);
    } else {
      console.error("Categoria desconhecida.");
    }
  };

  const criarTextoDoPedido = () => {
    let pedidoTexto = "Pedidos:";

    lanches.forEach((lanche, index) => {
      if (quantidadeLanches[index] > 0) {
        const nome = lanche.nome;
        const quantidade = quantidadeLanches[index];
        const preco = lanche.preco * quantidade;
        pedidoTexto += `\n Qntd. ${quantidade} - ${nome} - R$${preco.toFixed(
          2
        )}`;
      }
    });

    bebidas.forEach((bebida, index) => {
      if (quantidadeBebidas[index] > 0) {
        const nome = bebida.nome;
        const quantidade = quantidadeBebidas[index];
        const preco = bebida.preco * quantidade;
        pedidoTexto += `\n Qntd. ${quantidade} - ${nome}  - R$${preco.toFixed(
          2
        )}`;
      }
    });

    refeicoes.forEach((refeicoes, index) => {
      if (quantidadeRefeicoes[index] > 0) {
        const nome = refeicoes.nome;
        const quantidade = quantidadeRefeicoes[index];
        const preco = refeicoes.preco * quantidade;
        pedidoTexto += `\n Qntd. ${quantidade} - ${nome}  - R$${preco.toFixed(
          2
        )}`;
      }
    });

    combos.forEach((combos, index) => {
      if (quantidadeCombos[index] > 0) {
        const nome = combos.nome;
        const quantidade = quantidadeCombos[index];
        const preco = combos.preco * quantidade;
        pedidoTexto += `\n Qntd. ${quantidade} - ${nome}  - R$${preco.toFixed(
          2
        )}`;
      }
    });

    let total = atualizarTotal();
    pedidoTexto += `\n\nTotal: R$${total.toFixed(2)}`;

    return pedidoTexto;
  };

  const atualizarTotal = () => {
    let totalCompra = 0;

    lanches.forEach((lanche, index) => {
      totalCompra += quantidadeLanches[index] * lanche.preco;
    });
    bebidas.forEach((bebida, index) => {
      totalCompra += quantidadeBebidas[index] * bebida.preco;
    });
    refeicoes.forEach((refeicoes, index) => {
      totalCompra += quantidadeRefeicoes[index] * refeicoes.preco;
    });
    combos.forEach((combos, index) => {
      totalCompra += quantidadeCombos[index] * combos.preco;
    });

    return totalCompra;
  };

  const capturarPedidos = () => {
    // Defina o estado do endereço e da descrição
    setEnderecoEntrega(enderecoEntrega);
    setDescricaoAlteracao(descricaoAlteracao);

    const textoPedidos = criarTextoDoPedido();
    setPedidoTexto(textoPedidos); // Define o texto do pedido no estado
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
  };

  const enviarPedidoViaWhatsApp = () => {
    if (pedidoTexto.trim() !== "") {
      const numeroTelefone = "5592992896804";
      const mensagemWhatsApp = encodeURIComponent(
        `${pedidoTexto}\n\nEndereço de entrega: ${enderecoEntrega}\nDescrição de Alteração: ${descricaoAlteracao}\nForma de Pagamento: ${formaPagamento}\nRetirada no Restaurante: ${
          retiradaRestaurante ? "Sim" : "Não"
        }`
      );
      window.open(`https://wa.me/${numeroTelefone}?text=${mensagemWhatsApp}`);
      setShowModal(false);
    } else {
      alert("Adicione pelo menos um item à comanda antes de enviar o pedido.");
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <CategoriaItens
            categoria="Lanches"
            itens={lanches}
            quantidadeItens={quantidadeLanches}
            handleItemQuantity={handleItemQuantity}
          />
        </div>
        <div className="col-md-6">
          <CategoriaItens
            categoria="Bebidas"
            itens={bebidas}
            quantidadeItens={quantidadeBebidas}
            handleItemQuantity={handleItemQuantity}
          />
        </div>
        <div className="col-md-6">
          <CategoriaItens
            categoria="Refeicoes"
            itens={refeicoes}
            quantidadeItens={quantidadeRefeicoes}
            handleItemQuantity={handleItemQuantity}
          />
        </div>
        <div className="col-md-6">
          <CategoriaItens
            categoria="Combos"
            itens={combos}
            quantidadeItens={quantidadeCombos}
            handleItemQuantity={handleItemQuantity}
          />
        </div>
      </div>
      <div className="mt-3">
        <h3>Total: R${atualizarTotal().toFixed(2)}</h3>
        <button className="btn btn-primary" onClick={capturarPedidos}>
          Enviar Pedido via WhatsApp
        </button>

        <Modal show={showModal} onHide={fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Comanda:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>{pedidoTexto}</pre>
            <form>
              <h6>Tipo de entrega:</h6>
              <div className="checkbox-group">
                <label className="container checkbox-modal">
                  <input
                    type="radio"
                    checked={entregaDomicilio}
                    onChange={() => {
                      setEntregaDomicilio(true);
                      setRetiradaRestaurante(false);
                    }}
                  />
                  Entrega a Domicílio:
                  <div className="checkmark"></div>
                </label>
                <label className="container checkbox-modal">
                  <input
                    type="radio"
                    checked={retiradaRestaurante}
                    onChange={() => {
                      setRetiradaRestaurante(true);
                      setEntregaDomicilio(false);
                    }}
                  />
                  Retirada no Restaurante:
                  <div className="checkmark"></div>
                </label>
              </div>
              {entregaDomicilio && (
                <div className="address-input">
                  <label>
                    Endereço de Entrega:
                    <input
                      className="form-control"
                      type="text"
                      value={enderecoEntrega}
                      onChange={(e) => setEnderecoEntrega(e.target.value)}
                      required
                    />
                  </label>
                </div>
              )}
              <h6>Forma de pagamento:</h6>
              <div className="checkbox-group">
                <label className="container checkbox-modal">
                  <input
                    type="checkbox"
                    checked={formaPagamento === "dinheiro"}
                    onChange={() => setFormaPagamento("dinheiro")}
                  />
                  Dinheiro:
                  <div className="checkmark"></div>
                </label>
                <label className="container checkbox-modal">
                  <input
                    type="checkbox"
                    checked={formaPagamento === "pix"}
                    onChange={() => setFormaPagamento("pix")}
                  />
                  Pix:
                  <div className="checkmark"></div>
                </label>
                <label className="container checkbox-modal">
                  <input
                    type="checkbox"
                    checked={formaPagamento === "cartao"}
                    onChange={() => setFormaPagamento("cartao")}
                  />
                  Credito/Debito
                  <div className="checkmark"></div>
                </label>
              </div>

              <div className="form-group description-input">
                <label htmlFor="descricaoAlteracao">
                  <h6>Observação:</h6>
                </label>
                <input
                  className="form-control"
                  id="descricaoAlteracao"
                  value={descricaoAlteracao}
                  onChange={(e) => setDescricaoAlteracao(e.target.value)}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={enviarPedidoViaWhatsApp}>
              Finalizar Pedido
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
