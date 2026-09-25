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
  // Formação e cursos relevantes. Duplique o exemplo e preencha com seus dados reais.
  // category: 'Formação acadêmica', 'Curso' ou 'Certificação'.
  // period: ano, intervalo de anos ou previsão de conclusão; status: 'Concluído' ou 'Em andamento'.
  // description e certificateUrl são opcionais. Itens sem name não aparecem.
  education: [
    {
      name: 'Pós-Graduação em Ciência de Dados e Big Data',
      institution: 'Estácio de Sá',
      category: 'Formação acadêmica',
      period: '2020',
    },
    {
      name: 'Graduação em Análise e Desenvolvimento de Sistemas',
      institution: 'UNINTER',
      category: 'Formação acadêmica',
      period: '2019',
    },
    {
      name: 'Formação Cientista de Dados',
      institution: 'Data Science Academy - DSA',
      category: 'Especialização',
      courses: [
        'Python Fundamentos para Análise de Dados',
        'Big Data 2.0',
        'Introdução a Ciências de Dado 2.0',
        'Big Data Analytics com R e Microsoft Azure Machine Learning',
        'Big Data Real-Time Analytics com Python e Spark',
        'Engenharia de Dados com Hadoop e Spark_',
        'Machine Learning',
        'Business Analytics',
        'Visualização de Dados e Design de Dashboards',
      ],
    },
    {
      name: 'Formação Inteligência Artificial',
      institution: 'Data Science Academy - DSA',
      category: 'Especialização',
      courses: [
        'Introdução Inteligencia Artifical',
        'Deep Learning Frameworks',
        'Programação Paralela em GPU',
        'Deep Learning I',
        'Deep Learning II',
        'Visão Computacional e Reconhecimento de Imagem',
        'Processamento de Linguagem Natural e Reconhecimento de Voz',
        'Análise em Grafos',
        'Sistemas Cognitivos',
        'Deep Learning',
      ],
    },
    {
      name: 'Formação Microsoft para Data Science, Inteligência Artificial e Big Data Analytics',
      institution: 'Data Science Academy - DSA',
      category: 'Especialização',
      courses: [
        'Programação e Machine Learning com C# e .NET Core',
        'Programação C# - Introdução',
        'Programação C# - Orientação a Objetos',
        'Programação C# - Coleções, Consultas Linqe Lambda Expressions',
        'Consultas SQL com Microsoft SQL Server',
        'Programação Visual com Window Form',
        'Machine Learning Classificação com ML.NET',
        'Machine Learning Regressão com ML.NET',
        'Machine Learning Clusterização e Sistemas de Recomendação com ML.NET',
      ],
    },
    {
      name: 'Containerização com Docker e Kubernetes',
      institution: '4Linux',
      category: 'Especialização',
      courses: [
        {
          name: 'Containerização com Docker e Kubernetes',
          courses: [
            'Container Fundamentals',
            'Docker:Admistração de Containers',
            'Kubernets: Orquestração de Ambientes Escaláveis',
            'Gerenciamento de Cluster Kubernetes com Rancher',
            'EKS E GKE: Kubernetes Gerenciado em Cloud',
            'Segurança em Cluster Kubernetes',
            'IA no Universo Kubernetes',
          ],
        },
      ],
    },
    ,
    {
      name: 'Administração de Banco de Dados',
      institution: '4Linux',
      category: 'Especialização',
      courses: [
        {
          name: 'DBA',
          courses: [
            'Administração PostgreSQL com Alta Disponibilidade',
            'Administração MySql com Alata Performace eAlta Disponibilidade',
            'Especialista Elastic Stack - Elasticsearch, Logstash, Kibana e Beats',
          ],
        },
      ],
    },
  ],
  // Experiências em empresas: não precisam de repositório ou link.
  // Use crases (`) nos textos para escrever vários parágrafos, separados por uma linha vazia.
  // Campos vazios não aparecem no site. Duplique um objeto para adicionar outro projeto.
  personalProjects: [
    {
      "slug": "robo-trader",
      "name": "Robô trader",
      "description": "Projeto pessoal voltado à automação de operações no mercado financeiro.",
      "page": "projetos/pessoais/robo-trader.html",
      "tags": []
    },
    {
      "slug": "previsao-cotacao-empresa",
      "name": "Previsão de cotação de empresas",
      "description": "Projeto pessoal voltado à previsão de cotações de ações de empresas.",
      "page": "projetos/pessoais/previsao-cotacao-empresa.html",
      "tags": []
    },
    {
      "slug": "carteira-investimentos",
      "name": "Acompanhamento de carteira de investimentos",
      "description": "Projeto pessoal para acompanhar uma carteira de investimentos.",
      "page": "projetos/pessoais/carteira-investimentos.html",
      "tags": []
    },
    {
      "slug": "agente-pessoal-ia-local",
      "name": "Agente pessoal com IA local",
      "description": "Projeto pessoal de um agente de inteligência artificial executado localmente.",
      "page": "projetos/pessoais/agente-pessoal-ia-local.html",
      "tags": []
    }
  ],
  professionalProjects: [
    {
      page: 'projetos/profissionais/kafka.html',
      slug: 'kafka',
      name: 'Centralização de dados com Apache Kafka',
      description: 'Integração de ~1800 tabelas por base de cliente, com Kafka, Debezium e rotinas de manutenção automatizadas no Airflow.',
      tags: ['Apache Kafka', 'Debezium', 'Amazon EC2', 'Apache Airflow', 'Python', 'KSQL', 'Grafana', 'Loki', 'Promtail'],
      // O relato completo é editado diretamente em projetos/profissionais/kafka.html.
    },
    {
      page: 'projetos/profissionais/anti-fraude.html',
      slug: 'anti-fraude',
      name: 'Sistema de detecção de fraude com estatística',
      description: 'Sistema de detecção de fraude em transações financeiras, com análise estatística e alertas em tempo real.',
      tags: ['Detecção de Fraude', 'Estatística', 'ClickHouse', 'PostgreSQL', 'MongoDB', 'Python', 'RabbitMQ', 'Airflow'],
      // O relato completo é editado diretamente em projetos/profissionais/anti-fraude.html.
    },
    {
      page: 'projetos/profissionais/sistema-de-recomendacao.html',
      slug: 'sistema-de-recomendacao', // Identificador da página; mantenha estável ao alterar o título.
      name: 'Sistema de recomendação',
      description: 'Atuação em um sistema de recomendação desenvolvido em uma empresa.',
      tags: ['Sistema de recomendação', 'Redis', 'Estatística', 'TF-IDF', 'SQL'],
      // Edite o relato diretamente em projetos/profissionais/sistema-de-recomendacao.html.
    },
    {
      page: 'projetos/profissionais/arquitetura-medalhao.html',
      slug: 'arquitetura-medalhao', // Identificador da página; mantenha estável ao alterar o título.
      name: 'Arquitetura medalhão com Dremio e S3',
      description: 'Atuação em um projeto de arquitetura medalhão com Dremio e S3, coletando dados do PostgreSQL.',
      tags: ['Dremio', 'S3', 'PostgreSQL', 'Arquitetura medalhão'],
      // Edite o relato diretamente em projetos/profissionais/arquitetura-medalhao.html.
    },
  ],
  // Projetos preenchidos aqui têm prioridade sobre os repositórios do GitHub.
  projects: [],
};
