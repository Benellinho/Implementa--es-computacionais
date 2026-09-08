# Interface visual — criada pelo Codex

## Abrir e enviar

Dê dois cliques em **index.html**. Não precisa executar comandos, instalar Node.js, iniciar servidor ou conectar à internet. Use um navegador atualizado.

Pode enviar **somente index.html** ao professor para usar a interface. Para apresentar também a implementação, envie o projeto completo.

## Autoria e isolamento

Todos os recursos da interface ficam nesta pasta. A Falsa posição em `../Metodos/` foi posteriormente corrigida com o Codex a pedido do aluno: critério de parada pelo resíduo, retorno da raiz, validações e limite de iterações. Os demais algoritmos não foram alterados pelo Codex nesta entrega.

- `modelo.html`, `estilo.css`, `app.js`: apresentação e execução no navegador, criadas pelo Codex.
- `calculo.js`: adaptador criado pelo Codex, com validação e interpretação da expressão via Math.js.
- `gerar-html.js`: empacotador criado pelo Codex. Incorpora Math.js e cópias dos métodos originais no HTML, removendo apenas declarações de importação/exportação; não modifica a lógica das funções.
- `index.html`: entrega autossuficiente gerada a partir dos arquivos acima. Inclui código preexistente dos métodos, biblioteca de terceiros e interface do Codex; não é inteiramente de autoria do Codex.
- `MATHJS-LICENSE.txt`: licença da biblioteca Math.js incorporada.

## Atualização dos métodos

O HTML contém uma cópia dos métodos no momento da geração. Se alterar os arquivos em `Metodos`, atualize a cópia executando, na raiz do projeto:

```powershell
node "interfaçe/gerar-html.js"
```

Este comando é apenas para desenvolvimento, com as dependências do projeto instaladas. Quem recebe o HTML não precisa executá-lo.

## Uso e limites

Selecione o método, informe a expressão em x e os parâmetros. Exemplo: `x^2 - 2`, intervalo `[0, 2]`, tolerância `0.00001`; para Newton, use `x₀ = 1`.

A interface mostra exatamente os campos retornados: Bisseção retorna intervalo; Newton e Secantes retornam raiz e valor da função; Falsa posição retorna raiz, valor da função e intervalo. Na Falsa posição, a tolerância controla |f(raiz)|; o intervalo informado pode permanecer largo. A interface não calcula uma raiz adicional nem corrige resultados dos algoritmos.

Os cálculos rodam em um Web Worker no navegador. A interface encerra a execução após 5 segundos para evitar travamento. Essa proteção pertence à integração. A Falsa posição também possui limite interno de 1000 iterações e detecção de estagnação.

Newton lê a expressão por `toString()`; o adaptador fornece essa representação, enquanto Math.js avalia a função. O texto digitado não é executado como JavaScript.

Funções: sin, cos, tan, exp, log, log10, sqrt, abs e cbrt; constantes pi e e; operadores +, -, *, / e ^. Ângulos em radianos. Valores complexos ou não finitos são rejeitados. Não há histórico persistente.
