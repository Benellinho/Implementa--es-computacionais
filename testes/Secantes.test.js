import test from "node:test";
import assert from "node:assert/strict";
import { Secantes } from "../Metodos/Secantes.js";

test("Secantes encontra a raiz de uma função quadrática", () => {
    const função = (x) => x ** 2 - 4;
    const resultado = Secantes(função, 1, 3, 0.00001);

    console.log("Resultado de Secantes — função quadrática:");
    console.table(resultado);

    assert.equal(resultado.mensagem, "Raiz encontrada com sucesso.");
    assert.ok(Math.abs(resultado.raiz - 2) < 0.00001);
    assert.ok(Math.abs(resultado.resultado) < 0.00001);
    assert.ok(resultado.iteracoes > 0);
});
