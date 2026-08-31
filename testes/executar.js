const arquivos = {
    bissecao: "./Bissecao.test.js",
    newton: "./Newton.test.js",
    secantes: "./Secantes.test.js",
    auxiliares: "./Auxiliares.test.js"
};

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const nomeInformado = process.argv[2];
let testesSelecionados = Object.values(arquivos);

if (nomeInformado) {
    const nome = removerAcentos(nomeInformado.toLowerCase());
    const arquivo = arquivos[nome];

    if (!arquivo) {
        console.error(`Método não encontrado: ${nomeInformado}`);
        console.error(`Métodos disponíveis: ${Object.keys(arquivos).join(", ")}`);
        process.exit(1);
    }

    testesSelecionados = [arquivo];
}

await Promise.all(testesSelecionados.map((arquivo) => import(arquivo)));
