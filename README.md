# Rafael Batista · Site pessoal

Portfólio em português do Brasil, inglês dos Estados Unidos e espanhol da Espanha, responsivo, feito com HTML, CSS e JavaScript. Não precisa de instalação de dependências ou build. Inclui navegação por teclado, suporte a movimento reduzido e importação opcional de repositórios públicos do GitHub.

## Visualizar localmente

Na pasta do projeto, execute:

```sh
python3 -m http.server 8000
# ou
python3 scripts/dev.py --port 8001
```

Abra http://localhost:8000.

## Idiomas

As bandeiras no canto superior direito alternam entre `pt-BR`, `en-US` e `es-ES` sem sair da página. Português é o padrão da primeira visita; a escolha fica salva no navegador e acompanha a navegação. Se o armazenamento do navegador estiver bloqueado, a troca continua funcionando na página atual. Os botões têm identificação acessível, foco por teclado e indicação do idioma ativo.

Os textos originais permanecem em português no HTML e em `profile.js`. O catálogo `locales/messages.js` associa cada texto a um par `[inglês, espanhol]`. Ao editar ou adicionar conteúdo, atualize a chave em português e as duas traduções. Espaços e quebras de linha são normalizados; nomes de tecnologias e instituições são preservados. Textos sem entrada no catálogo mantêm o original em português. As descrições e nomes recebidos da API do GitHub mantêm o texto publicado pelo autor do repositório.

`i18n.js` traduz o conteúdo, os títulos, as descrições das páginas e os rótulos de acessibilidade, incluindo os cartões carregados após a abertura da página. Sem JavaScript, o conteúdo estático continua disponível em português.

Os diagramas têm versões próprias nos dois idiomas. Depois de alterar os textos dos SVGs ou suas traduções, execute `python3 scripts/localize_diagrams.py` para atualizar os arquivos usados na prévia local. `python3 scripts/build.py` também gera essas versões ao preparar `_site` para publicação.

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

## Formação e cursos relevantes

Preencha a lista `education` em `profile.js` para adicionar formações, cursos e certificações à seção **Formação**. Os cartões seguem a ordem da lista. Use seus dados reais neste modelo:

```js
{
  name: 'Nome da formação ou curso',
  institution: 'Instituição de ensino',
  category: 'Curso', // Ou 'Formação acadêmica' ou 'Certificação'
  period: 'Ano ou período',
  status: 'Concluído', // Ou 'Em andamento'
  description: 'Conhecimentos relevantes para sua atuação profissional.',
  certificateUrl: '', // Link público opcional para o certificado
},
```

Apenas `name` é obrigatório para exibir o cartão. Campos vazios são omitidos. Enquanto a lista estiver vazia, a seção informa que os dados serão adicionados em breve.

Nas formações da DSA, preencha `courses` com os cursos que compõem cada formação:

```js
courses: [
  'Nome do primeiro curso',
  'Nome do segundo curso',
],
```

Os cursos aparecem em uma lista dentro do cartão da respectiva formação. Listas vazias ficam ocultas.

Para criar sublistas, use um objeto com `name` e `courses`. É possível combinar cursos simples e grupos na mesma lista:

```js
courses: [
  {
    name: 'Programação e Machine Learning com C# e .NET Core',
    courses: [
      'Programação C# - Introdução',
      'Programação C# - Orientação a Objetos',
    ],
  },
  'Outro curso',
],
```

## Páginas individuais

As páginas individuais ficam na pasta `projetos/`. O Kafka está em `projetos/profissionais/kafka.html`. O campo `page` em `profile.js` define o endereço do cartão. Os textos continuam no objeto de cada projeto em `profile.js`.

O build inclui automaticamente os arquivos da pasta `projetos/`. Os endereços antigos de `projeto.html?projeto=...` continuam funcionando.


## Prévia com atualização automática

Execute `python3 scripts/dev.py` e abra http://localhost:8000/projetos/profissionais/kafka.html. Ao salvar HTML, CSS, JavaScript ou texto, o navegador recarrega automaticamente. Mantenha o terminal aberto; encerre com Ctrl+C. Se a porta estiver ocupada, use `python3 scripts/dev.py --port 8001`.

O relato do Kafka agora é editado **diretamente em `projetos/profissionais/kafka.html`**, nos elementos `<h2>` e `<p>`. Ele não depende de JavaScript para aparecer. `texto/kafka.txt` permanece como rascunho de referência e não substitui mais o conteúdo do HTML. O resumo do cartão da página inicial continua em `profile.js`.

Para gerar a versão de publicação, execute `python3 scripts/build.py`. O resultado fica em `_site/`. O GitHub Actions executa esse build a cada push para `main`; salvar localmente atualiza apenas a prévia.

Se a porta solicitada estiver ocupada, a prévia escolhe automaticamente a próxima disponível (até 20 tentativas). Abra o endereço mostrado no terminal.

## Projetos pessoais e profissionais

Os relatos profissionais ficam em `projetos/profissionais/`; os pessoais, em `projetos/pessoais/`. Os endereços anteriores dos projetos profissionais redirecionam para as novas páginas.

Edite os cartões pessoais em `personalProjects`, no `profile.js`, e o relato diretamente no HTML correspondente. Foram criadas páginas para robô trader, previsão de cotação de empresas, acompanhamento de carteira de investimentos e agente pessoal com IA local. Os detalhes aguardam preenchimento.
