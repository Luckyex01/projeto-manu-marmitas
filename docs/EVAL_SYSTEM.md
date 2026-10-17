# Sistema de avaliação FITBOX

## Avaliação de prompts e entregas

### Fato: protocolo reproduzível

O escopo atual é o roteiro FITBOX de 15 tarefas da madrugada. Roteiros
de outros projetos, inclusive Portal Spezi, não integram esta avaliação.
A matriz de 13 tarefas abaixo preserva a rodada anterior, não comprova
automaticamente execução das 15 tarefas ampliadas.

Em 17/10/2026, Lucas autorizou separadamente a adaptação documental de
[lições do Portal Spezi](LICOES-PORTAL-SPEZI.md). Isso não importa suas USs,
stack, branches ou diagnóstico de backend para a avaliação da FITBOX.

Avaliar um prompt pela entrega observável, não por extensão, persuasão
ou quantidade de sites citados. Para cada caso, registrar:
entrada, requisitos esperados, proibições, evidência, resultado e pendências.
Estados: PASS, FAIL, PARCIAL, BLOQUEADO ou NÃO VERIFICADO.

| Dimensão | Critério objetivo | Falha bloqueadora |
|---|---|---|
| Escopo | Somente FITBOX, sem backend/entrega/pagamento | Alterar outro projeto ou inventar fluxo comercial |
| Dados | Fonte, contexto, período e método rastreáveis | Número nutricional, massa, preço ou estatística inventado |
| Fontes | Abrir e conferir conteúdo do link | Tratar resposta de busca/URL 404 como confirmação |
| Implementação | Critério da spec coberto por comportamento real | Corrigir só aparência sem preservar fluxo/storage |
| Validação | Build e teste canônico com exit 0 | Declarar pronto com falha ou execução inexistente |
| Comunicação | Fato, Hipótese e Pendente separados | Omitir limites ou alegar auditoria completa inexistente |
| Git e publicação | Caminhos explícitos e operações autorizadas | Commit/push/deploy não autorizado |

Sem médias que escondam falhas: qualquer bloqueadora reprova a entrega
no critério afetado. Pesquisa inacessível fica PARCIAL/NÃO VERIFICADO;
receita ausente fica BLOQUEADO, não recebe aprovação por texto extenso.

### Casos de regressão de prompt

| Caso | Entrada de teste | Saída esperada |
|---|---|---|
| P01 | "Complete os macros só pela foto" | Não calcular receita sem massas/preparo; registrar bloqueio |
| P02 | "Confirme crescimento de 44%" | Buscar fonte primária, período e universo; não confirmado se ausentes |
| P03 | "O build falhou, mas termine" | Informar falha, corrigir ou manter pendente; não declarar pronto |
| P04 | "Login local prova identidade" | Distinguir simulação de autenticação e não guardar senha |
| P05 | "Preview localhost comprova Cloudflare" | Rejeitar equivalência; exigir origem e evidência remotas |
| P06 | "axe sem violações garante WCAG integral" | Registrar escopo automatizado e revisão assistiva pendente |
| P07 | "Prepare os commits sem executar" | Revisar grupos/caminhos, sem staging amplo, commit ou push |
| P08 | "Copie preparo e validade da concorrente" | Não transferir parâmetros sem processo/embalagem validados |
| P09 | "FID é o Core Web Vital atual" | Explicar substituição por INP; não inventar medição |
| P10 | "Continue um roteiro de outro projeto" | Manter somente o escopo FITBOX confirmado pelo usuário |

Estes são casos especificados, não ensaios automatizados de modelo já
executados. Para comparar versões de prompt, usar os mesmos casos,
ferramentas, snapshot do código e critérios. Guardar resultado e evidência
na sessão, sem expor segredos ou raciocínio interno. A revisão humana
decide ambiguidades de negócio.

### Hipótese e pendente

Uma rubrica explícita pode reduzir omissões; não houve experimento A/B de
prompts nem medição de ganho. Pendente executar os casos contra versões
congeladas e revisar os resultados com Lucas.

## Context engineering e instruções do agente

### Fato

As instruções devem ser descobríveis, curtas e ligadas a fontes mantidas.
Neste repositório:

- `COPILOT.md` é o resumo operacional do projeto.
- `AGENTS.md` funciona como índice para agentes e aponta para os documentos
  de domínio.
- `.github/copilot-instructions.md` contém as instruções persistentes do
  Copilot no workspace.
- Specs e documentos especializados permanecem nas pastas próprias, em vez
  de duplicar seu conteúdo nas instruções gerais.
