# Spec: Sacola e Checkout Simulado

## 1. USER STORY
Como cliente pronto para consumir no local (João),
quero revisar os itens selecionados, ver o valor total e gerar a chave Pix simulada,
para pagar rapidamente, pegar meu prato no freezer e aquecer.

## 2. CRITÉRIOS DE ACEITAÇÃO
- Dado que o usuário adiciona pratos, quando abrir a sacola, então deve visualizar a lista com foto miniatura, nome, quantidade ajustável (+/-) e subtotal calculado.
- Dado que o usuário remove um item ou reduz a quantidade a zero, quando a ação ocorrer, então o prato deve ser removido e o total recalculado imediatamente.
- Dado que a página é recarregada, quando o usuário reabrir a sacola, então os itens devem ser preservados via `localStorage`.
- Dado que o usuário clica em "Finalizar com Pix", quando acionado, então deve exibir código Pix simulado ("copia e cola"), limpar a sacola no `localStorage` e orientar a retirada no freezer e aquecimento.

## 3. FLUXOS PRINCIPAIS
- Fluxo de Compra: Adicionar itens -> Abrir gaveta/modal da Sacola -> Conferir total -> Clicar em "Pagar com Pix" -> Receber confirmação -> Retirar prato no freezer.
- Fluxo de Esvaziamento: Sacola com itens -> Clicar em remover ou limpar -> Exibir estado vazio com CTA "Ver cardápio".

## 4. FORA DE ESCOPO
- Integração real com gateway de pagamento (Mercado Pago, PagSeguro, Asaas).
- Cálculo de frete ou endereço de entrega.
- Envio de comprovante por WhatsApp ou e-mail.

## 5. DEPENDÊNCIAS
- Utilitário client-side de `localStorage` para persistência do estado da sacola.
- Modais e estilos de botões especificados em `docs/DESIGN_SYSTEM.md`.
