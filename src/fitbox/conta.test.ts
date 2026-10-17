import { describe, expect, it } from 'vitest';
import { chaveSessao, criarConta, lerSessao, salvarSessao } from './conta';

function armazenamento() {
  const dados = new Map<string, string>();
  return {
    getItem: (chave: string) => dados.get(chave) ?? null,
    setItem: (chave: string, valor: string) => { dados.set(chave, valor); },
    removeItem: (chave: string) => { dados.delete(chave); },
  };
}

describe('Conta demonstrativa, sem autenticação real', () => {
  it('aceita senha livre não vazia, normaliza e persiste somente nome e email', () => {
    const local = armazenamento();
    const conta = criarConta(' Pessoa Teste ', 'TESTE@example.com ', 'x');
    expect(conta).toEqual({ nome: 'Pessoa Teste', email: 'teste@example.com' });
    salvarSessao(local, conta);
    expect(JSON.parse(local.getItem(chaveSessao)!)).toEqual(conta);
    expect(lerSessao(local)).toEqual(conta);
    salvarSessao(local, null);
    expect(lerSessao(local)).toBeNull();
  });

  it.each([['', 'teste@example.com', 'x'], ['Teste', 'invalido', 'x'], ['Teste', 'teste@example.com', '']])(
    'rejeita campos inválidos: %s %s', (nome, email, senha) => {
      expect(() => criarConta(nome, email, senha)).toThrow();
    },
  );

  it.each(['{', 'null', '{}', '{"nome":3,"email":"teste@example.com"}', '{"nome":"Teste","email":"invalido"}'])(
    'rejeita sessão corrompida: %s', (valor) => {
      const local = armazenamento();
      local.setItem(chaveSessao, valor);
      expect(() => lerSessao(local)).toThrow();
      expect(local.getItem(chaveSessao)).toBe(valor);
    },
  );

  it('propaga falhas de leitura, escrita e logout', () => {
    const local = {
      getItem: (): string | null => { throw new Error('Leitura bloqueada'); },
      setItem: () => { throw new Error('Escrita bloqueada'); },
      removeItem: () => { throw new Error('Remoção bloqueada'); },
    };
    expect(() => lerSessao(local)).toThrow('Leitura bloqueada');
    expect(() => salvarSessao(local, criarConta('Teste', 'teste@example.com', 'x'))).toThrow('Escrita bloqueada');
    expect(() => salvarSessao(local, null)).toThrow('Remoção bloqueada');
  });
});
