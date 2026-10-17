# FITBOX: Base de Conhecimento e Contexto Operacional

## ESCOPO DIGITAL VIGENTE (16/10/2026)

- **Fato:** a implementação principal está em `src/fitbox/`, com entrada em `fitbox-app/`. O React anterior está em `legado/`. `prototipo/` também fornece assets e CSS utilizados pela base oficial, não pode ser removido como duplicata.
- **Fato:** o fluxo autorizado é Home -> Cardápio/modal -> Sacola -> Conta demonstrativa -> Confirmação demonstrativa, sem Pix, cobrança, envio de pedido, reserva ou liberação de retirada. Navegação, adição e abertura da sacola são livres.
- **Fato:** a conta local aceita nome/email fictícios e senha livre não vazia, sem autenticação real. Somente nome/email persistem; senha nunca é armazenada. Logout mantém a sacola; confirmar limpa os itens. Falhas de armazenamento são avisadas.
- **Fato:** FAQ com seis perguntas próprias e detalhe separado em apresentação, ingredientes e informação nutricional.
- **Fato:** o exemplo de frango, arroz e feijão foi reconciliado com as entradas 410, 3 e 561 da TACO v.4: 49,40 g de proteína, 47,32 g de carboidrato e 3,99 g de gordura geram 422,79 kcal no método geral 4/4/9, exibidas como 423 kcal. O sódio computado é 68,20 mg, exibido como 68 mg. Todos os valores da porção são a validar pela nutricionista.
- **Hipótese:** as massas e receitas propostas representam os pratos reais; isso ainda depende de ficha técnica.
- **Pendente:** auditar os outros cinco pratos e confirmar receita, massas, preço, sal, óleo e método energético. A documentação histórica abaixo não comprova operação física, composição validada ou habilitação profissional.
- As specs atuais e [CALCULO_NUTRICIONAL.md](CALCULO_NUTRICIONAL.md) prevalecem sobre os valores históricos abaixo. Consulte também [auditoria](AUDITORIA_NUTRICIONAL.md), [mercado](MERCADO.md), [UX](REFERENCIAS_UX.md) e [segurança alimentar](SEGURANCA_ALIMENTAR.md).

## 1. MODELO DE NEGÓCIO REAL

- Fatos:
  - Modelo proposto: autoatendimento em freezer dentro de academias parceiras. A documentacao nao comprova operacao instalada.
  - O freezer e horizontal, branco, com tampa de vidro deslizante transparente e adesivacao FITBOX.
  - Nao existe entrega em domicilio, frete ou logistica de motoboy.
  - Nao existe atendente, balconista ou vendedor no local.
  - Nao ha canal de atendimento, suporte ou recebimento de pedidos via WhatsApp.
  - Acesso primario a vitrine digital feito por escaneamento de QR Code impresso no ponto de venda.

- Hipoteses:
  - O cliente final busca a refeicao primariamente no pos-treino imediato para consumo na propria academia ou no retorno para casa/trabalho.

- Pendentes:
  - Pagamento comercial real nao integra a vitrine demonstrativa. Nao exibir chave ou codigo Pix.
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
  - Tornar os macronutrientes visiveis em 1 toque pode reduzir a rejeicao ao preco (hipotese sem medicao, validar com a conversao no freezer).

- Pendentes:
  - Definir cronograma para acao de degustacao orientada para quebra de barreira sensorial [PENDENTE].
  - Mapear a rotina e frequencia semanal de reposicao dos freezers [PENDENTE].

---

## 3. PERSONA

