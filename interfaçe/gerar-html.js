// Empacotamento criado pelo Codex. Só é necessário ao atualizar os fontes.
// O professor não precisa de Node.js: index.html já contém todos os recursos.
import { readFile, writeFile } from 'node:fs/promises';
const read = path => readFile(new URL(path, import.meta.url), 'utf8');
const files = ['Auxiliares.js', 'Bisseção.js', 'False posição.js', 'Newton.js', 'Secantes.js'];
const modules = [];
for (const file of files) {
  // Remove apenas declarações de módulos; preserva os corpos das funções.
  const source = (await read(`../Metodos/${file}`))
    .replace(/^import .*;\r?\n/gm, '')
    .replace(/export default\s*\{[^}]*\};?/g, '')
    .replace(/export function /g, 'function ');
  modules.push(`// Fonte original: Metodos/${file}\n${source}`);
}
const adapter = (await read('./calculo.js')).replace(/^import .*;\r?\n/gm, '');
const library = await read('../node_modules/mathjs/lib/browser/math.js');
const worker = `${library}\nconst { parse, derivative } = math;\n${modules.join('\n')}\nconst Auxiliares = { Intervalo_Valido };\nself.onmessage = ({ data: workerData }) => {\nconst parentPort = { postMessage: data => self.postMessage(data) };\n${adapter}\n};`;
const escapeScript = text => text.replace(/<\/script/gi, '<\\/script');
const scripts = `window.codigoCalculo = ${JSON.stringify(worker)};\n${await read('./app.js')}`;
const awaitedStyle = await read('./estilo.css');
const html = (await read('./modelo.html'))
  .replace('<!-- ESTILO -->', () => `<style>${awaitedStyle}</style>`)
  .replace('<!-- SCRIPTS -->', () => `<script>${escapeScript(scripts)}</script>`);
await writeFile(new URL('./index.html', import.meta.url), html, 'utf8');
console.log('index.html atualizado: abra diretamente no navegador, sem servidor e sem internet.');
