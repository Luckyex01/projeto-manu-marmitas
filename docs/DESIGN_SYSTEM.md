# FITBOX: Design System

## 1. PALETA DE CORES

- Primaria (Laranja Apetite/Acao): #FC7403
- Secundaria (Verde Nutricao/Frescor): #68C31A
- Fundo Principal (Preto Carbono): #0A0A0A
- Fundo de Superficie / Card: #1A1A1A
- Texto Claro / Principal: #F5F5F5
- Texto Secundario / Metadados: #A3A3A3
- Borda Suave: #2E2E2E

Tokens CSS equivalentes:
- --color-primary: #FC7403
- --color-secondary: #68C31A
- --color-bg: #0A0A0A
- --color-surface: #1A1A1A
- --color-text: #F5F5F5
- --color-text-muted: #A3A3A3
- --color-border: #2E2E2E

---

## 2. TIPOGRAFIA

- Familia Tipografica: Montserrat, sans-serif.
- Pesos e Estilos:
  - 800 (Extra Bold) e 900 (Black) italico: titulos, numeros de macros, precos e chamadas de destaque.
  - 600 (Semi Bold): subtitulos, rotulos de componentes e textos de botoes.
  - 400 (Regular): corpo de texto longo, listas de ingredientes e notas de rodape.
- Escala de Tamanhos:
  - h1 (Hero / Destaque principal): 48px a 64px (line-height: 1.1)
  - h2 (Titulos de secao): 32px a 40px (line-height: 1.2)
  - h3 (Titulos de cards e modais): 20px a 24px (line-height: 1.3)
  - body (Texto principal de leitura): 16px (line-height: 1.5)
  - caption / meta (Metadados e notas legais): 12px a 14px (line-height: 1.4)

---

## 3. REGRAS WCAG (ACESSIBILIDADE OBRIGATÓRIA)

