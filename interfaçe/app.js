// Camada de apresentação criada pelo Codex.
const $ = id => document.getElementById(id);
function calcularLocal(payload) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([window.codigoCalculo], { type: 'text/javascript' }));
    let worker;
    let timer;
    const finish = (error, data) => {
      clearTimeout(timer);
      worker?.terminate();
      URL.revokeObjectURL(url);
      if (error) reject(error); else resolve(data);
    };
    try {
      worker = new Worker(url);
      timer = setTimeout(() => finish(Error('Cálculo interrompido após 5 segundos. O método pode não convergir para estes parâmetros.')), 5000);
      worker.onmessage = event => finish(null, event.data);
      worker.onerror = () => finish(Error('Não foi possível executar o cálculo no navegador. Tente abrir no Chrome, Edge ou Firefox atualizado.'));
      worker.postMessage(payload);
    } catch (error) { finish(error); }
  });
}
const descriptions = {
  bissecao: 'Divide sucessivamente um intervalo que apresenta troca de sinal.',
  falsa: 'Utiliza a reta entre os extremos de um intervalo com troca de sinal.',
  newton: 'Utiliza a derivada da função a partir de uma estimativa inicial.',
  secantes: 'Utiliza duas estimativas iniciais para aproximar a raiz.'
};
function updateMethod() {
  const method = $('metodo').value;
  $('descricao').textContent = descriptions[method];
  $('campo-b').hidden = method === 'newton';
  $('b').required = method !== 'newton';
  $('label-a').textContent = method === 'newton' ? 'Estimativa inicial x₀' : method === 'secantes' ? 'Estimativa x₀' : 'Limite a';
  $('label-b').textContent = method === 'secantes' ? 'Estimativa x₁' : 'Limite b';
}
$('metodo').addEventListener('change', updateMethod);
updateMethod();
document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => {
  $('expressao').value = button.dataset.example;
  $('a').value = $('metodo').value === 'newton' ? '1' : '0';
  $('b').value = '2';
}));
$('metodo').addEventListener('change', () => { if ($('metodo').value === 'newton' && Number($('a').value) === 0) $('a').value = '1'; });
$('form').addEventListener('submit', async event => {
  event.preventDefault();
  const payload = { metodo: $('metodo').value, expressao: $('expressao').value.trim(), a: Number($('a').value), b: Number($('b').value), erro: Number($('erro').value) };
  const methodName = $('metodo').selectedOptions[0].textContent;
  $('calcular').disabled = true;
  $('calcular').textContent = 'Calculando…';
  $('saida').setAttribute('aria-busy', 'true');
  $('vazio').hidden = true;
  $('resultado').hidden = false;
  $('mensagem').className = 'status';
  $('mensagem').textContent = 'Executando o método…';
  $('metricas').replaceChildren();
  $('original').textContent = '';
  $('metodo-resultado').textContent = methodName;
  $('parametros').textContent = `f(x) = ${payload.expressao} · a = ${payload.a}${payload.metodo === 'newton' ? '' : ` · b = ${payload.b}`} · tolerância = ${payload.erro}`;
  try {
    const data = await calcularLocal(payload);
    if (data.erro) throw Error(data.erro);
    const result = data.resultado;
    $('mensagem').textContent = result.mensagem;
    $('original').textContent = JSON.stringify(result, null, 2);
    for (const [key, label] of [['raiz', 'Raiz retornada'], ['intervalo', 'Intervalo retornado'], ['resultado', 'f(x) retornado'], ['iteracoes', 'Iterações']]) {
      if (!(key in result)) continue;
      const card = document.createElement('div'); card.className = 'metrica';
      const title = document.createElement('span'); title.textContent = label;
      const value = document.createElement('strong'); value.textContent = result[key] === null ? '—' : Array.isArray(result[key]) ? `[${result[key].join('; ')}]` : String(result[key]);
      card.append(title, value); $('metricas').append(card);
    }
  } catch (error) {
    $('mensagem').className = 'status erro';
    $('mensagem').textContent = error.message;
  } finally {
    $('calcular').disabled = false;
    $('calcular').textContent = 'Calcular raiz →';
    $('saida').setAttribute('aria-busy', 'false');
  }
});
