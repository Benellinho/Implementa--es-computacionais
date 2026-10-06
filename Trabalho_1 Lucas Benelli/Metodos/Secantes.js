export function Secantes(função, a, b, erro) {
    for (let i = 1; i <= 100; i++) {
        let resultado_a = função(a);
        let resultado_b = função(b);
        if (resultado_a === 0) {
            return {
                mensagem: "Raiz exata encontrada com sucesso.",
                raiz: a,
                resultado: resultado_a,
                iteracoes: 0
            };
        }
        else if (resultado_b === 0) {
            return {
                mensagem: "Raiz exata encontrada com sucesso.",
                raiz: b,
                resultado: resultado_b,
                iteracoes: 0
            };
        }
        else if (Math.abs(resultado_a) < erro) {
            return {
                mensagem: "Raiz encontrada com sucesso.",
                raiz: a,
                resultado: resultado_a,
                iteracoes: i
            };
        }
        else if (Math.abs(resultado_b) < erro) {
            return {
                mensagem: "Raiz encontrada com sucesso.",
                raiz: b,
                resultado: resultado_b,
                iteracoes: i
            };
        }
        const temp = b - resultado_b * (b - a) / (resultado_b - resultado_a);
        a = b;
        b = temp;
    }

    return {
        mensagem: "Não foi possível encontrar uma raiz dentro do erro informado.",
        raiz: null,
        resultado: null,
        iteracoes: 100
    };
}

export default {
    Secantes,
};
