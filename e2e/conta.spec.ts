import { expect, test } from '@playwright/test';
import { cadastrar } from './conta-helper';

const adicionar = 'Adicionar à sacola: Frango grelhado, arroz e feijão';

test('cadastro, reload, logout, login e confirmação mantêm a sacola até concluir', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: adicionar, exact: true }).click();
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
  const sacola = page.getByRole('dialog', { name: 'Sacola demonstrativa' });
  const confirmar = sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' });
  await expect(confirmar).toBeDisabled();
  await sacola.getByLabel('Email demonstrativo', { exact: true }).fill('invalido');
  expect(await sacola.getByLabel('Email demonstrativo', { exact: true }).evaluate((campo: HTMLInputElement) => campo.validity.valid)).toBe(false);
  await cadastrar(sacola);
  await expect(confirmar).toBeEnabled();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fitbox:sessao:v1')!))).toEqual({ nome: 'Pessoa Teste', email: 'teste@example.com' });
  await page.reload();
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
  await expect(sacola.getByText('Sessão demonstrativa: Pessoa Teste')).toBeVisible();
  await sacola.getByRole('button', { name: 'Sair da conta demonstrativa' }).click();
  await expect(confirmar).toBeDisabled();
  expect(await page.evaluate(() => localStorage.getItem('fitbox:sessao:v1'))).toBeNull();
  await expect(sacola.getByText('Total demonstrativo:')).toContainText('27,90');
  await page.reload();
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
  await expect(confirmar).toBeDisabled();
  await expect(sacola.getByText('Total demonstrativo:')).toContainText('27,90');
  await sacola.getByRole('button', { name: 'Já tenho cadastro demonstrativo' }).click();
  await sacola.getByLabel('Nome demonstrativo', { exact: true }).fill('Pessoa Teste');
  await sacola.getByLabel('Email demonstrativo', { exact: true }).fill('teste@example.com');
  await sacola.getByLabel('Senha fictícia', { exact: true }).fill('outra-senha-livre');
  await sacola.getByRole('button', { name: 'Entrar na demonstração', exact: true }).click();
  await confirmar.scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('conta-e-confirmacao.png') });
  await confirmar.click();
  await expect(sacola.locator('.confirmation')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('fitbox:sacola:v1'))).toBeNull();
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: 'Abrir sacola, 0 unidades' }).click();
  await expect(sacola.getByText('Sua sacola está vazia.')).toBeVisible();
  await sacola.getByRole('link', { name: 'Ver cardápio' }).click();
  await page.getByRole('button', { name: adicionar, exact: true }).click();
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
  await cadastrar(sacola);
  await expect(confirmar).toBeEnabled();
});

test('armazenamento totalmente indisponível avisa e permite sessão apenas em memória', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new DOMException('Bloqueado', 'SecurityError'); } });
  });
  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText('Não foi possível restaurar a sacola');
  await page.getByRole('button', { name: adicionar, exact: true }).click();
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
  const sacola = page.getByRole('dialog', { name: 'Sacola demonstrativa' });
  await cadastrar(sacola);
  await expect(sacola.getByRole('alert').filter({ hasText: 'Não foi possível salvar a sessão' })).toBeVisible();
  await sacola.getByRole('button', { name: 'Sair da conta demonstrativa' }).click();
  await expect(sacola.getByRole('alert').filter({ hasText: 'Você saiu nesta sessão' })).toBeVisible();
  await expect(sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' })).toBeDisabled();
  await cadastrar(sacola);
  await sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' }).click();
  await expect(sacola.locator('.confirmation')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Abrir sacola, 0 unidades' })).toBeVisible();
});

test('sessão inválida avisa sem apagar dados nem autenticar', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('fitbox:sessao:v1', '{"nome":false}'));
  await page.reload();
  await page.getByRole('button', { name: adicionar, exact: true }).click();
  await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
  const sacola = page.getByRole('dialog', { name: 'Sacola demonstrativa' });
  await expect(sacola.getByRole('alert')).toContainText('Não foi possível restaurar a sessão');
  await expect(sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' })).toBeDisabled();
});

test('formulário a 320px mantém foco, ordem de teclado e retorno ao acionador', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: adicionar, exact: true }).click();
  const acionador = page.getByRole('button', { name: 'Abrir sacola, 1 unidades' });
  await acionador.click();
  const sacola = page.getByRole('dialog', { name: 'Sacola demonstrativa' });
  await sacola.getByLabel('Nome demonstrativo', { exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(sacola.getByLabel('Email demonstrativo', { exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(sacola.getByLabel('Senha fictícia', { exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(sacola.getByRole('button', { name: 'Criar conta demonstrativa', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  const alternar = sacola.getByRole('button', { name: 'Já tenho cadastro demonstrativo' });
  await expect(alternar).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(sacola.getByRole('button', { name: 'Fechar', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(alternar).toBeFocused();
  expect(await sacola.evaluate((elemento) => elemento.scrollWidth <= elemento.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(sacola).not.toBeVisible();
  await expect(acionador).toBeFocused();
});
