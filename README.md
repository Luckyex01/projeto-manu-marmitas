# FITBOX

Vitrine acadêmica FITBOX para uma proposta de autoatendimento em freezer
horizontal dentro de academias. A aplicação principal usa React, TypeScript
e Vite, com entrada em `fitbox-app/` e componentes em `src/fitbox/`.
O protótipo aprovado em `prototipo/` e o React legado foram preservados.

## Executar o FITBOX

Requer Node.js 20.19+ ou 22.12+ e as dependências instaladas (`npm ci`).

```sh
npm run dev
```

O site fica disponível em `http://localhost:8090` e, na rede local, no IP desta
máquina na porta `8090`.

## Build e preview

```sh
npm run build
npm run preview
```

O build estático é gravado em `dist/`.

## Dados e limites do protótipo

- Ingredientes, massas, valores nutricionais e preços são provisórios:
  "a validar pela nutricionista".
- Apenas o exemplo de frango, arroz e feijão teve a aritmética reconciliada
  com a TACO v.4. Consulte `docs/CALCULO_NUTRICIONAL.md` para fontes e limites.
  Os demais pratos preservam dados históricos não auditados.
- O fluxo é Home -> Cardápio/modal -> Sacola -> Conta demonstrativa -> Confirmação demonstrativa.
  Não há Pix, cobrança, pedido real, reserva ou liberação de retirada.
- A sacola persiste apenas identificadores e quantidades em
  `localStorage` (`fitbox:sacola:v1`). Erros de armazenamento são avisados na tela.
- Navegação, adição e abertura da sacola não exigem conta. Apenas a confirmação
  exige cadastro/login demonstrativo com nome/email fictícios e senha livre não
  vazia. Nome e email persistem em `fitbox:sessao:v1`; senha nunca é persistida
  nem verificada contra credenciais reais. Não reutilize dados ou senhas reais.
- Logout remove a sessão e preserva a sacola; confirmar limpa os itens, não a
  sessão. Falhas de armazenamento mantêm estado em memória e geram aviso.
- FAQ próprio e detalhe separado em Sobre o prato, Ingredientes e Informação
  nutricional. Alergênicos reais ainda não foram informados.
- Fotos reais fornecidas por Manuela; vídeo e academia são ilustrações de IA.
- Não há entrega, atendente, WhatsApp, backend ou API de pedidos.

## Validação

```sh
npx playwright install chromium
npm run build
npm run test
```

O build verifica tipos e produz `dist/`. Na validação desta consolidação,
Vitest passou com 30 testes e Playwright com 38 casos em projetos mobile e
desktop; axe cobre quatro larguras e cinco estados da jornada. As jornadas
recompilam e testam o build de produção em servidor isolado em `127.0.0.1:8091`,
encerrado ao final; a porta deve estar
livre. No Linux CI, usar `npx playwright install --with-deps chromium`.

`npm run test:unit` executa apenas os testes unitários.
Relatórios E2E ficam em `playwright-report/`; screenshots e traces de falhas,
em `test-results/`. Esses artefatos não são versionados.

## Protótipo visual original

```sh
npm run prototipo:dev
npm run prototipo:build
```

Servido na porta 8092; build em `dist-prototipo/`. É uma referência histórica
de visual: seu conteúdo e seus cálculos antigos não foram corrigidos.

## Aplicação React anterior

A aplicação demonstrativa React/TypeScript anterior foi arquivada em `legado/`,
mas não é o produto principal. Para executá-la explicitamente:

```sh
npm run legacy:dev
```

Para compilar essa versão antiga:

```sh
npm run legacy:build
```

## Documentação e publicação

### Push manual com chave SSH dedicada

Somente Lucas deve executar o comando abaixo quando decidir publicar as
alterações revisadas. Esta documentação não autoriza o agente a fazer push.

```sh
GIT_SSH_COMMAND="ssh -o IdentitiesOnly=yes -i ~/.ssh/id_ed25519_fitbox" git push
```

O comando pressupõe remote SSH, upstream configurado e chave autorizada no
GitHub. O caminho da chave foi informado por Lucas; sua existência e
autorização não foram verificadas, e nenhum conteúdo de chave foi lido.

- [Convenções](COPILOT.md) e [agentes](AGENTS.md).
- [Lições de trabalho adaptadas do Portal Spezi](docs/LICOES-PORTAL-SPEZI.md)
  e [análise ABC de leitura](docs/ANALISE-ABC.md).
- [Avaliação e rastreabilidade](docs/EVAL_SYSTEM.md).
- [Auditoria dos seis pratos e bloqueios](docs/AUDITORIA_NUTRICIONAL.md).
- [Mercado](docs/MERCADO.md), [referências e UX](docs/REFERENCIAS_UX.md) e
  [segurança alimentar](docs/SEGURANCA_ALIMENTAR.md).
- [Acessibilidade](docs/ACESSIBILIDADE.md), [performance](docs/PERFORMANCE.md)
  e [segurança da persistência local](docs/SEGURANCA_LOCALSTORAGE.md).
- [Instruções para agentes](AGENTS.md) e [ponteiro Claude Code](docs/CLAUDE.md).
- [Cloudflare Pages, configuração ainda não executada](docs/CLOUDFLARE_PAGES.md).
- [Auditoria técnica](docs/AUDITORIA_TECNICA.md).
- [Relatório de execução e grupos para revisão](docs/RELATORIO_CONSOLIDACAO.md).
- [Pesquisa, correções do plano e execução dos commits locais](docs/EXECUCAO-COMMITS.md).

`fitbox-app/` não é uma segunda aplicação: contém a entrada HTML que carrega
`src/fitbox/main.tsx`. `prototipo/` continua necessário pelos assets e CSS
reutilizados. Neste clone, a cópia TACO recebida permanece local em `docs/fontes/`,
fora de `dist/` e do versionamento. Um clone novo contém apenas seu registro
de origem e hash, não o PDF.
