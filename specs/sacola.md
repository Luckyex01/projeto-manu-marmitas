# Spec: Sacola e Confirmação de Pedido Demonstrativa

## 1. USER STORY

Como visitante da vitrine acadêmica FITBOX,
quero revisar os pratos selecionados e concluir uma demonstração de pedido,
para conhecer o fluxo sem pagar, reservar produtos ou realizar uma compra real.

## 2. LIMITES DO FLUXO

- **Fato:** o escopo é exclusivamente client-side, sem cobrança, processamento de pagamento ou envio de pedido.
- **Hipótese:** a sacola demonstra uma possível experiência de seleção; não representa disponibilidade ou operação de uma academia real.
- **Pendente:** qualquer fluxo comercial real exige definição e autorização próprias; não integra esta spec.
- Usar "Confirmar pedido demonstrativo", nunca "Pagar", "Finalizar com Pix" ou "Pagamento aprovado".
- Não gerar chave, código copia e cola, QR Code financeiro, link bancário ou formulário de cartão, nem mesmo como exemplo.
- Não prometer reserva de estoque, retirada liberada, abertura do freezer, preparação ou entrega.

## 3. CRITÉRIOS DE ACEITAÇÃO

- Ao adicionar um prato, atualizar a quantidade e o contador da sacola, definido como a soma das unidades selecionadas.
- A sacola deve exibir foto, nome, preço unitário demonstrativo, quantidade ajustável, subtotal e total.
- Remover um item ou reduzir sua quantidade a zero deve removê-lo e recalcular os totais imediatamente.
- Quantidades devem ser inteiras positivas para itens mantidos. Calcular valores monetários em centavos inteiros.
- Exibir junto aos valores: "Preços sugeridos, a validar pela nutricionista. Demonstração sem cobrança."
- Após recarregar a página, restaurar os identificadores e quantidades válidos via `localStorage`, calculando os totais a partir do catálogo, não de valores monetários armazenados.
- Dados locais inválidos ou falha de leitura/gravação devem produzir aviso visível. Se a persistência não estiver disponível, informar que a sacola permanece apenas nesta sessão; não declarar salvamento bem-sucedido.
- Sacola vazia deve mostrar CTA "Ver cardápio" e não permitir confirmação.
- Antes da confirmação, exibir: "Demonstração acadêmica: nenhum pagamento será realizado e nenhum pedido será enviado ou reservado."
- Habilitar "Confirmar pedido demonstrativo" somente com itens e conta demonstrativa. Também validar essas condições no handler, com mensagem explícita caso não sejam atendidas.
- Ao confirmar com itens e conta, exibir: "Demonstração concluída. Nenhum pagamento foi realizado e nenhum pedido foi enviado ou reservado."
- Limpar a sacola em memória e sua persistência ao concluir. Se a limpeza persistente falhar, informar explicitamente que os dados locais podem reaparecer após recarregar.
- Navegar, adicionar e abrir a sacola não exigem login. Na confirmação, cadastro/login são simulados, sem backend ou verificação de credenciais reais.
- Pedir nome fictício não vazio, email fictício com formato válido e senha livre não vazia. Avisar para nunca reutilizar senha real. Persistir exclusivamente nome/email em `fitbox:sessao:v1`, nunca senha.
- Restaurar sessão após recarga. Logout remove somente sessão; preservar seleção e quantidades. Confirmar limpa somente a sacola. Limpar localStorage deve permitir novo cadastro.
- Storage indisponível, sessão inválida e falhas ao salvar/remover devem gerar aviso visível, sem alegar autenticação ou salvamento bem-sucedido.
- Não solicitar endereço ou comprovante nem enviar nome/email a serviços remotos.
- Gaveta/modal deve ter nome acessível, fechamento por botão e Escape, foco contido enquanto aberto e retorno ao acionador ao fechar.

## 4. FLUXOS PRINCIPAIS

- Seleção: adicionar pratos -> abrir sacola -> ajustar quantidades -> revisar total demonstrativo.
- Confirmação: ler aviso -> entrar/criar conta demonstrativa se necessário -> revisar itens -> confirmar pedido demonstrativo -> conclusão -> sacola vazia.
- Esvaziamento: remover itens -> estado vazio -> voltar ao cardápio.
- Persistência: recarregar -> restaurar seleção válida -> revisar antes de confirmar.

## 5. FORA DE ESCOPO

- Pix, cartões, gateways, cobranças, transações e comprovantes.
- Pedidos reais, estoque, reservas e integração com freezer.
- Frete, endereço, entrega ou promessa de retirada/aquecimento.
- Comunicação via WhatsApp, e-mail, API ou backend.
- Histórico de pedidos e autenticação real. A conta local não é uma barreira de segurança nem comprova identidade.

## 6. DEPENDÊNCIAS E VALIDAÇÃO

- Catálogo estático com identificadores estáveis e dados provisórios rastreáveis.
- Persistência local com tratamento explícito de falhas.
- Componentes e cores de `docs/DESIGN_SYSTEM.md`.
- Testar adição repetida, quantidades, remoção, totais em centavos, recarga, dados inválidos, falhas de armazenamento, estado vazio, cadastro/login, logout com recarga, senha ausente do storage, teclado no formulário a 320px e confirmação sem cobrança.
- Executar `npm run build` e `npm run test` antes de concluir a implementação; conferir também o fluxo no navegador mobile e desktop.
