// ========== TYPES ==========

export type Department = {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  memberCount: number;
  activeProjects: number;
};

export type User = {
  id: string;
  name: string;
  role: string;
  department: string;
  departmentId: string;
  avatar: string;
  status: "online" | "busy" | "away" | "meeting";
  bio: string;
  skills: string[];
  joinedAt: string;
  completedTasks: number;
  recognitions: number;
  location: string;
};

export type Post = {
  id: string;
  author: User;
  content: string;
  type: "text" | "announcement" | "idea" | "achievement";
  department?: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
  tags?: string[];
  image?: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: User;
  department: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "inprogress" | "review" | "done";
  dueDate: string;
  tags: string[];
  progress: number;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  department: string;
  progress: number;
  members: User[];
  dueDate: string;
  status: "active" | "completed" | "paused";
  tasksTotal: number;
  tasksDone: number;
  color: string;
};

export type Message = {
  id: string;
  from: User;
  content: string;
  timestamp: string;
  read: boolean;
};

export type Conversation = {
  id: string;
  user: User;
  lastMessage: string;
  lastTime: string;
  unread: number;
};

export type Idea = {
  id: string;
  title: string;
  description: string;
  author: User;
  category: string;
  votes: number;
  voted: boolean;
  status: "submitted" | "review" | "approved" | "implemented";
  timestamp: string;
  comments: number;
};

export type Recognition = {
  id: string;
  from: User;
  to: User;
  message: string;
  badge: string;
  timestamp: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  department: string;
  attendees: number;
  type: "meeting" | "training" | "event" | "deadline";
  organizer: User;
};

// ========== DATA ==========

export const departments: Department[] = [
  {
    id: "direcao",
    name: "Direção",
    icon: "👔",
    color: "#7C3AED",
    bgColor: "rgba(124,58,237,0.1)",
    description: "Liderança estratégica e gestão executiva",
    memberCount: 5,
    activeProjects: 3,
  },
  {
    id: "rh",
    name: "Recursos Humanos",
    icon: "👥",
    color: "#2563EB",
    bgColor: "rgba(37,99,235,0.1)",
    description: "Gestão de pessoas, cultura e desenvolvimento",
    memberCount: 12,
    activeProjects: 4,
  },
  {
    id: "financas",
    name: "Finanças",
    icon: "💰",
    color: "#10B981",
    bgColor: "rgba(16,185,129,0.1)",
    description: "Controlo financeiro, orçamentos e relatórios",
    memberCount: 8,
    activeProjects: 2,
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "📢",
    color: "#F59E0B",
    bgColor: "rgba(245,158,11,0.1)",
    description: "Marca, comunicação externa e campanhas",
    memberCount: 10,
    activeProjects: 6,
  },
  {
    id: "vendas",
    name: "Vendas",
    icon: "💼",
    color: "#EF4444",
    bgColor: "rgba(239,68,68,0.1)",
    description: "Geração de receita, clientes e metas",
    memberCount: 15,
    activeProjects: 4,
  },
  {
    id: "ti",
    name: "Tecnologia da Informação",
    icon: "💻",
    color: "#06B6D4",
    bgColor: "rgba(6,182,212,0.1)",
    description: "Infraestrutura, desenvolvimento e suporte",
    memberCount: 20,
    activeProjects: 8,
  },
  {
    id: "logistica",
    name: "Logística",
    icon: "🚚",
    color: "#84CC16",
    bgColor: "rgba(132,204,22,0.1)",
    description: "Transporte, distribuição e gestão de stock",
    memberCount: 18,
    activeProjects: 3,
  },
  {
    id: "operacoes",
    name: "Operações",
    icon: "⚙️",
    color: "#F97316",
    bgColor: "rgba(249,115,22,0.1)",
    description: "Produção, processos e eficiência operacional",
    memberCount: 25,
    activeProjects: 5,
  },
  {
    id: "atendimento",
    name: "Atendimento ao Cliente",
    icon: "📞",
    color: "#EC4899",
    bgColor: "rgba(236,72,153,0.1)",
    description: "Suporte, reclamações e experiência do cliente",
    memberCount: 14,
    activeProjects: 2,
  },
  {
    id: "administracao",
    name: "Administração",
    icon: "🧩",
    color: "#8B5CF6",
    bgColor: "rgba(139,92,246,0.1)",
    description: "Gestão administrativa e suporte organizacional",
    memberCount: 7,
    activeProjects: 2,
  },
];

