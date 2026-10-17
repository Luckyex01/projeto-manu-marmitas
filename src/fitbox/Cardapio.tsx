import { useState } from 'react';
import { avisoNutricional, formatarPreco, pratos } from './catalogo';
import type { Prato } from './catalogo';
import { calcularCalorias } from '../lib/calc';
import { Modal } from './Modal';

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}

export function Cardapio({ adicionar, busca }: { adicionar: (id: string) => void; busca: string }) {
  const [filtro, setFiltro] = useState('todos');
  const [selecionado, setSelecionado] = useState<Prato | null>(null);
  const termos = normalizar(busca).split(/\s+/).filter(Boolean);
  const visiveis = pratos.filter((prato) => {
    const texto = normalizar(`${prato.nome} ${prato.ingredientes}`);
    return (filtro === 'todos' || prato.categoria === filtro) && termos.every((termo) => texto.includes(termo));
  });
  return <section id="cardapio" className="section menu" aria-labelledby="cardapio-titulo">
    <div className="container">
      <div className="menu__head">
        <div>
          <h2 id="cardapio-titulo" className="section__title">Cardápio <span className="txt-green">do freezer</span></h2>
          <p className="section__sub">Fotos reais. Composições e preços provisórios, sem disponibilidade real de estoque.</p>
        </div>
        <div className="chips" role="group" aria-label="Filtrar pratos por ingrediente proposto">
          {[['todos', 'Todos'], ['frango', 'Frango'], ['peixe', 'Peixe'], ['carne', 'Carne'], ['vegetais', 'Vegetais']].map(([id, nome]) =>
            <button key={id} className={`chip ${filtro === id ? 'is-active' : ''}`} aria-pressed={filtro === id} onClick={() => setFiltro(id)}>{nome}</button>)}
        </div>
      </div>
      <p className="note" role="status">{visiveis.length} pratos na seleção</p>
      {busca.trim() && <p className="note">Busca por: <strong>{busca.trim()}</strong></p>}
      {visiveis.length === 0 && <p className="fb-empty">Nenhum prato encontrado. Tente outro termo, limpe a busca ou selecione outra categoria.</p>}
      <div className="grid">
        {visiveis.map((prato) => {
          const total = calcularCalorias(prato.nutrientes);
          return <article className="card" key={prato.id} aria-label={prato.nome}>
            <div className="card__img"><img src={prato.foto} srcSet={prato.fotoSrcSet} sizes="(min-width: 900px) 32vw, (min-width: 768px) 15vw, 30vw" alt={prato.nome} loading="lazy" decoding="async" /></div>
            <div className="card__body">
              <h3>{prato.nome}</h3>
              <p className="card__meta">{prato.peso} g · {prato.kcal} kcal</p>
              <div className="macros">
                {[
                  { valor: prato.nutrientes.proteina, nome: 'proteína', cor: 'txt-green' },
                  { valor: prato.nutrientes.carboidrato, nome: 'carbo', cor: 'txt-orange' },
                  { valor: prato.nutrientes.gordura, nome: 'gordura', cor: '' },
                ].map(({ valor, nome, cor }) => <div key={nome}><strong className={cor}>{Math.round(valor)} g</strong><span>{nome}</span></div>)}
              </div>
              <div className="bar" aria-hidden="true">
                <i className="bar--p" style={{ width: `${prato.nutrientes.proteina * 4 / total * 100}%` }} />
                <i className="bar--c" style={{ width: `${prato.nutrientes.carboidrato * 4 / total * 100}%` }} />
                <i className="bar--g" style={{ width: `${prato.nutrientes.gordura * 9 / total * 100}%` }} />
              </div>
              <p className="note card__notice">{avisoNutricional} {!prato.auditado && 'Dados históricos não auditados.'}</p>
              <div className="card__foot">
                <span className="price">{formatarPreco(prato.precoCentavos)}</span>
                <button className="link" onClick={() => setSelecionado(prato)} aria-label={`Ver tabela de ${prato.nome}`}>Ver tabela</button>
              </div>
              <p className="note card__notice">Preço sugerido, a validar pela nutricionista.</p>
              <button className="btn btn--orange btn--sm" onClick={() => adicionar(prato.id)} aria-label={`Adicionar à sacola: ${prato.nome}`}>Adicionar à sacola</button>
            </div>
          </article>;
        })}
      </div>
      <p className="note">Categorias por ingrediente proposto, não certificações de dieta. Os cinco pratos não auditados permanecem apenas como dados históricos demonstrativos; não use seus valores para orientação alimentar.</p>
    </div>
    <Modal aberto={selecionado !== null} tituloId="prato-titulo" fechar={() => setSelecionado(null)}>
      {selecionado && <>
        <img src={selecionado.foto} srcSet={selecionado.fotoSrcSet} sizes="(min-width: 712px) 640px, 90vw" alt={selecionado.nome} className="modal__img" decoding="async" />
        <div className="modal__content">
          <h2 id="prato-titulo" tabIndex={-1} data-foco-inicial>{selecionado.nome}</h2>
          <p className="card__meta">Porção proposta: {selecionado.peso} g · {formatarPreco(selecionado.precoCentavos)}</p>
          <p className="note">{avisoNutricional} Preço sugerido, a validar pela nutricionista.</p>
          <section className="prato-secao" aria-labelledby="sobre-prato">
            <h3 id="sobre-prato">Sobre o prato</h3>
            <p>Foto de referência da preparação proposta. Receita, porção e preço ainda a validar pela nutricionista. A seleção não indica disponibilidade no freezer.</p>
          </section>
          <section className="prato-secao" aria-labelledby="ingredientes-prato">
            <h3 id="ingredientes-prato">Ingredientes</h3>
            <p className="modal__ing">{selecionado.ingredientes}</p>
            <p className="note">Alergênicos e possibilidade de contaminação cruzada: não informados. Dependem de ficha técnica validada.</p>
          </section>
          <section className="prato-secao" aria-labelledby="nutricao-prato">
          <h3 id="nutricao-prato">Informação nutricional</h3>
          <table className="nutri">
            <caption>Informação nutricional demonstrativa · porção proposta</caption>
            <tbody>
              {[
                ['Energia (4/4/9 no exemplo auditado)', `${selecionado.kcal} kcal`],
                ['Proteínas', `${Math.round(selecionado.nutrientes.proteina)} g`],
                ['Carboidratos', `${Math.round(selecionado.nutrientes.carboidrato)} g`],
                ['Gorduras totais', `${Math.round(selecionado.nutrientes.gordura)} g`],
                ['Fibra alimentar', `${Math.round(selecionado.nutrientes.fibra)} g`],
                ['Sódio computado (sal adicionado não incluído)', `${Math.round(selecionado.nutrientes.sodio)} mg`],
              ].map(([nome, valor]) => <tr key={nome}><th scope="row">{nome}</th><td>{valor}</td></tr>)}
            </tbody>
          </table>
          <p className="note">{selecionado.auditado
            ? 'Aritmética reconciliada com a TACO v.4: 49,40 g de proteína, 47,32 g de carboidrato e 3,99 g de gordura resultam em 422,79 kcal. Massa, receita e método ainda a validar pela nutricionista.'
            : 'Estimativas históricas não auditadas. Energia, composição e massa ainda não reconciliadas por ficha técnica.'}</p>
          </section>
          <p className="note">Não é um rótulo regulatório completo. Adicionar apenas seleciona itens para uma demonstração, sem cobrança, pedido ou reserva.</p>
          <button className="btn btn--orange modal__adicionar" onClick={() => adicionar(selecionado.id)}>Adicionar à sacola</button>
        </div>
      </>}
    </Modal>
  </section>;
}
