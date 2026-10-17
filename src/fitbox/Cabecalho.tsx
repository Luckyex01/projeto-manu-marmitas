import { useEffect, useRef, useState } from 'react';
import logo from '../../prototipo/assets/logo.jpg';

export function Cabecalho({ unidades, buscar, abrirSacola }: {
  unidades: number;
  buscar: (termo: string) => void;
  abrirSacola: () => void;
}) {
  const [termo, setTermo] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const botaoMenu = useRef<HTMLButtonElement>(null);
  const botaoBusca = useRef<HTMLButtonElement>(null);
  const campoBusca = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (buscaAberta) campoBusca.current?.focus();
  }, [buscaAberta]);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return <header className="header fb-header" onKeyDown={(evento) => {
    if (evento.key === 'Escape' && buscaAberta) {
      setBuscaAberta(false);
      botaoBusca.current?.focus();
    } else if (evento.key === 'Escape' && menuAberto) {
      fecharMenu();
      botaoMenu.current?.focus();
    }
  }}>
    <div className="container fb-header__row">
      <a href="#" className="header__logo" aria-label="FITBOX: início"><img src={logo} alt="FITBOX" /></a>
      <button ref={botaoBusca} type="button" className="fb-search-toggle" aria-label="Abrir ou fechar busca"
        aria-expanded={buscaAberta} aria-controls="formulario-busca" onClick={() => setBuscaAberta(!buscaAberta)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />
        </svg>
      </button>
      <form id="formulario-busca" hidden={!buscaAberta} className="fb-search" role="search" aria-label="Buscar pratos" onSubmit={(evento) => {
        evento.preventDefault();
        buscar(termo);
        fecharMenu();
        window.location.hash = 'cardapio';
        document.getElementById('cardapio')?.scrollIntoView({ behavior: 'instant' });
      }}>
        <label className="fb-sr-only" htmlFor="buscar-pratos">Buscar por prato ou ingrediente</label>
        <input ref={campoBusca} id="buscar-pratos" type="search" value={termo} onChange={(evento) => setTermo(evento.target.value)}
          placeholder="Prato ou ingrediente" />
        <button type="submit" className="btn btn--orange btn--sm">Buscar</button>
        {termo && <button type="button" className="fb-search__limpar" aria-label="Limpar busca" onClick={() => {
          setTermo('');
          buscar('');
        }}>×</button>}
      </form>
      <button ref={botaoMenu} className="fb-burger" aria-expanded={menuAberto} aria-controls="navegacao-principal"
        onClick={() => setMenuAberto(!menuAberto)}>Menu</button>
      <button className="btn btn--green btn--sm" onClick={() => { fecharMenu(); abrirSacola(); }}
        aria-label={`Abrir sacola, ${unidades} unidades`}>Sacola ({unidades})</button>
    </div>
    <nav id="navegacao-principal" className={`fb-nav${menuAberto ? ' fb-nav--aberta' : ''}`} aria-label="Principal">
      <div className="container fb-nav__links">
        <a href="#como-comprar" onClick={fecharMenu}>Como funciona</a>
        <a href="#cardapio" onClick={fecharMenu}>Cardápio</a>
        <a href="#confianca" onClick={fecharMenu}>Sobre</a>
        <a href="#duvidas" onClick={fecharMenu}>Dúvidas</a>
      </div>
    </nav>
  </header>;
}
