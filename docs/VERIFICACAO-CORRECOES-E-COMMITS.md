# Verificação das correções e do plano de commits

Data: 17/10/2026. Estado consultado: branch `main`, HEAD `cf8643b`.
Objetivo: confrontar a análise enviada por Lucas com os arquivos, o
histórico local, o índice e a validação executada. Não foi feita pesquisa
web: as evidências locais bastam para as conclusões deste relatório.

Registro histórico da rodada anterior à autorização de commits. A execução
posterior, incluindo pesquisa comunitária e decisão de manter o PDF local,
está em [EXECUCAO-COMMITS.md](EXECUCAO-COMMITS.md). Os SHAs, contagens e
pendências abaixo descrevem aquela consulta, não o estado final posterior.

## Fato

### 1. Veredito executivo

A análise recebida está parcialmente correta, mas sua conclusão principal
está desatualizada para a árvore de trabalho:

1. O teste atual já usa `49.4`, `47.32` e `3.99`, com expectativas de
   `422.79` e `423`.
2. A afirmação de redução superior a 50% já foi substituída por hipótese.
3. Os dois textos antigos ainda existem em `HEAD`, não nas versões atuais
   desses arquivos. As correções estão locais e não commitadas.
4. O índice está vazio. Não há staging a desfazer.
5. O teste direcionado executa dois testes, não um.
6. A recomendação de commits por caminhos é boa, mas a divisão proposta
   separa mudanças tecnicamente dependentes, omite um script e inclui um
   PDF grande cuja inclusão ainda requer decisão.
7. Trabalhar em feature branch pode melhorar organização, mas uma branch
   não é backup de mudanças não commitadas nem requisito universal de
   rollback seguro.

Não foi necessário corrigir novamente código ou a hipótese comercial.
Nesta rodada foi criado somente este relatório; os comandos de validação
regeneraram artefatos de build/teste já ignorados.

### 2. Matriz de afirmações

| Afirmação recebida | Evidência atual | Veredito |
|---|---|---|
| O teste ainda usa 49,75 g | Arquivo atual, linha 12, usa 49,4 g | Falsa para worktree; verdadeira para HEAD |
| A energia esperada é 422,79, arredondada para 423 | Código atual e execução direcionada aprovados | Correta para o modelo acadêmico |
| O comando retorna um teste aprovado | O arquivo contém dois blocos `it`; execução aprovou dois | Incorreta |
| O contexto ainda afirma redução de mais de 50% | Linha 51 já apresenta hipótese sem medição | Falsa para worktree; verdadeira para HEAD |
| Um `M` visual prova staging | A posição do caractere no formato XY é necessária | Inferência insuficiente |
| Pode haver staging entre duas capturas | Possibilidade abstrata, sem evidência na consulta atual | Não demonstrada |
| É preciso executar reset | Índice atual vazio | Desnecessário |
| Há uma reorganização para legado e nova base | Sete remoções e arquivos correspondentes em `legado/` | Confirmada |
| Os cinco grupos propostos são atômicos | Nova aplicação/testes no grupo 2; configurações e dependências só no 5 | Não como propostos |
| `.ce-local/` não entra no commit | `git check-ignore -v` aponta `.git/info/exclude` | Confirmada, salvo inclusão forçada |
| Tudo está na branch main | Consulta atual retorna `main` | Confirmada |
| Sem branch não existe rollback isolado | Rollback depende de commits/snapshots e do contexto de publicação | Formulação excessiva |
| O restante está certo | Existem limites de commit, rastreabilidade e validação | Não sustentada como aprovação geral |

### 3. Teste nutricional: estado atual versus histórico

Arquivo: [src/lib/calc.test.ts](../src/lib/calc.test.ts).

O caso atual é:

```ts
const resultado = calcularCalorias({
  proteina: 49.4, carboidrato: 47.32, gordura: 3.99,
});
expect(resultado).toBeCloseTo(422.79, 2);
expect(Math.round(resultado)).toBe(423);
```

`49.40` e `49.4` são o mesmo literal numérico JavaScript; não há correção
necessária por faltar o zero final. O caso anterior de `32/47/4 ->352`
continua válido e deve ser preservado, explicando os dois testes no arquivo.

Aritmética confirmada:

```text
49,40 x 4 = 197,60
47,32 x 4 = 189,28
 3,99 x 9 =  35,91
Total      = 422,79 kcal
Arredondado = 423 kcal
```

Valores do modelo são **a validar pela nutricionista**.

O teste antigo em HEAD utiliza `49.75/47/4`, cuja aritmética também produz
423. O defeito não é uma falha aritmética do utilitário: é a escolha de
entrada sintética para atingir o número desejado sem representar os totais
do modelo TACO. Um teste unitário genérico com tais entradas não seria
intrinsecamente inválido; ele não comprova a composição da preparação.
Não é possível inferir intenção de fraude pela leitura do teste.

