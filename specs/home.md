# Spec: Home

## 1. USER STORY
Como aluno de academia com pressa no pós-treino (João),
quero entender como funciona o freezer e acessar o cardápio em menos de 5 segundos,
para escolher e comprar minha refeição sem fricção.

## 2. CRITÉRIOS DE ACEITAÇÃO
- Dado que o usuário acessa a raiz via QR Code, quando a página carregar, então deve exibir o vídeo do freezer em loop silencioso e a chamada "Treinou? Sua refeição já está aqui.".
- Dado que o usuário visualiza o topo da página, quando ler o tutorial, então deve ver os 3 passos claros: "1. Pegue no freezer", "2. Pague via Pix", "3. Aqueça no micro-ondas".
- Dado que o usuário clica no CTA "Ver pratos no freezer", quando o clique for registrado, então deve rolar suavemente até a seção do cardápio.
- Dado que a página carrega em dispositivo móvel (390px), quando exibida, então não deve haver rolagem horizontal nem quebra de layout.

## 3. FLUXOS PRINCIPAIS
- Fluxo Principal (Conversão Rápida): Usuário lê QR Code no freezer -> Acessa Home -> Visualiza vídeo/passo a passo -> Clica em CTA ou rola tela -> Entra no Cardápio.
- Fluxo Institucional: Usuário rola até a seção Sobre -> Visualiza chancela técnica de Nutrição (UDF) e conservação a -18 °C.

## 4. FORA DE ESCOPO
- Áudio no vídeo do Hero.
- Campo de busca de CEP, endereço ou cálculo de entrega.
- Botões de contato por WhatsApp ou chat ao vivo.

## 5. DEPENDÊNCIAS
- Ativo de vídeo comprimido (`hero.mp4` ou poster de fallback).
- Tipografia Montserrat e tokens de cor definidos em `docs/DESIGN_SYSTEM.md`.