- Fatos da persona de referencia, nao de pesquisa amostral:
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
  - Pesquisar outros perfis sem presumir objetivo nutricional por genero [PENDENTE].

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
  - O exemplo de frango, arroz e feijao foi reconciliado com a TACO v.4; os outros cinco pratos preservam estimativas historicas nao auditadas, sem confirmacao de equivalencia com as receitas reais.
  - Metodo adotado: 4 kcal/g para proteina e carboidrato; 9 kcal/g para lipidio. Apenas o primeiro exemplo foi reconciliado antes do arredondamento. As demais energias historicas nao comprovam aplicacao desse metodo.
  - Todos os valores sao estimativas e estao obrigatoriamente classificados como: "a validar pela nutricionista".
  - Registro historico das 6 propostas, nao fichas tecnicas aprovadas. Todos os valores de porcao, energia, nutrientes e preco abaixo sao a validar pela nutricionista:
    1. Frango grelhado, arroz e feijao
       - Peso porcao: 350 g | Energia: 423 kcal
       - Proteina: 49 g | Carboidrato: 47 g | Gordura: 4 g | Fibra: 10 g | Sodio computado: 68 mg (a validar pela nutricionista)
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
       - Ingredientes propostos: carne moida (110 g), pure de batata (120 g), arroz branco (100 g). Corte, temperos e preparo nao confirmados.
    5. Peixe com legumes
       - Peso porcao: 390 g | Energia: 236 kcal
       - Proteina: 43 g | Carboidrato: 11 g | Gordura: 2 g | Fibra: 6 g | Sodio: 187 mg
       - Preco sugerido: R$ 29,90
       - Ingredientes: File de peixe branco assado (150 g), brocolis (100 g), abobrinha (80 g), cenoura (60 g).
    6. Falafel com arroz integral e legumes
       - Peso porcao: 425 g | Energia: 417 kcal
       - Proteina: 19 g | Carboidrato: 73 g | Gordura: 5 g | Fibra: 15 g | Sodio: 10 mg
       - Preco sugerido: R$ 26,90
       - Ingredientes propostos: falafel, arroz integral, abobrinha, cenoura e brocolis. A referencia antiga a 70 g crus nao estabelece massa pronta nem rendimento do falafel.

- Hipoteses:
  - Os precos na faixa de R$ 26,90 a R$ 29,90 cobrem os custos de producao e permanecem competitivos com lanches e refeicoes rapidas na regiao das academias.

- Pendentes:
  - Obter fichas das marmitas com Manuela, estudante de Nutricao, e validacao por profissional habilitada [PENDENTE].
  - Inclusao formal do teor de sodio decorrente do sal de adicao adicionado no preparo de cozinha [PENDENTE].

---

## 6. ATIVOS DISPONÍVEIS E MAPEAMENTO DE USO

- Fatos:
  - 9 fotos reais de preparacoes culinarias (fitbox/fitbox-marmitas-fotos-reais1 a 9.jpeg):
    - Foto 1: Pilha de marmitas seladas com fundo marmorizado. Uso ilustrativo, nao prova seguranca da embalagem.
    - Foto 2: Referencia visual de peixe e legumes, sem certificar especie ou composicao.
    - Foto 3: Referencia visual de falafel e vegetais, sem certificar dieta vegana.
    - Foto 4: Preparacao gratinada em embalagem de papel. Nao utilizada; a fotografia nao permite julgar adequacao nutricional.
    - Foto 5: Processo de finalizacao com ervas frescas. Uso: secao institucional "Preparo e Cuidado".
    - Foto 6: Marmita com peito de frango em tiras, arroz branco e feijao. Uso: card do prato Frango, arroz e feijao.
    - Foto 7: Peito de frango grelhado com pure e brocolis. Uso: card do prato Frango grelhado com pure.
    - Foto 8: Carne moida com arroz branco e pure. Corte nao comprovado.
    - Foto 9: Composicao comparativa da marmita montada e servida no prato. Uso: card do prato Peixe branco com arroz integral e secao de quebra de preconceito.
  - Video em formato vertical gerado por IA (fitbox/fitbox-video-ia.mp4, 478x850 px):
    - Uso: looping silencioso na secao Hero da vitrine mobile para contextualizar o freezer fisico na academia.
  - Imagem de academia (fitbox/fitbox-academia.jpeg): referencia ilustrativa, nao comprova freezer instalado.
  - Frames 001, 005 e 010 revisados: textos artificiais, referencia indevida a entregas/encomendas e promessa de minutos. Manter legenda IA; substituir a midia antes de uso comercial, sem alterar os originais.

