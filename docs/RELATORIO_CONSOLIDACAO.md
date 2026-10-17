# Consolidação FITBOX

Data: 16/10/2026. Relatório do roteiro de 13 tarefas, com limites
explícitos. Nenhum commit, push, staging ou deploy foi executado.

## Fato

### Resultado por tarefa

| Tarefa | Executado | Situação e limite |
|---|---|---|
| 1. Itens soltos | Entrada `fitbox-app/` examinada e mantida; React antigo arquivado em `legado/`; PDF movido para `docs/fontes/` com hash preservado; `.vscode/` ignorado | Concluído. `prototipo/` ainda é dependência de assets/CSS |
| 2. Patches | Teste 49,40/47,32/3,99 e 422,79; estatística de rejeição substituída por hipótese sem medição | Concluído |
| 3. Docs | Base, login, cores de macros, marquee, pontuação, contrastes e status profissional corrigidos | Concluído no escopo revisado |
| 4. Conta | Cadastro/login locais, gate, reload, logout sem perder sacola, senha não persistida e falhas storage | Implementado e validado com unitários/E2E |
| 5. Mercado | Fontes solicitadas, concorrentes, estatísticas, Trends e limites rastreados | Documentado; tamanho/crescimento do nicho não comprovados |
| 6. Referências | Home, catálogo/produto, ajuda/FAQ, Sobre, entrega e pagamento nas superfícies acessíveis | Documentado; checkout real e todas as páginas não validados |
| 7. Legislação | RDC 429/IN75, alergênicos/RDC727, conservação/RDC216 e checklist de publicação | Documentado; exige conferência normativa/local profissional |
| 8. TACO | Entradas/códigos/páginas e revisão dos seis pratos, discrepâncias e fichas ausentes | Parcial: um modelo reconciliado, cinco receitas bloqueadas |
| 9. UX | FAQ próprio, três seções no detalhe, matriz Nielsen, WCAG e teclado a 320px | Código validado; sem estudo de usabilidade real |
| 10. Contexto | AGENTS, EVAL_SYSTEM, CHANGELOG, README/specs/contexto sincronizados, matriz Converge/CoVe | Concluído documentalmente, bloqueios preservados |
| 11. Cloudflare | Limites, build, integração, origens do storage e Pages/Workers documentados | Preparação apenas, sem criar conta/projeto/deploy |
| 12. Validação | Build, 30 unitários, 30 E2E e build legado aprovados; preview HTTP 200; CI consultado | Local PASS; CI da worktree pendente |
| 13. Revisão/commits | Diff/configs/inventário revistos e grupos por caminhos abaixo | Sem staging, commit ou push |

O vídeo também foi revisto por amostragem de frames. Textos artificiais,
entrega/encomendas e promessa de minutos conflitam com a proposta. A legenda
IA permanece e a substituição antes de uso comercial está registrada.

### Documentos de evidência

- [Mercado e fontes](MERCADO.md).
- [Referências, vídeo e UX](REFERENCIAS_UX.md).
- [Segurança alimentar e legislação](SEGURANCA_ALIMENTAR.md).
- [Auditoria dos seis pratos](AUDITORIA_NUTRICIONAL.md).
- [Preparação Cloudflare](CLOUDFLARE_PAGES.md).
- [Matriz Converge e controle CoVe](EVAL_SYSTEM.md).
- [Resultados de execução](runtime-validation-report.md).

### Validação final

| Pergunta | Resposta |
|---|---|
| `npm run build` passou? | Sim, exit 0, TypeScript e Vite |
| `npm run test` passou? | Sim, exit 0, 30 unitários e 30 execuções E2E |
| Quantas jornadas? | 15 jornadas, cada uma nos perfis mobile e desktop Chromium |
| Build legado passou? | Sim, exit 0 |
| Login/cadastro/reload/logout/confirmar testados? | Sim, incluindo preservar sacola e limpar storage |
| Senha persistida? | Não; teste confere exatamente nome/email na sessão |
| localStorage indisponível? | Avisado; estado em memória e riscos de reaparecimento informados |
| Teclado no formulário? | Tab/Shift+Tab/Escape e retorno ao acionador testados a 320px |
| CI verde? | Run remoto antigo success; mudanças locais não foram enviadas |
| Índice Git alterado? | Não, `git diff --cached --name-only` vazio |
| Deploy realizado? | Não |

