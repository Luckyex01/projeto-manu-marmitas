# Lições do Portal Spezi aplicadas à FITBOX

Data: 17/10/2026. Escopo autorizado: leitura e documentação, sem alterar
código, instalar dependências, configurar permissões do editor, fazer
staging, commit ou push.

## Fato

### Origem e limites

As lições foram fornecidas por Lucas nesta tarefa. Não foi aberto outro
repositório nem auditado o Portal Spezi. Angular, Spring Boot, três USs e
branches empilhadas são contexto informado, não arquitetura FITBOX.
Só foram adaptadas práticas pertinentes à SPA React/Vite/TypeScript.
Não houve importação de backend, autenticação ou diagnóstico HTTP.

### Registro por item

| Item | Ação documental e evidência | Limite |
|---|---|---|
| Handoff | Criado exclusivamente em `.ce-local/HANDOFF.md`, com sete seções e prompt de 14 linhas | Local, não versionável; sem cópia em `docs/`, conforme confirmação de Lucas |
| Exclusão local | `.ce-local/` acrescentado a `.git/info/exclude`; `git check-ignore -v .ce-local/HANDOFF.md` identifica essa regra | `.gitignore` versionado não alterado nesta tarefa; já continha mudanças anteriores |
| Economia | Seção em [COPILOT.md](../COPILOT.md) com perfis, uma tarefa por prompt, limite de chat e handoff antes de fechar | Nomes de perfis não configuram modelos; percentual de contexto depende de indicador disponível |
| OWASP GenAI | Seção em [COPILOT.md](../COPILOT.md), referências corrigidas para a edição 2025 com aprovação de Lucas | Política documental, não configuração efetiva de Interactive/Manual |
| ABC | [ANALISE-ABC.md](ANALISE-ABC.md): seis arquivos medidos por AST, vetores, magnitude, faixas, funções, método e script | Variante local explicitada; sem refatoração e sem gate CI |
| Contraste/toque | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): 6,90:1 e distinção entre meta interna de 44 px e critério AA de 24 x 24 CSS px com exceções | Não certifica toda a interface |
| INP | [PERFORMANCE.md](PERFORMANCE.md) já registra que INP substituiu FID | Verificado sem alteração; não foi medida uma nova métrica |
| Reset | [SEGURANCA_LOCALSTORAGE.md](SEGURANCA_LOCALSTORAGE.md): remover sacola, sessão e recarregar, somente para reset completo | Sem alegar 403, sem proibir logout parcial válido e sem apagar dados de navegador nesta tarefa |
| SSH | [README.md](../README.md): comando manual com `IdentitiesOnly=yes` e caminho informado | Nenhum push ou acesso à chave; existência/autorização não verificadas |

### OWASP, edição 2025

Fontes primárias consultadas em 17/10/2026:

- [LLM06, Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/):
  limitações de funcionalidade, permissões e autonomia.
- [LLM02, Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/):
  proteção de credenciais, dados pessoais e demais informações sensíveis.
- [LLM05, Improper Output Handling](https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/):
  validar saídas antes de encaminhá-las a sistemas e execução.

Os números LLM03 para agência e LLM10 para output do texto original não
correspondem às categorias citadas na edição 2025. Lucas autorizou a
correção antes da inclusão. Interactive + Manual é uma política operacional
solicitada, não nomenclatura normativa da OWASP nem garantia de proteção
por instrução escrita. Review e testes também não eliminam todo risco.
Não foi realizada auditoria de vulnerabilidades do código.

### Contraste reproduzido

Foi aplicada a transformação sRGB em luminância relativa:
`(Lclaro + 0,05) / (Lescuro + 0,05)`.
Resultado para `#A3A3A3` sobre `#1A1A1A`: `6,899615723958364:1`.
Atende AA para texto normal, não AAA para texto normal, e atende AAA para
texto grande. "Não AAA" sem especificar o tamanho seria impreciso.

### Testes e alterações preexistentes

Não foram executados build, unitários ou E2E nesta rodada exclusivamente
documental. Os resultados anteriores permanecem históricos: 30 unitários,
38 E2E e builds principal/legado aprovados. Não declarar nova validação
de runtime por causa da edição destes documentos.

O repositório já iniciou com alterações e arquivos não rastreados de
rodadas anteriores. Não foram revertidos ou staged. Os hashes das seis
fontes medidas estão registrados no relatório ABC para conferir a
integridade do conteúdo analisado.

### Verificação final desta rodada

- Script ABC extraído do próprio Markdown e reexecutado com sucesso;
  os seis vetores A/B/C reproduziram os resultados publicados.
- SHA-256 dos seis arquivos-fonte medidos conferidos e inalterados.
- Handoff validado com sete seções e prompt de 14 linhas, sem arquivo
  `docs/HANDOFF.md`.
- `git check-ignore -v .ce-local/HANDOFF.md` retornou:
  `.git/info/exclude:51:.ce-local/ .ce-local/HANDOFF.md`.
- `git status --short --untracked-files=all -- .ce-local/` retornou vazio.
- `.gitignore` não contém `.ce-local/`; alterações preexistentes preservadas.
- `git diff --cached --name-only` retornou vazio e `git diff --check` passou.
- Links locais dos documentos novos, handoff, README e instruções conferidos.
- INP confirmado no documento existente; nenhuma alteração de performance
  foi necessária para esse requisito.

## Hipótese

Handoff enxuto, uma tarefa por prompt e escolha de perfil conforme a
complexidade podem facilitar retomada e reduzir desperdício de contexto.
Não houve medição de tokens, custo ou qualidade antes/depois que comprove
economia. Fechar em 30% é preferência do usuário, não limite técnico
comprovado da ferramenta.

## Pendente

- Confirmar manualmente, no editor, disponibilidade dos perfis e modos de
  aprovação desejados. Não foi alterada configuração fora do FITBOX.
- Validar chave e remote SSH somente quando Lucas decidir publicar.
- Manter handoff atualizado na próxima sessão; não usar como documentação
  versionada nem fonte de segredos.
- Refatoração por ABC exige tarefa e autorização próprias; não é recomendada
  apenas para reduzir um número.
- Pendências anteriores de nutrição, Cloudflare, leitores de tela e campo
  continuam inalteradas.
