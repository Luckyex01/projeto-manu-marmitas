export interface Macros {
  proteina: number;
  carboidrato: number;
  gordura: number;
}

/**
 * Calcula o Valor Energetico Total (kcal) pelo metodo 4/4/9 de Atwater.
 */
export function calcularCalorias(macros: Macros): number {
  return (macros.proteina * 4) + (macros.carboidrato * 4) + (macros.gordura * 9);
}
