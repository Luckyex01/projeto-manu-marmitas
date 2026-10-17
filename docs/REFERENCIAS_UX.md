# Referências, vídeo e UX mobile-first

Consulta: 16/10/2026. Navegação pública e leitura de páginas de ajuda.
Nenhuma conta, endereço, compra, pagamento ou contato foi enviado às marcas.

## Fato

### Limite da análise

Foram examinadas as superfícies abaixo. Não houve auditoria de todas as URLs,
estados de estoque, CEPs, promoções ou checkout autenticado. Tempos esgotados
de interação não são, sozinhos, prova de defeito do site externo.
Foram amostrados estilos computados e atributos de imagens, não extraído
um design system oficial ou medida a conversão comercial das referências.

### Aprofundamento do roteiro da madrugada

**Fato:** no catálogo Liv Up, imagens reais usam CDN Imgix com parâmetros
`auto=format,compress`, `srcset` e `loading="lazy"` nas amostras. O banner
amostrado usa carregamento eager. Placeholders da Home não representam
o tratamento de todas as imagens. A fonte computada amostrada foi
Hind Madurai, corpo 16 px, com verde `rgb(12,137,62)` em ações secundárias.
Isso não demonstra conformidade de todos os contrastes.

Categorias públicas incluem Dia a dia, Turbinadas, Baixa caloria,
Performance, Gourmet, Vegetarianas, Massas, Kits, Proteínas,
Acompanhamentos e lanches. Não foi comprovada uma ordenação universal
do catálogo. Na FITBOX, filtros por ingredientes propostos são suficientes
e não devem herdar classificações alimentares não validadas.

