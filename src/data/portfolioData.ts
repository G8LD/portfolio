// ============================================================
//  portfolioData.ts – Single source of truth for the portfolio
//  Edit this file to update any section of the site.
// ============================================================

export type Lang = 'en' | 'fr';

// ── 1. IDENTITY ──────────────────────────────────────────────
export const identity = {
  name: 'Steven Yang',
  initials: 'SY',
  role: {
    en: 'Full-Stack Software Engineer',
    fr: 'Ingénieur Développement Full-Stack',
  },
  tagline: {
    en: "5th-year apprentice at ESIEA - building robust, scalable software at BPCE-IT.",
    fr: "Apprenti 5ème année à l'ESIEA - développement de logiciels robustes et scalables chez BPCE-IT.",
  },
  availability: {
    en: 'Open to CDI opportunities',
    fr: 'Ouvert aux opportunités CDI',
  },
  location: 'Paris, France',
  timezone: 'Europe/Paris',

  // Social links
  github: 'https://github.com/G8LD',
  linkedin: 'https://www.linkedin.com/in/steven-yang-sy/',

  // Contact form endpoint (Formspree)
  contactEndpoint: 'https://formspree.io/f/mdeenbgw',

  // Personal interests shown in the "Beyond Code" sidebar card
  interests: [
    { en: 'Video Games', fr: 'Jeux vidéo', icon: '🎮' },
    { en: 'Cinema',      fr: 'Cinéma',     icon: '🎬' },
    { en: 'Hiking',      fr: 'Randonnée',  icon: '🥾' },
  ],
} as const;

// ── 2. NAV SECTIONS ──────────────────────────────────────────
export const navSections = [
  { id: 'about',      label: { en: 'About',      fr: 'À propos'  } },
  { id: 'experience', label: { en: 'Experience',  fr: 'Expérience'} },
  { id: 'projects',   label: { en: 'Projects',    fr: 'Projets'   } },
  { id: 'skills',     label: { en: 'Skills',      fr: 'Compétences'} },
  { id: 'education',  label: { en: 'Education',   fr: 'Formation' } },
  { id: 'contact',    label: { en: 'Contact',     fr: 'Contact'   } },
] as const;

// ── 3. ABOUT ─────────────────────────────────────────────────
export const about = {
  en: `I'm a 5th-year Software Engineering apprentice at ESIEA (Engineering school) with 3+ years of hands-on industry experience at BPCE Infogérance & Technologies - one of France's largest banking IT groups.

I specialise in full-stack development and network automation, having designed and shipped production-grade features using Python/Django and Typescript/Angular. I thrive at the intersection of software craftsmanship and scalable system design.`,
  fr: `Apprenti ingénieur logiciel en 5ème année à l'ESIEA (École d'Ingénieurs) avec plus de 3 ans d'expérience en entreprise chez BPCE Infogérance & Technologies - l'un des plus grands groupes IT bancaires de France.

Je me spécialise dans le développement full-stack et l'automatisation réseau, ayant conçu et livré des fonctionnalités de niveau production avec Python/Django et Typescript/Angular. Je m'épanouis à l'intersection du craft logiciel et de la conception de systèmes scalables.`,
};

