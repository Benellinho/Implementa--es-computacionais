import metodo from "./Metodos/Newton.js";

// Altere os valores abaixo para realizar um novo teste.
const função = (x) => 4 * Math.cos(x)   -(Math.E ** (2 * x));
const a = 0;
const erro = 0.00001;

const resultado = metodo.Newton(função, "x", a, erro);

console.log("Parâmetros do teste:");
console.table({ a, erro });

console.log("Resultado do método de Newton:");
console.table(resultado);
