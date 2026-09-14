# Rafael Batista · Site pessoal

Portfólio em português, responsivo, feito com HTML, CSS e JavaScript. Não precisa de instalação de dependências ou build. Inclui navegação por teclado, suporte a movimento reduzido e importação opcional de repositórios públicos do GitHub.

## Visualizar localmente

Na pasta do projeto, execute:

```sh
python3 -m http.server 8000
```

Abra http://localhost:8000.

## Personalizar

Conta vinculada: `faelk8`. Repositório: https://github.com/faelk8/rafael_io

Endereço padrão do site: https://faelk8.github.io/rafael_io/

Edite `profile.js` para alterar nome, apresentação, bio, interesses, usuário do GitHub, e-mail, LinkedIn e projetos. O conteúdo inicial é provisório e não atribui experiências ou especialidades ao autor.

- `github`: usuário, sem URL. Habilita os links para o perfil.
- `projects`: projetos escolhidos manualmente, com nome, descrição, tags e URL opcional.
- Para importar automaticamente até seis repositórios públicos, preencha `github` e defina `projects: []`. Forks e projetos arquivados são excluídos. A API pública pode limitar requisições; o site mantém um link direto para o GitHub em caso de falha.
- Campos de contato vazios não geram links.
- Ao mudar o nome, ajuste também os textos fixos, título e descrição no `index.html`.

As fontes são carregadas do Google Fonts; há fontes locais de fallback.

## Publicar no GitHub Pages

1. Envie estes arquivos para um repositório seu, na branch `main`.
2. No GitHub, abra **Settings → Pages → Build and deployment** e selecione **GitHub Actions** como origem.
3. Execute o workflow **Publicar site no GitHub Pages** pela aba Actions ou envie um novo commit para `main`.
4. O endereço publicado aparece no ambiente `github-pages` ao concluir o workflow.

O workflow publica somente os arquivos do site. Nenhum token deve ser colocado em `profile.js`, pois ele é público.

## Domínio rafael.batista.io

A configuração depende de você controlar o DNS de `batista.io` ou ter autorização para configurar esse subdomínio.

1. Nas configurações de Pages, adicione `rafael.batista.io` em **Custom domain**.
2. No provedor DNS, crie um registro CNAME de `rafael` para `SEU_USUARIO.github.io` (sem nome de repositório).
3. Quando o certificado estiver disponível, habilite **Enforce HTTPS** no GitHub Pages.

Com GitHub Actions, o domínio é definido nas configurações do GitHub Pages; o arquivo CNAME não é necessário. O domínio não é configurado automaticamente por este projeto.

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages e https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Escrever sobre projetos em empresas

Em `profile.js`, a lista `professionalProjects` reúne relatos sem precisar de repositório. Ela é independente dos projetos do GitHub: ambos aparecem na página.

Já estão cadastrados Kafka, sistema de recomendação e arquitetura medalhão com Dremio, S3 e PostgreSQL, com resumos baseados nas informações fornecidas. Para cada projeto, preencha:

- `description`: resumo sempre visível no cartão.
- `context`: problema e objetivo do projeto.
- `contribution`: sua participação, atividades e decisões.
- `architecture`: componentes, fluxo dos dados e solução.
- `results`: resultados e aprendizados.
- `tags`: tecnologias utilizadas.

Cada cartão abre uma página própria pelo botão **Conhecer o projeto**. Preencha `context`, `contribution`, `architecture` e `results` em `profile.js` para escrever o relato. Os campos vazios ficam ocultos. O campo `slug` identifica a página: use um valor único, sem espaços, e mantenha-o estável para preservar os links. Use crases para textos com mais de uma linha:

```js
contribution: `Escreva aqui sua participação no projeto.

Continue em outro parágrafo para detalhar uma decisão.`,
```

Edite o arquivo localmente ou pelo GitHub e envie a alteração à branch `main` para atualizar o site. Não há editor de texto dentro da página pública.
