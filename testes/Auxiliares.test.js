import test from "node:test";
import assert from "node:assert/strict";
import { Intervalo_Valido } from "../Metodos/Auxiliares.js";

test("Intervalo_Valido aceita um intervalo com troca de sinal", () => {
    const função = (x) => x ** 2 - 4;
    const resultado = Intervalo_Valido(função, 0, 3);

    console.log("Resultado de Intervalo_Valido — intervalo válido:");
    console.table({ resultado });

    assert.equal(resultado, true);
});

test("Intervalo_Valido recusa um intervalo sem troca de sinal", () => {
    const função = (x) => x ** 2 + 1;
    const resultado = Intervalo_Valido(função, -1, 1);

    console.log("Resultado de Intervalo_Valido — intervalo inválido:");
    console.table({ resultado });

    assert.equal(resultado, false);
});
