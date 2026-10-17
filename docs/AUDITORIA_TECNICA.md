# Auditoria técnica FITBOX

## Fato

Escopo: SPA local, Chromium automatizado, telas emuladas de 320, 390,
768 e 1440 px. Não é auditoria completa de produção, certificação WCAG,
teste com usuários ou avaliação sanitária.

### Acessibilidade e UX

| Achado | Severidade/critério | Tratamento | Evidência |
|---|---|---|---|
| Nome acessível intercalava o prato no texto "Adicionar à sacola" | axe `serious`, `label-content-name-mismatch`, WCAG 2.5.3 A | Nome agora começa pelo texto visível completo | Regressão no teste axe e seletores E2E atualizados |
| Link "Sobre" com largura medida de 41 px | Meta interna de toque 44 x 44 | `min-width: 44px` | CSS da navegação |
| Ausência de auditoria automática de regras WCAG | Lacuna de validação | `@axe-core/playwright` 4.14.0, somente desenvolvimento | Oito execuções E2E novas |

O teste de acessibilidade percorre cinco estados: home, detalhe, conta,
revisão logada e confirmação. São quatro larguras executadas nos projetos
mobile e desktop do Playwright, totalizando oito execuções de teste e
40 análises axe por suíte completa. Cada análise usa tags WCAG 2 A/AA,
2.1 A/AA e 2.2 AA, exige zero `violations` e guarda também `incomplete`
como anexo JSON do relatório Playwright.

Resultado automatizado observado: zero violações nas regras/estados
executados e ausência de overflow horizontal nos checks. `Incomplete`
exige revisão humana; não foi afirmada contagem zero desses registros.
O alvo de 44 x 44 é meta interna. WCAG 2.2 AA, critério 2.5.8, estabelece
24 x 24 CSS px como mínimo, sujeito às exceções normativas. Consulte
[Acessibilidade](ACESSIBILIDADE.md) para o escopo e os limites.

Testes existentes cobrem teclado, foco, fechamento por Escape,
movimento reduzido, busca, filtros, sacola e sessão. Isso não equivale
a leitor de tela real, controle por voz ou cobertura de todos os
critérios WCAG.

### Dez heurísticas de Nielsen aplicadas ao fluxo

Referência: [10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).

| Heurística | Evidência na FITBOX | Limite ou próxima ação |
|---|---|---|
| Visibilidade de estado | Contagem, quantidade, total e aviso de adição | Medir entendimento em teste com alunos |
| Linguagem do mundo real | Cardápio, detalhe, ingredientes e conservação | Receitas/preparo ainda não aprovados |
| Controle e liberdade | Remover, alterar quantidade, fechar modal, sair | Confirmar retorno de foco com tecnologia assistiva |
| Consistência | Mesmos cards, filtros, chips e modais | Manter nome acessível alinhado ao visível |
| Prevenção de erros | Quantidade válida e confirmação explicitamente demonstrativa | Não confundir com reserva/estoque real |
| Reconhecimento | Foto, nome e macros visíveis, sem login para explorar | Dados nutricionais ainda provisórios |
| Flexibilidade | Busca, filtros e navegação por teclado | Atalhos extras não são necessidade demonstrada |
| Minimalismo | Sem frete, CEP, pagamento ou checkout de entrega | Não copiar complexidade da Liv Up/Cumbuca |
| Recuperação | Falha de storage avisa; usuário pode repetir | Verificar também na origem Cloudflare |
| Ajuda | FAQ e informações do prato | Parâmetros térmicos dependem de ficha/processo |

O percurso analisado é QR Code, home, cardápio, detalhe, sacola, conta
somente ao confirmar e confirmação demonstrativa. O QR impresso e o
freezer físico não foram testados. Revisão heurística é inspeção técnica,
não evidência de aumento de conversão.

### Performance em laboratório

Comando reproduzível, após `npm run build` e preview local ativo:

```sh
node scripts/medir-performance.mjs http://127.0.0.1:4173 /tmp/fitbox-performance.json
```

Somente loopback é aceito. Três contextos novos por largura, cache
desabilitado, CPU 4x, latência 150 ms, download 200.000 B/s e upload
93.750 B/s via CDP. Observação por cinco segundos após `load`, sem
scroll/interação. LCP por `PerformanceObserver`; CLS por janelas de
sessão de até cinco segundos, com intervalo máximo de um segundo.

