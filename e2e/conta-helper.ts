import type { Locator } from '@playwright/test';

export async function cadastrar(sacola: Locator) {
  await sacola.getByLabel('Nome demonstrativo', { exact: true }).fill('Pessoa Teste');
  await sacola.getByLabel('Email demonstrativo', { exact: true }).fill('teste@example.com');
  await sacola.getByLabel('Senha fictícia', { exact: true }).fill('senha-ficticia');
  await sacola.getByRole('button', { name: 'Criar conta demonstrativa', exact: true }).click();
}
