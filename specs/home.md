# Spec: Home

## 1. USER STORY
Como aluno de academia com pressa no pós-treino (João),
quero entender como funciona o freezer e acessar o cardápio em menos de 5 segundos,
para escolher e comprar minha refeição sem fricção.

## 2. CRITÉRIOS DE ACEITAÇÃO
- O cabeçalho inclui busca local por pratos e ingredientes, sacola e navegação. No mobile, o botão Menu abre e fecha os links, informa seu estado acessível e fecha com Escape devolvendo foco ao botão. Selecionar um link fecha o menu.
- Manter o tema escuro e os tokens atuais; não incluir endereço, entrega ou serviços remotos. A conta demonstrativa aparece somente na sacola, sem bloquear navegação.
- A busca começa recolhida em um botão circular com lupa. Ao abrir, focar o campo; Escape fecha e devolve foco à lupa. Fechar não apaga o termo nem o filtro aplicado.
- Dado que o usuário acessa a raiz via QR Code, quando a página carregar, então deve exibir o vídeo do freezer em loop silencioso e a chamada "Treinou? Sua refeição já está aqui.".
- Dado que o usuário visualiza o tutorial, então deve ver os 3 passos da demonstração: "1. Explore os pratos", "2. Adicione à sacola", "3. Confirme a demonstração".
- O tutorial deve informar que não há cobrança, envio de pedido ou reserva. A confirmação digital não libera retirada no freezer nem comprova pagamento.
- Dado que o usuário clica no CTA "Ver pratos no freezer", quando o clique for registrado, então deve rolar suavemente até a seção do cardápio.
- Dado que a página carrega em dispositivo móvel (390px), quando exibida, então não deve haver rolagem horizontal nem quebra de layout.
- O título deve manter três linhas: "Treinou?", "Sua refeição" e "Já está aqui.", ajustando o tamanho da fonte à largura disponível.
- A legenda e o controle do vídeo devem compartilhar a largura e a borda esquerda da mídia em qualquer resolução.
- Textos renderizados da marca devem usar FIT em branco e BOX em laranja. Preservar os arquivos originais da logo e do vídeo.
- As duas fotos de "Conheça a FITBOX" mantêm enquadramento 3:4 com `object-fit: cover` e altura responsiva. Atributos de dimensão e variantes de imagem não devem impor altura fixa ou alongar a seção.
- A barra laranja deve usar chamadas curtas de descoberta dos pratos, sem repetir os avisos demonstrativos. Manter os avisos nos contextos de nutrição, preços e confirmação; não incluir alegações nutricionais ou de produção não comprovadas na barra.
- Incluir navegação Dúvidas e seis perguntas próprias: compra real, reserva/retirada, origem nutricional, fotos, persistência e ingredientes. Usar details/summary acessíveis, sem copiar políticas de entrega dos sites de referência.
- Validar acessibilidade automatizada nas larguras 320, 390, 768 e 1440 px. A cobertura, os critérios WCAG 2.2 AA considerados e as limitações estão em `docs/ACESSIBILIDADE.md`.

## 3. FLUXOS PRINCIPAIS
- Fluxo Principal (Conversão Rápida): Usuário lê QR Code no freezer -> Acessa Home -> Visualiza vídeo/passo a passo -> Clica em CTA ou rola tela -> Entra no Cardápio.
- Fluxo Institucional: Usuário rola até a seção Sobre -> Conhece a proposta acadêmica e a participação da estudante de Nutrição da UDF, sem chancela profissional ou promessa de conservação não validada.

## 4. FORA DE ESCOPO
- Áudio no vídeo do Hero.
- Campo de busca de CEP, endereço ou cálculo de entrega.
- Botões de contato por WhatsApp ou chat ao vivo.
- Pix, cobranças, promessas de retirada liberada e instruções de equipamentos ou aquecimento não confirmadas.

## 5. DEPENDÊNCIAS
- Ativo de vídeo comprimido (`hero.mp4` ou poster de fallback).
- Tipografia Montserrat e tokens de cor definidos em `docs/DESIGN_SYSTEM.md`.
