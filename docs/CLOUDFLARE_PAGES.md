# Preparação Cloudflare Pages

Consulta: 16/10/2026. Nenhum projeto Cloudflare, credencial, domínio,
deploy ou integração GitHub foi criado nesta execução.

## Fato

### Limites publicados

Fontes: [limites Pages](https://developers.cloudflare.com/pages/platform/limits/)
e [preços de Functions/estáticos](https://developers.cloudflare.com/pages/functions/pricing/).

| Item | Pages Free consultado |
|---|---|
| Builds | 500 por mês |
| Concorrência de build | 1 |
| Tempo por build | 20 minutos |
| Domínios personalizados | 100 por projeto |
| Arquivos | 20.000 por site |
| Tamanho de asset individual | 25 MiB |
| Requisições de arquivos estáticos | Gratuitas e ilimitadas |
| Functions | Contam na cota Workers, 100.000 requisições/dia no Free |

A FITBOX é estática e não usa Functions. Os limites não autorizam abuso
nem substituem os [termos self-serve](https://www.cloudflare.com/terms/)
e termos específicos do serviço.

Não foi identificada restrição do Free apenas a projetos pessoais nas
páginas consultadas. O plano é tecnicamente compatível com uma vitrine
comercial estática, sujeito aos termos aceitos pelo titular. Não confundir
isso com parecer jurídico ou gratuidade irrestrita de qualquer produto
Cloudflare. A afirmação absoluta "TTFB 3 a 5 vezes menor que Vercel/Netlify"
não foi comprovada por benchmark comparável da FITBOX.

### Configuração para quando a publicação for autorizada

Conforme [integração GitHub](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
e [build](https://developers.cloudflare.com/pages/configuration/build-configuration/):

1. Criar Pages com integração GitHub, autorizando somente este repositório.
2. Produção na branch `main`, previews conforme política do projeto.
3. Diretório raiz: raiz do repositório, não `fitbox-app/`.
4. Comando: `npm run build`; diretório publicado: `dist`.
5. Usar uma versão Node compatível, de preferência Node 22.12+ da linha
   usada no CI. Dependências pelo lockfile, sem adicionar segredos.
6. Revisar build/preview, título, assets, vídeo, links e erros de console.
7. Só depois definir domínio e QR Code definitivo.

O script já seleciona a entrada `fitbox-app`. Não publicar o repositório
inteiro nem `fitbox/`, `docs/fontes/`, relatórios ou arquivos de contexto.
O vídeo gerado no build tem cerca de 1 MB, abaixo do limite por asset.
O PDF TACO de aproximadamente 46 MiB não entra em `dist/`.

A integração pode publicar automaticamente a cada push. Não confundir
build/deploy bem-sucedido com gate de CI: configurar proteção de branch
e fluxo de revisão antes de permitir publicação contínua.

### localStorage

É armazenamento do navegador por origem, não banco hospedado no Pages.
Reload no mesmo domínio pode restaurar sessão/sacola; navegador privado,
bloqueio, limpeza ou falta de cota podem impedir persistência.

`localhost`, domínio `pages.dev`, domínio próprio e previews de PR são
origens diferentes. Seus dados não migram automaticamente nem são
sincronizados entre aparelhos. Senhas não são armazenadas. Nome/email
devem ser fictícios na demonstração.

### Headers e rotas preparados

Foi criado `fitbox-app/public/_headers`, copiado pelo Vite para
`dist/_headers`, com `nosniff`, política de referenciador, bloqueio de
iframe e desativação de câmera, microfone e geolocalização. Nenhum
desses recursos é usado pela SPA. A política não altera localStorage.
Conforme [documentação de headers](https://developers.cloudflare.com/pages/configuration/headers/),
o arquivo é interpretado pelo Pages, não pelo Vite preview. A presença
no build foi conferida; aplicação dos headers na borda ainda não foi.

Não foi criado `_redirects`: a navegação usa âncoras, e o
[Pages oferece fallback SPA](https://developers.cloudflare.com/pages/configuration/serving-pages/)
quando não existe `404.html` no topo. Adicionar rewrite genérico agora
não resolveria necessidade demonstrada. Não impor cache customizado
ou CSP especulativa sem testar fontes, vídeo e scripts.

### Protocolo de aceite do preview real

1. Disponibilizar um projeto/URL preview na conta do titular, sem publicar
   o repositório inteiro. Esta execução não recebeu URL ou acesso operacional
   a um projeto Cloudflare e não criou um.
2. Conferir a raiz e os assets, sem `docs/`, fontes PDF ou materiais originais.
3. Em DevTools > Network, verificar os quatro headers e HTTPS.
4. No mesmo domínio preview, adicionar um prato e recarregar: a unidade
   deve permanecer na sacola.
5. Criar sessão com dados fictícios `example.com`, recarregar, sair e
   recarregar novamente: sessão ausente, sacola preservada.
6. Conferir Application > Local Storage: somente ids/quantidades e
   nome/email nas chaves FITBOX, nenhuma senha.
7. Confirmar a demonstração: nenhum POST de pedido/pagamento, sacola
   esvaziada após reload. Repetir com storage bloqueado e conferir avisos.
8. Repetir em navegador mobile real e registrar URL, build, navegador,
   data, resultado e console, sem publicar dados pessoais.

Esses passos são critérios pendentes, não resultados já obtidos.
O teste local em Vite não é um teste de infraestrutura Cloudflare.

### Pages ou Workers

A [documentação atual de frameworks](https://developers.cloudflare.com/pages/framework-guides/)
recomenda Workers para novos projetos e oferece caminhos de migração.
Isso não obriga esta SPA estática a criar backend ou Functions.

## Hipótese

Manter Pages reduz mudanças para a proposta já escolhida. Workers com
assets estáticos também pode atender, mas trocar agora não resolve
nenhum bloqueio funcional demonstrado. Escolher por necessidade real,
não por comparação de latência sem ensaio.

## Pendente

- Aprovação de conteúdo, nutrição, vídeo e privacidade para exposição pública.
- Titular da conta, termos, permissão GitHub restrita e domínio.
- Preview real e aceite de storage/headers na origem Cloudflare.
- CI do novo commit/PR, após revisão e push autorizado pelo usuário.
- Medição própria em redes móveis locais antes de prometer desempenho.
- Revalidar os limites do plano no dia da contratação/publicação.