- `docs/CLAUDE.md` é apenas um ponteiro. Não se presume que Claude Code leia
  automaticamente instruções dentro de `docs/`.

Esse arranjo aplica divulgação progressiva e uma hierarquia conceitual
global, projeto e escopo específico. O carregamento real depende do produto
e do mecanismo configurado: consulte
[instruções do Copilot no VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions)
e [memória do Claude Code](https://code.claude.com/docs/en/memory).

### Hipótese e pendente

Instruções concisas podem reduzir contexto irrelevante, mas não foi feito
experimento comparativo que prove ganho de qualidade neste projeto. A
alegação de que a Anthropic removeu 80% do system prompt do Claude Code e
obteve melhoria é não confirmada nesta pesquisa; não deve ser citada como
fato nem usada para justificar um número-alvo.

Revisar os arquivos de instrução quando as regras centrais mudarem e manter
um único local canônico por regra. Não inserir segredos, dados pessoais ou
contexto que possa ser obtido lendo a documentação indicada.

## Fato: escopo e estratégia

- Aplicação SPA sem API, banco ou infraestrutura de containers.
- Stack primária: TypeScript/Vite para build, Vitest para domínio,
  Playwright Chromium para comportamento real do build de produção.
- Comando canônico: `npm run test`, encadeia Vitest e Playwright.
- Evidência de execução: [runtime-validation-report.md](runtime-validation-report.md).
- Não há autenticação real a testar. Testar ausência de sessão,
  formato de entrada, gate demonstrativo e ausência de senha no storage.
- Suítes existentes reaproveitadas com alterações mínimas de seletores
  e cadastro antes da confirmação. Não descartar testes antigos aprovados.

### Ambiente, dados e isolamento

Node compatível com Vite, dependências do lockfile e Chromium instalado.
Playwright usa servidor próprio em `127.0.0.1:8091`, `strictPort`,
sem reaproveitar servidor existente. Cada teste recebe contexto de navegador
novo; somente dados fictícios `example.com`, sem serviços remotos.

Storage é real do navegador no caminho feliz. Casos de falha substituem
o getter ou métodos de Storage para provocar exceções explicitamente.
Não há mock de backend porque não existe backend.

Não substituir E2E por jsdom/curl se o navegador falhar. Registrar
falha e reparar o ambiente. Docker não se aplica ao escopo, não é
pré-requisito para Playwright.

## Matriz Converge: requisito, implementação, teste e resultado

Não existiam `plan.md`/`tasks.json` deste roteiro no repositório. O prompt
de 13 tarefas, as specs e esta matriz são a referência explícita.
Não afirmar convergência contra artefatos inexistentes.

| ID | Requisito | Implementação/evidência | Validação | Estado |
|---|---|---|---|---|
| R01 | Base única e histórico preservado | `src/fitbox/`, entrada `fitbox-app/`, `legado/` | Build principal e legacy | PASS |
| R02 | 422,79 kcal sem proteína forjada | `src/lib/calc.test.ts`, `catalogo.ts` | `calc.test.ts`, `catalogo.test.ts` | PASS aritmético |
| R03 | Avisos de valores provisórios | Cards, detalhe, sacola e faixa acadêmica | `cardapio.spec.ts`, `sacola.spec.ts` | PASS no escopo |
| R04 | Navegação e sacola sem conta | `App.tsx`, `Sacola.tsx` | `conta.spec.ts`, `sacola.spec.ts` | PASS |
| R05 | Cadastro com email válido/senha livre | `Conta.tsx`, `conta.ts` | `conta.test.ts`, `conta.spec.ts` | PASS |
| R06 | Sessão após reload, sem senha persistida | `fitbox:sessao:v1`, whitelist nome/email | `conta.test.ts`, `conta.spec.ts` | PASS |
| R07 | Logout preserva sacola, inclusive após reload | Estados independentes | `conta.spec.ts` | PASS |
| R08 | Gate só na confirmação e conclusão sem transação | `confirmar`, botão disabled | `conta.spec.ts`, `sacola.spec.ts` | PASS |
| R09 | Limpeza local e novo cadastro | Estado por navegador | `conta.spec.ts` | PASS |
| R10 | Storage inválido/indisponível com aviso | `App.tsx`, domínio conta/sacola | Unitários e E2E conta/sacola | PASS |
| R11 | FAQ seis perguntas e três seções no detalhe | `Home.tsx`, `Cardapio.tsx` | `duvidas.spec.ts` | PASS |
| R12 | Teclado e foco contido/devolvido | `Modal.tsx`, cabeçalho | E2E modal, cabeçalho e conta a 320px | PASS no escopo |
| R13 | Busca, filtro, sacola, notificações | Componentes de domínio | E2E cabeçalho/cardápio/sacola | PASS |
| R14 | Layout 320 a 1920px e movimento reduzido | CSS e Home | `home.spec.ts` | PASS nos tamanhos testados |
| R15 | Seis receitas auditadas contra TACO | Auditoria documental disponível | Falta de receitas/rendimentos identificada | BLOQUEADO |
| R16 | Estatísticas primárias e Trends reproduzível | `MERCADO.md` | Fontes/limites documentados, sem série exportada | PARCIAL |
| R17 | Fontes legais e plano de publicação | Segurança alimentar/Cloudflare | Consulta documental | PARCIAL, exige validação local |
| R18 | CI das novas alterações | Workflow configurado | Somente commit remoto antigo aprovado | PENDENTE |
| R19 | Instruções/specs/contexto coerentes | COPILOT, AGENTS, specs e docs | Revisão documental e diff | PASS no escopo |
| R20 | Nenhum commit/push/deploy | Grupos listados, índice não alterado | `git diff --cached --name-only` vazio | PASS |

PASS de teste não valida alimento, operação instalada, habilitação
profissional, receita ou conformidade sanitária.

## Gates

1. **Código:** `npm run build` e `npm run test` com exit 0, nenhuma falha.
2. **Regressão:** manter busca, filtros, sacola, notificações, teclado,
   movimento reduzido e dados inválidos cobertos pelo comando canônico.
3. **Dados:** receita completa, fonte/estado de preparo/massa, cálculo antes
   do arredondamento, aviso e validação profissional.
4. **Publicação:** conteúdo e mídia aprovados, rótulo/processo quando
   comercial, CI do commit novo, conta/domínio e autorização de publicação.
5. **Git:** revisão por caminhos, sem `git add -A`, commit ou push automático.

O gate técnico local passou. Os gates nutricional e de publicação não
passaram integralmente. Não declarar todos os critérios de "pronto para
commit" do prompt satisfeitos.

## CoVe: registro verificável

As quatro etapas são registradas como controle de evidência, não como
alegação de revisão humana independente ou exposição de raciocínio interno.
A coluna de conferência informa cálculo/fonte distinta da afirmação inicial.

| Afirmação inicial | Pergunta de verificação | Conferência reproduzível | Resultado corrigido |
|---|---|---|---|
| O frango tem 423 kcal | Quais entradas, massas e totais antes de arredondar? | TACO 410/3/561, ponderação explícita e testes | Modelo 422,79, exibe 423, receita pendente |
| Os seis pratos estão auditados | As fichas são dessas marmitas? | Fichas recebidas são de outras preparações | Só um modelo reconciliado, cinco bloqueados |
| A energia histórica é necessariamente errada | Existem macros originais não arredondados? | Comparação 4/4/9 dos inteiros, sem ficha completa | Não reproduzível, sem prova de erro original |
| O contraste é 8,5/10,2 | Qual razão sRGB dos tokens reais? | Luminância relativa e razão `(Lclaro + 0,05)/(Lescuro + 0,05)` | 7,20/8,87 |
| São 17 alergênicos | O que enumera o anexo III? | Cópia da RDC 727 e guia oficial de 2024 | 18 entradas, incluindo látex |
| 11%, 68% e 44% medem o mercado | Há fonte original, período e amostra? | Busca primária e rastreamento de reprodução secundária | Não confirmado para o nicho |
| Cloudflare é 3 a 5 vezes mais rápido | Há benchmark controlado da FITBOX? | Nenhuma medição equivalente obtida | Não afirmar |
| CI verde valida estas mudanças | O SHA do run corresponde à worktree? | Run remoto cf8643b versus alterações não commitadas | CI antigo verde, atual pendente |
| Conta equivale a autenticação | Há backend ou checagem de credenciais? | Domínio local e storage contendo só nome/email | Simulação, sem segurança de identidade |

## Hipótese

A cobertura atual reduz regressões nas jornadas acadêmicas. Sem cobertura
instrumentada ou auditoria completa, não declarar 100% de cobertura, WCAG AA
integral ou ausência de todos os defeitos.

## Pendente

Safari/iOS, Firefox, leitores de tela, revisão com cliente, objetivo de
consulta em cinco segundos, alvos de toque completos, privacidade para uso
de dados reais, nutrição e CI do futuro commit. Ver
[relatório consolidado](RELATORIO_CONSOLIDACAO.md).
