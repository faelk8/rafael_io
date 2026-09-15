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
      page: 'projetos/kafka.html',
      slug: 'kafka',
      name: 'Centralização de dados com Apache Kafka',
      description: 'Integração de ~1800 tabelas por base de cliente, com Kafka, Debezium e rotinas de manutenção automatizadas no Airflow.',
      tags: ['Apache Kafka', 'Debezium', 'Amazon EC2', 'Apache Airflow', 'Python', 'KSQL', 'Grafana', 'Loki', 'Promtail'],
      // O relato completo é editado diretamente em projetos/kafka.html.
    },
    {
      page: 'projetos/anti-fraude.html',
      slug: 'anti-fraude',
      name: 'Sistema de detecção de fraude com estatística',
      description: 'Sistema de detecção de fraude em transações financeiras, com análise estatística e alertas em tempo real.',
      tags: ['Detecção de Fraude', 'Estatística', 'ClickHouse', 'PostgreSQL', 'MongoDB', 'Python', 'RabbitMQ', 'Airflow'],
      // O relato completo é editado diretamente em projetos/anti-fraude.html.
    },
    {
      page: 'projetos/sistema-de-recomendacao.html',
      slug: 'sistema-de-recomendacao', // Identificador da página; mantenha estável ao alterar o título.
      name: 'Sistema de recomendação',
      description: 'Atuação em um sistema de recomendação desenvolvido em uma empresa.',
      tags: ['Sistema de recomendação', 'Redis', 'Estatística', 'TF-IDF', 'SQL'],
      // Edite o relato diretamente em projetos/sistema-de-recomendacao.html.
    },
    {
      page: 'projetos/arquitetura-medalhao.html',
      slug: 'arquitetura-medalhao', // Identificador da página; mantenha estável ao alterar o título.
      name: 'Arquitetura medalhão com Dremio e S3',
      description: 'Atuação em um projeto de arquitetura medalhão com Dremio e S3, coletando dados do PostgreSQL.',
      tags: ['Dremio', 'S3', 'PostgreSQL', 'Arquitetura medalhão'],
      // Edite o relato diretamente em projetos/arquitetura-medalhao.html.
    },
  ],
  // Projetos preenchidos aqui têm prioridade sobre os repositórios do GitHub.
  projects: [],
};
