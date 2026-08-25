import Auxiliares from "./Auxiliares.js";
export function Bisseção(função, a, b, erro) {
    if (Auxiliares.Intervalo_Valido(função, a, b) === false) {
        return {
            mensagem: "Intervalo não permite saber se a função possui raiz",
            intervalo: null,
            iteracoes: null
        };
    }
    const interações = total_interações(a, b, erro)
    if (interações === "Erro invalido") {
        return {
            mensagem: "Erro invalido para calculo",
            intervalo: null,
            iteracoes: null
        };
    }
    for (let i = 0; i <= interações; i++) {
        let Resultado_a = função(a);
        let meio = (a + b) / 2;
        let Resultado_meio = função(meio);
        if (Resultado_meio === 0) {
            return {
                mensagem: "Raiz exata encontrada.",
                intervalo: [meio, meio],
                iteracoes: i + 1
            };
        }
        else if (Math.abs(a - b) <= erro) {
            return {
                mensagem: "Raiz encontrada com sucesso.",
                intervalo: [a, b],
                iteracoes: i
            };
        }
        else {
            if (Resultado_a * Resultado_meio < 0) {
                b = meio
            }
            else {
                a = meio
            }
        }
    }
}

export function total_interações(a, b, erro) {
    if (erro <= 0) {
        return "Erro invalido"
    }
    // Evita retornar menos de 0 iterações para nõ ter problema no for
    return Math.max(0, Math.ceil(Math.log2(Math.abs(b - a) / erro))
    );
}

export default {
    Bisseção,
    total_interações
};
