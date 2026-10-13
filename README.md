# FITBOX

Protótipo de vitrine digital FITBOX para marmitas fit congeladas no freezer de
autoatendimento da academia. O projeto principal é o site estático em
`prototipo/` (HTML, CSS e JavaScript), servido e compilado pelo Vite.

## Executar o FITBOX

Requer Node.js 20.19+ ou 22.12+ e as dependências instaladas (`npm install`).

```sh
npm run dev
```

O site fica disponível em `http://localhost:8090` e, na rede local, no IP desta
máquina na porta `8090`.

## Build e preview

```sh
npm run build
npm run preview
```

O build estático é gravado em `dist/`.

## Dados e limites do protótipo

- Os valores nutricionais e preços são sugestões e devem ser validados pela
  nutricionista responsável.
- O protótipo não processa pagamentos nem cria pedidos reais.

## Aplicação React anterior

A aplicação demonstrativa React/TypeScript anterior foi preservada em `src/` e
na raiz do projeto, mas não é o produto principal. Para executá-la explicitamente:

```sh
npm run legacy:dev
```

Para compilar essa versão antiga:

```sh
npm run legacy:build
```
