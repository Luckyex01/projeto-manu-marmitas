import { expect, test } from '@playwright/test';

test('FAQ acessível e detalhe com três seções, sem promessa de segurança alimentar', async ({ page }, testInfo) => {
  await page.goto('/');
  const perguntas = page.locator('#duvidas details');
  await expect(perguntas).toHaveCount(6);
  for (const pergunta of await perguntas.all()) {
    await pergunta.locator('summary').click();
    await expect(pergunta).toHaveAttribute('open', '');
    await expect(pergunta.locator('p')).toBeVisible();
  }
  await page.locator('#duvidas').screenshot({ path: testInfo.outputPath('faq.png') });
  await page.getByRole('button', { name: 'Ver tabela de Frango grelhado, arroz e feijão', exact: true }).click();
  const detalhe = page.getByRole('dialog', { name: 'Frango grelhado, arroz e feijão', exact: true });
  for (const titulo of ['Sobre o prato', 'Ingredientes', 'Informação nutricional']) {
    await expect(detalhe.getByRole('heading', { name: titulo, exact: true })).toBeVisible();
  }
  await expect(detalhe.getByText('Alergênicos e possibilidade de contaminação cruzada: não informados.')).toBeVisible();
  await detalhe.getByRole('button', { name: 'Adicionar à sacola', exact: true }).scrollIntoViewIfNeeded();
  await expect(detalhe.getByRole('button', { name: 'Adicionar à sacola', exact: true })).toBeVisible();
});
