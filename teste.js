import metodo from "./Metodos/Bisseção.js";

// Altere os valores abaixo para realizar um novo teste.
const função = (x) => 4 * Math.cos(x)   -(Math.E ** 2 * x);
const a = -3;
const b = 1;
const erro = 0.001;

const resultado = metodo.Bisseção(função, a, b, erro);

console.log("Parâmetros do teste:");
console.table({ a, b, erro });

console.log("Resultado do método da bisseção:");
console.table(resultado);
