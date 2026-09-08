# Cinco equações em cada método

Expressões confirmadas, incluindo a correção do item b:

- a) `4 cos(x) - e^(2x) = 0`
- b) `x/2 - tan(x) = 0`
- c) `1 - x ln(x) = 0`
- d) `2^x - 3x = 0`
- e) `x^3 + x - 10 = 0`

Os valores estão em `funcoes-exercicios.js`. Cada função é uma arrow function de uma linha, compatível com a leitura de expressão feita por Newton. Os ângulos estão em radianos. Em b, o intervalo [4, 4.5] evita os polos da tangente e contém uma raiz diferente de zero; Newton começa em 4.25. Em c, o intervalo é positivo para respeitar o domínio do logaritmo. Estes testes selecionam uma raiz por equação, não todas.

Somente os 20 novos casos:

```powershell
node testes/Exercicios.test.js
```

Somente as cinco equações com um método:

```powershell
node testes/Exercicios.test.js Bissecao
node testes/Exercicios.test.js FalsaPosicao
node testes/Exercicios.test.js Newton
node testes/Exercicios.test.js Secantes
```

Também estão integrados aos comandos existentes: `npm test` executa tudo, e `npm run teste -- Newton` executa os testes antigos de Newton e as cinco equações. Use `npm run teste -- Exercicios` para executar apenas os novos casos de todos os métodos.

Cada teste mostra parâmetros e retorno original, e verifica numericamente o resultado. Os métodos não são corrigidos pelos testes. Uma falha ou interrupção indica um problema a investigar na implementação ou convergência. Cada execução ocorre em um worker com limite de 5 segundos. A Falsa posição também possui limite interno de 1000 iterações.

Newton e Secantes podem sair do intervalo inicial e convergir para outra raiz válida. Nesses métodos, a verificação exige uma raiz finita que satisfaça a equação, sem exigir que permaneça no intervalo.

A Falsa posição foi corrigida com o Codex e passou nas cinco equações. A verificação exige |f(raiz)| menor que a tolerância; não exige estreitamento do intervalo nem proximidade dos valores da função nos extremos. `FalsaPosicao.test.js` cobre também raízes exatas, entradas inválidas, estagnação e limite de iterações.
