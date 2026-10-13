# Spec: Cardápio

## 1. USER STORY
Como praticante de musculação atento aos macros (João),
quero visualizar os pratos disponíveis, seus macronutrientes e a tabela completa,
para selecionar a marmita que atende minha meta nutricional do dia.

## 2. CRITÉRIOS DE ACEITAÇÃO
- Dado que o usuário está na seção de cardápio, quando visualizar os cards, então cada prato deve exibir foto real, nome, peso (g), calorias (kcal), proteína em destaque (g) e preço (R$).
- Dado que o usuário seleciona um chip de filtro (ex: "Low carb", "Vegano"), quando o filtro for acionado, então apenas os pratos com a respectiva tag devem ser exibidos sem recarregar a página.
- Dado que o usuário clica em "Ver tabela", quando o modal abrir, então deve exibir a tabela nutricional completa no padrão TACO v.4 com o aviso "Estimativa TACO 4ª ed. — a validar pela nutricionista".
- Dado que o modal de detalhes está aberto, quando o usuário clicar no botão de fechar ou fora da área do modal, então o modal deve ser encerrado.

## 3. FLUXOS PRINCIPAIS
- Fluxo de Exploração: Usuário filtra por categoria -> Compara calorias e proteínas nos cards -> Toca no prato -> Analisa ingredientes e tabela detalhada.
- Fluxo de Adição: Usuário visualiza o prato -> Clica em "Adicionar à Sacola" no card ou no modal -> Contador da sacola é atualizado.

## 4. FORA DE ESCOPO
- Customização de prato ou substituição de ingredientes.
- Selos regulamentados Anvisa ("Alto teor de proteína", "Sem glúten").
- Chamadas para API externa ou banco de dados remoto.

## 5. DEPENDÊNCIAS
- Base de dados estática dos 6 pratos calculados em `docs/CALCULO_NUTRICIONAL.md`.
- Fotos reais tratadas em `prototipo/assets/` ou `src/assets/`.
