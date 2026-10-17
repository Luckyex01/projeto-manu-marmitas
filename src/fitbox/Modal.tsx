import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface Props {
  aberto: boolean;
  tituloId: string;
  fechar: () => void;
  children: ReactNode;
}

export function Modal({ aberto, tituloId, fechar, children }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const elemento = dialogo.current;
    if (!aberto || !elemento) return;
    const acionador = document.activeElement;
    elemento.showModal();
    elemento.querySelector<HTMLElement>('[data-foco-inicial]')?.focus();
    return () => {
      elemento.close();
      if (acionador instanceof HTMLElement && acionador.isConnected) acionador.focus();
    };
  }, [aberto]);

  return <dialog ref={dialogo} className="modal" aria-labelledby={tituloId}
    onCancel={(evento) => { evento.preventDefault(); fechar(); }}
    onKeyDown={(evento) => {
      if (evento.key !== 'Tab') return;
      const elementos = Array.from(evento.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]'))
        .filter((elemento) => elemento.getClientRects().length > 0);
      const primeiro = elementos[0];
      const ultimo = elementos.at(-1);
      if (!primeiro || !ultimo) return;
      const ativo = document.activeElement;
      if (evento.shiftKey && (ativo === primeiro || !elementos.some((elemento) => elemento === ativo))) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && (ativo === ultimo || !elementos.some((elemento) => elemento === ativo))) {
        evento.preventDefault();
        primeiro.focus();
      }
    }}
    onClick={(evento) => {
      if (evento.target !== evento.currentTarget) return;
      const area = evento.currentTarget.getBoundingClientRect();
      if (evento.clientX < area.left || evento.clientX > area.right || evento.clientY < area.top || evento.clientY > area.bottom) fechar();
    }}>
    <button className="modal__close" aria-label="Fechar" onClick={fechar}>×</button>
    {children}
  </dialog>;
}
