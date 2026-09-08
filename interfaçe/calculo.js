// Integração criada pelo Codex. Os algoritmos são importados sem modificações.
import { parentPort, workerData } from 'node:worker_threads';
import { parse } from 'mathjs';
import { Bisseção } from '../Metodos/Bisseção.js';
import { Falsa_Posição } from '../Metodos/False posição.js';
import { Newton } from '../Metodos/Newton.js';
import { Secantes } from '../Metodos/Secantes.js';

try {
  const { metodo, expressao, a, b, erro } = workerData;
  if (!['bissecao', 'falsa', 'newton', 'secantes'].includes(metodo)) throw Error('Método inválido.');
  if (typeof expressao !== 'string' || expressao.length > 300) throw Error('Informe uma expressão de até 300 caracteres.');
  if (!Number.isFinite(a) || !Number.isFinite(erro) || erro <= 0) throw Error('Informe valores finitos e tolerância positiva.');
  if (metodo !== 'newton' && (!Number.isFinite(b) || a === b)) throw Error('Informe dois valores distintos.');
  if (['bissecao', 'falsa'].includes(metodo) && a > b) throw Error('O limite a deve ser menor que b.');
  const expression = expressao.replace(/Math\.PI\b/g, 'pi').replace(/Math\.E\b/g, 'e').replace(/Math\./g, '').replace(/\*\*/g, '^');
  const tree = parse(expression);
  const functions = ['sin', 'cos', 'tan', 'exp', 'log', 'log10', 'sqrt', 'abs', 'cbrt'];
  tree.traverse(node => {
    if (!['OperatorNode', 'ConstantNode', 'SymbolNode', 'FunctionNode', 'ParenthesisNode'].includes(node.type)) throw Error('Use apenas uma expressão matemática em x.');
    if (node.isSymbolNode && !['x', 'pi', 'e', ...functions].includes(node.name)) throw Error(`Símbolo não permitido: ${node.name}`);
    if (node.isFunctionNode && !functions.includes(node.fn.name)) throw Error('Função matemática não suportada.');
    if (node.isOperatorNode && !['+', '-', '*', '/', '^'].includes(node.op)) throw Error('Operador não suportado.');
  });
  const compiled = tree.compile();
  const f = x => {
    const value = compiled.evaluate({ x });
    if (typeof value !== 'number' || !Number.isFinite(value)) throw Error('A função produziu um valor não real ou não finito. Revise os parâmetros.');
    return value;
  };
  // Newton lê a expressão via toString; esta adaptação evita gerar/executar código JS.
  f.toString = () => `(x) => ${expression}`;
  const methods = { bissecao: Bisseção, falsa: Falsa_Posição, secantes: Secantes };
  const resultado = metodo === 'newton' ? Newton(f, 'x', a, erro) : methods[metodo](f, a, b, erro);
  if (!resultado) throw Error('O método terminou sem retornar um resultado.');
  parentPort.postMessage({ resultado });
} catch (error) {
  parentPort.postMessage({ erro: error.message });
}
