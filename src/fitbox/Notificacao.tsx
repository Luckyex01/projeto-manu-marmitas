import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function Notificacao({ mensagem }: { mensagem: string }) {
  const elemento = useRef<HTMLDivElement>(null);
  const [destino, setDestino] = useState<Element>(document.body);
  const [visivel, setVisivel] = useState(Boolean(mensagem));
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    if (!mensagem) return;
    const saida = window.setTimeout(() => setSaindo(true), 5000);
    const ocultar = window.setTimeout(() => setVisivel(false), 5240);
    return () => {
      window.clearTimeout(saida);
      window.clearTimeout(ocultar);
    };
  }, [mensagem]);

  useLayoutEffect(() => {
    const atualizarDestino = () => setDestino(document.querySelector('dialog[open]') ?? document.body);
    const observador = new MutationObserver(atualizarDestino);
    observador.observe(document.body, { attributes: true, attributeFilter: ['open'], subtree: true });
    atualizarDestino();
    return () => observador.disconnect();
  }, []);

  // Dentro do modal ativo, a região de status não fica inerte para acessibilidade.
  useLayoutEffect(() => {
    const ativo = document.querySelector('dialog[open]') ?? document.body;
    if (ativo !== destino) {
      setDestino(ativo);
      return;
    }
    const notificacao = elemento.current;
    if (!notificacao) return;
    if (notificacao.matches(':popover-open')) notificacao.hidePopover();
    if (visivel) notificacao.showPopover();
  });

  return createPortal(<div ref={elemento} popover="manual" role="status" aria-atomic="true"
    className={`status-message${saindo ? ' status-message--saindo' : ''}`}>
    {visivel && <><span>{mensagem}</span><span className="status-message__tempo" aria-hidden="true" /></>}
  </div>, destino);
}
