import './App.css';
import logo from './images/logo.png';
import React, { useState } from 'react';
import dogGrande from './images/dogGrande.jpg';
import dogPequeno from './images/dogPequeno.jpg';

function App() {
  const [quantidadeDogGrande, setQuantidadeDogGrande] = useState(0);
  const [quantidadeDogPequeno, setQuantidadeDogPequeno] = useState(0);
  const [data, setData] = useState('');

  const handleAumentarDogGrande = () => {
    setQuantidadeDogGrande(quantidadeDogGrande + 1);
  };

  const handleDiminuirDogGrande = () => {
    if (quantidadeDogGrande > 0) {
      setQuantidadeDogGrande(quantidadeDogGrande - 1);
    }
  };

  const handleAumentarDogPequeno = () => {
    setQuantidadeDogPequeno(quantidadeDogPequeno + 1);
  };

  const handleDiminuirDogPequeno = () => {
    if (quantidadeDogPequeno > 0) {
      setQuantidadeDogPequeno(quantidadeDogPequeno - 1);
    }
  };

  async function enviarRequisicaoPost(url, dados) {
    try {
      const resposta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });
  
      if (!resposta.ok) {
        throw new Error('Erro ao enviar requisição');
      }
  
      const resultado = await resposta.json();
      return resultado;
    } catch (erro) {
      console.error('Erro:', erro);
      return null;
    }
  };

  const handleEnviarRequisicao = () => {
    if (quantidadeDogGrande + quantidadeDogPequeno === 0) {
      return alert("A quantidade de cachorros deve ser no mínimo 1.");
    }

    if (data === '') {
      return alert("Você não selecionou uma data.")
    }
    const requestData = {
      data: data,
      qntd_dog_grande: quantidadeDogGrande,
      qntd_dog_pequeno: quantidadeDogPequeno
    };
    
    enviarRequisicaoPost('https://localhost:3001/localizar', requestData)
      .then(response => {
        if(typeof response === "object") {
          const modal = document.getElementById("modal");
          const span = document.getElementsByClassName("close")[0];
  
          span.onclick = function() {
            modal.style.display = "none";
          }
  
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }
          exibirResultado(modal, response["PetShop"], response["Preço"], response["Distância"]);
        }
      })
      .catch(error => {
        console.error('Erro ao enviar requisição:', error);
      });
  };

  function exibirResultado(modal, petshop, custo, distancia) {
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = "O melhor PetShop para você é " + petshop + " custando " + custo + " reais e fica à " + distancia + " km de você!"
    modal.style.display = "block";
  }

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: '#95365B', minHeight: '15%', flexDirection: 'row'}}
      >
        <img src={logo}/>
        <h1>PetShop4You</h1>
      </header>
      <body style={{ backgroundColor: 'palevioletred' }}>
        <div className='App-menu'>
          <div className='Box-dogGrande'>
            <a style={{ fontSize: '4vh', position: 'relative' }}>Cachorro Grande</a>
            <img src={dogGrande} className='dogGrande' alt='dogGrande' />
            <button onClick={handleAumentarDogGrande}>Aumentar</button>
            <div>Dogões: {quantidadeDogGrande}</div>
            <button onClick={handleDiminuirDogGrande}>Diminuir</button>
          </div>
          <div className='Box-meio'>
            Qual a data de agendamento?
            <p/>
            <input
              type='date'
              value={data}
              onChange={(e) => setData(e.target.value)}
              className='input-date'
              style={{position: 'relative'}}
            />
            <p/>
            <button onClick={handleEnviarRequisicao} className='send-button'>Enviar Requisição</button>
          </div>
          <div className='Box-dogPequeno'>
            <a style={{ fontSize: '4vh', position: 'relative' }}>Cachorro Pequeno</a>
            <img src={dogPequeno} className='dogPequeno' alt='dogPequeno' />
            <button onClick={handleAumentarDogPequeno}>Aumentar</button>
            <div>Doguinhos: {quantidadeDogPequeno}</div>
            <button onClick={handleDiminuirDogPequeno}>Diminuir</button>
          </div>
          <div id="modal" class="modal">
            <div class="modal-content">
            <span class="close">&times;</span>
            <p id="resultado"></p>
            </div>
          </div>
        </div>
        <div className='App-rodape'>
          <a>Desenvolvido por Denner Lopes</a>
        </div>
      </body>
    </div>
  );
}

export default App;
