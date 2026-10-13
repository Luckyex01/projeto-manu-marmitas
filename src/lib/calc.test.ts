import { describe, it, expect } from 'vitest';
import { calcularCalorias } from './calc';

describe('Calculo Nutricional (Metodo 4/4/9)', () => {
  it('deve calcular calorias com base no fator de Atwater', () => {
    // 32g P * 4 = 128, 47g C * 4 = 188, 4g G * 9 = 36 -> Total: 352 kcal
    const resultado = calcularCalorias({ proteina: 32, carboidrato: 47, gordura: 4 });
    expect(resultado).toBe(352);
  });

  it('deve calcular a combinacao exata que resulta em 423 kcal', () => {
    // 49.75g P * 4 = 199, 47g C * 4 = 188, 4g G * 9 = 36 -> Total: 423 kcal
    const resultado = calcularCalorias({ proteina: 49.75, carboidrato: 47, gordura: 4 });
    expect(resultado).toBe(423);
  });
});
