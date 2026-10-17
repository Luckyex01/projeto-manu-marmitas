import { expect, test } from '@playwright/test';

test('filtra, consulta exemplo auditado, adiciona pelo modal e devolve foco', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Peixe', exact: true }).click();
  await expect(page.locator('article.card')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Peixe', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  for (const macros of await page.locator('.macros').all()) {
    await expect(macros.locator('strong').nth(0)).toHaveCSS('color', 'rgb(104, 195, 26)');
    await expect(macros.locator('strong').nth(1)).toHaveCSS('color', 'rgb(252, 116, 3)');
  }
  const acionador = page.getByRole('button', { name: 'Ver tabela de Frango grelhado, arroz e feijão' });
  await acionador.click();
  const dialogo = page.getByRole('dialog', { name: 'Frango grelhado, arroz e feijão', exact: true });
  await expect(dialogo).toBeVisible();
  await expect(dialogo.getByRole('cell', { name: '423 kcal', exact: true })).toBeVisible();
  await expect(dialogo.getByRole('cell', { name: '68 mg', exact: true })).toBeVisible();
  await expect(dialogo.getByText(/a validar pela nutricionista/).first()).toBeVisible();
  await expect(dialogo.getByRole('heading', { level: 2 })).toBeFocused();
  expect(await dialogo.locator('.modal__adicionar').evaluate((botao) => {
    const aviso = botao.previousElementSibling;
    if (!aviso) throw new Error('Aviso anterior ao botão não encontrado.');
    return botao.getBoundingClientRect().top - aviso.getBoundingClientRect().bottom;
  })).toBeGreaterThanOrEqual(12);
  await dialogo.locator('.modal__adicionar').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('modal-nutricional.png') });
  await dialogo.getByRole('button', { name: 'Adicionar à sacola', exact: true }).click();
  const notificacao = page.locator('.status-message');
  await expect(notificacao).toHaveText('Sacola demonstrativa atualizada.');
  await expect(notificacao).toHaveJSProperty('popover', 'manual');
  expect(await notificacao.evaluate((elemento) => {
    elemento.style.pointerEvents = 'auto';
    const area = elemento.getBoundingClientRect();
    const acima = elemento.contains(document.elementFromPoint(area.left + area.width / 2, area.top + area.height / 2));
    elemento.style.removeProperty('pointer-events');
    return elemento.matches(':popover-open') && acima;
  })).toBe(true);
  await expect(dialogo).toBeVisible();
  await expect(dialogo.getByRole('button', { name: 'Adicionar à sacola', exact: true })).toBeFocused();
  await dialogo.getByRole('button', { name: 'Adicionar à sacola', exact: true }).click();
  await expect(notificacao).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('notificacao-acima-do-modal.png') });
  await expect(page.getByRole('button', { name: 'Abrir sacola, 2 unidades' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialogo).not.toBeVisible();
  await expect(acionador).toBeFocused();
  await acionador.click();
  await dialogo.getByRole('button', { name: 'Fechar', exact: true }).click();
  await expect(acionador).toBeFocused();
});

test('modal contém foco e fecha ao tocar fora', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Ver tabela de Frango grelhado, arroz e feijão' }).click();
  const dialogo = page.getByRole('dialog');
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    expect(await dialogo.evaluate((elemento) => elemento.contains(document.activeElement))).toBe(true);
  }
  await page.mouse.click(2, 2);
  await expect(dialogo).not.toBeVisible();
});

test('notificação conta 5 segundos, reinicia em adições repetidas e sai suavemente', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Ver tabela de Frango grelhado, arroz e feijão' }).click();
  const dialogo = page.getByRole('dialog', { name: 'Frango grelhado, arroz e feijão', exact: true });
  const adicionar = dialogo.getByRole('button', { name: 'Adicionar à sacola', exact: true });
  await adicionar.click();
  const notificacao = page.locator('.status-message');
  const barra = notificacao.locator('.status-message__tempo');
  await expect(barra).toHaveCSS('background-color', 'rgb(104, 195, 26)');
  const larguraInicial = await barra.evaluate((elemento) => elemento.getBoundingClientRect().width);
  await page.screenshot({ path: testInfo.outputPath('notificacao-inicio.png') });
  await expect.poll(() => barra.evaluate((elemento) => elemento.getBoundingClientRect().width)).toBeLessThan(larguraInicial * .8);
  await page.waitForTimeout(2100);
  const larguraAntesDeReiniciar = await barra.evaluate((elemento) => elemento.getBoundingClientRect().width);
  await adicionar.click();
  expect(await barra.evaluate((elemento) => elemento.getBoundingClientRect().width)).toBeGreaterThan(larguraAntesDeReiniciar);
  await page.waitForTimeout(3000);
  await expect(notificacao).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('notificacao-barra-parcial.png') });
  await expect(notificacao).toHaveClass(/status-message--saindo/, { timeout: 3000 });
  await expect(notificacao).not.toBeVisible();
  await expect(dialogo).toBeVisible();
  await expect(adicionar).toBeFocused();
  await page.screenshot({ path: testInfo.outputPath('notificacao-encerrada.png') });
});
