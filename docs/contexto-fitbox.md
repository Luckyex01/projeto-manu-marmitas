# FITBOX — Base de Conhecimento e Contexto Operacional

## 1. MODELO DE NEGÓCIO REAL

- Fatos:
  - Operacao 100% autonoma de autoatendimento baseada em freezer fisico instalado dentro de academias parceiras.
  - O freezer e horizontal, branco, com tampa de vidro deslizante transparente e adesivacao FITBOX.
  - Nao existe entrega em domicilio, frete ou logistica de motoboy.
  - Nao existe atendente, balconista ou vendedor no local.
  - Nao ha canal de atendimento, suporte ou recebimento de pedidos via WhatsApp.
  - Acesso primario a vitrine digital feito por escaneamento de QR Code impresso no ponto de venda.

- Hipoteses:
  - O cliente final busca a refeicao primariamente no pos-treino imediato para consumo na propria academia ou no retorno para casa/trabalho.

- Pendentes:
  - Definir se a chave Pix exibida na tela sera individual por produto ou unica para a empresa FITBOX [PENDENTE].
  - Mapear a quantidade exata de freezers em operacao e quais academias recebem os pontos piloto [PENDENTE].

---

## 2. DIAGNÓSTICO DO PONTO DE VENDA

- Fatos:
  - Problema central identificado no diagnostico oficial: baixa taxa de conversao de vendas dos produtos estocados no freezer.
  - Causas-raiz tecnicas e de friccao:
    1. Instabilidade de conectividade e sinal na maquininha de cartao instalada na mesa de apoio.
    2. Medo e inseguranca do aluno em passar o cartao ou pagar sem a presenca de um operador humano.
    3. Ausencia de instrucoes claras de passo a passo de compra coladas no equipamento.
  - Causas-raiz de percepcao de valor e confianca:
    1. Preco percebido como elevado devido a ausencia de vendedor para ancorar os beneficios nutricionais.
    2. Informacao nutricional, ingredientes e calorias invisiveis atraves do vidro e nas embalagens empilhadas.
    3. Desconfianca do consumidor quanto ao frescor, sabor e tempo de congelamento do alimento.
  - Efeitos comerciais: risco de quebra de contrato com a academia por baixo giro e perda de mercadoria por data de validade.
  - Solucao MVP adotada:
    1. Aplicacao de adesivo fisico no freezer com instrucoes operacionais em 3 etapas claras.
    2. QR Code de alto contraste direcionando o aluno para a vitrine digital com tabela nutricional completa.

- Hipoteses:
  - Tornar os macronutrientes (proteina, carboidrato, gordura) visiveis em 1 toque no celular reduz a rejeicao de preco em mais de 50%.

- Pendentes:
  - Definir cronograma para acao de degustacao orientada para quebra de barreira sensorial [PENDENTE].
  - Mapear a rotina e frequencia semanal de reposicao dos freezers [PENDENTE].

---

## 3. PERSONA

- Fatos:
  - Nome de referencia do perfil: Joao.
  - Idade: 28 anos.
  - Rotina: treina musculacao no intervalo de almoco do trabalho ou logo antes do expediente; vive com restricao severa de tempo.
  - Friccoes e dores principais:
    1. Medo de travar o pagamento e nao ter a quem recorrer.
    2. Preconceito estabelecido com comida congelada ("comida sem gosto", "cheia de conservantes").
    3. Dificuldade em bater a meta diaria de proteina sem perder tempo cozinhando.

- Hipoteses:
  - O gatilho de decisao do Joao e visual e quantitativo: ver a foto real do prato e conferir se tem mais de 35g de proteina resolve a compra.

- Pendentes:
  - Mapear persona feminina com foco em emagrecimento ou restricao calorica (marmitas de ate 300 kcal) [PENDENTE].

---

## 4. IDENTIDADE VISUAL E DESIGN SYSTEM

- Fatos:
  - Paleta de cores oficial extraida da marca:
    - Laranja Apetite/Acao: #FC7403
    - Verde Nutricao/Frescor: #68C31A
    - Preto Carbono/Fundo: #0A0A0A
    - Branco Texto/Contraste: #F5F5F5
  - Tipografia de marca: Montserrat, pesos 800 (Extra Bold) e 900 (Black), com estilizacao italica para titulos e chamadas.
  - Arquivo da logo oficial: fitbox/fitbox-logo.jpeg, composto por monograma "FB" estilizado (folha integrada no B), palavra "FIT" em branco e "BOX" em laranja sobre fundo preto.
  - Inconsistencia identificada nos materiais: o banner impresso gerado por IA exibe a grafia "F(folha)ITBOX" em cinza e laranja, divergindo do arquivo oficial da marca. A logo oficial de referencia para a vitrine e fitbox-logo.jpeg.

