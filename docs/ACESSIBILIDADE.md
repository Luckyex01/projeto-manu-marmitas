# Acessibilidade FITBOX

## Fato

Esta documentação registra uma verificação automatizada local da SPA. Não é
certificação WCAG, auditoria integral, teste com pessoas com deficiência ou
validação de leitores de tela em dispositivos reais.

O E2E usa `@axe-core/playwright` com as tags WCAG 2 A/AA, WCAG 2.1 A/AA e
WCAG 2.2 AA. Em quatro larguras (320, 390, 768 e 1440 CSS px), percorre
cinco estados: Home, detalhe, sacola/conta, revisão e confirmação. Os
projetos mobile e desktop executam os quatro tamanhos, totalizando oito
execuções de teste e 40 análises axe por suíte completa. O teste falha
quando encontra violações e anexa `incomplete` para revisão; a suíte
canônica é executada por `npm run test` e pelo CI.

Resultados e escopo medidos estão em [Auditoria técnica](AUDITORIA_TECNICA.md).
O estado anterior de seis botões com nomes incompatíveis foi corrigido:
o nome acessível dos botões de adição contém o texto visível.

### Decisão sobre a faixa animada, 17/10/2026

- **Fato:** por decisão de produto, a faixa mantém rolagem contínua em
  desktop e mobile, sem botão de pausa ou linha extra de controles.
  A animação pausa durante hover ou foco na faixa, que recebe foco de
  teclado com indicador visível e nome explicativo. Com
  `prefers-reduced-motion: reduce`, a animação é desativada.
- **Hipótese:** essas medidas reduzem o desconforto para parte dos usuários,
  mas não equivalem a uma pausa persistente disponível a todos.
- **Pendente:** a ausência de mecanismo persistente, especialmente em telas
  de toque sem hover, impede declarar atendimento ao
  [critério 2.2.2, Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
  para esta faixa. Pausar somente enquanto o foco está retido não satisfaz
  esse requisito. Axe aprovado não elimina esta pendência. O controle do
  vídeo permanece independente e não foi removido.

Validação desta alteração: build aprovado; 30 testes unitários e 40 E2E
aprovados com `npm run test -- --workers=2` (exit 0). A execução inicial
com sete workers terminou com três timeouts e 37 E2E aprovados (exit 1);
a causa dos timeouts não foi comprovada. As regressões verificam faixa
visível, ausência do botão, pausa por foco, hover no desktop, movimento
reduzido e ausência da linha extra antes do Hero. Capturas mobile de
390 px e desktop de 1440 px foram inspecionadas. A verificação de layout
também percorre 320, 697, 768, 900, 1024 e 1920 px sem overflow horizontal.

### Critérios de verificação

- Contraste de texto: 4,5:1 para texto comum e 3:1 para texto grande,
  conforme [WCAG 2.2, 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- Contraste de componentes e indicadores visuais: 3:1 quando o
  [critério 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
  se aplica. Não é o mesmo cálculo que contraste de texto.
- Teclado e foco: operação por teclado, ordem previsível, foco visível e
  foco não totalmente oculto, incluindo
  [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
  e [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).
- Alvos de ponteiro: WCAG 2.2 AA, critério 2.5.8, define 24 x 24 CSS px
  com exceções. 44 x 44 px é a meta interna adotada pelo projeto, não o
  mínimo AA geral. Ver
  [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- Controles devem ter nome, função e estado acessíveis; imagens informativas
  precisam de alternativa textual adequada e imagens decorativas não devem
  gerar texto redundante. Conferir os critérios 1.1.1 e 4.1.2, além do
  contexto de cada tela.
- Formulários devem apresentar instruções e rótulos persistentes. Placeholder
  isolado não substitui um label.

Contrastes documentados para as combinações verificadas estão em
[Design System](DESIGN_SYSTEM.md). Um valor de paleta não comprova que toda
combinação de texto, foco, estado hover ou superfície tenha contraste
adequado.

## Hipótese

axe automatiza verificações úteis de regras codificadas e semântica, mas
não determina sozinho se a experiência é compreensível ou utilizável.
Não foi confirmada uma porcentagem universal de problemas que a ferramenta
detecta; alegações como "30 a 40%" ficam não confirmadas e não são usadas
como medida de cobertura.

Uma auditoria manual complementar deve incluir teclado, ampliação/reflow,
ordem e retorno de foco, mensagens dinâmicas, zoom, leitor de tela e
tecnologia assistiva. Testes com NVDA, VoiceOver ou TalkBack não foram
executados nesta verificação.

## Pendente

- Revisar individualmente os anexos `incomplete` do axe em cada execução.
- Testar com leitores de tela, ampliação, voz e navegadores/dispositivos reais.
- Avaliar contraste em todos os estados interativos, não somente cores base.
- Repetir a validação no preview publicado e conferir foco, fonte e conteúdo.
- Tratar os resultados axe como gate de regressão, não como declaração de
  conformidade completa.

## Referências

- [W3C, WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [W3C, Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/).
- [axe-core, documentação](https://github.com/dequelabs/axe-core).
- [Playwright, testes de acessibilidade](https://playwright.dev/docs/accessibility-testing).
