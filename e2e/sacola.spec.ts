import { expect, test } from '@playwright/test';
import { cadastrar } from './conta-helper';

const adicionarFrango = 'Adicionar à sacola: Frango grelhado, arroz e feijão';

test('persiste, ajusta, remove e confirma demonstração sem transação', async ({ page }, testInfo) => {
  const transacoes: string[] = [];
  page.on('request', (pedido) => {
    if (pedido.method() !== 'GET') transacoes.push(`${pedido.method()} ${pedido.url()}`);
  });
  await page.goto('/');
  await page.getByRole('button', { name: adicionarFrango, exact: true }).click();
  await page.getByRole('button', { name: adicionarFrango, exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Abrir sacola, 2 unidades' }).click();
  const sacola = page.getByRole('dialog', { name: 'Sacola demonstrativa' });
  await expect(sacola.getByText('Total demonstrativo:')).toContainText('55,80');
  await page.screenshot({ path: testInfo.outputPath('sacola.png') });
  await sacola.getByRole('button', { name: 'Diminuir quantidade de Frango grelhado, arroz e feijão' }).click();
  await expect(sacola.getByText('Total demonstrativo:')).toContainText('27,90');
  await sacola.getByRole('button', { name: 'Remover Frango grelhado, arroz e feijão' }).click();
  await expect(sacola.getByText('Sua sacola está vazia.')).toBeVisible();
  await expect(sacola.getByRole('heading')).toBeFocused();
  await expect(sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' })).toHaveCount(0);
  await sacola.getByRole('link', { name: 'Ver cardápio' }).click();
  await page.getByRole('button', { name: adicionarFrango, exact: true }).click();
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
  await expect(sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' })).toBeDisabled();
  await cadastrar(sacola);
  await sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' }).click();
  await expect(sacola.locator('.confirmation')).toContainText('Nenhum pagamento foi realizado');
  await expect(sacola.getByRole('heading')).toBeFocused();
  expect(await page.evaluate(() => localStorage.getItem('fitbox:sacola:v1'))).toBeNull();
  await sacola.getByRole('button', { name: 'Fechar', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Abrir sacola, 0 unidades' })).toBeVisible();
  expect(transacoes).toEqual([]);
});

test('dados inválidos notificam e uma nova seleção pode ser restaurada', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('fitbox:sacola:v1', '{"invalido":true}'));
  await page.reload();
  await expect(page.getByRole('alert')).toContainText('Não foi possível restaurar');
  await page.getByRole('button', { name: adicionarFrango, exact: true }).click();
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Abrir sacola, 1 unidades' })).toBeVisible();
});

test('falhas de armazenamento ficam visíveis, inclusive ao confirmar', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException('Bloqueado', 'QuotaExceededError'); };
    Storage.prototype.removeItem = () => { throw new DOMException('Bloqueado', 'SecurityError'); };
  });
  await page.goto('/');
  await page.getByRole('button', { name: adicionarFrango, exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Não foi possível salvar');
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
  const sacola = page.getByRole('dialog', { name: 'Sacola demonstrativa' });
  await cadastrar(sacola);
  await sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' }).click();
  await expect(sacola.getByRole('alert').filter({ hasText: 'A sacola foi esvaziada' })).toContainText('não foi possível limpar os dados locais');
  await expect(sacola.locator('.confirmation')).toContainText('Nenhum pagamento foi realizado');
});
