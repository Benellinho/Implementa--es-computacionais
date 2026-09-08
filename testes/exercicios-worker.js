import { parentPort, workerData } from 'node:worker_threads';
import { exercicios, tolerancia } from './funcoes-exercicios.js';
import { Bisseção } from '../Metodos/Bisseção.js';
import { Falsa_Posição } from '../Metodos/False posição.js';
import { Newton } from '../Metodos/Newton.js';
import { Secantes } from '../Metodos/Secantes.js';

const caso = exercicios.find(item => item.letra === workerData.letra);
const metodos = { bissecao: Bisseção, falsaposicao: Falsa_Posição, secantes: Secantes };
const resultado = workerData.metodo === 'newton'
    ? Newton(caso.funcao, 'x', caso.inicial, tolerancia)
    : metodos[workerData.metodo](caso.funcao, caso.a, caso.b, tolerancia);
parentPort.postMessage(resultado);
