# FITBOX: agentes

As regras centrais estão em [COPILOT.md](COPILOT.md). Leia também
[contexto](docs/contexto-fitbox.md), [design](docs/DESIGN_SYSTEM.md),
[cálculo](docs/CALCULO_NUTRICIONAL.md) e [specs](specs/).

- Trabalhe em `src/fitbox/`; `fitbox-app/` é somente a entrada HTML.
- Preserve os materiais originais em `fitbox/`. Não remova `prototipo/`:
  a aplicação ainda importa seus assets e CSS.
- `legado/` é arquivo histórico, não uma segunda base de desenvolvimento.
- Conta somente demonstrativa na confirmação, sem backend e sem guardar senha.
- Não invente receitas, nutrientes, preços, alergênicos ou evidências de operação.
  Use "a validar pela nutricionista" nos valores provisórios.
- Separe Fato, Hipótese e Pendente. Português, sem travessões ou emojis.
- Mantenha specs e documentação relacionadas sincronizadas.
- Antes de concluir código, execute `npm run build` e `npm run test`.
- Não faça commit, push, staging amplo ou operações destrutivas sem autorização.
- Delegue somente trabalho independente que realmente necessite contexto separado.
  Não duplique investigação nem altere simultaneamente os mesmos arquivos.

Este índice existe junto de `.github/copilot-instructions.md` por solicitação
expressa do projeto. Não mantenha cópias divergentes das regras centrais.
