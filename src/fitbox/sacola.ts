import { pratos } from './catalogo';

export interface ItemSacola {
  pratoId: string;
  quantidade: number;
}

export const chaveSacola = 'fitbox:sacola:v1';
type Armazenamento = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function obterPrato(id: string) {
  const prato = pratos.find((item) => item.id === id);
  if (!prato) throw new Error('Prato não encontrado no catálogo.');
  return prato;
}

export function calcularTotal(itens: readonly ItemSacola[]) {
  const total = itens.reduce((soma, item) => soma + obterPrato(item.pratoId).precoCentavos * item.quantidade, 0);
  if (!Number.isSafeInteger(total) || total < 0) throw new Error('Quantidade excede o limite de cálculo seguro.');
  return total;
}

export function alterarQuantidade(itens: readonly ItemSacola[], pratoId: string, quantidade: number): ItemSacola[] {
  obterPrato(pratoId);
  if (!Number.isSafeInteger(quantidade) || quantidade < 0) throw new Error('Quantidade deve ser um inteiro não negativo.');
  const existente = itens.some((item) => item.pratoId === pratoId);
  const novos = quantidade === 0
    ? itens.filter((item) => item.pratoId !== pratoId)
    : existente
      ? itens.map((item) => item.pratoId === pratoId ? { pratoId, quantidade } : item)
      : [...itens, { pratoId, quantidade }];
  calcularTotal(novos);
  return novos;
}

function itemValido(valor: unknown): valor is ItemSacola {
  return typeof valor === 'object' && valor !== null
    && 'pratoId' in valor && typeof valor.pratoId === 'string'
    && pratos.some((prato) => prato.id === valor.pratoId)
    && 'quantidade' in valor && typeof valor.quantidade === 'number'
    && Number.isSafeInteger(valor.quantidade) && valor.quantidade > 0;
}

export function lerSacola(local: Armazenamento): ItemSacola[] {
  const texto = local.getItem(chaveSacola);
  if (texto === null) return [];
  const dados: unknown = JSON.parse(texto);
  if (!Array.isArray(dados) || !dados.every(itemValido)) throw new Error('Dados locais da sacola inválidos.');
  if (new Set(dados.map((item) => item.pratoId)).size !== dados.length) throw new Error('Itens duplicados na sacola local.');
  calcularTotal(dados);
  return dados.map(({ pratoId, quantidade }) => ({ pratoId, quantidade }));
}

export function salvarSacola(local: Armazenamento, itens: readonly ItemSacola[]) {
  if (itens.length === 0) {
    local.removeItem(chaveSacola);
  } else {
    local.setItem(chaveSacola, JSON.stringify(itens.map(({ pratoId, quantidade }) => ({ pratoId, quantidade }))));
  }
}
