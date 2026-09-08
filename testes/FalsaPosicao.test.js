import test from 'node:test';
import assert from 'node:assert/strict';
import { Falsa_Posição } from '../Metodos/False posição.js';

test('Falsa posição converge mesmo com um extremo fixo', () => {
    const f = x => x ** 3 + x - 10;
    const r = Falsa_Posição(f, 1, 3, 0.00001);
    assert.ok(Math.abs(r.raiz - 2) < 0.00001);
    assert.ok(Math.abs(f(r.raiz)) < 0.00001);
    assert.equal(r.resultado, f(r.raiz));
    assert.ok(r.intervalo[1] - r.intervalo[0] > 0.5);
});

test('Falsa posição retorna a coordenada de uma raiz exata nos dois extremos', () => {
    for (const [a, b] of [[2, 3], [1, 2], [2, 2]]) {
        const r = Falsa_Posição(x => x - 2, a, b, 0.00001);
        assert.equal(r.raiz, 2);
        assert.deepEqual(r.intervalo, [2, 2]);
        assert.equal(r.iteracoes, 0);
    }
});

test('Falsa posição retorna a coordenada da raiz exata calculada', () => {
    const r = Falsa_Posição(x => x - 2, 1, 3, 0.00001);
    assert.equal(r.raiz, 2);
    assert.equal(r.resultado, 0);
    assert.deepEqual(r.intervalo, [2, 2]);
});

test('Falsa posição recusa tolerância inválida, intervalo inválido e valores não finitos', () => {
    for (const erro of [0, -1, NaN, Infinity]) {
        assert.equal(Falsa_Posição(x => x - 2, 1, 3, erro).raiz, null);
    }
    assert.equal(Falsa_Posição(x => x * x + 1, -1, 1, 0.001).raiz, null);
    assert.equal(Falsa_Posição(Math.log, 0, 2, 0.001).raiz, null);
    assert.equal(Falsa_Posição(x => x - 2, 3, 1, 0.001).raiz, null);
    assert.equal(Falsa_Posição(x => 1 / x, -1, 1, 0.001).raiz, null);
});

test('Falsa posição encerra quando o arredondamento impede progresso', () => {
    const r = Falsa_Posição(x => 4 * Math.cos(x) - Math.exp(2 * x), 0, 1, 1e-30);
    assert.equal(r.raiz, null);
    assert.match(r.mensagem, /precisão numérica/);
    assert.ok(r.iteracoes < 1000);
});

test('Falsa posição limita iterações em uma convergência muito lenta', () => {
    const r = Falsa_Posição(x => x ** 10 - 1, 0, 2, 1e-12);
    assert.equal(r.raiz, null);
    assert.equal(r.iteracoes, 1000);
    assert.match(r.mensagem, /limite de iterações/);
});