O CI remoto consultado é
[38433848217](https://github.com/Luckyex01/projeto-manu-marmitas/actions/runs/38433848217),
SHA `cf8643b0a9e17fc481c89d1fdc39b424a0423615`, de 13/10/2026.
HEAD e referência local `origin/main` apontam para esse mesmo SHA;
`git log origin/main..HEAD` não mostrou commits exclusivos locais.
A descrição de três commits locais não enviados no prompt estava
desatualizada. Isso não significa que as mudanças atuais foram publicadas.

### Estado do repositório

- Aplicação e testes novos permanecem não rastreados até revisão/staging.
- Configuração, documentação e correções permanecem modificadas.
- As remoções de `index.html` e dos seis arquivos React antigos em `src/`
  são o arquivamento em `legado/`, não descarte de implementação.
- `src/lib/calc.ts` permanece compartilhado e não foi removido.
- `fitbox-app/index.html` é necessário ao build, não duplicação de componentes.
- `prototipo/` permanece por referência visual e dependência efetiva.
- O PDF anteriormente solto era não rastreado; movê-lo não gera deleção
  de arquivo já versionado. Conteúdo preservado por SHA-256.
- `dist/`, `dist-legado/`, relatórios, screenshots e `.vscode/` não integram
  os grupos de commit.

### Grupos propostos, não executados

São caminhos explícitos para revisão. Não foi usado `git add -A`, nem
alterado o índice. O segundo grupo mantém implementação, configuração
e testes juntos para não criar estado intermediário sem build/suíte.

#### 1. Correção e rastreabilidade nutricional

Mensagem sugerida: `fix: reconcilia exemplo TACO e documenta bloqueios do catalogo`

```text
src/lib/calc.test.ts
docs/CALCULO_NUTRICIONAL.md
docs/AUDITORIA_NUTRICIONAL.md
```

#### 2. Aplicação canônica e fluxo demonstrativo validado

Mensagem sugerida: `feat: consolida FITBOX React com conta local FAQ e testes`

Adicionar/modificar:

```text
fitbox-app/index.html
src/fitbox/App.tsx
src/fitbox/Cabecalho.tsx
src/fitbox/Cardapio.tsx
src/fitbox/Conta.tsx
src/fitbox/Home.tsx
src/fitbox/Marca.tsx
src/fitbox/Modal.tsx
src/fitbox/Notificacao.tsx
src/fitbox/Sacola.tsx
src/fitbox/assets.d.ts
src/fitbox/catalogo.test.ts
src/fitbox/catalogo.ts
src/fitbox/conta.test.ts
src/fitbox/conta.ts
src/fitbox/main.tsx
src/fitbox/sacola.test.ts
src/fitbox/sacola.ts
src/fitbox/styles.css
legado/App.tsx
legado/data/products.ts
legado/index.html
legado/lib/storage.ts
legado/main.tsx
legado/styles.css
legado/types.ts
e2e/cabecalho.spec.ts
e2e/cardapio.spec.ts
e2e/conta-helper.ts
e2e/conta.spec.ts
e2e/duvidas.spec.ts
e2e/home.spec.ts
e2e/sacola.spec.ts
playwright.config.ts
package.json
package-lock.json
tsconfig.json
vite.config.ts
vitest.config.ts
.github/workflows/ci.yml
.gitignore
specs/home.md
specs/cardapio.md
specs/sacola.md
```

Registrar as remoções correspondentes ao arquivo histórico:

```text
index.html
src/App.tsx
src/data/products.ts
src/lib/storage.ts
src/main.tsx
src/styles.css
src/types.ts
```

#### 3. Contexto, pesquisa e avaliação

Mensagem sugerida: `docs: consolida pesquisa limites e avaliacao FITBOX`

```text
.github/copilot-instructions.md
AGENTS.md
CHANGELOG.md
COPILOT.md
README.md
docs/contexto-fitbox.md
docs/DESIGN_SYSTEM.md
docs/MERCADO.md
docs/REFERENCIAS_UX.md
docs/SEGURANCA_ALIMENTAR.md
docs/CLOUDFLARE_PAGES.md
docs/EVAL_SYSTEM.md
docs/runtime-validation-report.md
docs/RELATORIO_CONSOLIDACAO.md
```

#### 4. Preservação da fonte recebida

Mensagem sugerida: `docs: organiza copia TACO recebida com hash de integridade`

```text
docs/fontes/README.md
docs/fontes/tabela-brasileira-de-composicao-de.pdf
```

Revisar o custo do binário de aproximadamente 46 MiB antes de incluí-lo
no histórico. Não foi convertido, compactado ou apagado.

#### 5. Pontuação nas referências históricas

Mensagem sugerida: `docs: padroniza titulos das referencias preservadas`

```text
prints/video.html
prototipo/index.html
```

## Atualização da execução do prompt unificado

Esta seção complementa o registro anterior, cuja contagem de E2E refletia uma
execução anterior da suíte. A validação abaixo foi executada após as mudanças
de código e documentação desta rodada.

### Fato

- As seis correções críticas do prompt foram conferidas. O teste energético
  já usa 49,40 g de proteína e verifica 422,79 kcal; a estatística de preço
  está marcada como hipótese; os contrastes estão corrigidos; os botões de
  adição incluem o prato no nome acessível; `COPILOT.md` aponta `src/fitbox/`
  como base oficial.
- `COPILOT.md` foi reduzido a um resumo operacional de 188 palavras e aponta
  para as fontes de contexto, sem replicar a documentação de domínio.
- Foram criados `docs/ACESSIBILIDADE.md`, `docs/PERFORMANCE.md`,
  `docs/SEGURANCA_LOCALSTORAGE.md` e `docs/CLAUDE.md`. README e specs foram
  sincronizados com os documentos e o teste axe passou a incluir a tag
  WCAG 2.2 AA.
- `npm run build`: passou, exit 0. TypeScript compilou e Vite gerou o bundle.
- `npm run test`: passou, 30 testes unitários e 38 casos Playwright. Os
  testes axe executaram cinco estados em quatro larguras, nos projetos
  mobile e desktop, totalizando 40 análises por suíte completa.
- `npm run legacy:build`: passou, exit 0.
- `git diff --check`: passou, sem erros de whitespace.
- `git status --short -- fitbox/`: vazio. Nenhum material original em
  `fitbox/` foi modificado.
- `git diff --cached --name-only`: vazio. Nenhum arquivo foi staged.
- `git check-ignore` confirmou `dist/`, `dist-legado/`, `test-results/` e
  `playwright-report/` ignorados.
- Não houve commit, push, deploy ou alteração destrutiva.

### Pesquisa e documentação

As referências primárias, resultados parciais e limitações estão nos
documentos vinculados em
[README.md](../README.md): [Mercado](MERCADO.md),
[Referências UX](REFERENCIAS_UX.md), [Segurança alimentar](SEGURANCA_ALIMENTAR.md),
[Acessibilidade](ACESSIBILIDADE.md), [Performance](PERFORMANCE.md) e
[Segurança da persistência local](SEGURANCA_LOCALSTORAGE.md).

Os claims quantitativos não confirmados sobre percentuais de cobertura axe,
economia AVIF e redução de prompt foram explicitamente rotulados como não
confirmados. Nenhuma estimativa nutricional adicional foi criada. A
legislação documentada não é parecer jurídico e depende de conferência
profissional e local antes de qualquer comercialização.

### Grupos preparados para revisão, não executados

Os grupos anteriores continuam sujeitos à comparação com o estado real do
worktree. Atualizar o grupo de documentação para incluir estes caminhos:

```text
docs/ACESSIBILIDADE.md
docs/CLAUDE.md
docs/PERFORMANCE.md
docs/SEGURANCA_LOCALSTORAGE.md
```

No grupo de aplicação/testes, `e2e/acessibilidade.spec.ts` contém a inclusão
da tag axe `wcag22aa`; `docs/AUDITORIA_TECNICA.md`, `specs/home.md` e
`specs/cardapio.md` devem permanecer sincronizados com essa cobertura. O
README deve ser incluído no grupo documental. Não foi executado `git add`,
commit ou push nesta preparação.

Complemento de caminhos ausentes nas listas anteriores:

```text
# Grupo 2, aplicação e testes
e2e/acessibilidade.spec.ts

# Grupo 3, contexto, pesquisa e avaliação
docs/ACESSIBILIDADE.md
docs/AUDITORIA_TECNICA.md
docs/CLAUDE.md
docs/PERFORMANCE.md
docs/SEGURANCA_LOCALSTORAGE.md
```

### Hipótese

Filtros simples, hierarquia mobile e instruções enxutas são decisões
razoáveis para o escopo observado, mas não há experimento de conversão ou
estudo com usuários que comprove aumento de desempenho comercial.

### Pendente

- As cinco receitas sem fichas completas continuam bloqueadas para auditoria
  nutricional.
- Cloudflare Pages não foi publicado/testado em origem remota.
- Leitores de tela, voz, dispositivos reais e auditoria manual WCAG ainda
  não foram executados.
- A troca de sessão para `sessionStorage` permanece pendente por conflito
  entre o item de pesquisa 4.5 e as regras/specs atuais de `localStorage`.
- Checkout/cadastro autenticado dos concorrentes não foi percorrido com
  dados reais; pesquisas inacessíveis e estatísticas sem fonte primária
  continuam não confirmadas.

## Hipótese

FAQ, informação organizada e ausência de barreira na exploração podem
reduzir fricção. Não foi medida conversão, tempo até compra, crescimento
do mercado local, aceitação de preço ou rentabilidade.

## Pendente

### Depende de Manuela e profissional habilitada

- Fichas reais das seis marmitas, preparo, massas prontas, rendimentos,
  óleo, sal, temperos, espécie/corte e receita de purê/falafel.
- Preços/custos, ingredientes completos, alergênicos e contaminação cruzada.
- Método energético, arredondamento, tabela completa e rotulagem frontal.
- Processo térmico, embalagem, validade, conservação e preparo validados.
- Confirmar autoria/direitos das fotos e correspondência com cada receita.
- Aprovar visual novo, FAQ, conta demonstrativa e substituição do vídeo IA.
- Não atribuir habilitação profissional a Manuela, apresentada como estudante.

### Depende de Lucas ou dados externos

- Revisar os grupos e decidir sobre versionar o PDF grande.
- Autorizar commit/push/publicação em etapas separadas, quando desejar.
- CI do novo commit/PR, conta/domínio Cloudflare e permissão GitHub restrita.
- Região e academias piloto, concorrentes locais e medição comercial real.
- Relatórios primários de mercado e exportação reproduzível do Trends.
- Conferência de legislação consolidada e regras sanitárias locais.

### Veredito

**Código demonstrativo validado localmente e documentação disponível para
revisão. Não estão satisfeitos todos os critérios de sucesso do prompt:**
cinco receitas continuam sem auditoria completa e o CI das alterações novas
não existe sem commit/push. Não houve lançamento comercial nem autorização
nutricional por parte desta execução.
