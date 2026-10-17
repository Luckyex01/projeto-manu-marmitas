# FITBOX: Metodologia de Cálculo Nutricional

## 1. FONTE PRIMÁRIA E RASTREABILIDADE

- Fonte primária: Tabela Brasileira de Composição de Alimentos (TACO), 4ª edição revisada e ampliada, NEPA/Unicamp, 2011.
- [PDF publicado pelo NEPA/Unicamp](https://www.nepa.unicamp.br/wp-content/uploads/sites/27/2023/10/taco_4_edicao_ampliada_e_revisada.pdf).
- [Cópia disponibilizada pelo Ministério da Agricultura](https://www.gov.br/agricultura/pt-br/assuntos/inspecao/produtos-vegetal/legislacao-programas-nacionais-e-seguranca-dos-alimentos-1/legislacao/legislacao-vinhos-e-bebidas/tabela-brasileira-de-composicao-de-alimentos_taco_2011.pdf/@@download/file).
- Auditoria documental realizada em 13/10/2026. As páginas citadas abaixo são as páginas impressas da publicação, não a numeração do visualizador PDF.
- Cada ingrediente deve registrar número do alimento, descrição exata, estado de preparo, massa utilizada e página da fonte. Não substituir automaticamente alimentos ou preparações ausentes da TACO.

## 2. MÉTODO E LIMITES

### 2.1 Composição por porção

Para cada ingrediente pronto para consumo, a contribuição de um nutriente é:

$$N_i = \frac{\text{massa do ingrediente em gramas}}{100} \times T_i$$

Onde $T_i$ é o teor por 100 g de parte comestível publicado na TACO. O total da porção é a soma das contribuições. Pesos crus e cozidos não são intercambiáveis.

### 2.2 Energia adotada no protótipo

O projeto adota os fatores gerais 4/4/9:

$$E = (P \times 4) + (C \times 4) + (G \times 9)$$

- Calcular a energia com os totais ponderados antes de arredondar para exibição.
- Neste exemplo, `C` corresponde à coluna **carboidrato por diferença da TACO**, que inclui fibra alimentar total (metodologia, p. 13). Não chamá-la de "carboidrato disponível".
- A própria TACO calcula sua coluna de energia pelo sistema Atwater com **coeficientes específicos** (p. 13). Essa coluna não é necessariamente igual ao resultado dos fatores gerais 4/4/9.
- O uso de 4/4/9 sobre a coluna de carboidrato da TACO é uma convenção explícita do protótipo, não uma declaração de equivalência com rotulagem regulatória. Não subtrair fibras nem mudar os fatores silenciosamente; uma eventual mudança de método depende de validação nutricional.
- As casas decimais abaixo permitem reproduzir a aritmética a partir dos dados publicados; não representam precisão laboratorial da receita real.
- A conferência da RDC 429/2020, art. 32, §1, encontrou regra regulatória
  de energia com fatores do anexo XXII da IN 75 e nutrientes arredondados
  declarados na tabela. É uma diferença explícita em relação à convenção
  acadêmica acima, não corrigida silenciosamente. A validação profissional
  deve definir a futura memória regulatória, separada deste exemplo.

## 3. EXEMPLO AUDITÁVEL: FRANGO GRELHADO, ARROZ E FEIJÃO

### Fato: entradas verificadas na TACO v.4

| Número e descrição exata | Página: macros / sódio | Proteína (g/100 g) | Carboidrato (g/100 g) | Lipídios (g/100 g) | Fibra (g/100 g) | Sódio (mg/100 g) |
| :--- | :--- | ---: | ---: | ---: | ---: | ---: |
| 410: Frango, peito, sem pele, grelhado | 52 / 53 | 32,0 | 0,0 | 2,5 | NA | 50 |
| 3: Arroz, tipo 1, cozido | 26 / 27 | 2,5 | 28,1 | 0,2 | 1,6 | 1 |
| 561: Feijão, carioca, cozido | 62 / 63 | 4,8 | 13,6 | 0,5 | 8,5 | 2 |

`NA` é a indicação "não aplicável" da TACO; não equivale a uma medição de zero. Neste modelo, o frango não acrescenta fibra à soma.

### Hipótese: composição da porção demonstrativa

Preserva-se a composição anteriormente registrada: 130 g de frango grelhado, 120 g de arroz cozido e 100 g de feijão cozido, somando 350 g. Essas massas ainda não foram confirmadas por ficha técnica da preparação.

Cebolinha, óleo, sal e outros ingredientes adicionais não estão quantificados neste exemplo. Sua exclusão delimita o cálculo; não prova contribuição desprezível nem ausência na receita. Se forem utilizados, devem integrar a ficha técnica e a massa total.

### Cálculo ponderado

| Ingrediente | Massa modelada (g) | Proteína (g) | Carboidrato (g) | Gordura (g) | Fibra computada (g) | Sódio computado (mg) |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| Frango: teores × 1,3 | 130 | 41,60 | 0,00 | 3,25 | NA (não aplicável) | 65,00 |
| Arroz: teores × 1,2 | 120 | 3,00 | 33,72 | 0,24 | 1,92 | 1,20 |
| Feijão: teores × 1,0 | 100 | 4,80 | 13,60 | 0,50 | 8,50 | 2,00 |
| **Total do modelo** | **350** | **49,40** | **47,32** | **3,99** | **10,42** | **68,20** |

Todos os valores da porção são **a validar pela nutricionista**.

$$E = (49,40 \times 4) + (47,32 \times 4) + (3,99 \times 9)$$
$$E = 197,60 + 189,28 + 35,91 = 422,79\text{ kcal}$$

Para apresentação demonstrativa em inteiros, arredondando apenas ao final: **423 kcal, 49 g de proteína, 47 g de carboidrato, 4 g de gordura, 10 g de fibra e 68 mg de sódio computado, a validar pela nutricionista**. Esta é uma convenção de apresentação do protótipo, não uma regra de arredondamento regulatória.

### Reconciliação: 423 versus 420 kcal

- **423 kcal:** arredondamento de 422,79 kcal, calculadas com as contribuições anteriores e os fatores gerais 4/4/9.
- **420 kcal:** resultado de `49 × 4 + 47 × 4 + 4 × 9`. Utiliza números já arredondados e perde informação; não deve substituir a energia calculada antes do arredondamento.
- A versão anterior usava 31,5 g de proteína e 3,2 g de gordura por 100 g, valores da entrada **408: frango cozido**, mas dizia "grelhado" e utilizava o sódio do grelhado. Também citava números incorretos para os três alimentos.
- Os antigos totais de 48,75 g de proteína, 47,32 g de carboidrato e 4,90 g de gordura dariam **428,38 kcal**, não 423 kcal. Além disso, 4,90 g arredondam para 5 g e 68,20 mg arredondam para 68 mg, não 4 g e 69 mg.
- Para comparação de métodos, a soma das energias publicadas na TACO para as mesmas massas é `159 × 1,3 + 128 × 1,2 + 76 × 1,0 = 436,30 kcal`. Esse resultado usa outra base energética e não deve ser misturado com o cálculo 4/4/9 do projeto.
- O teste em `src/lib/calc.test.ts` usa os totais 49,40 / 47,32 / 3,99 e verifica 422,79 kcal antes de arredondar. A regressão não substitui a validação da receita.

## 4. EXIBIÇÃO E RESPONSABILIDADE

- Cards, modais e demais locais que exibem valores nutricionais devem apresentar:
  > "Estimativa TACO 4ª ed., a validar pela nutricionista."
- Preços e massas do protótipo são provisórios; não inventar dados nem tratar o exemplo como ficha técnica aprovada.
- Não exibir selos Anvisa, alegações nutricionais regulamentadas ou apresentar esta tabela demonstrativa como rótulo regulatório completo.
- O sódio computado neste exemplo não inclui sal e temperos adicionados. Não anunciar o valor como sódio total da preparação real.
- Manuela Amaro é estudante de Nutrição da UDF. A documentação não comprova habilitação profissional ou registro para responsabilidade técnica.

## 5. PENDÊNCIAS E ATUALIZAÇÃO

1. Confirmar ingredientes, preparo, massas prontas, rendimento, óleo, temperos e sal em ficha técnica da preparação.
2. Validar o tratamento dos carboidratos e fibras e o método energético com a nutricionista.
3. A revisão dos seis pratos está em [AUDITORIA_NUTRICIONAL.md](AUDITORIA_NUTRICIONAL.md). Os cinco restantes não podem ser reconciliados sem receitas e rendimentos; corrigir este exemplo não valida o restante do catálogo.
4. A implementação autorizada integra o exemplo em `src/fitbox/catalogo.ts`, reutilizando `src/lib/calc.ts`. O antigo `prototipo/app.js` permanece preservado como referência histórica, não como fonte atual de cálculo.
5. A regressão dos totais e a integração do exemplo estão em `src/fitbox/catalogo.test.ts`; a exibição no navegador é verificada em `e2e/cardapio.spec.ts`.
6. Manter o aviso "a validar pela nutricionista" conforme as instruções vigentes. Não removê-lo automaticamente após alterações nos dados.
