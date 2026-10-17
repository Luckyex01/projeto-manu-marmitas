# Spec: Cardápio

## 1. USER STORY
Como praticante de musculação atento aos macros (João),
quero visualizar os pratos disponíveis, seus macronutrientes e a tabela completa,
para selecionar a marmita que atende minha meta nutricional do dia.

## 2. CRITÉRIOS DE ACEITAÇÃO
- A busca do cabeçalho filtra nomes e ingredientes localmente ao enviar o formulário, ignorando acentos e diferenças de maiúsculas. Todos os termos devem corresponder ao prato; combinar com a categoria selecionada.
- Mostrar termo aplicado, contagem e estado sem resultados. Limpar a busca restaura os resultados da categoria atual, sem alterar a sacola.
- Dado que o usuário está na seção de cardápio, quando visualizar os cards, então cada prato deve exibir foto real, nome, peso (g), calorias (kcal), proteína em destaque (g) e preço (R$).
- Dado que o usuário seleciona um chip de filtro (Todos, Frango, Peixe, Carne ou Vegetais), quando o filtro for acionado, então apenas os pratos da respectiva categoria de ingrediente proposto devem ser exibidos sem recarregar a página. Não oferecer classificações "Low carb", "Vegano" ou "+ Proteína" sem composição e critérios validados.
- Dado que o usuário clica em "Ver tabela", quando o modal abrir, então deve exibir a tabela nutricional completa no padrão TACO v.4 com o aviso "Estimativa TACO 4ª ed., a validar pela nutricionista".
- A tabela é uma apresentação demonstrativa dos nutrientes disponíveis, não um rótulo regulatório completo. Calcular energia antes do arredondamento conforme `docs/CALCULO_NUTRICIONAL.md`; não recalcular a partir dos macros inteiros exibidos.
- Cada card e modal com dados provisórios deve apresentar "a validar pela nutricionista", inclusive junto aos preços sugeridos. Não inferir composição, classificação alimentar ou disponibilidade pela fotografia.
- O botão de adição deve manter nome acessível que contenha seu texto visível e identifique o prato, por exemplo "Adicionar à sacola: [nome do prato]".
- Dado que o modal de detalhes está aberto, quando o usuário clicar no botão de fechar ou fora da área do modal, então o modal deve ser encerrado.
- O modal deve ter nome acessível, aceitar Escape, conter o foco enquanto aberto e devolvê-lo ao acionador ao fechar.
- Separar o botão "Adicionar à sacola" do aviso imediatamente anterior por pelo menos 12 px.
- Nos cards, exibir proteína em verde e carboidrato em laranja, correspondendo às cores da barra de distribuição.
- Separar o detalhe em "Sobre o prato", "Ingredientes" e "Informação nutricional". Informar que alergênicos e contaminação cruzada não foram fornecidos, sem inferir ausência ou presença por fotografia.

## 3. FLUXOS PRINCIPAIS
- Fluxo de Exploração: Usuário filtra por categoria -> Compara calorias e proteínas nos cards -> Toca no prato -> Analisa ingredientes e tabela detalhada.
- Fluxo de Adição: Usuário visualiza o prato -> Clica em "Adicionar à Sacola" no card ou no modal -> Contador da sacola é atualizado.
- A adição apenas seleciona itens para a demonstração de `specs/sacola.md`. Não realiza cobrança, envia pedido, reserva estoque ou libera retirada. Não incluir Pix ou botões de pagamento no card ou no modal.
- Ao adicionar pelo modal, a notificação de atualização deve aparecer acima da tabela e de seu fundo escurecido, sem fechar o modal ou mover o foco.
- A notificação permanece por 5 segundos, com barra verde de tempo restante na base, e desaparece com fade de 240 ms. Cada atualização reinicia o prazo, inclusive com texto repetido. Respeitar a preferência de movimento reduzido, sem animação nesse modo.
- A regressão automatizada de acessibilidade usa axe nas larguras 320, 390, 768 e 1440 px e nos estados descritos em `docs/ACESSIBILIDADE.md`; isso não substitui revisão manual.

## 4. FORA DE ESCOPO
- Customização de prato ou substituição de ingredientes.
- Selos regulamentados Anvisa ("Alto teor de proteína", "Sem glúten").
- Chamadas para API externa ou banco de dados remoto.
- Pagamentos reais ou simulados, códigos Pix, disponibilidade de estoque e reservas.

## 5. DEPENDÊNCIAS
- Catálogo estático provisório de 6 pratos. `docs/CALCULO_NUTRICIONAL.md` audita apenas o exemplo de frango, arroz e feijão; os demais pratos continuam pendentes de auditoria e validação.
- Implementação principal em `src/fitbox/`; o protótipo original e o React legado são preservados.
- Fotos reais tratadas em `prototipo/assets/`.
