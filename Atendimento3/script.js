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
  return JSON.parse(localStorage.getItem('bd_fluxoCaixa')) ?? [];
}

function setLocalStorage(bd_fluxoCaixa) {
  localStorage.setItem('bd_fluxoCaixa', JSON.stringify(bd_fluxoCaixa));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_fluxoCaixa = getLocalStorage();
  let index = 0;
  for (fluxo of bd_fluxoCaixa) {
    const novaLinha = document.createElement('tr');
    
    //parte nova adicionada
    var data = new Date(fluxo.data);
    // Verifique se a data é válida
    if (!isNaN(data.getTime())) {
      // Formate a data como desejado (por exemplo, "dd/mm/yyyy")
      var dia = data.getDate();
      var mes = data.getMonth() + 1; // Os meses começam do zero
      var ano = data.getFullYear();

      // Adicione zeros à esquerda se necessário
      dia = dia < 10 ? '0' + dia : dia;
      mes = mes < 10 ? '0' + mes : mes;
      // Construa a string formatada
      var dataFormatada = dia + '/' + mes + '/' + ano;
    }

    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${fluxo.descricao}</td>
        <td>${dataFormatada}</td>
        <td>${fluxo.valor}</td>
        <td>${fluxo.categoria}</td>
        <td>${fluxo.contas}</td>
        <td>${fluxo.tipo}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const fluxo = {
    descricao: document.getElementById('descricao').value,
    data: document.getElementById('data').value,
    valor: document.getElementById('valor').value,
    categoria: document.getElementById('categoria').value,
    contas: document.getElementById('contas').value,
    tipo: document.getElementById('tipo').value
  }
  const bd_fluxoCaixa = getLocalStorage();
  bd_fluxoCaixa.push(fluxo);
  setLocalStorage(bd_fluxoCaixa);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_fluxoCaixa = getLocalStorage();
  bd_fluxoCaixa.splice(index, 1);
  setLocalStorage(bd_fluxoCaixa);
  atualizarTabela();
}

function validarDescricao() { // Adaptação da função validar (10 pontos)
  const bd_fluxoCaixa = getLocalStorage();
  for (fluxo of bd_fluxoCaixa) {
    if (descricao.value == fluxo.descricao) {
      mensagem = descricao.setCustomValidity("Essa descrição já existe!");
      feedbackDescricao.innerText = "Essa descrição já existe!";
      return false;
    } else {
      descricao.setCustomValidity("");
      feedbackDescricao.innerText = "Informe a descrição corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const descricao = document.getElementById("descricao");
const feedbackDescricao = document.getElementById("feedbackDescricao");
descricao.addEventListener('input', validarDescricao);