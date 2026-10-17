import { formatarPreco } from './catalogo';
import { useEffect, useRef } from 'react';
import { calcularTotal, obterPrato } from './sacola';
import type { ItemSacola } from './sacola';
import { Modal } from './Modal';
import { Conta } from './Conta';
import type { ContaDemonstrativa } from './conta';

interface Props {
  aberto: boolean;
  itens: readonly ItemSacola[];
  concluido: boolean;
  aviso: string;
  conta: ContaDemonstrativa | null;
  avisoConta: string;
  entrar: (conta: ContaDemonstrativa) => void;
  sair: () => void;
  fechar: () => void;
  alterar: (id: string, quantidade: number) => void;
  confirmar: () => void;
}

export function Sacola({ aberto, itens, concluido, aviso, conta, avisoConta, entrar, sair, fechar, alterar, confirmar }: Props) {
  const conteudo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elemento = conteudo.current;
    if (aberto && elemento && !elemento.closest('dialog')?.contains(document.activeElement)) {
      elemento.querySelector<HTMLElement>('[data-foco-inicial]')?.focus();
    }
  }, [aberto, itens.length, concluido, conta]);

  return <Modal aberto={aberto} tituloId="sacola-titulo" fechar={fechar}>
    <div ref={conteudo} className="modal__content bag">
      <h2 id="sacola-titulo" tabIndex={-1} data-foco-inicial>Sacola demonstrativa</h2>
      <p className="note">Demonstração acadêmica: nenhum pagamento será realizado e nenhum pedido será enviado ou reservado.</p>
      {aviso && <p role="alert" className="storage-warning">{aviso}</p>}
      {avisoConta && <p role="alert" className="storage-warning">{avisoConta}</p>}
      {conta && <div className="conta-resumo"><p>Sessão demonstrativa: {conta.nome}</p><button className="link" onClick={sair}>Sair da conta demonstrativa</button></div>}
      {concluido && <p role="status" className="confirmation">Demonstração concluída. Nenhum pagamento foi realizado e nenhum pedido foi enviado ou reservado.</p>}
      {itens.length === 0 ? <div className="empty-bag">
        <p>Sua sacola está vazia.</p>
        <a href="#cardapio" className="btn btn--orange" onClick={fechar}>Ver cardápio</a>
      </div> : <>
        <ul className="bag__list">
          {itens.map((item) => {
            const prato = obterPrato(item.pratoId);
            return <li className="bag__item" key={item.pratoId}>
              <img src={prato.fotoMenor} width="72" height="72" alt={prato.nome} decoding="async" />
              <div>
                <h3>{prato.nome}</h3>
                <p>{formatarPreco(prato.precoCentavos)} por unidade</p>
                <div className="quantity" role="group" aria-label={`Quantidade de ${prato.nome}`}>
                  <button aria-label={`Diminuir quantidade de ${prato.nome}`} onClick={() => alterar(item.pratoId, item.quantidade - 1)}>−</button>
                  <output aria-label={`Unidades de ${prato.nome}`}>{item.quantidade}</output>
                  <button aria-label={`Aumentar quantidade de ${prato.nome}`} onClick={() => alterar(item.pratoId, item.quantidade + 1)}>+</button>
                </div>
                <p>Subtotal: {formatarPreco(prato.precoCentavos * item.quantidade)}</p>
                <button className="link" onClick={() => alterar(item.pratoId, 0)} aria-label={`Remover ${prato.nome}`}>Remover</button>
              </div>
            </li>;
          })}
        </ul>
        <p className="bag__total">Total demonstrativo: <strong>{formatarPreco(calcularTotal(itens))}</strong></p>
        <p className="note">Preços sugeridos, a validar pela nutricionista. Demonstração sem cobrança.</p>
        {!conta && <Conta entrar={entrar} />}
        <p className="note">{conta ? 'Sessão demonstrativa iniciada. Revise os itens antes de confirmar.' : 'Entre ou crie uma conta demonstrativa para habilitar a confirmação. Sua sacola será mantida.'}</p>
        <button className="btn btn--orange" disabled={!conta} onClick={confirmar}>Confirmar pedido demonstrativo</button>
      </>}
    </div>
  </Modal>;
}