A regressão atual é mais representativa, mas também não comprova que a
porção real tenha essas massas ou nutrientes. A integração com o catálogo
é testada separadamente em
[catalogo.test.ts](../src/fitbox/catalogo.test.ts).
Os limites do método acadêmico versus rotulagem regulatória continuam em
[CALCULO_NUTRICIONAL.md](CALCULO_NUTRICIONAL.md).

### 4. Estatística: evidência e significado do diff

Arquivo: [contexto-fitbox.md](contexto-fitbox.md), linha 51:

> Tornar os macronutrientes visiveis em 1 toque pode reduzir a rejeicao ao
> preco (hipotese sem medicao, validar com a conversao no freezer).

A redação atual já cumpre o requisito de não apresentar um percentual
sem fonte. Usar vírgula ou ponto e vírgula dentro do parêntese não muda
o conteúdo essencial.

A busca por `49[.,]75`, `mais de 50%` e `reduz.*50%` nos dois arquivos atuais
não retornou correspondências. Em contrapartida:

- `git show HEAD:src/lib/calc.test.ts` contém o caso antigo.
- `git show HEAD:docs/contexto-fitbox.md` contém a estatística na linha 40.
- `git diff` mostra esses trechos antigos precedidos por `-`, como conteúdo
  removido. Encontrá-los no diff não significa que permaneçam no arquivo.

Diferenças de linhas entre versões tornam inadequado aplicar comandos
cegos na antiga linha 49. Conferir conteúdo e versão antes de substituir.

### 5. Estado Git, staging e inventário

Consulta com `git status --porcelain=v1 -z --untracked-files=all`,
antes da criação deste relatório:

| Código XY | Quantidade | Significado |
|---|---:|---|
| `" M"` | 19 | Modificação somente na árvore de trabalho |
| `" D"` | 7 | Remoção somente na árvore de trabalho |
| `"??"` | 72 | Arquivos não rastreados, expandindo diretórios |

Este relatório acrescenta um arquivo não rastreado. Contagens aproximadas
de diretórios no `git status` padrão não equivalem à contagem de arquivos
obtida com `--untracked-files=all`.

No formato XY:

- `X` informa diferença entre HEAD e índice.
- `Y` informa diferença entre índice e árvore de trabalho.
- `"M "` é staged, `" M"` é unstaged e `"MM"` combina alterações nos dois.
- `"??"` significa arquivo não rastreado.

A leitura estruturada confirmou o espaço inicial de `" M"`.
`git diff --cached --name-only` retornou vazio. Isso demonstra o estado
atual; não reconstrói por si só o que ocorreu entre capturas antigas.
Não há motivo para executar `git reset HEAD` agora.

Unstage sem `--hard` normalmente preserva o conteúdo da worktree, mas
desfaz seleções do índice. Ainda assim, não deve ser feito automaticamente,
sobretudo com mudanças de outras pessoas. Aqui não foi necessário nem
autorizado executar reset.

`HEAD` e a referência local `origin/main` apontam para `cf8643b`;
`git log origin/main..HEAD` retornou vazio. Não foi feito fetch nem
consulta remota: isso não garante que o servidor ainda esteja nesse SHA.

### 6. A reorganização foi confirmada, com duas ressalvas

Correspondências:

| Caminho removido | Destino atual | Comparação com HEAD |
|---|---|---|
| `index.html` | `legado/index.html` | Script de entrada passou de `/src/main.tsx` para `/main.tsx` |
| `src/App.tsx` | `legado/App.tsx` | Uma mudança de pontuação em texto |
| `src/main.tsx` | `legado/main.tsx` | Conteúdo idêntico |
| `src/styles.css` | `legado/styles.css` | Conteúdo idêntico |
| `src/types.ts` | `legado/types.ts` | Conteúdo idêntico |
| `src/lib/storage.ts` | `legado/lib/storage.ts` | Conteúdo idêntico |
| `src/data/products.ts` | `legado/data/products.ts` | Conteúdo idêntico |

Git armazena snapshots e pode inferir renomes por similaridade quando os
arquivos de destino forem incluídos. Portanto, dizer que Git não rastreia
move nativamente precisa dessa ressalva: ele detecta e apresenta renomes,
embora não armazene uma operação permanente de rename.

Há seis arquivos antigos de `src/` mais a entrada HTML, totalizando sete
remoções, não seis.

### 7. Problemas concretos na divisão de commits recebida

#### 7.1 Grupo 2 depende de configurações adiadas para o grupo 5

O grupo 2 acrescentaria aplicação, legado, E2E e Playwright, mas manteria
configurações antigas até o quinto commit:

