import Bisseção from "./Metodos/Bisseção.js";
import { Falsa_Posição } from "./Metodos/False posição.js";

// Altere os valores abaixo para realizar um novo teste.
const função = (x) => 4 * Math.cos(x)   -(Math.E ** 2 * x);
const a = -3;
const b = 1;
const erro = 0.001;

const resultado1 = Bisseção.Bisseção(função, a, b, erro);
const resultado2 = Falsa_Posição(função, a, b, erro);

console.log("Parâmetros do teste:");
console.table({ a, b, erro });

console.log("Resultado do método da bisseção:");
console.table(resultado1);

console.log("Resultado do método da falsa posição:");
console.table(resultado2);
