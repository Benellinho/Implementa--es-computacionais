import test from "node:test";
import assert from "node:assert/strict";
import { Newton } from "../Metodos/Newton.js";

test("Newton encontra a raiz de uma função quadrática", () => {
    const função = (x) => x ** 2 - 4;
    const resultado = Newton(função, "x", 3, 0.00001);

    console.log("Resultado de Newton — função quadrática:");
    console.table(resultado);

    assert.equal(resultado.mensagem, "Raiz encontrada com sucesso.");
    assert.ok(Math.abs(resultado.raiz - 2) < 0.00001);
    assert.ok(Math.abs(resultado.resultado) < 0.00001);
    assert.ok(resultado.iteracoes > 0);
});

test("Newton reconhece uma raiz exata no valor inicial", () => {
    const função = (x) => x ** 2 - 4;
    const resultado = Newton(função, "x", 2, 0.00001);

    console.log("Resultado de Newton — raiz exata:");
    console.table(resultado);

    assert.equal(resultado.mensagem, "Raiz exata encontrada com sucesso.");
    assert.equal(resultado.raiz, 2);
    assert.equal(resultado.resultado, 0);
    assert.equal(resultado.iteracoes, 1);
});

test("Newton funciona com funções do objeto Math", () => {
    const função = (x) => 4 * Math.cos(x) - Math.E ** (2 * x);
    const resultado = Newton(função, "x", 0, 0.00001);

    console.log("Resultado de Newton — função trigonométrica/exponencial:");
    console.table(resultado);

    assert.equal(resultado.mensagem, "Raiz encontrada com sucesso.");
    assert.ok(Math.abs(resultado.resultado) < 0.00001);
});