export const users: User[] = [
  {
    id: "u1",
    name: "Carlos Mendes",
    role: "CEO",
    department: "Direção",
    departmentId: "direcao",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=b6e3f4",
    status: "online",
    bio: "Visionário e apaixonado por inovação. Acredito que as pessoas são o maior ativo de qualquer empresa.",
    skills: ["Estratégia", "Liderança", "Inovação", "Gestão"],
    joinedAt: "2020-01-15",
    completedTasks: 234,
    recognitions: 47,
    location: "Lisboa — Sede",
  },
  {
    id: "u2",
    name: "Ana Costa",
    role: "Diretora de Marketing",
    department: "Marketing",
    departmentId: "marketing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=ffd5dc",
    status: "busy",
    bio: "Criativa e orientada a resultados. Especialista em branding e campanhas digitais.",
    skills: ["Marketing Digital", "Branding", "SEO", "Copywriting"],
    joinedAt: "2021-03-10",
    completedTasks: 189,
    recognitions: 32,
    location: "Lisboa — Sede",
  },
  {
    id: "u3",
    name: "João Silva",
    role: "Desenvolvedor Sénior",
    department: "Tecnologia da Informação",
    departmentId: "ti",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao&backgroundColor=c0aede",
    status: "online",
    bio: "Full-stack developer com paixão por arquiteturas escaláveis e código limpo.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
    joinedAt: "2021-06-01",
    completedTasks: 312,
    recognitions: 28,
    location: "Porto — Escritório Norte",
  },
  {
    id: "u4",
    name: "Mariana Ferreira",
    role: "Gestora de RH",
    department: "Recursos Humanos",
    departmentId: "rh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana&backgroundColor=d1f4cc",
    status: "meeting",
    bio: "Apaixonada por pessoas e cultura organizacional. Transformo ambientes de trabalho.",
    skills: ["Recrutamento", "Cultura", "Avaliação", "Onboarding"],
    joinedAt: "2020-09-05",
    completedTasks: 276,
    recognitions: 41,
    location: "Lisboa — Sede",
  },
  {
    id: "u5",
    name: "Pedro Santos",
    role: "Gestor de Vendas",
    department: "Vendas",
    departmentId: "vendas",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro&backgroundColor=ffd5dc",
    status: "online",
    bio: "Número 1 em vendas por 3 anos consecutivos. Acredito em relacionamentos a longo prazo.",
    skills: ["CRM", "Negociação", "Pipeline", "Liderança"],
    joinedAt: "2020-11-20",
    completedTasks: 423,
    recognitions: 56,
    location: "Lisboa — Sede",
  },
  {
    id: "u6",
    name: "Sofia Rodrigues",
    role: "Analista Financeira",
    department: "Finanças",
    departmentId: "financas",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia&backgroundColor=b6e3f4",
    status: "online",
    bio: "Especialista em análise financeira e controlo de gestão. Transformo números em decisões.",
    skills: ["Excel", "Power BI", "Contabilidade", "Análise"],
    joinedAt: "2022-01-10",
    completedTasks: 198,
    recognitions: 19,
    location: "Lisboa — Sede",
  },
  {
    id: "u7",
    name: "Miguel Oliveira",
    role: "Gestor de Operações",
    department: "Operações",
    departmentId: "operacoes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel&backgroundColor=c0aede",
    status: "away",
    bio: "Focado em eficiência e melhoria contínua. Lean thinking aplicado a todos os processos.",
    skills: ["Lean", "Processos", "Qualidade", "KPIs"],
    joinedAt: "2021-04-15",
    completedTasks: 287,
    recognitions: 24,
    location: "Setúbal — Fábrica",
  },
];

export const currentUser = users[1]; // Ana Costa como utilizadora atual

