import { expect, test } from '@playwright/test';

test('Home, tutorial sem cobrança e CTA em layout responsivo', async ({ page }, testInfo) => {
  const viewport = page.viewportSize();
  const erros: string[] = [];
  page.on('pageerror', (erro) => erros.push(erro.message));
  await page.goto('/');
  const barra = page.locator('.marquee');
  await expect(barra).toContainText('Treinou? Bora escolher');
  await expect(barra).toContainText('Macros na palma da mão');
  await expect(barra).not.toContainText(/Vitrine acadêmica|Confirmação sem cobrança|a validar pela nutricionista/);
  await expect(page.locator('.marquee__item')).toHaveCount(10);
  await page.getByRole('button', { name: 'Pausar barra', exact: true }).click();
  await expect(page.locator('.marquee__track')).toHaveCSS('animation-play-state', 'paused');
  await barra.screenshot({ path: testInfo.outputPath('barra-chamadas.png') });
  await page.getByRole('button', { name: 'Retomar barra', exact: true }).click();
  await expect(page.locator('.marquee__track')).toHaveCSS('animation-play-state', 'running');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Treinou?');
  await expect(page.getByRole('heading', { name: 'Confirme a demonstração' })).toBeVisible();
  await expect(page.locator('video')).toHaveJSProperty('muted', true);
  await expect(page.locator('video')).toHaveAttribute('playsinline', '');
  await expect(page.locator('video')).toHaveAttribute('poster', /poster/);
  await expect(page.locator('figure .btn--ghost')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await page.getByRole('link', { name: 'Ver pratos no freezer', exact: true }).click();
  await expect(page).toHaveURL(/#cardapio$/);
  await expect(page.getByRole('heading', { name: 'Cardápio do freezer' })).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto('/');
  await page.locator('video').evaluate((video: HTMLVideoElement) => video.pause());
  for (const largura of [320, 390, 697, 768, 900, 1024, 1440, 1920]) {
    await page.setViewportSize({ width: largura, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const linhas = page.locator('.hero__linha');
    await expect(linhas).toHaveCount(3);
    await expect(linhas).toHaveText(['Treinou?', 'Sua refeição', 'já está aqui.']);
    const medidas = await linhas.evaluateAll((elementos) => elementos.map((elemento) => {
      const caixa = elemento.getBoundingClientRect();
      return { topo: caixa.top, fundo: caixa.bottom, cabe: elemento.scrollWidth <= elemento.clientWidth };
    }));
    expect(medidas.every((medida) => medida.cabe)).toBe(true);
    expect(medidas[1].topo).toBeGreaterThanOrEqual(medidas[0].fundo - 1);
    expect(medidas[2].topo).toBeGreaterThanOrEqual(medidas[1].fundo - 1);
    const alinhamento = await page.locator('.hero__figure').evaluate((figura) => {
      const midia = figura.querySelector('.hero__media')!.getBoundingClientRect();
      const legenda = figura.querySelector('figcaption')!.getBoundingClientRect();
      const botao = figura.querySelector('button')!.getBoundingClientRect();
      return { legenda: Math.abs(legenda.left - midia.left), botao: Math.abs(botao.left - midia.left), largura: Math.abs(legenda.width - midia.width) };
    });
    expect(alinhamento.legenda).toBeLessThanOrEqual(1);
    expect(alinhamento.botao).toBeLessThanOrEqual(1);
    expect(alinhamento.largura).toBeLessThanOrEqual(1);
    const proporcoesFotos = await page.locator('.trust__photos img').evaluateAll((imagens) =>
      imagens.map((imagem) => {
        const caixa = imagem.getBoundingClientRect();
        return caixa.width / caixa.height;
      }),
    );
    expect(proporcoesFotos).toHaveLength(2);
    for (const proporcao of proporcoesFotos) expect(proporcao).toBeCloseTo(3 / 4, 2);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const hero = await page.locator('.hero').boundingBox();
    if (!hero) throw new Error('Hero não encontrado para captura visual.');
    await page.screenshot({ path: testInfo.outputPath(`hero-${largura}.png`), clip: hero, fullPage: true });
  }
  for (const marca of await page.locator('.marca').all()) {
    await expect(marca.locator('.marca__fit')).toHaveText('FIT');
    await expect(marca.locator('.marca__fit')).toHaveCSS('color', 'rgb(245, 245, 245)');
    await expect(marca.locator('.marca__box')).toHaveText('BOX');
    await expect(marca.locator('.marca__box')).toHaveCSS('color', 'rgb(252, 116, 3)');
  }
  if (viewport) await page.setViewportSize(viewport);
  await expect.poll(() => page.locator('article.card img').first().evaluate((imagem: HTMLImageElement) => imagem.naturalWidth)).toBeGreaterThan(0);
  for (const imagem of await page.locator('article.card img').all()) {
    await expect(imagem).toHaveAttribute('srcset', /360w, .*webp .*w$/);
    await expect(imagem).toHaveAttribute('sizes', /30vw/);
    await expect(imagem).toHaveAttribute('loading', 'lazy');
  }
  await page.goto('/');
  await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true });
  expect(erros).toEqual([]);
});

test('movimento reduzido e falha do vídeo preservam a imagem e a navegação', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/*hero*.mp4', (rota) => rota.abort());
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Animação reduzida' })).toBeDisabled();
  expect(await page.locator('video').evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
  await page.getByRole('button', { name: 'Reproduzir vídeo' }).click();
  await expect(page.getByText(/Vídeo indisponível|Não foi possível reproduzir o vídeo/)).toBeVisible();
  await page.getByRole('link', { name: 'Ver pratos no freezer', exact: true }).click();
  await expect(page.locator('article.card')).toHaveCount(6);
});
