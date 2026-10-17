# Instruções de Trabalho: FITBOX

## Comunicação e Resposta
- Responda em português, de forma direta, técnica e concisa.
- Sem floreios, sem linguagem de marketing e sem emojis em código ou documentação.
- Não usar travessões. Usar pontuação comum.
- Não usar travessões em textos de interface, documentação ou respostas. Preferir pontos, vírgulas, dois-pontos ou parênteses.
- Em análises técnicas e relatórios, separe obrigatoriamente Fato, Hipótese e Pendente.

## Limites e Controle de Versão (Git)
- Nunca execute git commit, git push, git commit --amend ou force-push sem autorização explícita do usuário.
- Não altere o histórico do Git nem realize operações destrutivas.

## Validação e Qualidade
- Antes de considerar qualquer tarefa de código como pronta, execute `npm run build` e `npm run test`.
- Se o build falhar, a tarefa não está concluída. Nunca declare "está funcionando" sem evidência real de terminal.

## Regras de Negócio e Nutrição
- Nunca invente valores nutricionais, pesos, gramaturas ou preços.
- A fonte primária de cálculo nutricional é a TACO v.4 (método 4/4/9).
- Todo valor exibido deve conter a menção "a validar pela nutricionista". Proibido usar selos Anvisa sem laudo.
- O modelo de negócio é autoatendimento em freezer horizontal dentro de academias: sem entrega, sem atendente e sem WhatsApp.
- Base oficial: `src/fitbox/`, entrada HTML em `fitbox-app/`. A conta é demonstrativa, exigida apenas para confirmar. Nunca armazenar senhas ou alegar autenticação real.

## Arquivos de Contexto e Leitura Obrigatória
Ao iniciar qualquer sessão, leia os seguintes arquivos de contexto antes de responder ou sugerir código:
- `COPILOT.md` (regras operacionais centrais)
- `docs/contexto-fitbox.md` (modelo de negócio, diagnóstico e fonte da verdade)
- `docs/DESIGN_SYSTEM.md` (paleta, tipografia, regras WCAG e componentes)
- `docs/CALCULO_NUTRICIONAL.md` (fórmulas, TACO v.4 e exemplo auditável)
- `specs/*.md` (especificações de telas e fluxos)
