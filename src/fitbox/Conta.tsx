import { useState } from 'react';
import { criarConta } from './conta';
import type { ContaDemonstrativa } from './conta';

export function Conta({ entrar }: { entrar: (conta: ContaDemonstrativa) => void }) {
  const [cadastro, setCadastro] = useState(true);
  const [erro, setErro] = useState('');
  return <section className="conta" aria-labelledby="conta-titulo">
    <h3 id="conta-titulo">{cadastro ? 'Cadastro demonstrativo' : 'Login demonstrativo'}</h3>
    <p className="note" id="conta-aviso">Simulação local, sem autenticação real. Use nome e email fictícios e uma senha que não utiliza em outros serviços. A senha não é validada nem armazenada. Nome e email ficam somente neste navegador.</p>
    <form aria-label={cadastro ? 'Cadastro demonstrativo' : 'Login demonstrativo'} aria-describedby="conta-aviso" onSubmit={(evento) => {
      evento.preventDefault();
      const dados = new FormData(evento.currentTarget);
      try {
        const conta = criarConta(String(dados.get('nome') ?? ''), String(dados.get('email') ?? ''), String(dados.get('senha') ?? ''));
        evento.currentTarget.reset();
        setErro('');
        entrar(conta);
      } catch (falha) {
        setErro(falha instanceof Error ? falha.message : 'Não foi possível iniciar a sessão demonstrativa.');
      }
    }}>
      <label>Nome demonstrativo<input name="nome" autoComplete="off" required /></label>
      <label>Email demonstrativo<input name="email" type="email" autoComplete="off" required /></label>
      <label>Senha fictícia<input name="senha" type="password" autoComplete="off" required /></label>
      {erro && <p role="alert">{erro}</p>}
      <button className="btn btn--green" type="submit">{cadastro ? 'Criar conta demonstrativa' : 'Entrar na demonstração'}</button>
      <button className="link" type="button" onClick={() => { setCadastro(!cadastro); setErro(''); }}>
        {cadastro ? 'Já tenho cadastro demonstrativo' : 'Quero criar cadastro demonstrativo'}
      </button>
    </form>
  </section>;
}
