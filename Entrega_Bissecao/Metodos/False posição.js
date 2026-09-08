// Ajustado com o Codex: parada pelo resíduo, retorno da raiz e proteção contra estagnação.
export function Falsa_Posição(função, a, b, erro) {
    const falha = (mensagem, iteracoes = 0) => ({
        mensagem, raiz: null, resultado: null, iteracoes, intervalo: null
    });

    if (!Number.isFinite(erro) || erro <= 0) {
        return falha("Erro invalido para calculo");
    }
    if (!Number.isFinite(a) || !Number.isFinite(b) || a > b) {
        return falha("Informe limites finitos com a menor ou igual a b.");
    }

    let resultadoA = função(a);
    let resultadoB = função(b);
    if (!Number.isFinite(resultadoA) || !Number.isFinite(resultadoB)) {
        return falha("A função não possui valor finito nos extremos informados.");
    }

    // Verifica raízes nos extremos antes de exigir troca de sinal.
    if (resultadoA === 0 || resultadoB === 0) {
        const raiz = resultadoA === 0 ? a : b;
        return {
            mensagem: "Raiz exata encontrada.",
            raiz, resultado: 0, iteracoes: 0, intervalo: [raiz, raiz]
        };
    }
    if (Math.sign(resultadoA) === Math.sign(resultadoB)) {
        return falha("Intervalo não permite saber se a função possui raiz");
    }

    const limiteIteracoes = 1000;
    for (let i = 1; i <= limiteIteracoes; i++) {
        // Interseção da reta entre (a, f(a)) e (b, f(b)) com o eixo x.
        const c = (a * resultadoB - b * resultadoA) / (resultadoB - resultadoA);
        if (!Number.isFinite(c) || c < a || c > b) {
            return falha("Não foi possível calcular uma aproximação válida.", i);
        }
        const resultadoC = função(c);
        if (!Number.isFinite(resultadoC)) {
            return falha("A função produziu um valor não finito durante o cálculo.", i);
        }

        // Um extremo pode ficar fixo: a largura do intervalo não precisa diminuir.
        // A tolerância controla |f(c)|, não a distância entre c e a raiz verdadeira.
        if (Math.abs(resultadoC) < erro) {
            return {
                mensagem: resultadoC === 0 ? "Raiz exata encontrada." : "Raiz encontrada com sucesso.",
                raiz: c,
                resultado: resultadoC,
                iteracoes: i,
                intervalo: resultadoC === 0 ? [c, c] : [a, b]
            };
        }
        if (c === a || c === b) {
            return falha("A precisão numérica impede continuar dentro da tolerância informada.", i);
        }

        if (Math.sign(resultadoA) !== Math.sign(resultadoC)) {
            b = c;
            resultadoB = resultadoC;
        } else {
            a = c;
            resultadoA = resultadoC;
        }
    }
    return falha("Não foi possível encontrar uma raiz dentro do limite de iterações.", limiteIteracoes);
}

export default { Falsa_Posição };
