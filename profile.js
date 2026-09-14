// Edite este arquivo para personalizar o site. Não coloque senhas ou tokens aqui.
window.PROFILE = {
  name: 'Rafael Batista',
  intro: 'Projetos, ideias e um pouco sobre mim. Bem-vindo ao meu canto da internet.',
  aboutLead: 'Um espaço para compartilhar o que estou construindo.',
  bio: 'Sou Rafael Batista. Aqui você vai encontrar meus projetos e acompanhar as próximas atualizações deste espaço.',
  interests: [], // Exemplo: ['Desenvolvimento', 'Dados', 'Tecnologia']
  github: 'faelk8', // Somente o usuário, sem https://github.com/
  email: '',
  linkedin: '', // URL completa do seu perfil
  // Ferramentas e conhecimentos. Duplique um item para adicionar outra ferramenta.
  // Em level, informe seu domínio: 'Básico', 'Intermediário' ou 'Avançado'.
  // Nível e descrição vazios ficam ocultos; preencha conforme sua experiência.
  skills: [
    { name: 'Python', category: 'Linguagem', level: '', description: '' },
    { name: 'Bancos de dados', category: 'Dados', level: '', description: '' },
    { name: 'Docker', category: 'Containers', level: '', description: '' },
  ],
  // Experiências em empresas: não precisam de repositório ou link.
  // Use crases (`) nos textos para escrever vários parágrafos, separados por uma linha vazia.
  // Campos vazios não aparecem no site. Duplique um objeto para adicionar outro projeto.
  professionalProjects: [
    {
      page: 'kafka.html',
      slug: 'kafka', // Identificador da página; mantenha estável ao alterar o título.
      name: 'Projeto com Apache Kafka',
      description: 'Atuação em um projeto com Apache Kafka no ambiente de uma empresa.',
      tags: ['Apache Kafka'],
      context: '', // Qual problema o projeto precisava resolver?
      contribution: '', // O que você fez e quais decisões tomou?
      architecture: '', // Como os componentes se conectavam?
      results: '', // Quais foram os resultados? Inclua números apenas se tiver os dados.
    },
    {
      page: 'sistema-de-recomendacao.html',
      slug: 'sistema-de-recomendacao', // Identificador da página; mantenha estável ao alterar o título.
      name: 'Sistema de recomendação',
      description: 'Atuação em um sistema de recomendação desenvolvido em uma empresa.',
      tags: ['Sistema de recomendação'],
      context: '',
      contribution: '',
      architecture: '',
      results: '',
    },
    {
      page: 'csa.html',
      slug: 'csa',
      name: 'CSA',
      description: '', // Escreva um resumo do projeto CSA.
      tags: [], // Adicione as tecnologias utilizadas.
      context: '', // Qual era o desafio?
      contribution: '', // O que você fez?
      architecture: '', // Como foi feito?
      results: '', // Resultados e aprendizados.
    },
    {
      page: 'arquitetura-medalhao.html',
      slug: 'arquitetura-medalhao', // Identificador da página; mantenha estável ao alterar o título.
      name: 'Arquitetura medalhão com Dremio e S3',
      description: 'Atuação em um projeto de arquitetura medalhão com Dremio e S3, coletando dados do PostgreSQL.',
      tags: ['Dremio', 'S3', 'PostgreSQL', 'Arquitetura medalhão'],
      context: '',
      contribution: '',
      architecture: '',
      results: '',
    },
  ],
  // Projetos preenchidos aqui têm prioridade sobre os repositórios do GitHub.
  projects: [],
};