// ── 4. EXPERIENCE ────────────────────────────────────────────
export interface ExperienceEntry {
  company: string;
  companyUrl?: string;
  role: { en: string; fr: string };
  period: { en: string; fr: string };
  location: string;
  type: { en: string; fr: string };
  bullets: { en: string[]; fr: string[] };
  tags: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    company: 'BPCE Infogérance & Technologies',
    companyUrl: 'https://www.bpce-it.fr',
    role: {
      en: 'Apprentice Software Engineer - Network Automation',
      fr: 'Ingénieur Développement Alternant - Automatisation Réseau',
    },
    period: { en: 'Sep 2024 – Present', fr: 'Sep 2024 – Présent' },
    location: 'Paris, France',
    type: { en: 'Apprenticeship - ESIEA', fr: 'Alternance - ESIEA' },
    bullets: {
      en: [
        'Designed and built an end-to-end Cisco PnP zero-touch provisioning platform targeting a fleet of 9,000+ switches across all BPCE banking agencies.',
        'Engineers create provisioning workflows via an Angular portal, which seed device data into Nautobot; once a switch is plugged in, it auto-receives a minimal bootstrap config via PnP and Nautobot Golden Config (Jinja2 templates).',
        'Implemented a conditional step-validation system: specific workflow stages require engineer sign-off before the next step fires, triggering a Nautobot SSH job that pushes the full production config.',
      ],
      fr: [
        'Conception et développement d\'une plateforme de provisionnement zero-touch Cisco PnP couvrant plus de 9 000 switches sur l\'ensemble des agences du groupe BPCE.',
        'Les ingénieurs créent des workflows de provisionnement via un portail Angular, qui alimentent les données d\'équipements dans Nautobot ; au démarrage du switch, il reçoit automatiquement une configuration minimale via PnP et Nautobot Golden Config (templates Jinja2).',
        'Mise en place d\'un système de validation d\'étapes conditionnel : certaines étapes du workflow requièrent la validation d\'un ingénieur avant de déclencher l\'étape suivante, qui lance un job Nautobot envoyant la configuration complète en production via SSH.',
      ],
    },
    tags: ['Python', 'Django Ninja', 'Nautobot', 'Cisco PnP', 'Jinja2', 'TypeScript', 'Angular', 'PostgreSQL'],
  },
  {
    company: 'BPCE Infogérance & Technologies',
    companyUrl: 'https://www.bpce-it.fr',
    role: {
      en: 'Apprentice Software Engineer - Network Automation',
      fr: 'Ingénieur Développement Alternant - Automatisation Réseau',
    },
    period: { en: 'Sep 2023 – Aug 2024', fr: 'Sep 2023 – Août 2024' },
    location: 'Paris, France',
    type: { en: 'Apprenticeship - IUT de Montreuil', fr: 'Alternance - IUT de Montreuil' },
    bullets: {
      en: [
        'Engineered a Nautobot plugin (Django, Python) for automatic collection of Virtual IP data from load balancers, storing it reliably in the Nautobot data model.',
        'Built and maintained Nautobot automation jobs to manage, synchronise, and ensure accuracy of the network device inventory.',
        'Contributed to an Angular frontend application improving the display and navigation of network data within the Nautobot ecosystem.',
      ],
      fr: [
        'Développement d\'un plugin Nautobot (Django, Python) pour la collecte automatique des VIP depuis les load balancers et leur stockage dans le modèle de données Nautobot.',
        'Création et maintenance de jobs d\'automatisation Nautobot pour gérer, synchroniser et garantir l\'exactitude de l\'inventaire des équipements réseau.',
        'Contribution à une application frontend Angular améliorant l\'affichage et la navigation des données réseau dans l\'écosystème Nautobot.',
      ],
    },
    tags: ['Python', 'Django', 'Nautobot', 'TypeScript', 'Angular', 'PostgreSQL'],
  },
  {
    company: 'BPCE Infogérance & Technologies',
    companyUrl: 'https://www.bpce-it.fr',
    role: {
      en: 'Software development Intern - Network Tooling',
      fr: 'Stagiaire Développement d\'application - Outillage Réseau',
    },
    period: { en: 'Apr 2023 – Jul 2023', fr: 'Avr 2023 – Juil 2023' },
    location: 'Paris, France',
    type: { en: 'Internship - IUT de Montreuil', fr: 'Stage - IUT de Montreuil' },
    bullets: {
      en: [
        'Developed and maintained custom Python drivers for the NAPALM library, enabling standardised configuration management and data retrieval across diverse multi-vendor network hardware.',
        'Created Centreon plugins to collect, process, and analyse critical infrastructure and application metrics, improving system visibility and enabling proactive alerting.',
      ],
      fr: [
        'Développement et maintenance de drivers Python personnalisés pour la bibliothèque NAPALM, permettant une gestion standardisée de la configuration et la collecte de données sur des équipements réseau multi-constructeurs.',
        'Création de plugins Centreon pour collecter, traiter et analyser des métriques critiques d\'infrastructure et d\'application, améliorant la visibilité système et les capacités d\'alerting proactif.',
      ],
    },
    tags: ['Python', 'NAPALM', 'Centreon', 'Networking'],
  },
];

