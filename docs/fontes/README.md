# Fontes preservadas

## Fato

`tabela-brasileira-de-composicao-de.pdf` é a cópia recebida anteriormente
na raiz, movida sem alteração do conteúdo. SHA-256 antes e depois:

```text
9a0fdcc3e2e69d2de6944dc8362dcf3c6793cf9e21a2bd2456c747e3602df6bc
```

Tem 47.956.479 bytes, aproximadamente 45,73 MiB, e não integra o build estático. A extração textual
usada na auditoria provém da [publicação NEPA/Unicamp](https://www.nepa.unicamp.br/wp-content/uploads/sites/27/2023/10/taco_4_edicao_ampliada_e_revisada.pdf),
TACO, 4ª edição, 2011. As páginas citadas são impressas, não índices do leitor.

## Hipótese

Uma cópia local facilita consulta sem rede, mas não dispensa registrar a versão
e a origem em cada cálculo.

## Decisão de versionamento

Em 17/10/2026, Lucas decidiu manter o PDF somente local. O arquivo foi
preservado, não apagado, não adicionado ao índice e não enviado ao GitHub.
Uma exclusão de caminho exato em `.git/info/exclude` evita inclusão
acidental neste clone. Ela não acompanha clones novos nem impede inclusão
forçada.

O registro de origem e hash permanece versionado; o binário não é necessário
para build ou testes. O acesso offline à cópia recebida não estará disponível
em um clone novo. Uma futura redistribuição exige revisão própria.
