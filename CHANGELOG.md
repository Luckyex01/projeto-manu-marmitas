# Histórico

## Não publicado

### Aplicação

- Base oficial React em `src/fitbox/`, entrada `fitbox-app/index.html`.
- React anterior arquivado em `legado/`, com comandos próprios.
- Home, catálogo, filtros, busca local expansível, modal e sacola demonstrativa.
- Conta local exigida apenas ao confirmar, com persistência de nome/email
  fictícios, sem persistir senha e sem autenticação real.
- Avisos para dados inválidos e falhas de armazenamento. Logout preserva sacola.
- FAQ específico da FITBOX e detalhe separado em três seções.
- Notificação acima do modal, temporizador de 5 segundos e movimento reduzido.
- Proteína verde, carboidrato laranja e marca FIT branca/BOX laranja.

### Correções e documentação

- Corrigida regressão nas fotos institucionais: altura responsiva restaura
  o enquadramento 3:4 após inclusão de dimensões intrínsecas. Regressão
  coberta em oito larguras, de 320 a 1920 px.

- Exemplo TACO: 49,40 / 47,32 / 3,99 g resultam em 422,79 kcal,
  exibidas como 423 kcal, a validar pela nutricionista.
- Removida estatística sem fonte de redução de rejeição ao preço.
- Contrastes recalculados, base oficial e conta sincronizadas nas specs.
- Pesquisa de mercado, referências, UX, legislação, limites nutricionais
  e preparação Cloudflare documentados.
- Convenções para agentes e sistema de avaliação com rastreabilidade.
- Cópia TACO recebida movida da raiz para `docs/fontes/`, conteúdo preservado.

### Validação

- Build principal e legado aprovados.
- 30 testes unitários e 38 execuções E2E Chromium aprovados.
- Em 17/10/2026, Lucas autorizou staging enumerado e commits novos locais.
  Regressão, integração e títulos históricos foram validados em exportações
  isoladas do índice, com instalação limpa, antes de seus commits.
- Pesquisa e método registrados em `docs/EXECUCAO-COMMITS.md`.
- Nenhum push, amend, reset, descarte ou deploy executado nesta rodada.

### Versionamento local

- PDF TACO mantido somente local por decisão de Lucas em 17/10/2026.
  Origem e hash ficam em `docs/fontes/README.md`.
- Handoff continua exclusivamente local, em `.ce-local/HANDOFF.md`.
- Relatórios anteriores preservam o estado observado em suas respectivas
  rodadas; declarações de ausência de commits nesses relatórios são históricas.

### Pendente

- Receitas, rendimentos, alergênicos, preços e validação profissional.
- Cinco pratos sem reconciliação nutricional completa.
- CI das alterações locais, publicação e revisão visual final da cliente.
