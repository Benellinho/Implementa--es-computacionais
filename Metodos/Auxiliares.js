export function Intervalo_Valido(função, a, b){
    função(a)
    função(b)
    // Deve ser um valor negativo e um valor positivo para ser um intervalo valido
    return a * b < 0
}

export default {
    Intervalo_Valido
};
