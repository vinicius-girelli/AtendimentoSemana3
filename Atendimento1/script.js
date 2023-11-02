// Função para aplicar o desconto selecionado 
function aplicarDesconto(){
  var elementosPreco = document.getElementsByClassName('produto_preco');
  var elementosDesconto = document.getElementsByClassName('produto_desconto');
  var selectDesconto = document.getElementById('selectDesconto');
  var descontoSelecionado = parseFloat(selectDesconto.value);

  //formatar para a moeda brasileira
  const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  for (let i = 0; i < elementosPreco.length; i++){
    var precoOriginal = parseFloat(elementosPreco[i].textContent);
    var desconto = precoOriginal * descontoSelecionado;
    var precoComDesconto = precoOriginal - desconto;

    var valorFormatado = formatador.format(precoComDesconto/1);

    elementosDesconto[i].textContent = valorFormatado

  }

}

// Manipulador de evento
document.getElementById('aplicarDescontoBtn').addEventListener('click', aplicarDesconto);