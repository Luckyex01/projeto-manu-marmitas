export interface ContaDemonstrativa {
  nome: string;
  email: string;
}

export const chaveSessao = 'fitbox:sessao:v1';
type Armazenamento = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function criarConta(nome: string, email: string, senha: string): ContaDemonstrativa {
  const limpo = nome.trim();
  const endereco = email.trim().toLocaleLowerCase('pt-BR');
  if (!limpo) throw new Error('Informe seu nome demonstrativo.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(endereco)) throw new Error('Informe um email em formato válido.');
  if (!senha.length) throw new Error('Preencha uma senha fictícia. Ela não será validada nem armazenada.');
  return { nome: limpo, email: endereco };
}

export function lerSessao(local: Armazenamento): ContaDemonstrativa | null {
  const texto = local.getItem(chaveSessao);
  if (texto === null) return null;
  const dados: unknown = JSON.parse(texto);
  if (typeof dados !== 'object' || dados === null
    || !('nome' in dados) || typeof dados.nome !== 'string'
    || !('email' in dados) || typeof dados.email !== 'string') {
    throw new Error('Sessão demonstrativa inválida.');
  }
  return criarConta(dados.nome, dados.email, 'demonstrativa');
}

export function salvarSessao(local: Armazenamento, conta: ContaDemonstrativa | null) {
  if (conta === null) local.removeItem(chaveSessao);
  else local.setItem(chaveSessao, JSON.stringify({ nome: conta.nome, email: conta.email }));
}