export const posts: Post[] = [
  {
    id: "p1",
    author: users[0],
    content: "🚀 Estamos a crescer! Fecharemos este trimestre com os melhores resultados da história da empresa. Parabéns a todas as equipas pelo trabalho excepcional! A SocialColab está a transformar a forma como colaboramos.",
    type: "announcement",
    timestamp: "há 32 minutos",
    likes: 47,
    comments: 12,
    liked: true,
    tags: ["Resultados", "Empresa"],
  },
  {
    id: "p2",
    author: users[1],
    content: "📢 Lançámos hoje a nova campanha de Primavera! 🌸 Estamos muito orgulhosos do trabalho da equipa de Marketing. Obrigada a todos os que contribuíram para tornar esta campanha possível!",
    type: "text",
    department: "Marketing",
    timestamp: "há 1 hora",
    likes: 34,
    comments: 8,
    liked: false,
    tags: ["Marketing", "Campanha"],
  },
  {
    id: "p3",
    author: users[4],
    content: "🏆 A equipa de Vendas atingiu 120% da meta de Fevereiro! Estamos em modo de comemoração. Obrigado a cada vendedor que deu o seu melhor este mês. Vamos continuar assim em Março!",
    type: "achievement",
    department: "Vendas",
    timestamp: "há 3 horas",
    likes: 89,
    comments: 23,
    liked: true,
    tags: ["Vendas", "Meta", "Celebração"],
  },
  {
    id: "p4",
    author: users[3],
    content: "👋 Bem-vindos aos nossos 3 novos colaboradores que iniciaram hoje: Rafael Lima (TI), Beatriz Gomes (Marketing) e Tiago Costa (Vendas)! Estamos felizes em tê-los na nossa equipa. #BemVindos",
    type: "announcement",
    department: "Recursos Humanos",
    timestamp: "há 5 horas",
    likes: 56,
    comments: 18,
    liked: false,
    tags: ["RH", "Novos Colaboradores"],
  },
  {
    id: "p5",
    author: users[2],
    content: "💡 Implementámos o novo sistema de monitorização em tempo real. Agora temos visibilidade completa de todos os servidores. O tempo de resposta a incidentes caiu 60%! #TI #Inovação",
    type: "idea",
    department: "Tecnologia da Informação",
    timestamp: "há 7 horas",
    likes: 41,
    comments: 9,
    liked: false,
    tags: ["TI", "Inovação", "Sistemas"],
  },
  {
    id: "p6",
    author: users[5],
    content: "📊 Relatório financeiro de Fevereiro publicado! Crescimento de 18% face ao mesmo período do ano passado. Contacte o departamento de Finanças para aceder ao relatório completo.",
    type: "text",
    department: "Finanças",
    timestamp: "há 1 dia",
    likes: 28,
    comments: 5,
    liked: false,
    tags: ["Finanças", "Relatório"],
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Criar briefing da campanha de Verão",
    description: "Definir objetivos, target e abordagem criativa para a campanha de Verão 2026",
    assignee: users[1],
    department: "Marketing",
    priority: "high",
    status: "inprogress",
    dueDate: "2026-03-15",
    tags: ["Campanha", "Verão"],
    progress: 60,
  },
  {
    id: "t2",
    title: "Revisão de contratos Q1",
    description: "Analisar e actualizar todos os contratos que vencem no primeiro trimestre",
    assignee: users[5],
    department: "Finanças",
    priority: "urgent",
    status: "todo",
    dueDate: "2026-03-10",
    tags: ["Contratos", "Q1"],
    progress: 0,
  },
  {
    id: "t3",
    title: "Implementar autenticação SSO",
    description: "Integrar Single Sign-On com o sistema de RH existente",
    assignee: users[2],
    department: "TI",
    priority: "high",
    status: "review",
    dueDate: "2026-03-20",
    tags: ["SSO", "Segurança"],
    progress: 85,
  },
  {
    id: "t4",
    title: "Onboarding Rafael Lima",
    description: "Completar processo de integração do novo colaborador do departamento de TI",
    assignee: users[3],
    department: "RH",
    priority: "medium",
    status: "inprogress",
    dueDate: "2026-03-12",
    tags: ["Onboarding", "TI"],
    progress: 45,
  },
  {
    id: "t5",
    title: "Análise de pipeline de vendas Q1",
    description: "Avaliar estado do pipeline e identificar oportunidades para fechar em Março",
    assignee: users[4],
    department: "Vendas",
    priority: "high",
    status: "inprogress",
    dueDate: "2026-03-08",
    tags: ["Pipeline", "Q1"],
    progress: 70,
  },
  {
    id: "t6",
    title: "Actualizar manual de processos",
    description: "Documentar novos processos operacionais após a reestruturação de Fevereiro",
    assignee: users[6],
    department: "Operações",
    priority: "low",
    status: "todo",
    dueDate: "2026-03-30",
    tags: ["Processos", "Documentação"],
    progress: 0,
  },
  {
    id: "t7",
    title: "Relatório mensal de analytics",
    description: "Compilar dados de performance das campanhas de Fevereiro",
    assignee: users[1],
    department: "Marketing",
    priority: "medium",
    status: "done",
    dueDate: "2026-03-05",
    tags: ["Analytics", "Relatório"],
    progress: 100,
  },
  {
    id: "t8",
    title: "Migração de dados para novo servidor",
    description: "Planear e executar migração segura de base de dados para nova infraestrutura",
    assignee: users[2],
    department: "TI",
    priority: "urgent",
    status: "todo",
    dueDate: "2026-03-18",
    tags: ["Migração", "Infraestrutura"],
    progress: 15,
  },
];

