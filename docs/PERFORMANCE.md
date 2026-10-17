# Performance FITBOX

## Fato

As medidas abaixo são de laboratório local, não dados de usuários ou do
Cloudflare Pages. O procedimento e a tabela completa estão em
[Auditoria técnica](AUDITORIA_TECNICA.md).

- LCP mobile a 390 px: mediana de 2.116 ms antes e 1.988 ms depois da
  alteração de imagens.
- LCP desktop a 1440 px: mediana de 2.712 ms antes e 2.580 ms depois.
  O resultado desktop permaneceu acima de 2,5 s.
- CLS observado na janela local: aproximadamente 0,00106 mobile e
  0,01333 desktop. Isso não representa o percentil 75 de usuários.
- INP não foi medido. FID não deve ser usado como substituto atual: INP
  substituiu FID nos Core Web Vitals.
- Build medido: 48 módulos, JavaScript 251,52 kB (78,25 kB gzip),
  CSS 14,88 kB (4,05 kB gzip), hero 1.006,08 kB e poster 48,30 kB,
  conforme a saída do Vite registrada na auditoria.
- Há oito originais JPG preservados e 16 derivados WebP responsivos.
  O conjunto derivado totaliza mais bytes que os originais; a economia
  depende de o navegador baixar a variante adequada, não do armazenamento
  total no repositório.

O procedimento local usa Chromium, três amostras por largura, cache
desabilitado, CPU 4x, latência simulada de 150 ms e janela de observação de
cinco segundos. O resultado pode variar com máquina, rede, fontes e
conteúdo. O elemento LCP anotado foi `DIV`; não há evidência para atribuir
o gargalo a uma imagem específica.

## Práticas adotadas e critérios

- Informar dimensões intrínsecas (`width` e `height`) e manter proporções
  no CSS para reduzir deslocamento de layout.
- Usar variantes responsivas com `srcset` e `sizes` quando elas representam
  a mesma imagem e dimensão adequada.
- Aplicar lazy loading a imagens fora do primeiro viewport. Não atrasar
  conteúdo provável de LCP com `loading="lazy"`.
- Usar `fetchpriority="high"` apenas depois de confirmar que o recurso é
  candidato LCP. Nesta medição, o LCP foi um `DIV`, portanto não há
  justificativa medida para adicionar prioridade alta a uma imagem.
- Separar medições de laboratório das métricas de campo.

Referências dos limites de campo:
[Core Web Vitals](https://web.dev/articles/vitals) e
[INP](https://web.dev/articles/inp). Os limites de avaliação recomendados
no percentil 75 são LCP até 2,5 s, INP até 200 ms e CLS até 0,1,
segmentados por dispositivo. Uma amostra local curta não permite declarar
aprovação.
Após deploy, usar CrUX quando houver dados suficientes para a origem ou
coleta de RUM consentida e adequada. Não inventar tráfego nem inferir
resultado de campo a partir do Lighthouse.

### Formatos

WebP já está em uso. AVIF pode apresentar compressão eficiente em certos
conteúdos, mas não foi feita comparação de qualidade/tamanho com as fotos
FITBOX nem teste de suporte na audiência real. As alegações de "30 a 50%
menor que WebP" e "96% de suporte em 2026" não foram confirmadas para este
caso e não são tratadas como fato.

Se AVIF for medido e aprovado visualmente, usar `<picture>` com AVIF e
fallback WebP/JPEG, preservando dimensões e texto alternativo. Comparar
bytes transferidos, qualidade em detalhes de comida, decodificação e
fallbacks em navegadores-alvo. Não substituir os originais preservados.
Referência técnica: [web.dev, AVIF](https://web.dev/learn/images/avif).

## Hipótese

Investigar poster/vídeo, fontes e cadeia de carregamento pode revelar uma
oportunidade para LCP desktop. A medição disponível não isola causalidade,
então mudanças adicionais devem ser guiadas por perfil e re-medição.

## Pendente

- Reduzir LCP de laboratório desktop sem remover conteúdo por suposição.
- Medir INP em interação representativa e repetir com várias amostras.
- Obter LCP, INP e CLS de campo após publicação, incluindo percentil 75.
- Repetir verificação de imagens, cache e compressão no Cloudflare Pages.
- Avaliar AVIF com arquivos FITBOX e dispositivos/navegadores definidos.