- O `package.json` de HEAD compila `prototipo/`, não `fitbox-app/`.
  Assim, `npm run build` pode passar compilando a aplicação errada.
- O `npm run test` de HEAD executa somente Vitest, sem Playwright.
- As dependências Playwright e axe estão no manifesto/lockfile atuais,
  mas ausentes no manifesto de HEAD. Uma instalação limpa intermediária
  não terá essas dependências declaradas.
- O `vitest.config.ts` de HEAD não exclui `e2e/`. Os novos arquivos
  `*.spec.ts` usam outro runner e precisam da configuração correspondente.
- A entrada nova usa `/src/fitbox/main.tsx`, enquanto o alias `/src`
  necessário para essa entrada está na alteração de `vite.config.ts`.
- `tsconfig.json`, scripts de legado e workflow também fazem parte da
  integração, não são meras alterações cosméticas independentes.

Essas dependências foram verificadas por leitura das versões HEAD e
worktree. Não foram criados os commits intermediários nem executado build
de cada snapshot proposto. Portanto, não se alega um log de falha desses
snapshots: o que está comprovado é a divisão de dependências e a mudança
do alvo dos comandos. Suíte verde na worktree completa não valida cada
commit isoladamente.

#### 7.2 Grupo 1 mistura uma correção pontual com uma documentação ampla

`docs/contexto-fitbox.md` possui outras mudanças além da hipótese de preço:
base oficial, fluxo, conta e nutrição, por exemplo. `git add` do arquivo
inteiro incluiria todas essas alterações, não apenas a frase solicitada.

Para um commit realmente mínimo, seria necessário selecionar o hunk
correspondente ou mover o documento completo para o grupo de consolidação.
Nenhuma seleção de hunks foi feita nesta análise.

#### 7.3 Um script não aparece em nenhum grupo proposto

[scripts/medir-performance.mjs](../scripts/medir-performance.mjs) está
não rastreado e não consta de nenhum comando de staging do plano recebido.
Já é referenciado pela documentação técnica. Deve ser revisado e
incluído no grupo correspondente, ou permanecer explicitamente pendente.

#### 7.4 Pastas inteiras não são listas exatas de arquivos

`git add src/fitbox/`, `docs/fontes/`, `prints/` ou `prototipo/` é mais
restrito que `git add -A`, mas ainda inclui todos os itens elegíveis nesses
caminhos. Não equivale a revisar arquivo por arquivo.

Neste momento, os destinos novos conhecidos incluem as 16 imagens WebP,
`assets.d.ts`, testes, o header de publicação e componentes. Arquivos
futuros nessas pastas também poderiam entrar num staging por diretório.
Revisar inventário e diff staged imediatamente antes de qualquer commit.

#### 7.5 PDF grande exige decisão, não inclusão automática

[docs/fontes/README.md](fontes/README.md) já registra a pendência.
O PDF local tem 47.956.479 bytes, aproximadamente 45,73 MiB. Não integra
o bundle, mas sua inclusão aumenta o histórico Git. Tamanho abaixo de um
eventual limite do provedor não é, sozinho, justificativa para versionar.

Não foi feita auditoria jurídica de licença/redistribuição, comparação de
alternativas de armazenamento ou medição do custo de clones. Preservar
o original local e decidir antes de incluir o binário.

#### 7.6 Exclusão local tem escopo local

`git check-ignore -v .ce-local/HANDOFF.md` retornou:

```text
.git/info/exclude:51:.ce-local/ .ce-local/HANDOFF.md
```

O caminho não aparece no status e não está versionado. A regra não é
compartilhada com clones novos; também não impede `git add -f`.
Logo, é correto excluí-lo dos grupos, mas isso não constitui proteção
absoluta contra uma inclusão forçada.

### 8. Organização recomendada, apenas para revisão

Não é necessário atingir cinco commits por obrigação. Um commit é atômico
quando contém uma mudança coerente com suas dependências e pode ser
validado no snapshot correspondente.

