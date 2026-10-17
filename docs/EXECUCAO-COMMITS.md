# Pesquisa e execução dos commits locais

Data: 17/10/2026. Repositório FITBOX. Consulta inicial em `main`, HEAD
`cf8643b`, índice vazio. Complementa o
[parecer anterior](VERIFICACAO-CORRECOES-E-COMMITS.md).

## Fato

### Autorização e limites

Lucas confirmou explicitamente: staging com arquivos enumerados e commits
novos, após validar snapshots isolados; PDF somente local. A autorização
é desta tarefa, não altera a política permanente de aprovação de Git.

Não foram executados push, amend, reset, stash, checkout de arquivos,
descarte, rebase ou troca/criação de branch. Não foi feita cópia completa
do repositório: o backup do plano era opcional. As exportações de validação
são cópias de snapshots selecionados, não backup completo do clone.

Os materiais de `fitbox/` não foram editados. Nenhuma receita, quantidade
ou preço foi criado. O código da base oficial não foi reescrito nesta
rodada; foram organizadas alterações já existentes.

### Correções necessárias no plano recebido

| Ponto | Problema | Tratamento |
|---|---|---|
| `npm ci` na pasta original | Lê os manifestos da worktree, não do índice | Executar em exportação exclusiva do índice |
| Falha de `npm ci` | Não prova arquivo fora do staged: pode ser rede, lockfile, permissões, engine, scripts ou configuração | Diagnosticar mensagem real; não adicionar arquivos por tentativa |
| Falha de build | Não prova ausência de arquivo: pode ser erro de tipos, importação ou configuração | Ler erro e corrigir causa; não commitar snapshot reprovado |
| `git add docs/` | Incluiria também o PDF antes da decisão do passo 5 | Enumerar documentos e excluir o PDF localmente |
| `git checkout -- arquivo` | Descarta trabalho, inclusive se a pessoa não lembra sua origem | Preservar e ler o diff; não usar como fallback |
| Amend/reset | Reescrevem ou reposicionam histórico e excedem o escopo autorizado | Criar apenas commits novos |
| Status final esperado | Arquivos ignorados não aparecem em `git status --short` normal | Conferir exclusões separadamente; status limpo pode ser vazio |
| Quantidade fixa de commits | Número não garante atomicidade | Usar quatro unidades coerentes, sem commit vazio de PDF |
| Snapshot do teste inicial | Ainda usa os scripts antigos, antes da migração da aplicação | Validar e registrar o alvo real, sem chamar esse build de nova base |
| `cp -r` com nome por minuto | Pode reutilizar destino e não verifica integridade | Não presumir que exista backup; não executar cópia opcional sem necessidade |

### Pesquisa externa: fontes e limites

Somente perguntas genéricas de Git foram enviadas aos serviços públicos.
Não foi enviado conteúdo do repositório, diff, credencial ou documento do
projeto. A pesquisa integrada falhou por transporte; consultas diretas e
APIs públicas permitiram verificar fontes. As buscas HTML de Google/Bing
não produziram resultados úteis e não foram usadas como evidência.