- Hipoteses:
  - A inclinacao italica da tipografia e o fundo escuro estabelecem comunicacao visual alinhada a estetica esportiva contemporanea das academias.

- Pendentes:
  - Obter arquivo vetorial (SVG) da logo oficial da FITBOX [PENDENTE].

---

## 5. CARDÁPIO BASE (ESTIMATIVA TACO V.4 / MÉTODO 4/4/9)

- Fatos:
  - Todos os valores de macronutrientes e calorias foram calculados com base na Tabela Brasileira de Composicao de Alimentos (TACO 4ª ed., 2011).
  - Energia calculada pela formula de Atwater (4 kcal/g para proteina e carboidrato; 9 kcal/g para lipidio).
  - Todos os valores sao estimativas e estao obrigatoriamente classificados como: "a validar pela nutricionista".
  - Fichas dos 6 pratos estruturados:
    1. Frango grelhado, arroz e feijao
       - Peso porcao: 350 g | Energia: 423 kcal
       - Proteina: 49 g | Carboidrato: 47 g | Gordura: 4 g | Fibra: 10 g | Sodio: 69 mg
       - Preco sugerido: R$ 27,90
       - Ingredientes: Peito de frango grelhado (130 g), arroz branco (120 g), feijao carioca (100 g), cebolinha.
    2. Frango grelhado com pure de batata
       - Peso porcao: 380 g | Energia: 316 kcal
       - Proteina: 45 g | Carboidrato: 26 g | Gordura: 3 g | Fibra: 4 g | Sodio: 71 mg
       - Preco sugerido: R$ 27,90
       - Ingredientes: Peito de frango grelhado (130 g), pure de batata (200 g), brocolis (50 g).
    3. Peixe branco com arroz integral e legumes
       - Peso porcao: 360 g | Energia: 330 kcal
       - Proteina: 39 g | Carboidrato: 37 g | Gordura: 3 g | Fibra: 7 g | Sodio: 163 mg
       - Preco sugerido: R$ 29,90
       - Ingredientes: File de peixe branco assado (130 g), arroz integral (120 g), brocolis (60 g), cenoura (50 g).
    4. Carne moida com pure e arroz
       - Peso porcao: 330 g | Energia: 418 kcal
       - Proteina: 43 g | Carboidrato: 42 g | Gordura: 8 g | Fibra: 3 g | Sodio: 70 mg
       - Preco sugerido: R$ 28,90
       - Ingredientes: Patinho moido (110 g), pure de batata (120 g), arroz branco (100 g), cebolinha.
    5. Peixe com legumes (low carb)
       - Peso porcao: 390 g | Energia: 236 kcal
       - Proteina: 43 g | Carboidrato: 11 g | Gordura: 2 g | Fibra: 6 g | Sodio: 187 mg
       - Preco sugerido: R$ 29,90
       - Ingredientes: File de peixe branco assado (150 g), brocolis (100 g), abobrinha (80 g), cenoura (60 g).
    6. Falafel assado com arroz integral e legumes (vegano)
       - Peso porcao: 425 g | Energia: 417 kcal
       - Proteina: 19 g | Carboidrato: 73 g | Gordura: 5 g | Fibra: 15 g | Sodio: 10 mg
       - Preco sugerido: R$ 26,90
       - Ingredientes: Falafel de grao-de-bico assado (70 g cru), arroz integral (100 g), abobrinha (60 g), cenoura (50 g), brocolis (40 g).

- Hipoteses:
  - Os precos na faixa de R$ 26,90 a R$ 29,90 cobrem os custos de producao e permanecem competitivos com lanches e refeicoes rapidas na regiao das academias.

- Pendentes:
  - Validacao formal de cada ficha tecnica, peso cru versus cozido e ingredientes exatos com a nutricionista Manuela [PENDENTE].
  - Inclusao formal do teor de sodio decorrente do sal de adicao adicionado no preparo de cozinha [PENDENTE].

---

## 6. ATIVOS DISPONÍVEIS E MAPEAMENTO DE USO

