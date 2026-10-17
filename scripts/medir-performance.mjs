import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://127.0.0.1:4173/';
if (!['127.0.0.1', 'localhost'].includes(new URL(url).hostname)) {
  throw new Error('Esta medição aceita apenas preview local, sem enviar dados a serviços externos.');
}
const browser = await chromium.launch();
const resultados = [];
try {
  for (const largura of [390, 1440]) {
    for (let rodada = 1; rodada <= 3; rodada++) {
      const context = await browser.newContext({ viewport: { width: largura, height: 900 }, deviceScaleFactor: 1 });
      try {
        const page = await context.newPage();
        const erros = [];
        page.on('pageerror', erro => erros.push(erro.message));
        const cdp = await context.newCDPSession(page);
        await cdp.send('Network.enable');
        await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
        await cdp.send('Network.emulateNetworkConditions', {
          offline: false, latency: 150, downloadThroughput: 200_000, uploadThroughput: 93_750,
        });
        await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
        await page.addInitScript(() => {
          window.__fitboxMedicao = { lcp: null, elemento: null, shifts: [] };
          new PerformanceObserver(lista => {
            const entrada = lista.getEntries().at(-1);
            window.__fitboxMedicao.lcp = entrada.startTime;
            window.__fitboxMedicao.elemento = entrada.element?.tagName ?? null;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver(lista => {
            for (const entrada of lista.getEntries()) {
              if (!entrada.hadRecentInput) {
                window.__fitboxMedicao.shifts.push({ tempo: entrada.startTime, valor: entrada.value });
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });
        });
        const resposta = await page.goto(url, { waitUntil: 'load' });
        if (!resposta?.ok()) throw new Error(`Preview indisponível: HTTP ${resposta?.status()}`);
        // Janela fixa de observação de laboratório, não sincronização de teste funcional.
        await page.waitForTimeout(5000);
        const medicao = await page.evaluate(() => {
          const dados = window.__fitboxMedicao;
          let cls = 0, janela = 0, inicio = 0, anterior = 0;
          for (const shift of dados.shifts) {
            if (shift.tempo - anterior > 1000 || shift.tempo - inicio > 5000) {
              janela = 0;
              inicio = shift.tempo;
            }
            janela += shift.valor;
            anterior = shift.tempo;
            cls = Math.max(cls, janela);
          }
          const recursos = performance.getEntriesByType('resource');
          return { lcpMs: dados.lcp, elementoLcp: dados.elemento, cls,
            bytesTransferidos: recursos.reduce((total, recurso) => total + recurso.transferSize, 0),
            recursos: recursos.length };
        });
        if (erros.length) throw new Error(`Erros na página: ${erros.join('; ')}`);
        if (medicao.lcpMs === null) throw new Error('Nenhuma amostra LCP disponível.');
        resultados.push({ largura, rodada, ...medicao });
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
const relatorio = { data: new Date().toISOString(), url, ambiente: {
  navegador: 'Chromium Playwright', cache: 'desabilitado, contexto novo por rodada',
  cpu: '4x', latenciaMs: 150, downloadBytesSegundo: 200_000,
  observacao: '5 segundos após load, sem scroll/interação; não mede INP nem dados de campo',
}, resultados };
console.log(JSON.stringify(relatorio, null, 2));
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(relatorio, null, 2) + '\n');
