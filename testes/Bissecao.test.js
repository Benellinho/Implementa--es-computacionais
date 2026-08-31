import test from "node:test";
import assert from "node:assert/strict";
import { Bisseção, total_interações } from "../Metodos/Bisseção.js";

test("Bisseção encontra um intervalo contendo a raiz", () => {
    const função = (x) => x ** 2 - 4;
    const erro = 0.00001;
    const resultado = Bisseção(função, 0, 3, erro);

    console.log("Resultado da Bisseção — função quadrática:");
    console.table(resultado);

    assert.match(resultado.mensagem, /Raiz/);
    assert.ok(resultado.intervalo[0] <= 2);
    assert.ok(resultado.intervalo[1] >= 2);
    assert.ok(resultado.intervalo[1] - resultado.intervalo[0] <= erro);
    assert.ok(resultado.iteracoes > 0);
});

test("Bisseção reconhece uma raiz exata", () => {
    const função = (x) => x - 1;
    const resultado = Bisseção(função, 0, 2, 0.00001);

    console.log("Resultado da Bisseção — raiz exata:");
    console.table(resultado);

    assert.equal(resultado.mensagem, "Raiz exata encontrada.");
    assert.deepEqual(resultado.intervalo, [1, 1]);
    assert.equal(resultado.iteracoes, 1);
});

test("Bisseção recusa um intervalo sem troca de sinal", () => {
    const função = (x) => x ** 2 + 1;
    const resultado = Bisseção(função, -1, 1, 0.00001);

    console.log("Resultado da Bisseção — intervalo inválido:");
    console.table(resultado);

    assert.equal(resultado.intervalo, null);
    assert.equal(resultado.iteracoes, null);
});

test("total_interações calcula o limite e recusa erro inválido", () => {
    const resultadoValido = total_interações(0, 1, 0.1);
    const resultadoInvalido = total_interações(0, 1, 0);

    console.log("Resultado de total_interações:");
    console.table({ resultadoValido, resultadoInvalido });

    assert.equal(resultadoValido, 4);
    assert.equal(resultadoInvalido, "Erro invalido");
});