export const projects: Project[] = [
  {
    id: "pr1",
    name: "Campanha Primavera 2026",
    description: "Campanha de marketing integrada para a temporada de Primavera",
    department: "Marketing",
    progress: 68,
    members: [users[1], users[2], users[4]],
    dueDate: "2026-04-01",
    status: "active",
    tasksTotal: 12,
    tasksDone: 8,
    color: "#F59E0B",
  },
  {
    id: "pr2",
    name: "Plataforma SocialColab v2",
    description: "Desenvolvimento da nova versão da plataforma com IA integrada",
    department: "TI",
    progress: 42,
    members: [users[2], users[0], users[3]],
    dueDate: "2026-06-30",
    status: "active",
    tasksTotal: 34,
    tasksDone: 14,
    color: "#06B6D4",
  },
  {
    id: "pr3",
    name: "Programa de Onboarding Digital",
    description: "Criação de programa de integração digital para novos colaboradores",
    department: "RH",
    progress: 85,
    members: [users[3], users[1]],
    dueDate: "2026-03-20",
    status: "active",
    tasksTotal: 8,
    tasksDone: 7,
    color: "#2563EB",
  },
  {
    id: "pr4",
    name: "Expansão Mercado Norte",
    description: "Estratégia de vendas para expansão na região norte do país",
    department: "Vendas",
    progress: 30,
    members: [users[4], users[0], users[1]],
    dueDate: "2026-07-01",
    status: "active",
    tasksTotal: 20,
    tasksDone: 6,
    color: "#EF4444",
  },
  {
    id: "pr5",
    name: "Optimização de Processos Logísticos",
    description: "Redução de custos operacionais através da optimização de rotas e stock",
    department: "Logística",
    progress: 100,
    members: [users[6], users[5]],
    dueDate: "2026-02-28",
    status: "completed",
    tasksTotal: 15,
    tasksDone: 15,
    color: "#84CC16",
  },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    user: users[0],
    lastMessage: "Excelente trabalho na apresentação de ontem!",
    lastTime: "14:32",
    unread: 2,
  },
  {
    id: "c2",
    user: users[2],
    lastMessage: "O deploy para produção está pronto",
    lastTime: "13:15",
    unread: 0,
  },
  {
    id: "c3",
    user: users[3],
    lastMessage: "Podes confirmar a disponibilidade para a reunião de segunda?",
    lastTime: "11:48",
    unread: 1,
  },
  {
    id: "c4",
    user: users[4],
    lastMessage: "Fechámos o contrato com a Empresa ABC! 🎉",
    lastTime: "10:20",
    unread: 0,
  },
  {
    id: "c5",
    user: users[5],
    lastMessage: "O relatório financeiro está aprovado",
    lastTime: "09:05",
    unread: 0,
  },
  {
    id: "c6",
    user: users[6],
    lastMessage: "Preciso de apoio com o processo de inventário",
    lastTime: "Ontem",
    unread: 0,
  },
];

