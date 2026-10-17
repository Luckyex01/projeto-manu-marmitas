# Auditoria nutricional das seis propostas

Consulta: 16/10/2026. Todos os números de porção, composição e energia
discutidos neste documento são **a validar pela nutricionista**.

## Fato

A fonte primária é a [TACO v.4, NEPA/Unicamp, 2011](https://www.nepa.unicamp.br/wp-content/uploads/sites/27/2023/10/taco_4_edicao_ampliada_e_revisada.pdf).
O método do protótipo é `4P + 4C + 9G`, sobre a composição antes de arredondar.
A metodologia e o exemplo reproduzível estão em
[CALCULO_NUTRICIONAL.md](CALCULO_NUTRICIONAL.md).

As fichas fornecidas são de "Recheadinho saudável" e "pão de mel vegano",
não das seis marmitas. Não validam receita, rendimento ou massa pronta
dos pratos do catálogo.

### Entradas verificadas por 100 g

P, C, G e fibra em g. `NA` significa não aplicável; `Tr`, traço,
não zero medido. As páginas são as impressas da tabela centesimal.

| Código TACO | Descrição | Página | P | C | G | Fibra | Uso possível e limite |
|---|---|---:|---:|---:|---:|---:|---|
| 410 | Frango, peito, sem pele, grelhado | 52 | 32,0 | 0,0 | 2,5 | NA | Exemplo de frango |
| 3 | Arroz, tipo 1, cozido | 26 | 2,5 | 28,1 | 0,2 | 1,6 | Arroz branco pronto |
| 561 | Feijão, carioca, cozido | 62 | 4,8 | 13,6 | 0,5 | 8,5 | Exemplo de feijão |
| 1 | Arroz, integral, cozido | 26 | 2,6 | 25,8 | 1,0 | 2,7 | Confirmar variedade e preparo |
| 70 | Abobrinha, italiana, cozida | 30 | 1,1 | 3,0 | 0,2 | 1,6 | Confirmar preparo e óleo |
| 91 | Batata, inglesa, cozida | 30 | 1,2 | 11,9 | Tr | 1,3 | Não equivale a purê |
| 100 | Brócolis, cozido | 32 | 2,1 | 4,4 | 0,5 | 3,4 | Confirmar preparo |
| 109 | Cenoura, cozida | 32 | 0,8 | 6,7 | 0,2 | 2,6 | Confirmar preparo |
| 376 | Carne, bovina, patinho, sem gordura, cru | 50 | 21,7 | 0,0 | 4,5 | NA | Não usar como carne moída pronta |
| 377 | Carne, bovina, patinho, sem gordura, grelhado | 50 | 35,9 | 0,0 | 7,3 | NA | Corte e preparo não confirmados |
| 575 | Grão-de-bico, cru | 62 | 21,2 | 57,9 | 5,4 | 12,4 | Não equivale a falafel pronto |

Não foi escolhida espécie de peixe por inferência visual. Não existe uma
entrada única que represente automaticamente o purê ou falafel da cliente.

### Reconciliação por prato

`4/4/9 dos inteiros` abaixo é apenas diagnóstico aritmético. Não substitui
o cálculo de uma receita e não deve atualizar silenciosamente as calorias.

| Prato / id | Massa proposta | P / C / G históricos | Energia no site | 4/4/9 dos inteiros | Resultado da revisão |
|---|---:|---|---:|---:|---|
| Frango, arroz e feijão / frango-arroz-feijao | 350 g | 49,40 / 47,32 / 3,99 | 423 kcal | 422,79 kcal com decimais | Aritmética reconciliada, receita não validada |
| Frango com purê / frango-pure | 380 g | 45 / 26 / 3 | 316 kcal | 311 kcal | Bloqueado pela receita do purê |
| Peixe e arroz / peixe | 360 g | 39 / 37 / 3 | 330 kcal | 331 kcal | Espécie e preparo não informados |
| Carne com purê / carne-pure | 330 g | 43 / 42 / 8 | 418 kcal | 412 kcal | Corte, preparo e purê não informados |
| Peixe com legumes / lowcarb | 390 g | 43 / 11 / 2 | 236 kcal | 234 kcal | Espécie, preparo e óleo não informados |
| Falafel / falafel | 425 g | 19 / 73 / 5 | 417 kcal | 413 kcal | Receita, rendimento e massa pronta não informados |

Diferenças entre calorias históricas e macros inteiros não provam erro da
energia original: arredondamentos podem explicar parte delas. Sem totais
não arredondados e ficha técnica, não há como reconciliar o método.

### Exemplo reproduzível

Modelo: 130 g de frango grelhado, 120 g de arroz branco cozido, 100 g de
feijão carioca cozido. Multiplicar cada teor TACO pela massa/100 e somar:

- P: `32 × 1,3 + 2,5 × 1,2 + 4,8 = 49,40 g`.
- C: `28,1 × 1,2 + 13,6 = 47,32 g`.
- G: `2,5 × 1,3 + 0,2 × 1,2 + 0,5 = 3,99 g`.
- Energia: `49,40 × 4 + 47,32 × 4 + 3,99 × 9 = 422,79 kcal`.
- Fibra computada: `1,6 × 1,2 + 8,5 = 10,42 g`.
- Sódio computado: `50 × 1,3 + 1 × 1,2 + 2 = 68,20 mg`.
  Fontes do sódio: páginas 53, 27 e 63.

Cebolinha, óleo e sal não quantificados delimitam o modelo; sua contribuição
não foi considerada nula na receita real. Os 68,20 mg não representam
sódio total do produto comercial.

## Hipótese

As massas históricas de frango/purê/brócolis (130/200/50 g), peixe/arroz/
brócolis/cenoura (130/120/60/50 g), carne/purê/arroz (110/120/100 g) e
peixe/brócolis/abobrinha/cenoura (150/100/80/60 g) descrevem propostas,
não porções medidas.

O registro antigo do falafel soma 320 g ao juntar 70 g crus de grão-de-bico,
100 g de arroz, 60 g de abobrinha, 50 g de cenoura e 40 g de brócolis,
enquanto o card declara 425 g. Há mistura de estados e ausência de rendimento.
Não corrigir a diferença de 105 g inventando água ou ingredientes.

## Pendente

Para cada marmita, receber:

1. Ingredientes completos, marcas e subingredientes; espécie/corte.
2. Pesos crus e prontos, perdas, rendimento e massa efetivamente embalada.
3. Óleo, sal, temperos, leite/manteiga e outros ingredientes do purê.
4. Receita e método de cocção do falafel, não somente massa de leguminosa crua.
5. Validação do método energético, carboidratos/fibras e arredondamento.
6. Açúcares totais/adicionados, gordura saturada/trans e demais campos do rótulo.
7. Alergênicos, contaminação cruzada, conservação e validade.

**Veredito:** revisão documental dos seis pratos realizada; auditoria completa
de cinco receitas bloqueada. Não foram adicionados pratos para atingir
artificialmente a meta de 8 a 12. A marca interna `auditado` identifica
reconciliação aritmética do exemplo, não aprovação profissional.
