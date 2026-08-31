# MTM224 — Métodos Numéricos Computacionais

Este repositório reúne as implementações computacionais desenvolvidas para a disciplina **MTM224 — Métodos Numéricos Computacionais**, cursada na **Universidade Federal de Santa Maria (UFSM)** durante o segundo semestre de 2026.

O objetivo é registrar os métodos estudados ao longo da disciplina, incluindo códigos, exercícios e experimentos numéricos.

## Tecnologias

- **JavaScript:** implementação da lógica dos métodos numéricos.
- **HTML:** criação das interfaces visuais para interação e apresentação dos resultados.
- **Math.js:** biblioteca utilizada para operações e expressões matemáticas.

## Instalação

Após clonar o repositório, instale as dependências do projeto, incluindo o Math.js:

```bash
npm install
```

Para instalar somente o Math.js em um projeto que ainda não possui a dependência:

```bash
npm install mathjs
```

## Padrão de retorno das funções

As funções dos métodos numéricos devem sempre retornar um objeto contendo, nesta ordem:

- `mensagem`: informa se a execução terminou com sucesso ou se ocorreu algum erro;
- `raiz`: o valor aproximado encontrado para a raiz;
- `resultado`: o resultado da equação avaliada na raiz encontrada;
- `iteracoes`: o número de iterações realizadas pelo método.

Exemplo de retorno quando o método encontra uma raiz:

```javascript
return {
  mensagem: "Raiz encontrada com sucesso.",
  raiz: 2,
  resultado: 0,
  iteracoes: 10
};
```

Exemplo de retorno quando o método não consegue encontrar uma raiz:

```javascript
return {
  mensagem: "Não foi possível encontrar uma raiz dentro do erro informado.",
  raiz: null,
  resultado: null,
  iteracoes: 10
};
```

A propriedade `mensagem` deve ser sempre a primeira do objeto e apresentar uma descrição clara do resultado da execução.

## Importação dos métodos

Cada arquivo JavaScript exporta suas funções por meio de um objeto. Para chamar uma função no formato `metodo.nomeDaFuncao(parametros)`, importe o arquivo como no exemplo:

```javascript
import metodo from "./Metodos/Bisseção.js";

const resultado = metodo.Bisseção(funcao, a, b, erro);
```

Também é possível importar todas as exportações nomeadas:

```javascript
import * as metodo from "./Metodos/Auxiliares.js";

const intervaloValido = metodo.Intervalo_Valido(funcao, a, b);
```

Ao utilizar os arquivos diretamente no HTML, o script responsável pela importação deve ser declarado com `type="module"`.

```html
<script type="module" src="./script.js"></script>
```

## Teste pelo terminal

Para executar os testes de todos os métodos:

```bash
npm run testes
```

Também é possível usar o atalho padrão do npm:

```bash
npm test
```

Para testar somente um método, informe `Bissecao`, `Newton` ou `Auxiliares`:

```bash
npm run teste -- Newton
npm run teste -- Bissecao
npm run teste -- Auxiliares
```

O arquivo `teste.js` contém uma área inicial para informar a função, os limites `a` e `b` e o erro aceito:

```javascript
const função = (x) => x ** 2 - 4;
const a = -3;
const b = 1;
const erro = 0.001;
```

Após alterar os valores, execute o teste no terminal:

```bash
node teste.js
```

Também é possível utilizar o comando:

```bash
npm test
```

## Resumo de funções matemáticas em JavaScript

As principais operações matemáticas estão disponíveis no objeto `Math`:

| Operação | JavaScript | Exemplo |
|---|---|---|
| Valor absoluto | `Math.abs(x)` | `Math.abs(-5)` retorna `5` |
| Potência | `x ** n` ou `Math.pow(x, n)` | `2 ** 3` retorna `8` |
| Raiz quadrada | `Math.sqrt(x)` | `Math.sqrt(9)` retorna `3` |
| Raiz cúbica | `Math.cbrt(x)` | `Math.cbrt(8)` retorna `2` |
| Exponencial | `Math.exp(x)` | `Math.exp(1)` retorna `e` |
| Logaritmo natural | `Math.log(x)` | `Math.log(Math.E)` retorna `1` |
| Logaritmo na base 10 | `Math.log10(x)` | `Math.log10(100)` retorna `2` |
| Logaritmo na base 2 | `Math.log2(x)` | `Math.log2(8)` retorna `3` |
| Seno | `Math.sin(x)` | `Math.sin(Math.PI / 2)` retorna `1` |
| Cosseno | `Math.cos(x)` | `Math.cos(0)` retorna `1` |
| Tangente | `Math.tan(x)` | `Math.tan(0)` retorna `0` |
| Menor valor | `Math.min(a, b)` | `Math.min(2, 5)` retorna `2` |
| Maior valor | `Math.max(a, b)` | `Math.max(2, 5)` retorna `5` |
| Arredondar | `Math.round(x)` | `Math.round(2.6)` retorna `3` |
| Arredondar para baixo | `Math.floor(x)` | `Math.floor(2.9)` retorna `2` |
| Arredondar para cima | `Math.ceil(x)` | `Math.ceil(2.1)` retorna `3` |

As constantes matemáticas mais utilizadas são:

```javascript
Math.PI // número pi
Math.E  // número de Euler
```

As funções trigonométricas de JavaScript trabalham com **radianos**. Para converter graus em radianos:

```javascript
const radianos = graus * Math.PI / 180;
```

Exemplos de funções que podem ser informadas aos métodos numéricos:

```javascript
const funçãoQuadratica = (x) => x ** 2 - 4;
const funçãoExponencial = (x) => Math.exp(x) - 2;
const funçãoLogaritmica = (x) => Math.log(x) - 1;
const funçãoTrigonometrica = (x) => Math.cos(x) - x;
```

## Conteúdo

O repositório será atualizado conforme o andamento da disciplina e a implementação de novos métodos.
