import logo from '../../prototipo/assets/logo.jpg';
import { useState } from 'react';
import { Home, Sobre, PerguntasFrequentes } from './Home';
import { Cardapio } from './Cardapio';
import { Sacola } from './Sacola';
import { Notificacao } from './Notificacao';
import { Marca } from './Marca';
import { Cabecalho } from './Cabecalho';
import { alterarQuantidade, calcularTotal, lerSacola, salvarSacola } from './sacola';
import type { ItemSacola } from './sacola';
import { lerSessao, salvarSessao } from './conta';
import type { ContaDemonstrativa } from './conta';

function restaurarConta() {
  try {
    return { conta: lerSessao(window.localStorage), aviso: '' };
  } catch {
    return { conta: null, aviso: 'Não foi possível restaurar a sessão demonstrativa: dados inválidos ou armazenamento indisponível.' };
  }
}

function restaurar() {
  try {
    return { itens: lerSacola(window.localStorage), aviso: '' };
  } catch {
    return {
      itens: [],
      aviso: 'Não foi possível restaurar a sacola: dados locais inválidos ou armazenamento indisponível. A seleção começa vazia; os dados locais anteriores não foram alterados.',
    };
  }
}

export function App() {
  const [estado, setEstado] = useState(restaurar);
  const [sessao, setSessao] = useState(restaurarConta);
  const [sacolaAberta, setSacolaAberta] = useState(false);
  const [busca, setBusca] = useState('');
  const [concluido, setConcluido] = useState(false);
  const [notificacao, setNotificacao] = useState({ mensagem: '', id: 0 });
  function setMensagem(mensagem: string) {
    setNotificacao((anterior) => ({ mensagem, id: anterior.id + 1 }));
  }
  const unidades = estado.itens.reduce((soma, item) => soma + item.quantidade, 0);

  function persistir(itens: ItemSacola[]) {
    let aviso = '';
    try {
      salvarSacola(window.localStorage, itens);
    } catch {
      aviso = itens.length
        ? 'Não foi possível salvar a sacola. A seleção permanece apenas nesta sessão; os dados anteriores podem reaparecer após recarregar.'
        : 'A sacola foi esvaziada nesta sessão, mas não foi possível limpar os dados locais. Eles podem reaparecer após recarregar.';
    }
    setEstado({ itens, aviso });
  }

  function alterar(id: string, quantidade: number) {
    try {
      const itens = alterarQuantidade(estado.itens, id, quantidade);
      persistir(itens);
      setConcluido(false);
      setMensagem('Sacola demonstrativa atualizada.');
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : 'Não foi possível atualizar a sacola.');
    }
  }

  function adicionar(id: string) {
    const atual = estado.itens.find((item) => item.pratoId === id)?.quantidade ?? 0;
    alterar(id, atual + 1);
  }

  function confirmar() {
    if (estado.itens.length === 0) {
      setMensagem('Selecione um prato antes de confirmar a demonstração.');
      return;
    }
    if (!sessao.conta) {
      setMensagem('Entre na conta demonstrativa antes de confirmar.');
      return;
    }
    calcularTotal(estado.itens);
    persistir([]);
    setConcluido(true);
    setMensagem('Demonstração concluída, sem pagamento ou envio de pedido.');
  }

  function atualizarConta(conta: ContaDemonstrativa | null) {
    let aviso = '';
    try {
      salvarSessao(window.localStorage, conta);
    } catch {
      aviso = conta
        ? 'Não foi possível salvar a sessão demonstrativa. Ela permanece apenas até recarregar; dados anteriores podem reaparecer.'
        : 'Você saiu nesta sessão, mas não foi possível limpar a sessão salva. Ela pode reaparecer após recarregar.';
    }
    setSessao({ conta, aviso });
  }

  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <div className="proto-ribbon">Demonstração acadêmica · sem cobrança · valores a validar pela nutricionista</div>
    <Cabecalho unidades={unidades} buscar={setBusca} abrirSacola={() => { setConcluido(false); setSacolaAberta(true); }} />
    {estado.aviso && !sacolaAberta && <p role="alert" className="storage-warning">{estado.aviso}</p>}
    <main id="conteudo"><Home /><Cardapio adicionar={adicionar} busca={busca} /><Sobre /><PerguntasFrequentes /></main>
    <footer className="footer">
      <div className="container">
        <img src={logo} alt="FITBOX" className="footer__logo" />
        <p>Vitrine acadêmica. Nenhum pedido real ou pagamento é processado.</p>
        <p className="footer__small"><Marca /> · Demonstração</p>
      </div>
    </footer>
    <Sacola aberto={sacolaAberta} itens={estado.itens} concluido={concluido} aviso={estado.aviso}
      conta={sessao.conta} avisoConta={sessao.aviso} entrar={atualizarConta} sair={() => atualizarConta(null)}
      fechar={() => setSacolaAberta(false)} alterar={alterar} confirmar={confirmar} />
    <Notificacao key={notificacao.id} mensagem={notificacao.mensagem} />
  </>;
}
