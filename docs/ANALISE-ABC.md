# Análise ABC FITBOX

Data: 17/10/2026. Escopo: seis arquivos solicitados, somente leitura.

## Fato

Foi executada uma contagem AST com o TypeScript 5.9.3 já instalado.
Nenhuma fonte foi alterada, nenhuma dependência instalada e nenhuma
refatoração foi feita. ABC significa Assignments, Branches, Conditions.
A magnitude é `sqrt(A² + B² + C²)`, calculada antes de arredondar.

### Convenção explícita desta medição

ABC depende da linguagem e da convenção de contagem. Esta é uma variante
local para TypeScript/TSX, não um resultado de ferramenta ABC padronizada
ou equivalente ao ABC de Java/Ruby. O parsing AST evita contar operadores
em comentários, strings, tipos e texto JSX como operações executáveis.

- **A:** uma ocorrência por declaração de variável com inicializador,
  inclusive destructuring (uma por declaração, não por nome extraído);
  uma por atribuição simples/composta e por incremento/decremento.
  Parâmetros, imports, campos de objetos e atributos JSX não contam.
- **B:** uma por `CallExpression` e `NewExpression`. Chamadas encadeadas
  e aninhadas contam individualmente; chamadas opcionais contam uma vez.
  Referências a callbacks e elementos JSX, inclusive componentes, não
  contam como chamada, a menos que haja chamada explícita no AST.
- **C:** uma por comparação `==`, `!=`, `===`, `!==`, `<`, `<=`, `>`, `>=`,
  `in`, `instanceof`; uma por `&&`, `||`, `??` e negação `!`; uma por
  `if`, ternário, laço, `case` e `catch`. Um `if` e a comparação que
  contém contam separadamente. `else`, `default`, optional chaining,
  `return`, `throw` e `try` não acrescentam C por si só.
- Callbacks e closures internos integram a contagem da função contenedora.
  Sua presença sintática é contada uma vez, não multiplicada pelas
  execuções em runtime ou pelo tamanho de um array.
- A tabela por arquivo agrega funções e inicialização de módulo. Não
  somar magnitudes de funções: somar vetores A/B/C e então calcular a norma.
- Não há análise interprocedural: chamadas a helpers contam como B, sem
  expandir o corpo do helper no chamador.

Faixas solicitadas, explicitadas nos limites: `<15` OK; `15 <= ABC <30`
atenção; `30 <= ABC <=60` suspeito; `>60` crítico. São critérios locais
de triagem, não comprovação de bug, vulnerabilidade ou necessidade de
refatoração. Nenhum resultado ficou exatamente em um limite.

### Resultado por arquivo

| Arquivo | A | B | C | Magnitude | Faixa |
|---|---:|---:|---:|---:|---|
| [calc.ts](../src/lib/calc.ts) | 0 | 0 | 0 | 0,00 | OK |
| [catalogo.ts](../src/fitbox/catalogo.ts) | 4 | 3 | 0 | 5,00 | OK |
| [sacola.ts](../src/fitbox/sacola.ts) | 7 | 29 | 44 | 53,16 | Suspeito |
| [conta.ts](../src/fitbox/conta.ts) | 5 | 14 | 24 | 28,23 | Atenção |
| [Cardapio.tsx](../src/fitbox/Cardapio.tsx) | 6 | 33 | 15 | 36,74 | Suspeito |
| [Sacola.tsx](../src/fitbox/Sacola.tsx) | 3 | 15 | 14 | 20,74 | Atenção |

### Resultado por função de primeiro nível

Os corpos incluem seus callbacks internos. Inicializadores de módulo
não fazem parte desta tabela, portanto os vetores podem diferir da
agregação por arquivo.

| Arquivo / função | A | B | C | Magnitude | Faixa |
|---|---:|---:|---:|---:|---|
| calc / calcularCalorias | 0 | 0 | 0 | 0,00 | OK |
| catalogo / formatarPreco | 0 | 1 | 0 | 1,00 | OK |
| sacola / obterPrato | 1 | 2 | 3 | 3,74 | OK |
| sacola / calcularTotal | 1 | 4 | 4 | 5,74 | OK |
| sacola / alterarQuantidade | 2 | 7 | 11 | 13,19 | OK |
| sacola / itemValido | 0 | 2 | 16 | 16,12 | Atenção |
| sacola / lerSacola | 2 | 10 | 8 | 12,96 | OK |
| sacola / salvarSacola | 0 | 4 | 2 | 4,47 | OK |
| conta / criarConta | 2 | 7 | 6 | 9,43 | OK |
| conta / lerSessao | 2 | 4 | 16 | 16,61 | Atenção |
| conta / salvarSessao | 0 | 3 | 2 | 3,61 | OK |
| Cardapio / normalizar | 0 | 4 | 0 | 4,00 | OK |
| Cardapio / Cardapio | 6 | 29 | 15 | 33,20 | Suspeito |
| Sacola / Sacola | 3 | 15 | 14 | 20,74 | Atenção |