| Fonte | Conteúdo efetivamente consultado | Aplicação e ressalvas |
|---|---|---|
| [Git: checkout-index](https://git-scm.com/docs/git-checkout-index) | Exportação de entradas do índice com `--all` e prefixo | Criar diretório independente sem modificar worktree |
| [Git: add](https://git-scm.com/docs/git-add) | Um pathspec de diretório abrange inclusões, alterações e remoções naquele diretório | Lista literal de arquivos no lugar de `docs/` e staging amplo |
| [Git: status](https://git-scm.com/docs/git-status) | Formato curto/porcelain, rastreados, não rastreados e ignorados | Separar índice e worktree; ignorados ausentes do status normal |
| [npm: ci](https://docs.npmjs.com/cli/v11/commands/npm-ci) | Instalação limpa e requisitos de lockfile/configuração | Instalar dependências próprias de cada snapshot, sem reaproveitar `node_modules` do projeto |
| [Git: restore](https://git-scm.com/docs/git-restore) | `--staged` afeta índice; `--worktree` afeta arquivos | Conhecer a diferença não autoriza executar descarte |
| [Git: stash](https://git-scm.com/docs/git-stash) | Stash guarda alterações e modifica índice/worktree; reaplicação pode conflitar | Evitar stash para isolar testes desta árvore extensa |
| [Git: revert](https://git-scm.com/docs/git-revert) | Opera sobre os commits especificados | Conferir revisões exatas; não copiar receitas de reversão sem contexto |
| [DEV Community: Atomic commits will help you git legit](https://dev.to/paulinevos/atomic-commits-will-help-you-git-legit-35i7) | Pauline Vos defende uma mudança coerente por commit e build/testes verdes | Conselho comunitário, não norma universal; recomendações de amend/rebase do artigo não foram adotadas |
| [Stack Overflow em Português: desfazer git add](https://pt.stackoverflow.com/questions/61433/como-desfazer-um-git-add-antes-de-um-commit) | Resposta aceita 61434 distingue desfazer staging de desfazer trabalho | Discussão lusófona usada como exemplo da comunidade de desenvolvimento em português; resposta histórica usa reset, que não foi necessário aqui |
| [Stack Overflow em Português: desfazer último commit](https://pt.stackoverflow.com/questions/3030/como-desfa%C3%A7o-o-%C3%BAltimo-commit-no-git) | Respostas discutem publicação, reset, revert e amend | Mostra por que votação/aceitação não substituem documentação oficial e análise das revisões |

As páginas HTML do Stack Overflow retornaram 403. Foram lidas as respostas
pela [API oficial, com corpo e ordenação por votos](https://api.stackexchange.com/2.3/questions/61433;3030/answers?site=pt.stackoverflow&sort=votes&pagesize=4&filter=withbody).
O artigo DEV foi descoberto pela API pública e teve seu texto lido.
Não se atribui nacionalidade aos autores apenas por escreverem em português.

Há uma ressalva concreta na resposta aceita da pergunta 3030:
o exemplo `git revert HEAD~1` identifica o commit pai, não o último commit
`HEAD`; `HEAD~2` também identifica uma revisão, não significa automaticamente
"os dois últimos". A orientação conceitual de distinguir histórico publicado
é útil, mas o exemplo não deve ser copiado literalmente para outro objetivo.
Nenhum comando de reversão foi executado.

### Método de validação do índice

1. Conferir índice vazio, diff e escopo autorizado.
2. Adicionar caminhos de arquivo literais, inclusive remoções conhecidas.
3. Revisar `git diff --cached --check`, lista e estatísticas.
4. Usar `git checkout-index --all --prefix=.../` para exportar todo o
   snapshot do índice para diretório novo no espaço temporário da sessão.
   Não é `git checkout -- arquivo`: não restaura nem descarta a worktree.
5. Guardar o SHA de árvore produzido por `git write-tree`.
6. Na exportação, executar `npm ci --no-audit --no-fund` com manifesto e
   lockfile do próprio snapshot e, depois, os comandos de validação.
7. Antes de commit, comparar novamente o SHA da árvore com o validado.
8. Criar commit novo com trailer de coautoria e conferir a árvore do commit.

Isso evita um falso positivo em que arquivos não staged ou dependências
preexistentes da pasta original fazem o teste passar. As instalações
ocorreram apenas nas cópias sem dependências; a instalação da worktree
original não foi substituída. `--no-audit` não comprova ausência de CVEs.

### Execução registrada

| Unidade | Commit local | Árvore validada | Evidência antes do commit |
|---|---|---|---|
| Regressão TACO | `9f3f5b7` | `67779c15d142ea2d4f6a3bd252fc17db562e0f1b` | Instalação limpa, build antigo do protótipo, dois testes, build antigo do React aprovados |
| Integração oficial | `1215e1b` | `e3eeeb08e91b876c80a9b8fa2f5eaef5616e665e` | Instalação limpa, build oficial, 30 unitários, 38 E2E em 30,5 s e build legado aprovados |
| Títulos históricos | `4060e04` | `4e46bad244958e3599813de0aa3d5112913035c9` | Instalação limpa, builds protótipo/oficial/legado, 30 unitários e 38 E2E em 28,3 s aprovados |

Os comandos executados retornaram exit 0. O quarto grupo reúne
documentação, pesquisa, instruções já existentes e o script de medição.
Seu hash e a verificação final devem ser consultados no log Git e no
handoff local, evitando autorreferência ao hash do próprio documento.

O primeiro commit contém somente `src/lib/calc.test.ts`.
A integração reúne 62 caminhos apresentados pelo diff com detecção de
renome, incluindo aplicação, testes, dependências, configuração, specs
e assets WebP. As sete correspondências de legado foram reconhecidas
como renomes. Não é uma refatoração nova nem prova de revisão funcional
completa de todas as alterações históricas.

Os títulos de `prints/video.html` e `prototipo/index.html` diferem somente
por pontuação, verificada no diff. Foram preservados e commitados,
não descartados. A documentação foi deixada por último para registrar
os hashes e resultados reais das três unidades anteriores.

### PDF e arquivos locais

Por decisão de Lucas, o PDF não entra em nenhum commit.

```text
Caminho: docs/fontes/tabela-brasileira-de-composicao-de.pdf
Tamanho: 47.956.479 bytes
SHA-256: 9a0fdcc3e2e69d2de6944dc8362dcf3c6793cf9e21a2bd2456c747e3602df6bc
```

Não foi apagado nem modificado. A exclusão usa o caminho exato em
`.git/info/exclude`; o registro de fonte/hash permanece versionado.
Um clone novo não terá essa cópia offline. Não foi usada a alegação de
um limite do GitHub como justificativa; a decisão foi manter local.

`.ce-local/HANDOFF.md` permanece ignorado pela regra local existente.
Arquivos ignorados e exclusões locais não são reproduzidos por clone.
Um status limpo não significa que eles estejam versionados ou salvos
em um servidor. Nenhum push foi feito.

## Hipótese

Manter aplicação e sua infraestrutura de teste juntas facilita reproduzir
o estado em outro clone. O benefício futuro de revisão e bisect é plausível,
mas não foi medido. A integração é uma unidade grande: foi mantida coesa
para não inventar estados intermediários sem configuração compatível.

As discussões comunitárias são exemplos úteis, não prova de consenso
brasileiro nem garantia de segurança dos comandos para qualquer projeto.

## Pendente

- Revisão humana final dos commits acumulados e autorização separada
  para qualquer push. A autorização desta tarefa não inclui publicação.
- CI remoto, preview Cloudflare e autenticação SSH não foram testados.
- Fichas de receitas, ingredientes, alergênicos e validação nutricional
  continuam pendentes; valores provisórios são a validar pela nutricionista.
- Leitores de tela, métricas de campo e INP real continuam fora desta rodada.
- Backup externo da cópia local e do PDF depende de ação própria; commits
  locais e diretórios temporários não substituem backup remoto.
