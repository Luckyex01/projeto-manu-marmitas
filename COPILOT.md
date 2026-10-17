# FITBOX: contexto operacional

Esta aplicação acadêmica é uma vitrine e simulador de pedido para marmitas
congeladas em freezer horizontal de autoatendimento dentro de academias.
Não há backend, pagamento, pedido real, entrega, atendente ou WhatsApp.

- Base oficial: `src/fitbox/`. `fitbox-app/` fornece a entrada HTML.
- Preserve `fitbox/` como material original, `prototipo/` como fonte de
  assets/CSS e `legado/` como arquivo histórico.
- O fluxo é Home, Cardápio/detalhe, Sacola, conta demonstrativa somente na
  confirmação e confirmação demonstrativa. Não persista senha nem alegue
  autenticação real.
- Não invente receitas, gramaturas, preços, nutrientes, alergênicos ou
  evidências de operação. Valores nutricionais provisórios devem dizer
  "a validar pela nutricionista". Não use selos ou alegações sem respaldo.
- Mantenha mobile-first, acessibilidade, tipos e padrões locais; evite
  abstrações prematuras. Sincronize documentação e specs com o código.
- Antes de concluir alterações de código, execute `npm run build` e
  `npm run test`; relate os resultados reais.
- Não faça commit, push, staging amplo ou operação destrutiva sem autorização.
- Em análises, separe Fato, Hipótese e Pendente.

Leia [AGENTS.md](AGENTS.md), [contexto do produto](docs/contexto-fitbox.md),
[design system](docs/DESIGN_SYSTEM.md), [cálculo nutricional](docs/CALCULO_NUTRICIONAL.md)
e as specs pertinentes. As regras específicas do Copilot estão em
`.github/copilot-instructions.md`.

## Economia

Efficiency para tarefas mecânicas, Balance para raciocínio, Intelligence
só para decisões críticas. Uma tarefa por prompt. Output ≤100 palavras
no chat; relatórios completos em `docs/`. Fechar sessão quando contexto
>30%, após atualizar o handoff local. Git no terminal, não na IA:
operações de escrita ficam com Lucas; consultas Git de leitura são permitidas.

Esses nomes são preferências de perfil quando disponíveis, não garantia
de seleção automática. Se o consumo de contexto não estiver visível,
não inventar percentual. Handoff somente em `.ce-local/HANDOFF.md`,
ignorado pelo `.git/info/exclude`.

## OWASP GenAI

O agente é não confiável. Referência: OWASP Top 10 para LLMs, edição 2025.

- LLM06 (Excessive Agency): Interactive + Manual, com aprovação humana para
  ações de impacto e privilégios mínimos. É política de trabalho; este
  documento não configura nem comprova o modo de permissões da ferramenta.
- LLM02 (Sensitive Information Disclosure): nunca anexar credenciais;
  não registrar segredos em prompts, relatórios ou handoffs.
- LLM05 (Improper Output Handling): todo código gerado passa por review e
  testes antes de adoção; validar saídas antes de executá-las.

Fontes e limites da adaptação: [lições aplicadas](docs/LICOES-PORTAL-SPEZI.md).
