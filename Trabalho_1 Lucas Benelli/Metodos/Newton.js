import { derivative } from "mathjs";

function Funcao_Para_Expressao(função) {
    // Aceita apenas arrow function de uma linha: (x) => x ** 2 - 4
    // Não aceita "function (x) {}", bloco com return ou variáveis externas.
    const expressao = função.toString().split("=>")[1].trim();

    return expressao
        .replace(/Math\.PI\b/g, "pi")
        .replace(/Math\.E\b/g, "e")
        .replace(/Math\.([A-Za-z_$][\w$]*)/g, "$1")
        .replace(/\*\*/g, "^");
}

export function Newton(função, variavel, a, erro) {
    const expressao = Funcao_Para_Expressao(função);
    const derivadaCompilada = derivative(expressao, variavel).compile();
    const derivada = (x) => derivadaCompilada.evaluate({ [variavel]: x });

    for (let i = 1; i <= 100; i++) {
        const resultado = função(a);

        if (resultado === 0) {
            return {
                mensagem: "Raiz exata encontrada com sucesso.",
                raiz: a,
                resultado: resultado,
                iteracoes: i
            };
        }

        if (Math.abs(resultado) < erro) {
            return {
                mensagem: "Raiz encontrada com sucesso.",
                raiz: a,
                resultado: resultado,
                iteracoes: i
            };
        }

        const resultadoDerivada = derivada(a);

        if (!Number.isFinite(resultadoDerivada) || resultadoDerivada === 0) {
            return {
                mensagem: "Não foi possível continuar: a derivada é zero ou inválida.",
                raiz: null,
                resultado: resultado,
                iteracoes: i
            };
        }

        a = a - resultado / resultadoDerivada;
    }

    return {
        mensagem: "Não foi possível encontrar uma raiz dentro do erro informado.",
        raiz: null,
        resultado: null,
        iteracoes: 100
    };
}

export default {
    Newton,
};