A [API pública da central de ajuda](https://ajuda.livup.com.br/api/v2/help_center/pt-br/articles.json?per_page=100)
retornou 35 artigos nesta consulta. Foram identificados temas de preparo,
validade, conservação, pagamento, cupons, frete, entrega agendada/expressa,
retirada, histórico e alergênicos. Quantidade de votos não mede frequência
de perguntas nem permite afirmar quais são as mais perguntadas.

- [Histórico de pedidos](https://ajuda.livup.com.br/hc/pt-br/articles/360035581032-Como-visualizar-meus-pedidos-anteriores):
  a ajuda descreve Perfil > Minhas compras, código, valor, data, entrega,
  pagamento e detalhes. Não foi acessado histórico autenticado.
- [Alergênicos](https://ajuda.livup.com.br/hc/pt-br/articles/360035586792-Alerg%C3%AAnicos):
  a marca diferencia ingredientes de risco de contaminação cruzada em
  cozinha compartilhada. Não transferir a política para receitas FITBOX.
- [Micro-ondas](https://ajuda.livup.com.br/hc/pt-br/articles/360035946831-Qual-o-modo-de-preparo-das-refei%C3%A7%C3%B5es-em-micro-ondas):
  orienta consultar o rótulo e sua potência/abertura. Não publica uma regra
  universal aplicável às embalagens FITBOX.
- Conta e sacola públicas: controles encontrados, mas tentativas de clique
  expiraram aguardando estabilidade. Não forçado clique nem fornecidos dados.
  Login, carrinho e checkout completos permanecem não verificados.

**Fato:** na Cumbuca Boa, corpo amostrado Inter 16 px, texto
`rgb(21,37,34)` e fundo `rgb(241,241,239)`. A amostra tem banner eager
com `srcset`, imagens lazy e outras sem `srcset`. Não extrapolar para
todo o site. A Home apresenta montagem de prato, benefícios, prova social,
pratos prontos, kits, orientação de primeiro pedido e FAQ. Prova social
da marca não foi auditada e não pode ser reutilizada na FITBOX.

Coleções verificadas pela navegação e pelo
[índice público Shopify](https://cumbucaboa.com.br/collections.json):
[pratos completos](https://cumbucaboa.com.br/collections/pratos-completos),
[kits](https://cumbucaboa.com.br/collections/kits),
[porções individuais](https://cumbucaboa.com.br/collections/itens-individuais),
[acompanhamentos](https://cumbucaboa.com.br/collections/acompanhamentos),
[dietas especiais](https://cumbucaboa.com.br/collections/dietas-especiais).
Também aparecem proteínas, arrozes, raízes, feijões e opções vegetarianas.
Um índice existente não prova estoque ou filtros disponíveis em cada cidade.
O gate regional permaneceu sem preenchimento. Não foi verificada ordenação
ou compra por região; HTML bruto de coleções não foi confundido com UI.

**Hipótese:** cards comparáveis, hierarquia curta e conteúdo expansível
podem facilitar consulta na academia. CEP, carrosséis promocionais,
cashback, múltiplos tamanhos e cadastro antecipado acrescentariam decisões
sem resolver o fluxo acadêmico. Não houve experimento de conversão.

**Pendente:** estados autenticados, todas as variações regionais, timings
de animação e espaçamentos completos das duas marcas. A expressão
"percorrer completamente" não foi atingida nesses limites.

### Outras referências e comunidade

| Referência | Fato verificado | Aplicação ou limite |
|---|---|---|
| [Jane Foodie](https://www.janefoodie.com/) | História da fundadora, refeições prontas congeladas, preparo e embalagens descritos pela marca | Separar história, produto e uso; não comprovado modelo brasileiro de freezer em academia |
| [Keep Light](https://keeplight.app/) | Cobertura Grande SP, agenda e frete por CEP | Clareza operacional como referência, sem importar delivery |
| [Frutos de Goiás](https://frutosdegoias.com.br/) | Conteúdo de sorvetes e sabores do cerrado | Identidade regional e fotografia; não concorrente direto comprovado |
| [iFood, guia oficial](https://institucional.ifood.com.br/noticias/comida-saudavel/) | Descreve Restaurantes > Saudável e busca por pratos/lojas | Busca por termos, não certificação alimentar da FITBOX; interface transacional retornou 403 |
| [Rappi](https://www.rappi.com.br/) | Página pública retornou conteúdo institucional, sem catálogo saudável verificável | Organização específica não confirmada; não fornecer endereço para desbloquear |
| [Shopify](https://www.shopify.com/blog/food-business-ideas) | Conteúdo sobre modelos e complexidade operacional | Não é benchmark de UI; showcase food-and-drink retornou 404 |
| [Puravida](https://www.puravida.com.br/) | Tentativa retornou 403 | Não confirmada análise visual nem associação com celebridades; Bruna Biancardi sem marca/URL identificada |
| [NN/g: heurísticas](https://www.nngroup.com/articles/ten-usability-heuristics/) | Referencial das dez heurísticas | Matriz FITBOX abaixo |
| [NN/g: formulários mobile](https://www.nngroup.com/articles/mobile-input-checklist/) | Necessidade do campo, label, teclado e visibilidade | Pedir apenas dados fictícios necessários à demonstração |
| [NN/g: registro opcional](https://www.nngroup.com/articles/optional-registration/) | Recomenda não forçar criação de conta antes da compra | Referência geral de usabilidade; na FITBOX, o requisito acadêmico mantém conta apenas na confirmação demonstrativa |
| [Shopify: filtros de e-commerce](https://www.shopify.com/blog/ecommerce-filters) | Artigo editorial descreve filtros como auxílio à descoberta em catálogos | Referência de prática, não experimento independente; manter busca/filtros proporcionais ao catálogo FITBOX |
| [DEV: React accessibility](https://dev.to/suprabhat02/accessibility-in-react-what-most-developers-skip-535n) | Artigo lido sobre foco, teclado e anúncios dinâmicos | Opinião técnica, conferir com WCAG/APG; não copiar snippets sem revisão |
| [DEV: contraste](https://dev.to/colorsinspo/color-contrast-why-it-matters-for-accessible-design-2ljc) | Artigo lido sobre medição e limites de contraste | Compatível com medições, não substitui norma |
| [DEV: isolamento Playwright](https://dev.to/silviutech/playwright-email-fixtures-need-a-lease-boundary-n91) | Artigo sobre isolamento de recursos e limpeza | Princípio de isolamento útil; e-mail externo não se aplica à FITBOX |
| [Playwright oficial](https://playwright.dev/docs/best-practices) | Comportamento observável, isolamento e locators resilientes | Contextos locais separados, nenhuma dependência de sites externos na suíte |
| [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Referência da API por origem | Não tratar sessão local como autenticação |
| Reddit r/webdev, r/UXDesign, r/foodtech | Busca direcionada e tentativas de leitura bloqueadas ou sem conteúdo de discussão | Nenhum consenso atribuído; r/reactjs não teve thread confirmada |

Buscas pelos termos foodtech UX, restaurant website design 2026,
mobile-first e-commerce, React accessibility, localStorage e Playwright
foram tratadas como descoberta, não prova. Dois artigos DEV sugeridos pela
busca retornaram 404. Threads Reddit sugeridas não foram confirmadas.
Não relatar discussões ou datas inventadas nem apresentar opinião como estudo.

### Padrões de compra mobile e evidência

| Padrão | Fato sustentado pela fonte | Decisão FITBOX |
|---|---|---|
| Guest checkout | A recomendação da NN/g é não obrigar registro antes de comprar | Preservar navegação, detalhe e sacola sem conta. A conta demonstrativa na confirmação é requisito acadêmico já definido, não uma prática recomendada pela fonte |
| Shop by Purpose | Não foi localizada nesta rodada evidência primária de que categorias por objetivo convertam melhor que filtros tradicionais em foodtech | Tratar como hipótese; não criar classificações como "low carb" sem validação nutricional |
| Sticky add-to-cart | Não foi confirmado benefício mensurável para este catálogo e fluxo | Não adicionar sem teste de usabilidade e análise de espaço/teclado em telas pequenas |
| Filtros | A Shopify apresenta boas práticas editoriais para filtros e descoberta em e-commerce, sem evidência causal específica para FITBOX | Busca e filtros locais simples são adequados ao catálogo atual; reavaliar se o catálogo crescer |
| Desempenho mobile | As referências observadas usam imagens responsivas/lazy loading em algumas superfícies, não em todos os elementos | Aplicar por recurso e posição; conferir [medições locais](AUDITORIA_TECNICA.md), sem prometer ganho universal |

As páginas analisadas não permitem inferir conversão, abandono ou preferência
de clientes. Não foram encontrados estudos primários reproduzíveis que
confirmem as alegações "restaurant website design 2026", superioridade
universal de uma taxonomia de propósito ou vantagem de um CTA fixo para
comida congelada. Esses pontos permanecem não confirmados.

### Repositórios públicos

Leitura direta, sem instalar ou copiar frameworks:

| Repositório | Evidência | O que aproveitar ou evitar |
|---|---|---|
| [vercel/commerce](https://github.com/vercel/commerce) | README e `components/cart/cart-context.tsx`, `delete-item-button.tsx` | Atualização imediata e mensagem de status. Next/Shopify/server actions não cabem na SPA local; não copiar `any`, alvo de 24 px ou cálculo monetário por floats |
| [medusajs/medusa](https://github.com/medusajs/medusa) | README descreve plataforma genérica de comércio e modelo open-core | Não é framework exclusivo de foodtech; backend é desnecessário neste escopo |
| [vuestorefront/vue-storefront](https://github.com/vuestorefront/vue-storefront) | README atual identifica ecossistema Alokai e integração por API | Não migrar React nem criar backend por inspiração visual |

Busca GitHub `marmitas language:TypeScript`, primeira página com cinco
resultados, não seleção por qualidade nem prova de operação comercial:

| Repositório | Descrição disponível | Situação da análise |
|---|---|---|
| [marianayamamoto/marmitascassia](https://github.com/marianayamamoto/marmitascassia) | Sem descrição na resposta | Apenas descoberta, atualização indicada em 2019 |
| [LucasInTheShell/marmitex](https://github.com/LucasInTheShell/marmitex) | Marmitas | Apenas descoberta |
| [edineijoseok-commits/jonas-oliveira-das-ilva-](https://github.com/edineijoseok-commits/jonas-oliveira-das-ilva-) | SaaS B2B marmitas | Apenas descoberta |
| [kevao/mvp-acex3](https://github.com/kevao/mvp-acex3) | MVP e-commerce de marmitas | Leitura README falhou na ferramenta; não avaliado |
| [lucaskrsi/happy-food](https://github.com/lucaskrsi/happy-food) | Entrega de marmitas infantis | Apenas descoberta, modelo diferente |

Nenhum foi classificado como exemplo brasileiro de produção auditado.

### Liv Up

| Superfície | Observado | Aplicação à FITBOX |
|---|---|---|
| [Home](https://www.livup.com.br/) | Hierarquia por fotos, linhas de produtos e kits, chamadas comerciais e região/CEP | Aproveitar hierarquia, não kits/CEP por imitação |
| [Marmitas](https://www.livup.com.br/marmitas?home_display) | Cards com atributos nutricionais e categorias; kits de várias unidades e descontos | Fotos/macros comparáveis, sem certificações não validadas |
| [Detalhe examinado](https://www.livup.com.br/coxa-de-frango-desossada-feijao-carioca-e-farofa-V136/p) | Descrição, ingredientes, tabela por 100 g/%VD, advertências e referência à embalagem | Separar conteúdo e avisar limites da tabela demonstrativa |
| Preparo no detalhe | Botão localizado, tentativa de interação expirou | Não afirmar que o painel foi validado |
| [Ajuda](https://ajuda.livup.com.br/hc/pt-br) | Categorias produto, preparo, compra, pagamento, retirada e entrega | FAQ específico, não copiar regras comerciais |
| [Como pedir](https://ajuda.livup.com.br/hc/pt-br/articles/26051602020877-Como-fazer-um-pedido) | Cadastro, seleção, sacola, endereço, pagamento e agendamento descritos | Confirma o modelo de delivery; não valida checkout executado |
| [Pagamento](https://ajuda.livup.com.br/hc/pt-br/articles/4408211003405-Quais-s%C3%A3o-as-formas-de-pagamento-aceitas-para-fazer-um-pedido) | Crédito, Pix e vales, com condições próprias | Não implementar na vitrine acadêmica |
| [Entrega agendada](https://ajuda.livup.com.br/hc/pt-br/articles/13374996814221-Como-funciona-a-entrega-agendada) | Períodos e disponibilidade regional | Fora do modelo FITBOX |
| [Sobre](https://www.livup.com.br/dna-liv-up) | História/proposta, chefs/nutricionistas, ingredientes e ultracongelamento | Alegações são da marca, não provas transferíveis à FITBOX |
| Checkout | Caminho descrito pela ajuda; compra real não realizada | Identidade, endereço e transação não verificados |

Design observado: fotografia como elemento principal, unidades e dados junto
ao prato, seções comerciais por objetivo, contraste entre ações e conteúdo.
Não foi extraído um design system oficial da marca.

Atritos potenciais para o caso FITBOX: CEP e cadastro antecipados, kits e
promoções, múltiplas decisões logísticas e abundância de linhas. São hipóteses
de inadequação ao freezer, não afirmações de baixa conversão da Liv Up.

### Cumbuca Boa

| Superfície | Observado | Aplicação à FITBOX |
|---|---|---|
| [Home](https://cumbucaboa.com.br/) | Carrossel promocional, barra animada de cashback, categorias com fotos, produção, depoimentos e FAQ | Barra e descoberta visual, sem cashback ou depoimentos inventados |
| Catálogo a partir da Home | Entradas por categorias e produtos; seleção regional interfere na disponibilidade | Filtros locais simples, sem prometer estoque |
| [Detalhe examinado](https://cumbucaboa.com.br/products/carne-moida-com-arroz-integral-e-feijao-carioca-626066776) | Duas imagens, porções opcionais, quantidade, avaliações, descrição/tabela em accordions e sugestões | Separação de informação, não personalização de receita |
| [FAQ](https://cumbucaboa.com.br/pages/perguntas-frequentes) | Preparo, embalagem, conservação, ultracongelamento, cozinha compartilhada, entrega e pagamento | Dúvidas próprias da FITBOX, sem importar validade ou segurança |
| [Sobre](https://cumbucaboa.com.br/pages/quem-somos) | História iniciada entre amigos, mudança para ultracongelados e equipe | Contexto de autoria, sem atribuir mesma estrutura à FITBOX |
| [Região/entrega](https://cumbucaboa.com.br/pages/onde-entregamos) | Seleção regional e conteúdo dependente de região | Gate regional é irrelevante para QR Code de um freezer |
| Checkout | Modal de região restringiu exploração; não enviado endereço nem pedido | Não declarar compra ponta a ponta validada |

O FAQ da marca menciona condições próprias de validade e preparo. Esses
dados não foram aplicados à FITBOX, cuja receita, embalagem e processo
não foram validados.

Design observado: imagens grandes de comida, repetição de CTAs, barra de
anúncios, categorias visuais e redução de texto por accordions. Não foi
afirmada medição de conversão, conformidade WCAG ou propriedade dos tokens.

### O que foi adaptado

- FAQ de seis perguntas próprias da demonstração.
- Detalhe dividido em Sobre o prato, Ingredientes e Informação nutricional.
- Informação nutricional com aviso, origem e limite visíveis.
- Navegação Dúvidas e manutenção da busca local.
- Conta apenas na confirmação, por requisito acadêmico expresso.

Não foram copiados entrega, CEP, WhatsApp, cupons, cashback, avaliações,
"mais vendidos", certificações ou credenciais profissionais.

### Revisão do vídeo IA

Foram inspecionados os frames fornecidos 001, 005 e 010:

| Frame | Observação | Consequência |
|---|---|---|
| 001 | Grafias artificiais, logo divergente, "Entregas e Encomendas" e promessa de minutos | Contradiz o modelo e não fundamenta preparo |
| 005 | Retirada de bandeja e textos/selos artificiais em rótulos | Não é prova de embalagem legal ou segurança |
| 010 | Academia/celular ilustrativos | Não comprova leitura QR, transação ou operação instalada |

A legenda IA permanece na interface. Os originais não foram alterados.
Essa revisão amostral não comprova ausência de problemas nos demais frames.

### Heurísticas de Nielsen

Referência: [dez heurísticas](https://www.nngroup.com/articles/ten-usability-heuristics/).

| Heurística | Evidência/decisão FITBOX | Limite |
|---|---|---|
| Visibilidade do estado | Contador, seleção, avisos storage, confirmação explícita | Sem estoque real |
| Mundo real | Português, ingredientes e porção proposta | Receitas ainda não validadas |
| Controle/liberdade | Remover, ajustar, fechar, logout sem perder sacola | Sem histórico/undo |
| Consistência | Tokens únicos, nomes e CTAs demonstrativos | Protótipo/legado são históricos |
| Prevenção de erros | Email/quantidades validados e confirmação bloqueada sem conta | Conta não é autenticação |
| Reconhecimento | Fotos, ingredientes e total na mesma jornada | Foto não comprova composição |
| Flexibilidade | Busca/filtros locais e teclado | Sem personalização alimentar |
| Minimalismo | Três seções e FAQ específico, sem logística de delivery | Login acrescenta etapa acadêmica |
| Recuperação de erro | Mensagens de storage/dados inválidos e estado em memória | Sem sincronização entre abas |
| Ajuda/documentação | Tutorial e seis dúvidas | Instrução comercial depende do piloto |

### WCAG e alvos

- Contrastes sRGB recalculados para os tokens: laranja/preto 7,20:1,
  verde/preto 8,87:1, branco/preto 18,16:1, muted/preto 7,85:1.
  Não equivalem a auditoria de todos os estados/overlays.
- O critério [2.5.5, alvo 44 × 44 CSS px](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
  é nível AAA da WCAG 2.1, não AA. É uma meta interna, não selo de conformidade.
- Modais: Escape, foco contido, retorno ao acionador e nomes acessíveis.
  Formulário testado por Tab/Shift+Tab a 320 px.
- Barra e vídeo têm pausa; preferência de movimento reduzido respeitada.
- Home verificada de 320 a 1920 px sem overflow nos tamanhos testados.

## Hipótese

No uso com uma mão, consulta e seleção simples podem reduzir esforço.
Não foi realizado teste de usabilidade com alunos reais, leitores de tela
ou dispositivos físicos. O objetivo de acessar informação em cinco segundos
continua uma meta, não um resultado medido.

## Pendente

- Validar visualmente as novas telas com Manuela.
- Substituir vídeo IA com textos contraditórios antes de uso comercial.
- Auditar todos os alvos de toque, foco/contraste e zoom 200%/400%.
- Testar leitores de tela e Safari/iOS/Firefox, além do Chromium emulado.
- Medir tempo até ingredientes/tabela e compreensão de "demonstrativo".
- Confirmar fotos/receitas e preparar instruções físicas de compra fora
  do fluxo acadêmico, quando a operação estiver definida.