// ── 5. PROJECTS ──────────────────────────────────────────────
export type ProjectCategory = 'personal' | 'academic' | 'professional';

export interface ProjectEntry {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  subtitle: { en: string; fr: string };
  description: { en: string; fr: string };
  architecture: { en: string; fr: string };
  challenges: { en: string[]; fr: string[] };
  tags: string[];
  image?: string;
  repoUrl?: string;
  demoUrl?: string;
  playUrl?: string;
}

export const projectCategoryLabels: Record<ProjectCategory, { en: string; fr: string }> = {
  personal: { en: 'Personal', fr: 'Personnel' },
  academic: { en: 'Academic', fr: 'Académique' },
  professional: { en: 'Professional', fr: 'Professionnel' },
};

export const projects: ProjectEntry[] = [
  {
    id: 'clap',
    title: 'Clap',
    category: 'personal',
    year: '2025',
    subtitle: {
      en: 'Random Film Picker',
      fr: 'Sélecteur de Films Aléatoire',
    },
    description: {
      en: 'A web app that picks a random film from TMDB based on your filters (genre, rating, release year, runtime, country). Keeps a watch history, deep-links to a chosen film, and plays trailers in a modal.',
      fr: 'Application web qui tire un film au hasard depuis TMDB selon vos filtres (genre, note, année, durée, pays). Conserve un historique, propose un lien direct vers un film choisi et lit les bandes-annonces dans une modale.',
    },
    architecture: {
      en: 'Next.js 15 (App Router) deployed to Cloudflare Workers via OpenNext. Server-side Route Handlers proxy the TMDB API so the token never reaches the client; filters are URL-synced and debounced; history is persisted in localStorage. UI built with MUI; images optimised through the Cloudflare Images binding.',
      fr: 'Next.js 15 (App Router) déployé sur Cloudflare Workers via OpenNext. Des Route Handlers côté serveur relaient l\'API TMDB pour que le token ne touche jamais le client ; les filtres sont synchronisés dans l\'URL et debouncés ; l\'historique est persisté en localStorage. Interface construite avec MUI ; images optimisées via le binding Cloudflare Images.',
    },
    challenges: {
      en: [
        'Keeping the TMDB token server-side by proxying every request through local API routes.',
        'Picking a genuinely random, not-yet-seen film from TMDB\'s paginated discover endpoint, with a fallback once every match has been shown.',
        'Making the filters shareable via the URL while debouncing updates to avoid request spam.',
      ],
      fr: [
        'Garder le token TMDB côté serveur en relayant chaque requête via des routes API locales.',
        'Tirer un film réellement aléatoire et non déjà vu depuis l\'endpoint discover paginé de TMDB, avec un repli une fois tous les films parcourus.',
        'Rendre les filtres partageables via l\'URL tout en debouncant les mises à jour pour éviter les requêtes superflues.',
      ],
    },
    tags: ['Next.js', 'TypeScript', 'MUI', 'Cloudflare Workers', 'TMDB API'],
    repoUrl: 'https://github.com/G8LD/clap',
    demoUrl: 'https://clap.dash-cloudflare-com-epilogue708.workers.dev',
  },
  {
    id: 'copi',
    title: 'Copi',
    category: 'personal',
    year: '2026',
    subtitle: {
      en: '2D Platformer & Puzzle Game',
      fr: 'Jeu de plateforme & puzzle 2D',
    },
    description: {
      en: 'A 2D puzzle-platformer video game developed with Godot Engine and GDScript. Features physics-based puzzles, interactive triggers, level transitions, and custom game mechanics.',
      fr: 'Jeu vidéo de réflexion et plateforme 2D développé avec Godot Engine et GDScript. Énigmes basées sur la physique, mécanismes interactifs (boutons, portes, pièges), transitions de niveaux et mécaniques personnalisées.',
    },
    architecture: {
      en: 'Engineered with Godot 4. Modular node and scene tree separating level scenes, interactive game objects (doors, pressure buttons, fall detectors), player state machine, and dynamic pause/level menus. Exported to WebAssembly/HTML5 for instant in-browser play.',
      fr: 'Conçu avec Godot 4. Architecture modulaire en arbre de scènes séparant niveaux, objets interactifs (portes, boutons poussoirs, détecteurs de chute), machine à états du joueur et menus de pause/sélection. Exporté en WebAssembly/HTML5 pour jouer directement dans le navigateur.',
    },
    challenges: {
      en: [
        'Fine-tuning 2D character physics, jump curves, and collision shapes for responsive platforming controls.',
        'Architecting reusable scene templates for rapid level design and clean separation of concerns.',
        'Compiling and optimizing assets for smooth zero-install WebAssembly execution on the web.',
      ],
      fr: [
        'Ajustement fin de la physique 2D, des courbes de saut et des masques de collision pour un contrôle réactif.',
        'Conception de templates de scènes réutilisables pour le level design et une séparation claire des responsabilités.',
        'Compilation et optimisation des assets pour une exécution WebAssembly fluide sans installation dans le navigateur.',
      ],
    },
    tags: ['Godot', 'GDScript', 'Game Dev'],
    image: '/images/projects/copi.png',
    playUrl: '/games/copi/index.html',
    repoUrl: 'https://github.com/G8LD/copi',
    demoUrl: '',
  },
  {
    id: 'uniride',
    title: 'UniRide',
    category: 'academic',
    year: '2024',
    subtitle: {
      en: 'Carpooling Platform',
      fr: 'Plateforme de Covoiturage',
    },
    description: {
      en: 'A full-stack carpooling application built for university students, designed with a architecture. Handles real-time ride matching, booking, and user notifications.',
      fr: "Application de covoiturage full-stack conçue pour les étudiants universitaires. Gère le matching de trajets en temps réel, la réservation et les notifications.",
    },
    architecture: {
      en: 'React frontend → API Gateway → independent (Users, Rides, Notifications) → PostgreSQL databases per service. Containerised with Docker Compose for local development and deployed with a CI/CD pipeline.',
      fr: "Frontend React → API Gateway → indépendants (Utilisateurs, Trajets, Notifications) → bases PostgreSQL par service. Conteneurisé avec Docker Compose en développement local et déployé via pipeline CI/CD.",
    },
    challenges: {
      en: [
        'Designing a clean bounded-context architecture across multiple independent services.',
        'Implementing real-time availability updates without WebSocket complexity using efficient polling strategies.',
        'Coordinating database schema migrations across services in a team of 4.',
      ],
      fr: [
        'Conception d\'une architecture à contextes bornés propres sur plusieurs services indépendants.',
        'Implémentation de mises à jour de disponibilité en temps réel sans complexité WebSocket grâce à des stratégies de polling efficaces.',
        'Coordination des migrations de schéma de base de données entre services dans une équipe de 4.',
      ],
    },
    tags: ['Python', 'Flask', 'Typescript', 'Angular', 'PostgreSQL'],
    image: '/images/projects/uniride.png',
    repoUrl: 'https://github.com/G8LD',
    demoUrl: '',
  },
  {
    id: 'letyran',
    title: 'Le Tyran',
    category: 'academic',
    year: '2023',
    subtitle: {
      en: '2D Action-Adventure RPG in Java',
      fr: 'Jeu d’Aventure RPG 2D en Java',
    },
    description: {
      en: 'A top-down 2D action-adventure RPG game developed in Java with JavaFX. Features a tilemap rendering engine, inventory and crafting systems, collision detection, sprite animations, NPC dialogue, and combat against multiple enemy types.',
      fr: 'Jeu d’action-aventure RPG 2D en vue du dessus développé en Java avec JavaFX. Intègre un moteur de tuiles (tilemaps), un système complet d’inventaire et de fabrication (crafting), gestion des collisions, animations de sprites, dialogues avec les PNJ et combats contre différents types d’ennemis.',
    },
    architecture: {
      en: 'Structured with strict MVC (Model-View-Controller) architecture using Java 17+ modules. Core game loop and business logic (entities, inventory, craft, physics) are completely decoupled from JavaFX rendering and FXML scenes.',
      fr: 'Architecture MVC rigoureuse (Modèle-Vue-Contrôleur) avec modules Java 17+. La boucle de jeu et la logique métier (entités, inventaire, artisanat, physique) sont strictement découplées du rendu JavaFX et des scènes FXML.',
    },
    challenges: {
      en: [
        'Developing an efficient 2D tilemap renderer with multiple depth layers (ground, decor, obstacles).',
        'Implementing clean decoupled MVC interactions allowing gameplay features to scale independently from UI views.',
        'Handling real-time player states, collisions, animations, and crafting inventories.',
      ],
      fr: [
        'Développement d’un moteur de tuiles 2D avec plusieurs couches de profondeur (sol, décors, obstacles).',
        'Mise en place d’un modèle MVC découplé permettant de faire évoluer le gameplay indépendamment des vues.',
        'Gestion en temps réel des états du joueur, des collisions, des animations de sprites et de l’inventaire.',
      ],
    },
    tags: ['Java', 'JavaFX', 'Game Dev'],
    image: '/images/projects/letyran.png',
    repoUrl: 'https://github.com/G8LD/LeTyran',
    demoUrl: '',
  },
];

