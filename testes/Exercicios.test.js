import test from 'node:test';
import assert from 'node:assert/strict';
import { Worker } from 'node:worker_threads';
import { pathToFileURL } from 'node:url';
import { exercicios, tolerancia } from './funcoes-exercicios.js';

const nomes = { bissecao: 'Bisseção', falsaposicao: 'Falsa posição', newton: 'Newton', secantes: 'Secantes' };
function executar(metodo, letra) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('./exercicios-worker.js', import.meta.url), { workerData: { metodo, letra } });
        const timer = setTimeout(() => {
            reject(new Error('O método não terminou em 5 segundos; execução interrompida pelo teste.'));
            worker.terminate();
        }, 5000);
        worker.once('message', resultado => { clearTimeout(timer); worker.terminate(); resolve(resultado); });
        worker.once('error', erro => { clearTimeout(timer); reject(erro); });
        worker.once('exit', codigo => { clearTimeout(timer); if (codigo !== 0) reject(new Error(`Worker encerrado: ${codigo}`)); });
    });
}

export function registrarExercicios(selecao) {
    const metodos = selecao ? [selecao] : Object.keys(nomes);
    for (const metodo of metodos) {
        if (!nomes[metodo]) throw new Error(`Método inválido: ${metodo}. Use ${Object.keys(nomes).join(', ')}.`);
        for (const caso of exercicios) {
            test(`${nomes[metodo]} — ${caso.letra}) ${caso.expressao} = 0`, async () => {
                const resultado = await executar(metodo, caso.letra);
                console.log(`\n${nomes[metodo]} — ${caso.letra}) ${caso.expressao} = 0`);
                console.table({ a: caso.a, b: caso.b, inicialNewton: caso.inicial, tolerancia });
                console.table(resultado);
                assert.ok(resultado, 'O método deve retornar um objeto.');
                assert.ok(Number.isInteger(resultado.iteracoes) && resultado.iteracoes >= 0, 'Quantidade de iterações inválida.');
                if (metodo === 'bissecao' || metodo === 'falsaposicao') {
                    assert.ok(Array.isArray(resultado.intervalo), 'O método deve retornar um intervalo.');
                    const [a, b] = resultado.intervalo;
                    assert.ok(Number.isFinite(a) && Number.isFinite(b) && a <= b, 'Extremos inválidos.');
                    assert.ok(a >= caso.a && b <= caso.b, 'O intervalo deve estar dentro do intervalo inicial.');
                    if (a === b) {
                        assert.ok(Math.abs(caso.funcao(a)) <= tolerancia, 'O ponto retornado como raiz exata não satisfaz a equação.');
                    } else {
                        assert.ok(caso.funcao(a) * caso.funcao(b) <= 0, 'O intervalo retornado deve conter uma troca de sinal.');
                        if (metodo === 'bissecao') assert.ok(b - a <= tolerancia, 'O intervalo excede a tolerância.');
                    }
                }
                if (metodo !== 'bissecao') {
                    assert.ok(Number.isFinite(resultado.raiz), 'O método deve retornar uma raiz finita.');
                    assert.ok(Math.abs(caso.funcao(resultado.raiz)) <= tolerancia, 'A raiz não satisfaz a tolerância no resíduo.');
                    assert.ok(Math.abs(resultado.resultado - caso.funcao(resultado.raiz)) < 1e-12, 'O resultado deve corresponder a f(raiz).');
                }
            });
        }
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const selecao = process.argv[2]?.normalize('NFD').replace(/[\u0300-\u036f\s_-]/g, '').toLowerCase();
    registrarExercicios(selecao);
}
