export function Intervalo_Valido(função, a, b) {
    const resultado_a = função(a)
    const resultado_b = função(b)
    console.log()
    return resultado_a * resultado_b < 0
}

export default {
    Intervalo_Valido
};
