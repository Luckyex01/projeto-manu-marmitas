# Validação runtime FITBOX

Data: 16/10/2026. Alvo: aplicação principal estática e build do React arquivado.

## Fato

### Correção visual das fotos institucionais

A inclusão de dimensões intrínsecas nas imagens deixou a altura HTML de
900 px prevalecer sobre o enquadramento CSS 3:4. A regressão foi
reproduzida em teste: duas execuções falharam antes da correção.
Foi acrescentado `height: auto` somente em `.trust__photos img`,
preservando dimensões intrínsecas, WebP e layout anterior.

Validação final: `npm run build && npm run test`, exit code 0.
Build com 48 módulos, 30 unitários aprovados e 38 execuções Playwright
aprovadas em 24,3 s, incluindo axe e a asserção de proporção das duas
fotos em 320, 390, 697, 768, 900, 1024, 1440 e 1920 px.
`git diff --check` também retornou exit code 0.

No preview compartilhado recarregado, cada foto passou de 266 x 900 px
para aproximadamente 266 x 354,66 px, proporção 3:4. Diagnósticos do
editor sem erros nos dois arquivos de código/teste alterados.
Não houve staging, commit ou push.

### Rodada anterior, preservada como histórico

Comando executado no terminal:

```sh
export PATH=/home/lucas/.nvm/versions/node/v24.21.0/bin:$PATH
npm run build && npm run test && npm run legacy:build
```

| Camada | Resultado | Exit code | Evidência |
|---|---|---:|---|
| Build principal | PASS | 0 | TypeScript sem erros, Vite 40 módulos, `dist/` |
| Vitest | PASS | 0 | 4 arquivos, 30 testes aprovados, zero falhas |
| Playwright | PASS | 0 | 15 jornadas × 2 perfis, 30 aprovações, 18,8 s |
| Build legado | PASS | 0 | TypeScript e Vite 18 módulos, `dist-legado/` |
| Preview local | PASS | 0 | HTTP 200 em `127.0.0.1:4173` |
| Diff | PASS | 0 | `git diff --check` sem erros |
| Diagnósticos do editor | PASS | não aplicável | Nenhum erro reportado |

Ambiente efetivo: Node 24.21.0, React 19.3.0, Vite 8.3.4,
Vitest 5.0.4, Playwright 1.64.0. A faixa do manifesto Playwright é
`^1.56.1`, mas lockfile e pacote instalado resolvem 1.64.0.
Não foi necessário atualizar/instalar pacotes nesta consolidação.
Os testes usam as APIs de avaliação do navegador já adotadas no repositório,
sem depender de uma sugestão de API não conferida.

```text
environment:
  docker: NOT_APPLICABLE, SPA sem banco ou servicos de infraestrutura
  node: AVAILABLE, v24.21.0
  playwright: AVAILABLE, 1.64.0, Chromium executou 30 testes
  infra-tier: NOT_APPLICABLE
  browser-tier: PRIMARY(Playwright), sem fallback
startup: PASS, servidor de teste strictPort 8091 e preview 4173 HTTP 200
integration: PASS, exit_code: 0, 30 testes de dominio, sem integracao remota
e2e: PASS, exit_code: 0, passed: 30, failed: 0, skipped: 0
overall: NEEDS_SIGNOFF, codigo local aprovado, receitas e publicacao bloqueadas
```

### Jornadas

- Home/tutorial, ausência de overflow nos tamanhos testados e CTA.
- Movimento reduzido e falha do vídeo com fallback.
- Busca normalizada, categorias, limpeza e sacola preservada.
- Menu por teclado, Escape e devolução de foco.
- Consulta do exemplo nutricional e adição no modal.
- Foco contido, clique externo e fechamento do detalhe.
- Notificação acima do modal, cinco segundos, reinício e fade.
- Sacola: totais em centavos, quantidades, remover, reload e confirmar.
- Dados inválidos e falhas de escrita/limpeza da sacola com aviso.
- Cadastro, email inválido, sessão após reload, logout persistido,
  login com senha livre diferente, confirmar e novo cadastro após limpeza.
- Storage totalmente bloqueado e sessão inválida.
- Formulário a 320 px: Tab/Shift+Tab, Escape, retorno e sem overflow.
- FAQ de seis perguntas e detalhe com três seções.

### Reuso e mudanças de teste

| Arquivo | Decisão | Motivo |
|---|---|---|
| `e2e/cardapio.spec.ts` | Reuso com ajuste | Heading level 2 após inclusão das novas seções |
| `e2e/sacola.spec.ts` | Reuso com ajuste | Cadastro antes de confirmar e alerta específico |
| `e2e/conta.spec.ts` | Novo | Fluxo e falhas da conta, recarga/logout e teclado |
| `e2e/duvidas.spec.ts` | Novo | FAQ e organização do detalhe |
| `src/fitbox/conta.test.ts` | Novo | Validação, serialização sem senha e storage |
| `src/lib/calc.test.ts` | Correção | Substituição do caso sintético por totais auditáveis |

Falhas intermediárias de seletor/asserção foram corrigidas antes da rodada
completa. Não são omitidas nem usadas para afirmar que uma rodada parcial
foi sucesso integral.

### Evidências locais

Relatório navegável em `playwright-report/index.html`; capturas e traces
em `test-results/`, ambos ignorados pelo Git. Foram revisadas capturas
da conta mobile/desktop, FAQ mobile e detalhe nutricional mobile.
A captura longa de um elemento pode incluir o cabeçalho sticky sobreposto;
não é evidência isolada de conformidade visual completa.

CI consultado:
[run 38433848217](https://github.com/Luckyex01/projeto-manu-marmitas/actions/runs/38433848217),
success, SHA `cf8643b0a9e17fc481c89d1fdc39b424a0423615`.
Esse run é de 13/10/2026 e não contém esta worktree.

## Hipótese

As jornadas cobrem os riscos principais da simulação. Emulação Chromium
mobile não equivale a teste em aparelho físico nem a cobertura de todos
os navegadores e recursos assistivos.

## Pendente

Revisão da cliente, receitas/rotulagem, publicação autorizada, CI das
alterações novas e validação em Safari/iOS/Firefox/leitores de tela.
