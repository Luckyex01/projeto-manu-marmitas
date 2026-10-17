import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { cadastrar } from './conta-helper';

for (const largura of [320, 390, 768, 1440]) {
  test(`WCAG automatizada na jornada demonstrativa a ${largura}px`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: largura, height: 900 });
    await page.goto('/');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const auditar = async (estado: string) => {
      await page.evaluate(() => document.fonts.ready);
      const resultado = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      await testInfo.attach(`${estado}-${largura}-axe`, {
        body: JSON.stringify({ violations: resultado.violations, incomplete: resultado.incomplete }, null, 2),
        contentType: 'application/json',
      });
      expect(resultado.violations, `Violações no estado ${estado}`).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    };
    await auditar('home');
    await page.getByRole('button', { name: 'Ver tabela de Frango grelhado, arroz e feijão', exact: true }).click();
    await auditar('detalhe');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Adicionar à sacola: Frango grelhado, arroz e feijão', exact: true }).click();
    await page.getByRole('button', { name: 'Abrir sacola, 1 unidades' }).click();
    const sacola = page.getByRole('dialog', { name: 'Sacola demonstrativa' });
    await auditar('conta');
    await cadastrar(sacola);
    await auditar('revisao');
    await sacola.getByRole('button', { name: 'Confirmar pedido demonstrativo' }).click();
    await expect(sacola.locator('.confirmation')).toBeVisible();
    await auditar('confirmacao');
    await page.keyboard.press('Escape');
    await page.reload();
    await expect(page.getByRole('button', { name: 'Abrir sacola, 0 unidades' })).toBeVisible();
  });
}
