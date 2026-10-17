import { describe, it, expect } from 'vitest';
import { calcularCalorias } from './calc';

describe('Calculo Nutricional (Metodo 4/4/9)', () => {
  it('deve calcular calorias com base no fator de Atwater', () => {
    // 32g P * 4 = 128, 47g C * 4 = 188, 4g G * 9 = 36 -> Total: 352 kcal
    const resultado = calcularCalorias({ proteina: 32, carboidrato: 47, gordura: 4 });
    expect(resultado).toBe(352);
  });

  it('calcula o exemplo TACO antes de arredondar para exibição', () => {
    const resultado = calcularCalorias({ proteina: 49.4, carboidrato: 47.32, gordura: 3.99 });
    expect(resultado).toBeCloseTo(422.79, 2);
    expect(Math.round(resultado)).toBe(423);
  });
});
