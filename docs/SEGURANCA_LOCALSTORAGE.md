# Segurança e persistência local

## Fato

A conta da FITBOX é demonstrativa e não autentica uma pessoa. Não há backend
nem envio de credenciais. O estado atual usa `localStorage`:

- `fitbox:sacola:v1`: identificadores de pratos e quantidades.
- `fitbox:sessao:v1`: nome e e-mail fornecidos para a simulação.
- A senha digitada não é gravada. O código não a verifica contra uma conta
  real e a interface não deve sugerir que houve autenticação.

O armazenamento é acessível a JavaScript executado na mesma origem. Um
ataque de script injetado (XSS) pode ler ou alterar valores locais; o
armazenamento não é cofre de segredos. O próprio navegador/usuário pode
limpá-lo, e políticas do navegador podem impedir acesso. O app avisa falhas
e mantém estado somente em memória quando a persistência falha.

Implementação e comportamento estão em [conta.ts](../src/fitbox/conta.ts),
[App.tsx](../src/fitbox/App.tsx) e na
[spec da sacola](../specs/sacola.md).

## Reset para testes

### Fato

Para iniciar uma demonstração sem dados anteriores, na origem exata do
ambiente testado, remover as duas chaves nesta ordem e recarregar:

```js
localStorage.removeItem('fitbox:sacola:v1');
localStorage.removeItem('fitbox:sessao:v1');
location.reload();
```

Executar manualmente no console do navegador, apenas no ambiente FITBOX e
quando for intencional perder a seleção e a conta demonstrativa. Não usar
`localStorage.clear()`, pois pode apagar outras chaves da mesma origem.
Se alguma remoção falhar, registrar o erro e não considerar o reset completo.
Não foi executada limpeza de dados nesta tarefa documental.

Não fazer reset parcial quando o objetivo for um cenário completamente novo:
limpar apenas a sacola mantém a sessão, e limpar apenas a sessão mantém os
itens. Após as remoções, a recarga sincroniza o estado React em memória.
Cada origem (protocolo, host e porta) possui armazenamento próprio.

### Hipótese

Um reset incompleto pode contaminar a expectativa de um teste manual,
por deixar sessão ou itens anteriores. Isso é diferente de erro HTTP.

### Pendente

Não há evidência de "403 silencioso" causado por reset parcial na FITBOX,
que não possui API de autenticação. Não importar esse diagnóstico do
Portal Spezi. Logout parcial é comportamento válido e intencional:
remove a sessão e preserva a sacola, conforme a spec. Os testes específicos
de persistência devem manter os dados necessários ao cenário, não executar
reset completo indiscriminadamente.

## Hipótese

`sessionStorage` reduziria a persistência da conta ao ciclo de uma aba,
mas mudaria o comportamento atual de recarga e abas. Cookies `HttpOnly`,
`Secure` e `SameSite` são opções comuns para uma futura sessão emitida por
servidor, porém requerem backend, política de sessão, proteção CSRF e
definição de domínio/expiração.

## Pendente

Há conflito no roteiro recebido: o item de pesquisa 4.5 sugere
`sessionStorage` para a sessão e `localStorage` para a sacola, enquanto as
regras gerais e a especificação vigente indicam persistência em
`localStorage`. Nenhuma mudança de armazenamento foi feita sem resolver
essa decisão, pois alteraria o comportamento de reload e múltiplas abas.

Antes de qualquer evolução para autenticação real:

1. Definir requisitos de sessão, expiração, logout e múltiplas abas.
2. Implementar autenticação e armazenamento de sessão no servidor.
3. Não armazenar senha, token de acesso ou segredo em `localStorage`.
4. Avaliar cookie `HttpOnly; Secure; SameSite` e proteção CSRF conforme a
   arquitetura e o risco.
5. Revisar CSP, sanitização, dependências e superfície contra XSS.

Enquanto a demonstração for local, usar apenas dados fictícios e não
reutilizar senha real.

## Referências

- [OWASP, HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html).
- [MDN, Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- [MDN, Window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
- [MDN, Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie).