// ── 6. SKILLS ────────────────────────────────────────────────
export interface SkillCategory {
  label: { en: string; fr: string };
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: { en: 'Languages', fr: 'Langages' },
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: { en: 'Databases', fr: 'Bases de données' },
    skills: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: { en: 'Backend & Automation', fr: 'Backend & Automatisation' },
    skills: ['Django', 'Django RF', 'Django Ninja', 'FastAPI', 'Nautobot', 'NAPALM', 'GraphQL'],
  },
  {
    label: { en: 'Frontend', fr: 'Frontend' },
    skills: ['React', 'Angular', 'Next.js', 'Vue.js'],
  },
];

// ── 7. EDUCATION ─────────────────────────────────────────────
export interface EducationEntry {
  institution: string;
  degree: { en: string; fr: string };
  period: string;
  location: string;
}

export const education: EducationEntry[] = [
  {
    institution: 'ESIEA - École Supérieure d\'Informatique, Électronique, Automatique',
    degree: {
      en: "Master's degree in Software Engineering",
      fr: "Diplôme d'Ingénieur en Informatique",
    },
    period: '2024 – Present',
    location: 'Paris, France',
  },
  {
    institution: 'IUT de Montreuil - Université Paris 8',
    degree: {
      en: 'Bachelor of Technology in Computer Science',
      fr: 'BUT Informatique',
    },
    period: '2021 – 2024',
    location: 'Montreuil, France',
  },
  {
    institution: 'Lycée Diderot',
    degree: {
      en: 'French Baccalaureate - Sciences & Technology',
      fr: 'Baccalauréat Général',
    },
    period: '2017 – 2020',
    location: 'Paris, France',
  },
];

// ── 8. CONTACT LABELS ────────────────────────────────────────
export const contactLabels = {
  title: { en: 'Get in touch', fr: 'Me contacter' },
  subtitle: {
    en: "Have an opportunity or just want to say hi? Send me a message - I'll get back to you promptly.",
    fr: "Une opportunité ou juste envie de discuter ? Envoyez-moi un message - je vous répondrai rapidement.",
  },
  namePlaceholder: { en: 'Your name', fr: 'Votre nom' },
  emailPlaceholder: { en: 'Your email', fr: 'Votre e-mail' },
  messagePlaceholder: { en: 'Your message…', fr: 'Votre message…' },
  sendButton: { en: 'Send message', fr: 'Envoyer' },
  sendingButton: { en: 'Sending…', fr: 'Envoi en cours…' },
  successMessage: {
    en: "Message sent! I'll be in touch soon.",
    fr: 'Message envoyé ! Je vous répondrai bientôt.',
  },
  errorMessage: {
    en: 'Something went wrong. Please try again or reach out on LinkedIn.',
    fr: "Une erreur est survenue. Veuillez réessayer ou me contacter sur LinkedIn.",
  },
  orConnect: { en: 'Or connect directly:', fr: 'Ou connectez-vous directement :' },
};