| Largura | LCP antes, ms | LCP depois, ms | Mediana antes/depois | CLS antes/depois |
|---|---|---|---|---|
| 390 | 2140, 2004, 2116 | 2056, 1944, 1988 | 2116 / 1988 ms | aproximadamente 0,00106 / 0,00106 |
| 1440 | 2656, 2712, 2716 | 2532, 2580, 2660 | 2712 / 2580 ms | aproximadamente 0,01333 / 0,01333 |

Bytes de recursos concluídos observáveis: mobile 146.795 antes e
147.201 depois; desktop 406.935 antes e 333.763 depois. Esse total
parcial não representa todos os bytes da sessão, documento, vídeo em
streaming ou recursos cujo timing cross-origin não foi exposto.
No desktop, a diferença observada foi de 73.172 bytes, aproximadamente
18%. O resultado mobile ficou praticamente igual.

O LCP desktop continuou acima da referência de 2,5 s nas três rodadas.
CLS da janela observada ficou abaixo de 0,1. Não há conclusão de
aprovação dos Core Web Vitals de produção: faltam dados de campo,
percentil 75 e INP. O elemento LCP registrado foi apenas `DIV`, sem
seletor suficiente para atribuir o resultado a uma seção específica.

[INP substituiu FID](https://web.dev/articles/inp) como Core Web Vital.
Nenhum dos dois foi medido nesta rodada; não substituir INP por tempo
de clique estimado.

### Imagens e bundle

- Oito originais JPG preservados em `prototipo/assets/`.
- Dezesseis derivados WebP em `src/fitbox/assets/`, incluindo versões
  360 px, usados com `srcset`, `sizes` e decodificação assíncrona.
- Sacola usa variante menor; imagens fora do início usam lazy loading.
- Soma dos oito JPG: 725.612 bytes. WebP na dimensão original:
  532.486 bytes. Variantes 360 px: 233.898 bytes.
- A soma dos 16 derivados é 766.384 bytes, maior que os oito JPG.
  A otimização é de seleção/transferência, não redução do total de assets.
- Build observado: 48 módulos, JS 251,52 kB (gzip 78,25 kB),
  CSS 14,91 kB (gzip 4,06 kB), hero 1.006,08 kB,
  poster 48,30 kB e logo 15,13 kB, conforme unidades do Vite.
- Não foi introduzido chunk splitting especulativo nem alterado o vídeo.

Para regenerar um derivado com ffmpeg já instalado, preservar a fonte
e escolher destino ainda inexistente:

```sh
ffmpeg -v error -n -i prototipo/assets/foto1.jpg -frames:v 1 -c:v libwebp -quality 80 src/fitbox/assets/foto1.webp
ffmpeg -v error -n -i prototipo/assets/foto1.jpg -vf scale=360:-2 -frames:v 1 -c:v libwebp -quality 80 src/fitbox/assets/foto1-360.webp
```

`-n` recusa sobrescrita; os destinos acima já existem. O uso de ffmpeg
é etapa de manutenção dos assets, não dependência de build/execução.
Não copiar derivação para outra foto sem conferir dimensões e identidade.

## Hipótese

WebP responsivo pode reduzir transferência em outras telas; as pequenas
amostras locais não isolam causalidade de rede, fontes ou máquina
compartilhada. A diferença de mediana não promete ganho em produção.
Vídeo, poster e carregamento de fontes merecem investigação antes de
otimizações adicionais, mas não foi identificado gargalo definitivo.

## Pendente

- Revisão de todos os `incomplete` axe e contraste em estados interativos.
- NVDA/VoiceOver ou TalkBack, zoom, voz e navegador/dispositivo reais.
- Auditoria manual das áreas não cobertas e regressão em outros engines.
- INP, LCP/CLS de campo, percentil 75 e condições de rede reais.
- Medição adicional para reduzir LCP desktop abaixo da meta, sem retirar
  conteúdo por suposição.
- Origem Cloudflare para headers, cache, HTTPS, storage e comportamento
  remoto; [protocolo de aceite](CLOUDFLARE_PAGES.md).
