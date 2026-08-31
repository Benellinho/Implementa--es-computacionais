import Auxiliares from "./Auxiliares.js";

export function Falsa_Posição(função, a, b, erro) {
    if (Auxiliares.Intervalo_Valido(função, a, b) === false) {
        return {
            mensagem: "Intervalo não permite saber se a função possui raiz",
            intervalo: null,
            iteracoes: null
        };
    }
    if (erro <= 0) {
        return {
            mensagem: "Erro invalido para calculo",
            intervalo: null,
            iteracoes: null
        };
    }
    let i = 0;
    while (true) {
        let Resultados = { A: função(a), B: função(b) }
        let exatos = Resultado_exato(Resultados)
        if (exatos.Exato) {
            return {
                mensagem: "Raiz exata encontrada.",
                intervalo: [Resultados[exatos.valor], Resultados[exatos.valor]],
                iteracoes: i
            }
        }
        else if (Math.abs(Resultados.A - Resultados.B) < erro) {
            return {
                mensagem: "Raiz encontrada com sucesso.",
                intervalo: [a, b],
                iteracoes: i
            };
        }
        else {
            let c = (a * Resultados.B - b * Resultados.A) / (Resultados.B - Resultados.A)
            if (Resultados.A * função(c) < 0) {
                b = c
            }
            else {
                a = c
            }
        }
        i = i + 1;
    }
}

function Resultado_exato(Resultados) {
    if (Resultados.A === 0) {
        return {
            Exato: true,
            valor: "A"
        }
    }
    else if (Resultados.B === 0) {
        return {
            Exato: true,
            valor: "B"
        }
    }
    else {
        return {
            Exato: false,
            valor: ""
        }
    }
}

export default{
    Falsa_Posição
}