- Hipoteses:
  - As fotos 2, 5, 6, 7 e 8 pertencem a mesma sessao de preparo caseiro/laboratorial realizada pela Manuela.

- Pendentes:
  - Confirmar autoria, direitos e correspondencia entre cada foto e receita com a cliente [PENDENTE].

---

## 7. ARQUITETURA DE INFORMAÇÃO DA VITRINE DIGITAL

- Fatos:
  - A aplicacao e uma Single Page Application (SPA) responsiva focada na navegacao mobile por QR Code.
  - Mapa das secoes e telas:
    1. Home / Hero:
       - Video de fundo em loop silencioso demonstrando o freezer na academia.
       - Chamada central direta: "Treinou? Sua refeicao ja esta aqui."
       - Tutorial demonstrativo: 1. Explore os pratos -> 2. Adicione a sacola -> 3. Confirme a demonstracao. Nao representa pagamento nem liberacao de retirada.
    2. Cardapio / Vitrine:
       - Filtros por ingrediente proposto: Todos, Frango, Peixe, Carne e Vegetais; sem classificacoes nutricionais nao validadas.
       - Grid de cards com foto real, nome do prato, gramatura, calorias, gramas de proteina destacadas e preco.
    3. Detalhe do Prato (Modal):
       - Secoes Sobre o prato, Ingredientes e Informacao nutricional. Nao e rotulo regulatorio completo.
       - Composicao proposta, sem inferencia de alergenicos ou seguranca por fotografia.
       - Alerta regulatorio: "Estimativa TACO 4ª ed., a validar pela nutricionista".
       - Botao de adicao a sacola simulada.
    4. Sacola e Confirmacao Demonstrativa:
       - Listagem dos pratos selecionados, ajuste de quantidade e subtotal.
       - Cadastro/login local apenas para habilitar confirmacao. Senha ficticia nao persistida, logout preserva itens.
       - Sem Pix, codigo financeiro, link bancario, cobranca, reserva ou envio de pedido.
       - Mensagem de conclusao informa que nenhum pagamento foi realizado e nenhum pedido foi enviado ou reservado; limpa a sacola e notifica falhas de persistencia.
    5. Sobre a FITBOX:
       - Proposito academico e participacao da estudante de Nutricao (UDF), sem atribuir responsabilidade tecnica.
       - Sem promessas de conservacao, equipamentos ou tempos de aquecimento nao confirmadas.
    6. Duvidas frequentes:
       - Compra, reserva, fonte nutricional, fotos, armazenamento local e ingredientes.

- Hipoteses:
  - Um fluxo curto de consulta e selecao pode facilitar a demonstracao; nao ha evidencia quantitativa de conversao.

- Pendentes:
  - Definir se a vitrine tera secao para avaliacao do prato pelo aluno [PENDENTE].

---

## 8. LACUNAS E PENDÊNCIAS OPERACIONAIS

- Fatos:
  - Lista de itens nao resolvidos que dependem de informacoes externas:
    1. Fichas das seis marmitas e validacao por profissional habilitada. Manuela e estudante [PENDENTE].
    2. Definicao exata do modelo, operadora e solucao de conectividade da maquininha de cartao do freezer [PENDENTE].
    3. Confirmacao de quem realiza a reposicao fisica dos pratos e a checagem diaria de temperatura do freezer [PENDENTE].
    4. Eventual modelo de pagamento real depende de projeto separado; fora do escopo digital autorizado.
    5. Confirmacao sobre o uso ou descarte da foto 4 (marmita de parmegiana com chips) [PENDENTE].
    6. Decisao sobre a correcao do banner impresso que menciona entregas e encomendas inexistentes [PENDENTE].

- Hipoteses:
  - Receitas, massas, precos e operacao precisam de confirmacao antes de qualquer uso comercial; a demonstracao nao resolve essas pendencias.

- Pendentes:
  - Receber retorno formal da cliente Manuela para saneamento das pendencias listadas [PENDENTE].
