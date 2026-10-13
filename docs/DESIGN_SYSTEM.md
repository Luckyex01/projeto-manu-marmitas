# FITBOX — Design System

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
  - Razao tecnica: o contraste resultante e inferior a 3:1, violando as diretrizes WCAG 2.1 nivel AA.
- Regra de botoes coloridos: todo botao ou badge com fundo preenchido em laranja (#FC7403) ou verde (#68C31A) deve obrigatoriamente utilizar texto preto (#0A0A0A).
  - Contraste preto sobre laranja: 8.5:1 (aprovado AAA).
  - Contraste preto sobre verde: 10.2:1 (aprovado AAA).
- Contraste de texto normal: qualquer combinacao de texto de leitura contra o fundo deve atender a proporcao minima de contraste de 4.5:1 (nivel AA para texto abaixo de 18px).
  - Contraste branco (#F5F5F5) sobre preto (#0A0A0A): 18.2:1 (aprovado AAA).
  - Contraste texto secundario (#A3A3A3) sobre preto (#0A0A0A): 7.3:1 (aprovado AAA).

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

### Marquee (Barra de Anuncios Superior)
- Fundo: #141414 com borda inferior em #2E2E2E.
- Tipografia: Montserrat 13px, uppercase, peso 600, cor #F5F5F5.
- Elemento separador: esfera solida de 5px de diametro na cor #FC7403.
- Espacamento de respiro: margem lateral fixa de 44px em cada lado da esfera separadora (padrao de legibilidade Cumbuca Boa).
- Animacao: rolagem horizontal continua com duracao calibrada para leitura confortavel sem interrupcoes bruscas.

---

## 5. BREAKPOINTS RESPONSIVOS

- Mobile (Prioritario / Alvo Primario): 390px (resolucao padrao de smartphones no ponto de venda por QR Code).
- Tablet: 768px (adaptacao para visualizacao em telas intermediarias e paisagem).
- Desktop: 1440px (grade centralizada com largura maxima de container de 1200px e margens generosas).

Diretriz de layout: mobile-first rigoroso. Todas as regras CSS base devem ser declaradas para telas compactas, expandindo via media queries minimas (`@media (min-width: 768px)` e `@media (min-width: 1440px)`).

---

## 6. REGRAS DE USO DA MARCA

- Fundo obrigatorio: o logotipo oficial FITBOX deve ser aplicado exclusivamente sobre fundos escuros (#0A0A0A ou superficies escuras neutras).
- Area de protecao minima: espacamento livre em todos os quatro lados equivalente no minimo a altura da letra "F" do monograma.
- Proibicoes de aplicacao:
  - Terminantemente proibido esticar, comprimir ou distorcer as proporcoes originais da marca.
  - Proibido alterar as cores do monograma ou dos textos "FIT" e "BOX".
  - Proibido aplicar o logotipo diretamente sobre fotografias com excesso de elementos visuais ou baixo contraste.
  - Proibido rotacionar ou inclinar o arquivo alem da inclinacao natural nativa da tipografia.
