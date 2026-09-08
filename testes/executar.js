const arquivos = {
    bissecao: "./Bissecao.test.js",
    newton: "./Newton.test.js",
    secantes: "./Secantes.test.js",
    auxiliares: "./Auxiliares.test.js",
    falsaposicao: "./FalsaPosicao.test.js",
    exercicios: null
};

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const nomeInformado = process.argv[2];
let testesSelecionados = Object.values(arquivos);

if (nomeInformado) {
    const nome = removerAcentos(nomeInformado.toLowerCase()).replace(/[\s_-]/g, '');
    const arquivo = arquivos[nome];

    if (!(nome in arquivos)) {
        console.error(`Método não encontrado: ${nomeInformado}`);
        console.error(`Métodos disponíveis: ${Object.keys(arquivos).join(", ")}`);
        process.exit(1);
    }

    testesSelecionados = arquivo ? [arquivo] : [];
}

await Promise.all(testesSelecionados.filter(Boolean).map((arquivo) => import(arquivo)));
const selecionado = nomeInformado && removerAcentos(nomeInformado.toLowerCase()).replace(/[\s_-]/g, '');
if (selecionado !== 'auxiliares') {
    const { registrarExercicios } = await import('./Exercicios.test.js');
    registrarExercicios(selecionado === 'exercicios' ? undefined : selecionado);
}
