const prompt = require('prompt-sync')();

let produtos = [];

function inserirProduto(produto) {
  produtos.push(produto);
}

function excluirProduto(codigo) {
  produtos = produtos.filter(produto => produto.codigo !== codigo);
}

// Função para formatar e listar os produtos de forma alinhada
function formatarListaProdutos() {
  console.log("===========================================");
  console.log("Código | Nome                | Preço   | Estoque");
  console.log("===========================================");

  for (const produto of produtos) {
    // Usando padEnd para alinhar os campos em colunas
    console.log(`${produto.codigo.toString().padEnd(7)}| ${produto.nome.padEnd(21)}| R$ ${produto.preco.toFixed(2).padEnd(8)}| ${produto.estoque}`);
  }

  console.log("===========================================");
}

// Loop principal para o menu do sistema
do {
  console.log("\nSistema de Gerenciamento de Produtos");
  console.log("1 - Inserir Produto");
  console.log("2 - Excluir Produto");
  console.log("3 - Listar Produtos");
  console.log("0 - Sair");

  // Solicita a opção do usuário
  var opcao = prompt("Digite sua opção: ");

  // Executa a ação de acordo com a opção escolhida
  if (opcao === '1') {
    console.log("\nInserindo Produto...\n");
    let codigo = parseInt(prompt("Digite o código: "));
    let nome = prompt("Digite o nome: ");
    let preco = parseFloat(prompt("Digite o preço: "));
    let estoque = parseInt(prompt("Digite a quantidade em estoque: "));

    const produto = {
      codigo: codigo,
      nome: nome,
      preco: preco,
      estoque: estoque
    }

    inserirProduto(produto);
  } else if (opcao === '2') {
    console.log("\nExcluindo Produto...\n");
    let codigo = parseInt(prompt("Digite o código do produto: "));
    excluirProduto(codigo);
  } else if (opcao === '3') {
    console.log("\nListando Produtos...\n");
    formatarListaProdutos();
  } else if (opcao === '0') {
    console.log("\nSaindo do programa...\n");
  } else {
    console.log("\nOpção inválida. Tente novamente.\n");
  }

  // Aguarda o usuário pressionar Enter para continuar
  prompt("\nPressione Enter para continuar...");
  console.clear();
} while (opcao !== '0');
