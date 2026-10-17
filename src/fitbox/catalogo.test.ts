import { describe, expect, it } from 'vitest';
import { exemploFrango, pratos } from './catalogo';
import { calcularCalorias } from '../lib/calc';

describe('Exemplo frango, arroz e feijão: TACO v.4', () => {
  it('pondera as entradas 410, 3 e 561 pelas massas modeladas', () => {
    expect(exemploFrango.proteina).toBeCloseTo(49.4);
    expect(exemploFrango.carboidrato).toBeCloseTo(47.32);
    expect(exemploFrango.gordura).toBeCloseTo(3.99);
    expect(exemploFrango.fibra).toBeCloseTo(10.42);
    expect(exemploFrango.sodio).toBeCloseTo(68.2);
  });

  it('calcula energia antes do arredondamento e integra o exemplo no catálogo', () => {
    expect(calcularCalorias(exemploFrango)).toBeCloseTo(422.79);
    const prato = pratos.find((item) => item.id === 'frango-arroz-feijao');
    expect(prato?.kcal).toBe(423);
    expect(prato?.nutrientes).toEqual(exemploFrango);
    expect(Math.round(exemploFrango.sodio)).toBe(68);
    expect(calcularCalorias({ proteina: 49, carboidrato: 47, gordura: 4 })).toBe(420);
  });

  it('mantém identificadores únicos e preços em centavos inteiros', () => {
    expect(new Set(pratos.map((prato) => prato.id)).size).toBe(pratos.length);
    expect(pratos.every((prato) => Number.isSafeInteger(prato.precoCentavos) && prato.precoCentavos > 0)).toBe(true);
  });
});
