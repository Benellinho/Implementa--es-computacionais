// Expressões transcritas do enunciado; os sinais ausentes foram interpretados como menos.
// Os intervalos selecionam uma raiz de cada equação, não todas as raízes.
export const exercicios = [
    { letra: 'a', expressao: '4 cos(x) - e^(2x)', funcao: (x) => 4 * Math.cos(x) - Math.E ** (2 * x), a: 0, b: 1, inicial: 0.5 },
    { letra: 'b', expressao: 'x/2 - tan(x)', funcao: (x) => x / 2 - Math.tan(x), a: 4, b: 4.5, inicial: 4.25 },
    { letra: 'c', expressao: '1 - x ln(x)', funcao: (x) => 1 - x * Math.log(x), a: 1, b: 2, inicial: 1.5 },
    { letra: 'd', expressao: '2^x - 3x', funcao: (x) => 2 ** x - 3 * x, a: 0, b: 1, inicial: 0.5 },
    { letra: 'e', expressao: 'x^3 + x - 10', funcao: (x) => x ** 3 + x - 10, a: 1, b: 3, inicial: 2.5 }
];
export const tolerancia = 0.00001;
