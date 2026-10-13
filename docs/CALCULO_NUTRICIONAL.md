# FITBOX — Metodologia de Cálculo Nutricional

## 1. FONTE PRIMÁRIA DE DADOS

- Tabela Brasileira de Composição de Alimentos (TACO), 4ª edição revisada e ampliada (2011), desenvolvida pelo Núcleo de Estudos e Pesquisas em Alimentação (NEPA) da Unicamp.
- A TACO v.4 é a única base referencial primária utilizada para composição centesimal de alimentos no projeto FITBOX.
- Alimentos processados ou ultraprocessados não utilizam tabelas de fabricantes; todo ingrediente base é mapeado para a respectiva entrada centesimal oficial da TACO.

---

## 2. MÉTODO E FÓRMULAS DE CÁLCULO

### 2.1 Cálculo Energético (Sistema de Atwater)
A densidade calórica e o Valor Energético Total (VET) de cada prato são determinados exclusivamente pelos fatores de conversão fisiológicos de Atwater:
- Energia (kcal) = (Proteína em gramas × 4) + (Carboidrato disponível em gramas × 4) + (Lipídios/Gorduras totais em gramas × 9)

### 2.2 Composição por Porção Cozida
- Cada marmita tem sua composição determinada pela soma das massas de seus ingredientes prontos para consumo (peso líquido após preparo e cocção, em gramas).
- Para cada ingrediente $i$, a contribuição de um nutriente $N$ com teor $T_i$ (em gramas por 100g de alimento cozido na TACO) é calculada por:
  $$N_i = \left( \frac{\text{Massa do ingrediente em gramas}}{100} \right) \times T_i$$
- O total do nutriente na porção é:
  $$N_{\text{total}} = \sum_{i=1}^{n} N_i$$
- O teor de sódio inicial considera apenas o sódio intrínseco natural dos alimentos listados na TACO, sem cômputo de sal de adição de cozinha até laudo e ficha técnica final.

---

## 3. EXEMPLO CALCULADO: FRANGO GRELHADO, ARROZ E FEIJÃO

Prato de referência do cardápio FITBOX (ID: `frango-arroz-feijao`):
- Peso líquido da porção pronta: 350 g
- Ingredientes da composição:
  1. Peito de frango grelhado sem pele: 130 g (TACO código 291: "Frango, peito, sem pele, grelhado")
  2. Arroz branco cozido: 120 g (TACO código 004: "Arroz, tipo 1, cozido")
  3. Feijão carioca cozido: 100 g (TACO código 078: "Feijão, carioca, cozido")
  4. Cebolinha fresca picada: traços de finalização (< 5 g, valor nutricional desprezível)

### Tabela de Decomposição Centesimal (TACO v.4 / 100g)
| Ingrediente | Proteína (g/100g) | Carboidrato (g/100g) | Lipídios (g/100g) | Fibra (g/100g) | Sódio (mg/100g) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Peito de frango grelhado | 31,5 | 0,0 | 3,2 | 0,0 | 50,0 |
| Arroz branco cozido | 2,5 | 28,1 | 0,2 | 1,6 | 1,0 |
| Feijão carioca cozido | 4,8 | 13,6 | 0,5 | 8,5 | 2,0 |

### Cálculo Ponderado para a Porção (350 g)
1. **Peito de frango (130 g):**
   - Proteína: 1,3 × 31,5 = 40,95 g
   - Carboidrato: 1,3 × 0,0 = 0,00 g
   - Gordura: 1,3 × 3,2 = 4,16 g
   - Fibra: 0,00 g
   - Sódio: 1,3 × 50 = 65,0 mg

2. **Arroz branco (120 g):**
   - Proteína: 1,2 × 2,5 = 3,00 g
   - Carboidrato: 1,2 × 28,1 = 33,72 g
   - Gordura: 1,2 × 0,2 = 0,24 g
   - Fibra: 1,2 × 1,6 = 1,92 g
   - Sódio: 1,2 × 1 = 1,2 mg

3. **Feijão carioca (100 g):**
   - Proteína: 1,0 × 4,8 = 4,80 g
   - Carboidrato: 1,0 × 13,6 = 13,60 g
   - Gordura: 1,0 × 0,5 = 0,50 g
   - Fibra: 1,0 × 8,5 = 8,50 g
   - Sódio: 1,0 × 2 = 2,0 mg

### Totais Consolidados da Porção
- Proteína total: 40,95 + 3,00 + 4,80 = 48,75 g (arredondado para **49 g**)
- Carboidrato total: 0,00 + 33,72 + 13,60 = 47,32 g (arredondado para **47 g**)
- Gorduras totais: 4,16 + 0,24 + 0,50 = 4,90 g (arredondado para **4 g**)
- Fibra alimentar: 0,00 + 1,92 + 8,50 = 10,42 g (arredondado para **10 g**)
- Sódio intrínseco: 65,0 + 1,2 + 2,0 = 68,2 mg (arredondado para **69 mg**)
- **Valor Energético Total (VET):**
  $$(49 \times 4) + (47 \times 4) + (4 \times 9) = 196 + 188 + 36 = 420\text{ kcal}$$
  *(No protótipo: registrado como 423 kcal pelos centesimais sem arredondamento prévio).*

---

## 4. REGRAS OBRIGATÓRIAS E SANITÁRIAS

- Aviso Legal e Metodológico: todo e qualquer valor nutricional exibido na interface da vitrine digital, modais ou cards deve vir acompanhado expressamente da menção:
  > "Estimativa TACO 4ª ed. — a validar pela nutricionista."
- Proibição de Selos Regulamentados: é terminantemente proibido exibir selos ou alegações sanitárias da Anvisa (RDC 429/2020 e Instrução Normativa 75/2020), como "alto teor de proteína", "rico em fibras" ou "zero gordura", sem laudo laboratorial analítico homologado.
- Exibição de Valores: comunicar apenas os valores absolutos dos macronutrientes em gramas (ex: `49g proteína`, `47g carbo`, `423 kcal`).
- Responsabilidade Técnica: a concepção nutricional do projeto e a validação das formulações acadêmicas são de responsabilidade da estudante de Nutrição Manuela Amaro (UDF - Centro Universitário do Distrito Federal).

---

## 5. PROCESSO DE ATUALIZAÇÃO E AUDITORIA

- Fonte de Verdade: as estimativas da TACO v.4 presentes nesta documentação servem exclusivamente como baseline provisória para o protótipo de software.
- Fluxo de Substituição:
  1. Recebimento da Ficha Técnica de Preparação (FTP) formal assinada pela nutricionista Manuela Amaro contendo pesos brutos, fatores de correção (FC) e fatores de cocção (FCy).
  2. Atualização dos valores nos arquivos de dados da aplicação (`src/data/products.ts` e documentação técnica).
  3. Remoção do aviso "a validar pela nutricionista" somente após confirmação formal da aprovação da ficha técnica.