- Fatos:
  - 9 fotos reais de preparacoes culinarias (fitbox/fitbox-marmitas-fotos-reais1 a 9.jpeg):
    - Foto 1: Pilha de marmitas seladas com fundo marmorizado. Uso: ilustracao de producao e seguranca de embalagem.
    - Foto 2: Marmita com peixe branco, brocolis e cenoura. Uso: card do prato Peixe com legumes (low carb).
    - Foto 3: Marmita com falafel assado e vegetais. Uso: card do prato Falafel assado (vegano).
    - Foto 4: Preparacao com queijo gratinado e batata frita/chips em embalagem de papel. Uso desaconselhado: preparacao fora do padrao nutricional saudavel da FITBOX.
    - Foto 5: Processo de finalizacao com ervas frescas. Uso: secao institucional "Preparo e Cuidado".
    - Foto 6: Marmita com peito de frango em tiras, arroz branco e feijao. Uso: card do prato Frango, arroz e feijao.
    - Foto 7: Peito de frango grelhado com pure e brocolis. Uso: card do prato Frango grelhado com pure.
    - Foto 8: Patinho moido com arroz branco e pure. Uso: card do prato Carne moida com pure e arroz.
    - Foto 9: Composicao comparativa da marmita montada e servida no prato. Uso: card do prato Peixe branco com arroz integral e secao de quebra de preconceito.
  - Video em formato vertical gerado por IA (fitbox/fitbox-video-ia.mp4, 478x850 px):
    - Uso: looping silencioso na secao Hero da vitrine mobile para contextualizar o freezer fisico na academia.
  - Banner fisico da academia (fitbox/fitbox-academia.jpeg):
    - Exibe o freezer fisico real e a disposicao espacial dos materiais de divulgacao.

- Hipoteses:
  - As fotos 2, 5, 6, 7 e 8 pertencem a mesma sessao de preparo caseiro/laboratorial realizada pela Manuela.

- Pendentes:
  - Confirmar a autoria original das fotos 3 e 4 com a cliente [PENDENTE].

---

## 7. ARQUITETURA DE INFORMAÇÃO DA VITRINE DIGITAL

- Fatos:
  - A aplicacao e uma Single Page Application (SPA) responsiva focada na navegacao mobile por QR Code.
  - Mapa das secoes e telas:
    1. Home / Hero:
       - Video de fundo em loop silencioso demonstrando o freezer na academia.
       - Chamada central direta: "Treinou? Sua refeicao ja esta aqui."
       - Tutorial em 3 passos ilustrados: 1. Pegue no freezer -> 2. Pague via Pix -> 3. Aqueca no micro-ondas.
    2. Cardapio / Vitrine:
       - Filtros rapidos por objetivo: Todos, Alta Proteina, Low Carb, Vegano.
       - Grid de cards com foto real, nome do prato, gramatura, calorias, gramas de proteina destacadas e preco.
    3. Detalhe do Prato (Modal):
       - Tabela nutricional completa no padrao RDC 429 (energia, proteinas, carboidratos, gorduras, fibras, sodio).
       - Lista nominal de ingredientes.
       - Alerta regulatorio: "Estimativa TACO 4ª ed. — a validar pela nutricionista".
       - Botao de adicao a sacola simulada.
    4. Sacola e Simulador de Pagamento:
       - Listagem dos pratos selecionados, ajuste de quantidade e subtotal.
       - Copia e cola ou QR Code simulado de Pix para pagamento rapido.
       - Mensagem de confirmacao: orientacao para pegar a marmita no freezer e tempo de aquecimento no micro-ondas.
    5. Sobre a FITBOX:
       - Apresentacao do proposito da marca e assinatura tecnica da estudante de Nutricao (UDF).
       - Informacoes de seguranca alimentar e conservacao a -18 °C.

- Hipoteses:
  - O fluxo direto Cardapio -> Modal de Macros -> Pix cobre mais de 90% das sessoes de compra no local.

- Pendentes:
  - Definir se a vitrine tera secao para avaliacao do prato pelo aluno [PENDENTE].

---

## 8. LACUNAS E PENDÊNCIAS OPERACIONAIS

- Fatos:
  - Lista de itens nao resolvidos que dependem de informacoes externas:
    1. Validacao formal e assinatura de todas as fichas tecnicas pela nutricionista Manuela [PENDENTE].
    2. Definicao exata do modelo, operadora e solucao de conectividade da maquininha de cartao do freezer [PENDENTE].
    3. Confirmacao de quem realiza a reposicao fisica dos pratos e a checagem diaria de temperatura do freezer [PENDENTE].
    4. Definicao da chave Pix oficial (CNPJ da empresa ou conta individual) [PENDENTE].
    5. Confirmacao sobre o uso ou descarte da foto 4 (marmita de parmegiana com chips) [PENDENTE].
    6. Decisao sobre a correcao do banner impresso que menciona entregas e encomendas inexistentes [PENDENTE].

- Hipoteses:
  - As pendencias 1 e 4 sao os unicos fatores que impactam diretamente o conteudo exibido na vitrine digital do trabalho de faculdade.

- Pendentes:
  - Receber retorno formal da cliente Manuela para saneamento das pendencias listadas [PENDENTE].
