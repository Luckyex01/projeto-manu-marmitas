import { describe, expect, it } from 'vitest';
import { alterarQuantidade, calcularTotal, chaveSacola, lerSacola, salvarSacola } from './sacola';

function armazenamento() {
  const dados = new Map<string, string>();
  return {
    getItem: (chave: string) => dados.get(chave) ?? null,
    setItem: (chave: string, valor: string) => { dados.set(chave, valor); },
    removeItem: (chave: string) => { dados.delete(chave); },
  };
}

describe('Sacola demonstrativa', () => {
  it('seleciona, aumenta, calcula em centavos e remove ao chegar a zero', () => {
    let itens = alterarQuantidade([], 'frango-arroz-feijao', 1);
    itens = alterarQuantidade(itens, 'frango-arroz-feijao', 2);
    itens = alterarQuantidade(itens, 'peixe', 1);
    expect(calcularTotal(itens)).toBe(8570);
    itens = alterarQuantidade(itens, 'frango-arroz-feijao', 0);
    expect(calcularTotal(itens)).toBe(2990);
    expect(itens).toHaveLength(1);
  });

  it('persiste apenas identificadores e quantidades, restaura e limpa', () => {
    const local = armazenamento();
    const itens = alterarQuantidade([], 'falafel', 2);
    salvarSacola(local, itens);
    expect(lerSacola(local)).toEqual(itens);
    expect(local.getItem(chaveSacola)).not.toContain('preco');
    salvarSacola(local, []);
    expect(local.getItem(chaveSacola)).toBeNull();
    expect(lerSacola(local)).toEqual([]);
  });

  it.each([
    'invalid-json',
    '{}',
    '[{"pratoId":"desconhecido","quantidade":1}]',
    '[{"pratoId":"peixe","quantidade":0}]',
    '[{"pratoId":"peixe","quantidade":1.5}]',
    '[{"pratoId":"peixe","quantidade":1},{"pratoId":"peixe","quantidade":1}]',
    '[{"pratoId":"peixe","quantidade":9007199254740991}]',
  ])('rejeita estado inválido sem sucesso silencioso: %s', (valor) => {
    const local = armazenamento();
    local.setItem(chaveSacola, valor);
    expect(() => lerSacola(local)).toThrow();
  });

  it.each([-1, 0.5, Infinity, NaN, Number.MAX_SAFE_INTEGER])('rejeita quantidade inválida ou total inseguro: %s', (quantidade) => {
    expect(() => alterarQuantidade([], 'peixe', quantidade)).toThrow();
  });

  it('propaga falhas de leitura, escrita e remoção para notificação na interface', () => {
    const local = {
      getItem: (): string | null => { throw new Error('Leitura bloqueada'); },
      setItem: () => { throw new Error('Sem espaço'); },
      removeItem: () => { throw new Error('Remoção bloqueada'); },
    };
    expect(() => lerSacola(local)).toThrow('Leitura bloqueada');
    expect(() => salvarSacola(local, [{ pratoId: 'peixe', quantidade: 1 }])).toThrow('Sem espaço');
    expect(() => salvarSacola(local, [])).toThrow('Remoção bloqueada');
  });
});
