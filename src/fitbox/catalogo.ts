import { calcularCalorias } from '../lib/calc';
import type { Macros } from '../lib/calc';
import foto2 from './assets/foto2.webp';
import foto3 from './assets/foto3.webp';
import foto6 from './assets/foto6.webp';
import foto7 from './assets/foto7.webp';
import foto8 from './assets/foto8.webp';
import foto9 from './assets/foto9.webp';
import foto2Menor from './assets/foto2-360.webp';
import foto3Menor from './assets/foto3-360.webp';
import foto6Menor from './assets/foto6-360.webp';
import foto7Menor from './assets/foto7-360.webp';
import foto8Menor from './assets/foto8-360.webp';
import foto9Menor from './assets/foto9-360.webp';

export interface Nutrientes extends Macros {
  fibra: number;
  sodio: number;
}

export interface Prato {
  id: string;
  nome: string;
  foto: string;
  fotoMenor: string;
  fotoSrcSet: string;
  peso: number;
  kcal: number;
  nutrientes: Nutrientes;
  precoCentavos: number;
  categoria: 'frango' | 'peixe' | 'carne' | 'vegetais';
  ingredientes: string;
  auditado: boolean;
}

// TACO v.4: 410 (grelhado), 3 (arroz cozido), 561 (feijão cozido).
export const exemploFrango: Nutrientes = {
  proteina: 1.3 * 32 + 1.2 * 2.5 + 4.8,
  carboidrato: 1.2 * 28.1 + 13.6,
  gordura: 1.3 * 2.5 + 1.2 * 0.2 + 0.5,
  fibra: 1.2 * 1.6 + 8.5,
  sodio: 1.3 * 50 + 1.2 * 1 + 2,
};

// Os demais pratos preservam os dados históricos, ainda não auditados.
export const pratos: readonly Prato[] = [
  { id: 'frango-arroz-feijao', nome: 'Frango grelhado, arroz e feijão', foto: foto6,
    fotoMenor: foto6Menor, fotoSrcSet: `${foto6Menor} 360w, ${foto6} 600w`, peso: 350,
    kcal: Math.round(calcularCalorias(exemploFrango)), nutrientes: exemploFrango, precoCentavos: 2790,
    categoria: 'frango', auditado: true,
    ingredientes: 'Composição modelada: frango grelhado (130 g), arroz branco cozido (120 g) e feijão carioca cozido (100 g). Cebolinha, óleo e sal não quantificados.' },
  { id: 'frango-pure', nome: 'Frango grelhado com purê de batata', foto: foto7,
    fotoMenor: foto7Menor, fotoSrcSet: `${foto7Menor} 360w, ${foto7} 645w`, peso: 380, kcal: 316,
    nutrientes: { proteina: 45, carboidrato: 26, gordura: 3, fibra: 4, sodio: 71 }, precoCentavos: 2790,
    categoria: 'frango', auditado: false,
    ingredientes: 'Composição proposta: frango grelhado (130 g), purê de batata (200 g) e brócolis (50 g). Receita e preparo pendentes de confirmação.' },
  { id: 'peixe', nome: 'Peixe branco com arroz integral e legumes', foto: foto9,
    fotoMenor: foto9Menor, fotoSrcSet: `${foto9Menor} 360w, ${foto9} 600w`, peso: 360, kcal: 330,
    nutrientes: { proteina: 39, carboidrato: 37, gordura: 3, fibra: 7, sodio: 163 }, precoCentavos: 2990,
    categoria: 'peixe', auditado: false,
    ingredientes: 'Composição proposta: peixe branco (130 g), arroz integral (120 g), brócolis (60 g) e cenoura (50 g). Espécie e preparo pendentes de confirmação.' },
  { id: 'carne-pure', nome: 'Carne moída com purê e arroz', foto: foto8,
    fotoMenor: foto8Menor, fotoSrcSet: `${foto8Menor} 360w, ${foto8} 600w`, peso: 330, kcal: 418,
    nutrientes: { proteina: 43, carboidrato: 42, gordura: 8, fibra: 3, sodio: 70 }, precoCentavos: 2890,
    categoria: 'carne', auditado: false,
    ingredientes: 'Composição proposta: carne moída (110 g), purê de batata (120 g) e arroz branco (100 g). Corte, temperos e preparo pendentes de confirmação.' },
  { id: 'lowcarb', nome: 'Peixe com legumes', foto: foto2,
    fotoMenor: foto2Menor, fotoSrcSet: `${foto2Menor} 360w, ${foto2} 600w`, peso: 390, kcal: 236,
    nutrientes: { proteina: 43, carboidrato: 11, gordura: 2, fibra: 6, sodio: 187 }, precoCentavos: 2990,
    categoria: 'peixe', auditado: false,
    ingredientes: 'Composição proposta: peixe branco (150 g), brócolis (100 g), abobrinha (80 g) e cenoura (60 g). Receita e preparo pendentes de confirmação.' },
  { id: 'falafel', nome: 'Falafel com arroz integral e legumes', foto: foto3,
    fotoMenor: foto3Menor, fotoSrcSet: `${foto3Menor} 360w, ${foto3} 900w`, peso: 425, kcal: 417,
    nutrientes: { proteina: 19, carboidrato: 73, gordura: 5, fibra: 15, sodio: 10 }, precoCentavos: 2690,
    categoria: 'vegetais', auditado: false,
    ingredientes: 'Composição proposta: falafel, arroz integral, abobrinha, cenoura e brócolis. Rendimento, massa pronta e ingredientes do falafel pendentes de confirmação.' },
];

export const formatarPreco = (centavos: number) =>
  (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const avisoNutricional = 'Estimativa TACO 4ª ed., a validar pela nutricionista.';
