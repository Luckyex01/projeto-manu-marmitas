# Manu Marmitas

Vitrine demonstrativa feita com React, TypeScript e Vite. Não processa
pagamentos nem cria pedidos reais.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+.

```sh
npm install
npm run dev
```

Para verificar a versão de produção:

```sh
npm run build
npm run preview
```

## Dados e limites da demonstração

- Os nomes, preços e descrições em `src/data/products.ts` são exemplos.
- As fichas nutricionais aguardam a planilha da nutricionista; não substitua
  os avisos sem confirmar os valores e porções.
- O acesso é simulado no navegador. A sessão guarda somente o email; a senha
  não é validada nem persistida.
- A sacola fica no `localStorage` deste navegador. Não há contas compartilhadas
  entre dispositivos, cálculo de frete ou integração de pagamento.
- Fotos de demonstração usam URLs do Unsplash. A [licença do Unsplash](https://unsplash.com/license)
  permite uso comercial; substitua as imagens por arquivos aprovados para a
  marca quando estiverem disponíveis.

## Cloudflare Pages

Configuração de build: `npm run build`  
Diretório de saída: `dist`
