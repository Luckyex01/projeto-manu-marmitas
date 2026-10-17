import { expect, test } from '@playwright/test';

test('busca local combina termos, categorias e preserva a sacola', async ({ page }, testInfo) => {
  await page.goto('/');
  const abrirBusca = page.getByRole('button', { name: 'Abrir ou fechar busca' });
  await expect(page.getByRole('searchbox')).not.toBeVisible();
  await abrirBusca.click();
  const busca = page.getByRole('searchbox');
  await expect(busca).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(busca).not.toBeVisible();
  await expect(abrirBusca).toBeFocused();
  await abrirBusca.click();
  const enviar = page.getByRole('button', { name: 'Buscar', exact: true });
  await busca.fill(' FEIJAO   FRANGO ');
  await enviar.click();
  await expect(page.locator('article.card')).toHaveCount(1);
  await expect(page.locator('article.card h3')).toHaveText('Frango grelhado, arroz e feijão');
  await abrirBusca.click();
  await expect(page.locator('article.card')).toHaveCount(1);
  await abrirBusca.click();
  await page.getByRole('button', { name: 'Adicionar à sacola: Frango grelhado, arroz e feijão', exact: true }).click();
  await page.getByRole('button', { name: 'Peixe', exact: true }).click();
  await expect(page.getByText('Nenhum prato encontrado.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Limpar busca' }).click();
  await expect(page.locator('article.card')).toHaveCount(2);
  await busca.fill('cenoura');
  await enviar.click();
  await expect(page.locator('article.card')).toHaveCount(2);
  await busca.fill('zzzinexistente');
  await enviar.click();
  await expect(page.locator('article.card')).toHaveCount(0);
  await page.getByRole('button', { name: 'Limpar busca' }).click();
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await expect(page.locator('article.card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Sacola demonstrativa' })).toContainText('27,90');
  await page.getByRole('dialog').getByRole('button', { name: 'Fechar', exact: true }).click();
  await page.screenshot({ path: testInfo.outputPath('busca-e-cabecalho.png') });
});

test('menu responsivo aceita teclado e fecha ao navegar', async ({ page }, testInfo) => {
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  const nav = page.getByRole('navigation', { name: 'Principal' });
  if ((page.viewportSize()?.width ?? 0) < 900) {
    await expect(nav).not.toBeVisible();
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await nav.getByRole('link', { name: 'Cardápio', exact: true }).focus();
    await page.keyboard.press('Escape');
    await expect(nav).not.toBeVisible();
    await expect(menu).toBeFocused();
    await menu.click();
    await page.screenshot({ path: testInfo.outputPath('menu-mobile-aberto.png') });
    await nav.getByRole('link', { name: 'Como funciona' }).click();
    await expect(nav).not.toBeVisible();
    await expect(page).toHaveURL(/#como-comprar$/);
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(nav).toBeVisible();
  } else {
    await expect(menu).not.toBeVisible();
    await expect(nav).toBeVisible();
  }
});