| Grupo | Conteúdo recomendado | Validação/observação |
|---|---|---|
| 1. Regressão aritmética | `src/lib/calc.test.ts`; opcionalmente apenas o hunk isolado da hipótese | Dois testes no arquivo; não adicionar outra correção já presente |
| 2. Integração da base oficial | Novos arquivos de `src/fitbox/`, `fitbox-app/`, `legado/`, `e2e/`; sete remoções; `playwright.config.ts`; `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `.github/workflows/ci.yml`, `.gitignore`; specs diretamente relacionadas | Aplicação, dependências, scripts, configuração e testes precisam ficar juntos |
| 3. Contexto, auditorias e pesquisa | Documentos novos/alterados, instruções, README, AGENTS, CHANGELOG e o script `scripts/medir-performance.mjs` associado às medições | Revisar fontes, links, fatos históricos e documentos com resultados de rodadas diferentes |
| 4. Ajustes históricos estritamente textuais | Mudanças de pontuação em `prints/video.html` e `prototipo/index.html`, após revisar o diff | Não misturar com alterações indiscriminadas de assets ou lógica |
| 5. Fonte binária, opcional | PDF e registro da fonte | Decisão explícita sobre versionamento/redistribuição antes de adicionar |

O grupo 2 é maior, mas evita o falso isolamento de separar infraestrutura
de teste da própria aplicação testada. Dividi-lo mais exigiria seleção
cuidadosa de mudanças e validação dos estados intermediários.

Esta tabela é uma recomendação de dependências, não uma lista pronta de
staging arquivo por arquivo. Antes de executar, gerar o inventário exato
atual e revisar cada item, incluindo este relatório novo. Não foram
emitidos nem executados comandos de staging, commit, branch ou push.

### 9. Branch e recuperabilidade

Estar em `main` não destruiu o histórico nem impede revisar o trabalho.
O risco concreto é continuar acumulando mudanças sem snapshots recuperáveis,
ou publicar sem revisão e sem validação.

Uma feature branch é recomendação de organização, não correção automática:

- Criá-la normalmente mantém as mudanças locais no mesmo diretório; não
  cria uma cópia independente nem salva arquivos não rastreados.
- Não resolve sozinha o risco de perder trabalho não commitado.
- Git worktree e snapshots/backup são mecanismos distintos.
- Antes de criar uma branch, conferir se o nome existe e qual escopo
  ela representará. `feat/refatoracao-sacola` não descreve bem toda a
  consolidação atual; pode servir para uma futura tarefa focada.
- Merge commit não é obrigatório para uma aplicação única; a estratégia
  depende de revisão, histórico desejado e políticas do repositório.
- Branches empilhadas do Portal Spezi não devem ser transferidas por
  analogia sem necessidade demonstrada.

Não foi criada branch nem modificado o histórico.

### 10. Validação executada nesta análise

Ambiente: dependências já instaladas; Node pelo NVM local. Nenhuma
instalação ou atualização de pacotes foi necessária.

| Comando | Resultado |
|---|---|
| `./node_modules/.bin/vitest run src/lib/calc.test.ts` | Exit 0, um arquivo e dois testes aprovados |
| `npm run build` | Exit 0, TypeScript e Vite, 48 módulos |
| `npm run test` | Exit 0, 30 unitários e 38 E2E aprovados; Playwright em 29,0 s |
| `npm run legacy:build` | Exit 0, TypeScript e Vite, 18 módulos |
| `git diff --check` | Sem erros de whitespace na consulta |
| `git diff --cached --name-only` | Vazio |
| `git status --short -- fitbox/` | Vazio |
| Busca dos dois textos antigos nos arquivos atuais | Nenhuma ocorrência |

O executável local do Vitest é o runner instalado que `npx vitest`
resolveria nesse ambiente; a invocação direta evita instalar ou baixar
pacotes se a resolução mudar.

Não houve nova medição de Core Web Vitals, execução remota de CI ou teste
Cloudflare. Resultados da aplicação completa não validam disponibilidade
comercial, receitas, permissões de publicação ou snapshots intermediários.

## Hipótese

Uma leitura de `HEAD`, de um diff sem distinguir linhas removidas ou de
uma captura antiga pode explicar por que o diagnóstico recebido repetiu
problemas já corrigidos. Essa é uma explicação plausível, não identificação
comprovada da origem do texto.

O plano proposto parece ter sido agrupado por tipo de arquivo, e não por
dependências de execução. Isso explicaria configurações adiadas, mas não
permite concluir como ele foi produzido.

## Pendente

1. Lucas revisar o agrupamento e autorizar separadamente qualquer escrita
   no índice, criação de branch, commit ou publicação.
2. Conferir cada commit candidato isoladamente em instalação limpa ou
   ambiente apropriado, sem usar arquivos não rastreados como dependência
   acidental. Isso não foi realizado por não terem sido criados commits.
3. Decidir sobre versionar o PDF, preservando a cópia existente.
4. Se for necessário confirmar o servidor GitHub, autorizar a consulta
   remota pertinente. A referência local não substitui essa consulta.
5. Manter bloqueios nutricionais, CI das alterações locais, preview
   Cloudflare real, testes assistivos e métricas de campo.

Conclusão: não executar as duas substituições novamente nem resetar o
índice. As correções já existem localmente. O trabalho efetivo restante é
revisar o conteúdo acumulado e preparar snapshots coerentes, sem confundir
worktree corrigida com código já commitado ou publicado.
