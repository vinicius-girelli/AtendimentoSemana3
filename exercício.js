const tabuada = [];

// Calcular e armazenar a tabuada
for (let multiplicador1 = 1; multiplicador1 <= 10; multiplicador1++) {
  const linhaTabuada = [];
  
  for (let multiplicador2 = 1; multiplicador2 <= 10; multiplicador2++) {
    linhaTabuada.push(multiplicador1 * multiplicador2);
  }

  //Array dentro de outro Array
  tabuada.push(linhaTabuada);
}

// Exibir a tabuada
// i = são as Array (linhaTabuada) que estão dentro da Array "tabuada"
// j = são os valores dentro da Array "linhaTabuada" que está dentro da Array "tabuada"

for (let i = 0; i < tabuada.length; i++) {
    // i varia de 0 a 9 (10 elementos)
    console.log('Tabuada do ' + (i + 1) + ':');
  
    for (let j = 0; j < tabuada[i].length; j++) {
        //j varia de 0 a 9 (10 elementos)
        console.log((i + 1) + ' x ' + (j + 1) + ' = ' + tabuada[i][j]);
        //tabuada[i][j] -> valor j dentro de uma Array "linhaTabuada" dentro da Array "tabuada"
    }

    console.log('\n');  // Adicionar uma linha em branco após cada tabuada
}
