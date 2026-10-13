# FITBOX — Instruções Operacionais e Diretrizes do Projeto

## 1. O QUE É A FITBOX
- Vitrine digital e simulador de compra para marmitas fit congeladas.
- Modelo de operacao: autoatendimento em freezer horizontal com tampa de vidro instalado dentro de academias.
- Nao ha entrega, delivery ou frete.
- Nao ha atendente presencial.
- Nao ha canal de pedidos via WhatsApp.
- Fluxo do cliente: aproximacao do freezer, leitura do QR Code, consulta da vitrine e tabela nutricional, pagamento simulado via Pix, retirada do prato e aquecimento no micro-ondas local.

## 2. STACK OFICIAL
- Framework e linguagem: React 18+, Vite e TypeScript.
- Estilizacao: CSS convencional (sem Tailwind, sem CSS-in-JS).
- Deploy e hospedagem: Cloudflare Pages.
  - Comando de build: npm run build
  - Diretorio de saida: dist
- Arquitetura: Single Page Application (SPA) puramente client-side.
- Backend: inexistente. Sem API remota, sem servidor Node/Express, sem banco de dados relacional ou NoSQL.
- Persistencia de dados: localStorage exclusivamente para estado da sacola, simulacao de autenticacao e historico de pedidos simulados.

## 3. ESTRUTURA DO REPOSITORIO
- prototipo/: vitrine estatica (HTML, CSS e JavaScript puro) validada visualmente para mobile e desktop.
- src/: base da aplicacao React com TypeScript e CSS dedicado (legado preservado).
- fitbox/: diretorio somente-leitura com materiais originais fornecidos (fotos reais das marmitas, logotipo oficial, video gerado por IA, fichas tecnicas em PDF e planilha CalcNut).
- prints/: capturas de tela desktop/mobile e video demonstrativo do prototipo aprovado.
- docs/: documentacao tecnica consolidada, decisoes arquiteturais e base de conhecimento.

## 4. REGRAS DE NEGOCIO E NUTRICAO
- Base de dados nutricionais: Tabela Brasileira de Composicao de Alimentos (TACO v.4) como fonte primaria absoluta.
- Calculo energetico: metodo Atwater (4 kcal por grama de proteina, 4 kcal por grama de carboidrato e 9 kcal por grama de lipidio).
- Declaracao obrigatoria: todo valor nutricional apresentado deve conter expressamente a mencao "a validar pela nutricionista".
- Restricoes sanitarias: terminantemente proibido utilizar alegacoes regulamentadas pela Anvisa (RDC 429/2020 e IN 75/2020), como "alto teor de proteina", "rico em fibras" ou "zero acucar", sem laudo laboratorial previo. Comunicar apenas os valores absolutos dos macronutrientes.
- Formato do ponto de venda: o freezer e exclusivamente horizontal com tampa de vidro transparente, permitindo a visualizacao direta das embalagens pelo cliente antes da compra.

## 5. CONVENCOES DE CODIGO
- Nomenclatura de arquivos e componentes: PascalCase para componentes React (ex: PratoCard.tsx, ModalNutricional.tsx, ResumoSacola.tsx).
- Nomenclatura de utilitarios e tipos: camelCase para funcoes/hooks; PascalCase para interfaces e tipos TypeScript.
- Idioma do dominio: portugues do Brasil em todos os termos de negocio (prato, marmita, sacola, ingredientes, porcao, calorias).
- Idioma tecnico: ingles para palavras-chave de programacao e funcoes utilitarias de infraestrutura de codigo.
- Comentarios: breves, objetivos e restritos a explicar o porquê de uma decisao tecnica nao obvia. Proibido comentar o que o codigo ja declara.
- Design de codigo: simplicidade direta. Proibidas abstracoes prematuras, factories desnecessarias ou camadas genericas de indirecao.

## 6. REGRAS DE VALIDACAO E QUALIDADE
- Criterio de conclusao: nenhuma tarefa de codigo e considerada pronta sem a execucao e aprovacao dos seguintes comandos no terminal:
  - npm run build
  - npm run test (quando suites de teste estiverem configuradas)
- Tratamento de falhas: se o build falhar ou houver erro de tipagem no TypeScript, a tarefa permanece em estado incompleto ate correcao definitiva.
- Principio da evidencia: nunca declarar "esta funcionando" ou "concluido" sem apresentar o log de saida do terminal comprovando a execucao bem-sucedida.

## 7. REGRAS DE GIT E CONTROLE DE VERSAO
- Autoridade de versionamento: nunca executar git commit, git push, git commit --amend ou git push --force sem solicitacao ou autorizacao previa e explicita do usuario.
- Integridade do historico: nunca reescrever commits ou modificar branches sem orientacao direta.
- Metodo analitico: em qualquer relatorio ou analise de engenharia, separar obrigatoriamente:
  - Fatos (dados confirmados nos arquivos e fontes primarias).
  - Hipoteses (deducoes tecnicas a confirmar).
  - Pendencias (itens bloqueados aguardando decisao).

## 8. O QUE NAO FAZER (LIMITES E PROIBICOES)
- Nao inventar dados nutricionais, pesos, gramaturas ou precos sem respaldo na planilha ou aprovacao da nutricionista.
- Nao criar endpoints, servidores mockados em Node ou estruturas de backend.
- Nao adicionar funcionalidades de entrega domiciliar, calculo de frete, selecao de CEP ou envio de pedidos para WhatsApp.
- Nao utilizar emojis em codigo-fonte, mensagens de commit ou documentacao tecnica.
