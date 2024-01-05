(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_veiculos')) ?? [];
}

function setLocalStorage(bd_veiculos) {
  localStorage.setItem('bd_veiculos', JSON.stringify(bd_veiculos));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_veiculos = getLocalStorage();
  let index = 0;
  for (veiculo of bd_veiculos) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${veiculo.nome}</td>
        <td>${veiculo.marca}</td>
        <td>${veiculo.modelo}</td>
        <td>${veiculo.ano}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.cor}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const veiculo = {
    nome: document.getElementById('nome').value,
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    ano: document.getElementById('ano').value,
    placa: document.getElementById('placa').value,
    cor: document.getElementById('cor').value
  }
  const bd_veiculos = getLocalStorage();
  bd_veiculos.push(veiculo);
  setLocalStorage(bd_veiculos);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_veiculos = getLocalStorage();
  bd_veiculos.splice(index, 1);
  setLocalStorage(bd_veiculos);
  atualizarTabela();
}

function validarPlaca() { // Adaptação da função validar (10 pontos)
  const bd_veiculos = getLocalStorage();
  for (veiculo of bd_veiculos) {
    if (placa.value == veiculo.placa) {
      placa.setCustomValidity("Este número de placa já existe!");
      feedbackPlaca.innerText = "Este número de placa já existe!";
      return false;
    } else {
      placa.setCustomValidity("");
      feedbackPlaca.innerText = "Informe a placa corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const placa = document.getElementById("placa");
const feedbackPlaca = document.getElementById("feedbackPlaca");
placa.addEventListener('input', validarPlaca);