`calcularCalorias` tem magnitude zero porque só faz aritmética e retorno,
operações não contadas nesta convenção. Isso não significa custo zero,
ausência de lógica ou validação nutricional. Não alterar o código para
otimizar artificialmente a métrica.

### Reprodução da contagem

Na raiz do repositório, com Node no PATH e as dependências existentes:

```sh
node <<'NODE'
const ts = require('typescript');
const fs = require('node:fs');
const K = ts.SyntaxKind;
const files = [
  'src/lib/calc.ts', 'src/fitbox/catalogo.ts', 'src/fitbox/sacola.ts',
  'src/fitbox/conta.ts', 'src/fitbox/Cardapio.tsx', 'src/fitbox/Sacola.tsx',
];
const conditions = new Set([
  K.EqualsEqualsToken, K.ExclamationEqualsToken,
  K.EqualsEqualsEqualsToken, K.ExclamationEqualsEqualsToken,
  K.LessThanToken, K.LessThanEqualsToken,
  K.GreaterThanToken, K.GreaterThanEqualsToken,
  K.InKeyword, K.InstanceOfKeyword, K.AmpersandAmpersandToken,
  K.BarBarToken, K.QuestionQuestionToken,
]);
function measure(root) {
  let A = 0, B = 0, C = 0;
  function visit(n) {
    if (ts.isVariableDeclaration(n) && n.initializer) A++;
    if (ts.isBinaryExpression(n)) {
      const op = n.operatorToken.kind;
      if (op >= K.FirstAssignment && op <= K.LastAssignment) A++;
      if (conditions.has(op)) C++;
    }
    if (ts.isPrefixUnaryExpression(n) || ts.isPostfixUnaryExpression(n)) {
      if (n.operator === K.PlusPlusToken || n.operator === K.MinusMinusToken) A++;
      if (n.operator === K.ExclamationToken) C++;
    }
    if (ts.isCallExpression(n) || ts.isNewExpression(n)) B++;
    if (ts.isIfStatement(n) || ts.isConditionalExpression(n)
      || ts.isForStatement(n) || ts.isForInStatement(n)
      || ts.isForOfStatement(n) || ts.isWhileStatement(n)
      || ts.isDoStatement(n) || ts.isCaseClause(n) || ts.isCatchClause(n)) C++;
    ts.forEachChild(n, visit);
  }
  visit(root);
  const magnitude = Math.hypot(A, B, C);
  return { A, B, C, magnitude: Number(magnitude.toFixed(2)),
    faixa: magnitude < 15 ? 'OK' : magnitude < 30 ? 'atenção'
      : magnitude <= 60 ? 'suspeito' : 'crítico' };
}
for (const file of files) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest, true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  if (source.parseDiagnostics.length) throw new Error('Falha de parsing: ' + file);
  console.log(file, measure(source));
  for (const n of source.statements) {
    if (ts.isFunctionDeclaration(n) && n.body)
      console.log(n.name.text, measure(n.body));
    if (ts.isVariableStatement(n))
      for (const d of n.declarationList.declarations)
        if (d.initializer && (ts.isArrowFunction(d.initializer)
          || ts.isFunctionExpression(d.initializer)))
          console.log(d.name.getText(source), measure(d.initializer.body));
  }
}
NODE
```

### Identidade das fontes medidas

SHA-256 do conteúdo, inclusive arquivos ainda não rastreados pelo Git:

```text
71e2841a683a34fa978ba8b80ef69f58f786a955c484b52f98eabb901b2ef1a6  src/lib/calc.ts
8fa41c04f6f5e932ee0a60d1a2eec674ac36fb3014314dda3221c31785f32d25  src/fitbox/catalogo.ts
e93e3db80811875ad1756c617649aa3cc017a618eadf485c4f97365d28c7bd13  src/fitbox/sacola.ts
761be7b4781321c90fc50927da9a6511ad1f234fc4c7421aac7b4e5b7f2acd0d  src/fitbox/conta.ts
9a4d5ec2cb8a9d3afe5efb2a816c7e1de2467debe895af10611bda32128152a4  src/fitbox/Cardapio.tsx
9efc1a496056bac60d1e7bc47ab50f53bb34e0f4098a01679bc35a9ee7264d49  src/fitbox/Sacola.tsx
```

## Hipótese

- O total de `sacola.ts` reflete várias funções pequenas e guards de dados
  externos; não evidencia sozinho uma função excessivamente complexa.
- `itemValido` e `lerSessao` concentram C por validação defensiva de dados
  locais. Remover esses guards para baixar ABC prejudicaria confiabilidade.
- `Cardapio` concentra chamadas, callbacks e apresentação; pode merecer
  revisão de legibilidade se receber novas responsabilidades, sem justificar
  extração automática de componentes nesta rodada.
- JSX declarativo e dependências entre componentes não são capturados por
  esta métrica; pontuação baixa não comprova simplicidade de UX.

## Pendente

Se houver autorização futura para refatorar, avaliar legibilidade e risco
por função, preservar comportamento e executar build e testes. Não existe
gate ABC em CI nem benchmark histórico equivalente para alegar melhoria.