- Proibicao estrita: texto branco sobre fundo laranja (#FC7403) ou verde (#68C31A) e terminantemente proibido.
  - Razao tecnica: o contraste resultante e inferior a 3:1, abaixo dos requisitos de contraste de texto WCAG 2.2 AA.
- Regra de botoes coloridos: todo botao ou badge com fundo preenchido em laranja (#FC7403) ou verde (#68C31A) deve obrigatoriamente utilizar texto preto (#0A0A0A).
  - Contraste entre #0A0A0A e #FC7403: aproximadamente 7,20:1 (AAA para texto normal).
  - Contraste entre #0A0A0A e #68C31A: aproximadamente 8,87:1 (AAA para texto normal).
- Contraste de texto normal: pelo menos 4,5:1 (AA). Texto grande pode usar 3:1: pelo menos 24 CSS px regular ou aproximadamente 18,67 CSS px em negrito. Nao confundir pixels com pontos tipograficos.
  - Referência normativa atual do projeto: [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Os critérios de contraste de texto mantêm os limiares indicados; alvos de ponteiro e foco também devem ser avaliados conforme os critérios 2.5.8 e 2.4.11.
  - Contraste branco (#F5F5F5) sobre preto (#0A0A0A): aproximadamente 18,16:1 (AAA).
  - Contraste texto secundario (#A3A3A3) sobre preto (#0A0A0A): aproximadamente 7,85:1 (AAA).
  - Contraste #A3A3A3 sobre #1A1A1A: aproximadamente 6,90:1, calculado pela luminância relativa sRGB. Atende AA para texto normal, mas não AAA para texto normal (mínimo 7:1); atende AAA para texto grande.
- Alvos de toque: 44 x 44 CSS px é a meta interna. WCAG 2.2 AA, critério 2.5.8, estabelece 24 x 24 CSS px, com as exceções normativas, inclusive espaçamento. Não apresentar 44 px como mínimo AA universal.

---

## 4. COMPONENTES BASE

### Botao Primario
- Fundo: #FC7403 (laranja).
- Texto: #0A0A0A (preto), peso 600 ou 800 italico.
- Borda: nenhuma.
- Border-radius: 9999px (formato pill).
- Espacamento interno (padding): 14px 28px.
- Estado hover: clareamento sutil de brilho sem alterar a legibilidade do texto preto.

### Botao Secundario
- Fundo: transparente.
- Texto: #F5F5F5 (branco), peso 600.
- Borda: 1px solida em #F5F5F5.
- Border-radius: 9999px (formato pill).
- Espacamento interno (padding): 14px 28px.
- Estado hover: fundo branco (#F5F5F5) com texto preto (#0A0A0A).

### Card de Produto
- Fundo do container: #1A1A1A (superficie contrastante sobre o fundo geral #0A0A0A).
- Borda: 1px solida em #2E2E2E.
- Border-radius: 16px.
- Estrutura vertical obrigatoria:
  1. Imagem real do prato em proporcao 4:3 ou 1:1, com cantos superiores arredondados.
  2. Titulo do prato em Montserrat peso 800.
  3. Metadados rapidos: peso (g) e valor energetico (kcal).
  4. Bloco de macros em tres colunas: proteina (g), carboidrato (g) e gordura (g).
  5. Barra visual de distribuicao de macronutrientes.
  6. Rodape com preco sugerido em destaque e botao de acao (CTA) ou link para modal de tabela nutricional.
- Macros: proteina em verde #68C31A, carboidrato em laranja #FC7403, gordura em branco #F5F5F5, acompanhando a barra visual.

### Marquee (Barra de Anuncios Superior)
- Fundo: #FC7403.
- Tipografia: Montserrat, uppercase, texto #0A0A0A.
- Elemento separador: esfera escura.
- Espacamento de respiro: margem lateral fixa de 44px em cada lado da esfera separadora (padrao de legibilidade Cumbuca Boa).
- Animacao: rolagem horizontal continua com duracao calibrada para leitura confortavel sem interrupcoes bruscas.
- Implementacao vigente: 34 segundos, sem botao ou linha de controles; pausa por hover e foco de teclado na faixa, sem animacao com movimento reduzido. Essas mitigacoes nao comprovam conformidade com WCAG 2.2.2; ver [Acessibilidade](ACESSIBILIDADE.md). Chamadas de descoberta, sem alegacoes nao comprovadas ou repeticao dos avisos demonstrativos.

---

## 5. BREAKPOINTS RESPONSIVOS

- Mobile (Prioritario / Alvo Primario): 390px (resolucao padrao de smartphones no ponto de venda por QR Code).
- Tablet: 768px (adaptacao para visualizacao em telas intermediarias e paisagem).
- Desktop: 1440px (grade centralizada com largura maxima de container de 1200px e margens generosas).

Diretriz de layout: mobile-first rigoroso. Todas as regras CSS base devem ser declaradas para telas compactas, expandindo via media queries minimas (`@media (min-width: 768px)` e `@media (min-width: 1440px)`).

---

## 6. REGRAS DE USO DA MARCA

- Fundo obrigatorio: o logotipo oficial FITBOX deve ser aplicado exclusivamente sobre fundos escuros (#0A0A0A ou superficies escuras neutras).
- Nos textos renderizados da marca, usar FIT em branco (#F5F5F5) e BOX em laranja (#FC7403), sem alterar os arquivos originais da logo ou da midia.
- Area de protecao minima: espacamento livre em todos os quatro lados equivalente no minimo a altura da letra "F" do monograma.
- Proibicoes de aplicacao:
  - Terminantemente proibido esticar, comprimir ou distorcer as proporcoes originais da marca.
  - Proibido alterar as cores do monograma ou dos textos "FIT" e "BOX".
  - Proibido aplicar o logotipo diretamente sobre fotografias com excesso de elementos visuais ou baixo contraste.
  - Proibido rotacionar ou inclinar o arquivo alem da inclinacao natural nativa da tipografia.
