import { useEffect, useRef, useState } from 'react';
import hero from '../../prototipo/assets/hero.mp4';
import poster from '../../prototipo/assets/poster.jpg';
import preparo from './assets/foto5.webp';
import marmitas from './assets/foto1.webp';
import preparoMenor from './assets/foto5-360.webp';
import marmitasMenor from './assets/foto1-360.webp';
import { Marca } from './Marca';

export function Home() {
  const video = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(true);
  const [movimentoReduzido, setMovimentoReduzido] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [erroVideo, setErroVideo] = useState('');

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    const atualizar = () => {
      setMovimentoReduzido(consulta.matches);
      if (consulta.matches) video.current?.pause();
    };
    consulta.addEventListener('change', atualizar);
    return () => consulta.removeEventListener('change', atualizar);
  }, []);

  async function alternarVideo() {
    const elemento = video.current;
    if (!elemento) return;
    if (!elemento.paused) {
      elemento.pause();
      return;
    }
    try {
      await elemento.play();
      setErroVideo('');
    } catch {
      setErroVideo('Não foi possível reproduzir o vídeo. A imagem ilustrativa continua disponível.');
    }
  }

  const frases = ['Treinou? Bora escolher', 'Sua próxima refeição começa aqui', 'Conheça os pratos', 'Macros na palma da mão', 'Escolha do seu jeito'];
  return <>
    <div className="marquee" tabIndex={0} role="region" aria-label="Chamadas do cardápio. Mantenha o foco nesta faixa para pausar a animação.">
      <div className="marquee__track" aria-hidden="true">
        {[...frases, ...frases].map((frase, indice) => <span className="marquee__group" key={indice}>
          <span className="marquee__item">{frase}</span><span className="marquee__dot" />
        </span>)}
      </div>
    </div>
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow"><Marca /> · proposta de autoatendimento</p>
          <h1 id="hero-titulo"><span className="hero__linha">Treinou?</span>{' '}<span className="hero__linha txt-orange">Sua refeição</span>{' '}<span className="hero__linha txt-green">já está aqui.</span></h1>
          <p className="hero__lead">Conheça a proposta de marmitas congeladas no freezer da academia. Explore os pratos e simule sua seleção, sem cobrança.</p>
          <div className="hero__cta">
            <a href="#cardapio" className="btn btn--orange">Ver pratos no freezer</a>
            <a href="#como-comprar" className="btn btn--ghost">Conhecer os 3 passos</a>
          </div>
        </div>
        <figure className="hero__figure">
          <div className="hero__media">
            <video ref={video} autoPlay={!movimentoReduzido} muted loop playsInline preload="metadata" poster={poster}
              aria-label="Ilustração gerada por IA de um freezer FITBOX em uma academia fictícia"
              onPause={() => setPausado(true)} onPlay={() => setPausado(false)}
              onError={() => setErroVideo('Vídeo indisponível. Exibindo imagem ilustrativa.')}>
              <source src={hero} type="video/mp4" />
            </video>
          </div>
          <figcaption>Academia e freezer fictícios. Vídeo ilustrativo gerado por IA.</figcaption>
          <button className="btn btn--ghost btn--sm" onClick={alternarVideo}>
            {pausado ? 'Reproduzir vídeo' : 'Pausar vídeo'}
          </button>
          {erroVideo && <p role="status" className="note">{erroVideo}</p>}
        </figure>
      </div>
    </section>
    <section id="como-comprar" className="section steps" aria-labelledby="passos-titulo">
      <div className="container">
        <h2 id="passos-titulo" className="section__title">Explore em <span className="txt-orange">3 passos</span></h2>
        <p className="section__sub">Demonstração acadêmica: sem pagamento, envio de pedido ou reserva de produtos.</p>
        <ol className="steps__list">
          {[
            ['Explore os pratos', 'Consulte as fotos reais e as informações nutricionais provisórias.'],
            ['Adicione à sacola', 'Selecione os pratos e ajuste as quantidades para simular seu pedido.'],
            ['Confirme a demonstração', 'Revise sua seleção. A conclusão não cobra e não libera retirada no freezer.'],
          ].map(([titulo, texto], indice) => <li className="step" key={titulo}>
            <span className="step__n">{indice + 1}</span><h3>{titulo}</h3><p>{texto}</p>
          </li>)}
        </ol>
      </div>
    </section>
  </>;
}

export function Sobre() {
  return <section id="confianca" className="section trust" aria-labelledby="sobre-titulo">
    <div className="container trust__inner">
      <div className="trust__photos">
        <img src={marmitas} srcSet={`${marmitasMenor} 360w, ${marmitas} 707w`} sizes="(min-width: 900px) 25vw, 50vw" width="707" height="900" alt="Foto real de marmitas embaladas, fornecida por Manuela" loading="lazy" decoding="async" />
        <img src={preparo} srcSet={`${preparoMenor} 360w, ${preparo} 557w`} sizes="(min-width: 900px) 25vw, 50vw" width="557" height="900" alt="Foto real de finalização de uma preparação com ervas" loading="lazy" decoding="async" />
      </div>
      <div>
        <p className="eyebrow">Projeto acadêmico · Nutrição</p>
        <h2 id="sobre-titulo" className="section__title">Conheça a <Marca /></h2>
        <p className="section__sub">Proposta de autoatendimento em freezer horizontal dentro de academias, sem entrega, atendente ou WhatsApp.</p>
        <ul className="checks">
          <li>Projeto com participação de Manuela Amaro, estudante de Nutrição da UDF.</li>
          <li>Fotos reais das preparações fornecidas por Manuela.</li>
          <li>Ingredientes, porções, valores nutricionais e preços provisórios, a validar pela nutricionista.</li>
        </ul>
      </div>
    </div>
  </section>;
}

export function PerguntasFrequentes() {
  const perguntas = [
    ['Esta página realiza uma compra?', 'Não. Esta é uma vitrine acadêmica. A sacola e a conta são demonstrativas, sem cobrança ou envio de pedido.'],
    ['A confirmação reserva ou libera uma marmita?', 'Não. Confirmar encerra a demonstração e limpa a sacola. Não reserva estoque, comprova pagamento ou libera retirada no freezer.'],
    ['De onde vêm os valores nutricionais?', 'O exemplo de frango, arroz e feijão foi reconciliado com a TACO v.4 pelo método 4/4/9. Os demais valores são históricos não auditados. Todos são a validar pela nutricionista, não servem como orientação alimentar.'],
    ['As fotos são reais?', 'As fotos das preparações foram fornecidas por Manuela. O vídeo do freezer e a academia são ilustrações geradas por IA, não comprovam uma operação real.'],
    ['Minha seleção fica salva?', 'A sacola e a sessão demonstrativa ficam neste navegador quando o armazenamento local está disponível. A senha não é armazenada. Sair da conta mantém a sacola; confirmar a demonstração limpa os itens. Falhas são avisadas na tela.'],
    ['Como encontro os ingredientes?', 'No cardápio, abra “Ver tabela” no prato desejado e consulte a seção Ingredientes. A composição é proposta e ainda depende de validação. Não deduza alergênicos pela foto ou pela lista incompleta.'],
  ];
  return <section id="duvidas" className="section faq" aria-labelledby="duvidas-titulo">
    <div className="container">
      <h2 id="duvidas-titulo" className="section__title">Dúvidas <span className="txt-orange">frequentes</span></h2>
      {perguntas.map(([pergunta, resposta]) => <details key={pergunta}><summary>{pergunta}</summary><p>{resposta}</p></details>)}
    </div>
  </section>;
}