export const ideas: Idea[] = [
  {
    id: "i1",
    title: "Programa de Mentoria Interna",
    description: "Criar um programa onde colaboradores sénior mentoram os mais júnior. Sessões mensais de 1h focadas em desenvolvimento de carreira e competências técnicas.",
    author: users[3],
    category: "Cultura",
    votes: 89,
    voted: true,
    status: "approved",
    timestamp: "há 3 dias",
    comments: 24,
  },
  {
    id: "i2",
    title: "Dashboard de Bem-Estar Organizacional",
    description: "Implementar inquéritos semanais anónimos de 3 perguntas para monitorizar o clima organizacional em tempo real e detectar problemas precocemente.",
    author: users[1],
    category: "Tecnologia",
    votes: 67,
    voted: false,
    status: "review",
    timestamp: "há 5 dias",
    comments: 18,
  },
  {
    id: "i3",
    title: "Horário Flexível para Tech Team",
    description: "Permitir que a equipa de TI trabalhe em horário flexível (7h-20h) desde que cumpra as 8h diárias. Aumenta produtividade e satisfação.",
    author: users[2],
    category: "Processo",
    votes: 112,
    voted: true,
    status: "implemented",
    timestamp: "há 2 semanas",
    comments: 45,
  },
  {
    id: "i4",
    title: "Plataforma de Aprendizagem Interna",
    description: "Criar uma biblioteca digital de cursos e tutoriais criados pelos próprios colaboradores. Cada colaborador poderia partilhar o seu conhecimento.",
    author: users[4],
    category: "Produto",
    votes: 54,
    voted: false,
    status: "submitted",
    timestamp: "há 1 semana",
    comments: 12,
  },
  {
    id: "i5",
    title: "Reuniões de 25 minutos",
    description: "Adoptar o modelo de reuniões de 25 minutos (em vez de 30) para dar tempo de transição entre reuniões e aumentar a eficiência.",
    author: users[6],
    category: "Processo",
    votes: 78,
    voted: false,
    status: "approved",
    timestamp: "há 4 dias",
    comments: 31,
  },
];

export const recognitions: Recognition[] = [
  {
    id: "r1",
    from: users[0],
    to: users[1],
    message: "Pela campanha de Primavera incrível! A criatividade e dedicação são um exemplo para todos nós. 🌸",
    badge: "🌟 Excelência",
    timestamp: "há 1 hora",
  },
  {
    id: "r2",
    from: users[3],
    to: users[2],
    message: "O João resolveu o problema de segurança em tempo recorde e salvou o projeto. Obrigado por ir além! 💪",
    badge: "⚡ Super Herói",
    timestamp: "há 4 horas",
  },
  {
    id: "r3",
    from: users[1],
    to: users[4],
    message: "Parabéns pela meta histórica! A vossa equipa é inspiradora. 120% é inacreditável! 🏆",
    badge: "🏆 Top Performer",
    timestamp: "há 1 dia",
  },
  {
    id: "r4",
    from: users[2],
    to: users[3],
    message: "A Mariana fez o onboarding mais cuidadoso e estruturado que já vi. Os novos colaboradores adoraram! ❤️",
    badge: "❤️ Coração de Ouro",
    timestamp: "há 2 dias",
  },
];

export const events: Event[] = [
  {
    id: "ev1",
    title: "Reunião de Equipa — Marketing",
    description: "Review semanal de campanhas e planeamento da semana",
    date: "2026-03-08",
    time: "14:00",
    department: "Marketing",
    attendees: 8,
    type: "meeting",
    organizer: users[1],
  },
  {
    id: "ev2",
    title: "Town Hall Trimestral",
    description: "Apresentação de resultados Q1 e estratégia para Q2 com toda a empresa",
    date: "2026-03-15",
    time: "10:00",
    department: "Direção",
    attendees: 134,
    type: "event",
    organizer: users[0],
  },
  {
    id: "ev3",
    title: "Formação: Excel Avançado",
    description: "Workshop de Excel e Power BI para equipas de gestão",
    date: "2026-03-12",
    time: "09:00",
    department: "RH",
    attendees: 24,
    type: "training",
    organizer: users[3],
  },
  {
    id: "ev4",
    title: "Sprint Review — Projecto SocialColab v2",
    description: "Apresentação dos resultados do Sprint 4 e planeamento do Sprint 5",
    date: "2026-03-09",
    time: "15:30",
    department: "TI",
    attendees: 6,
    type: "meeting",
    organizer: users[2],
  },
  {
    id: "ev5",
    title: "Deadline: Relatório Financeiro Q1",
    description: "Data limite para entrega do relatório financeiro do primeiro trimestre",
    date: "2026-03-31",
    time: "18:00",
    department: "Finanças",
    attendees: 0,
    type: "deadline",
    organizer: users[5],
  },
];

export const stats = {
  totalCollaborators: 134,
  activeProjects: 28,
  tasksCompletedThisWeek: 47,
  newIdeasThisMonth: 23,
  avgProductivity: 87,
  messagesExchanged: 1842,
};
