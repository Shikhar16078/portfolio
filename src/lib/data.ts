// data.ts

import { Github, Linkedin } from 'lucide-react';

export const personalData = {
  name: 'Shikhar Kumar',
  title: "Software Engineer",
  bio: "Software engineer focused on backend, distributed systems, and applied AI, with 3+ years of experience building production systems across .NET, Python, and AWS.",
  degree: 'M.S. in Computer Science from UC Riverside',
  workAuthorization: {
    status: 'Authorized to work in the US on F-1 OPT',
    note: 'Eligible for 24-month STEM extension',
  },
  email: 'skuma154@ucr.edu',
  phone: '+1 (951) 377-2505',
  resumeUrl: 'https://drive.google.com/file/d/1501D5LMF1nKlSaEdqiZAyJysep-V2r31/view?usp=sharing',
  linkedinRecommendationsUrl: 'https://www.linkedin.com/in/shikhar1999/details/recommendations/?detailScreenTabIndex=0',
};

export const summaryData = {
  intro: 'I am a Software Engineer at Translation Commons with an M.S. in Computer Science from UC Riverside and 3+ years of experience building production backends.',
  work: "I'm currently helping build a PostgreSQL and Python ETL backend for a language data application at Translation Commons. Before that, I designed an agentic AI course-planning platform on Google ADK with Google and UCR, and spent nearly three years at Nagarro building event-driven microservices on .NET Core and AWS that processed 10,000 events/sec.",
  skills: 'My core stack includes Python, C#, TypeScript, PostgreSQL, AWS, and React, along with LLMs, RAG, and agentic AI frameworks like Google ADK.',
  closing: 'I enjoy building reliable, scalable systems and applying AI to real-world problems.',
};

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shikhar1999/', icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com/Shikhar16078', icon: Github },
];

export const projectsData = [
  {
    title: 'Reddit Search Engine',
    date: 'Winter 2025',
    description: [
        'Built a search engine over 100K+ Reddit posts by crawling data with PRAW API and indexing with PyLucene.',
        'Designed a Flask web app for querying and displaying results with sub-second response times.'
    ],
    technologies: ['Python', 'PRAW', 'PyLucene', 'Flask'],
    icon: '/assets/images/reddit.png',
    type: 'Academic',
    github: 'https://github.com/Shikhar16078/reddit-search-engine',
  },
  {
    title: 'IMDB Reviews Analysis',
    date: 'Spring 2025',
    description: [
        'Conducted sentiment analysis on 50K+ IMDB reviews using Apache Spark.',
        'Built a Flask web application with real-time querying and visualization, backed by a PostgreSQL database in Docker.'
    ],
    technologies: ['Apache Spark', 'PostgreSQL', 'Docker', 'Flask'],
    icon: '/assets/images/imdb.png',
    type: 'Academic',
  },
  {
    title: 'Dailymotion ABR Analysis',
    date: 'Fall 2025',
    description: [
      'Conducted experiments to study how Adaptive Bitrate (ABR) streaming works on Dailymotion under varying network conditions.',
      'Traced and analyzed network logs across controlled bandwidth profiles such as 1.5 Mbps, 5 Mbps, and 20 Mbps to observe bitrate adaptation behavior.'
    ],
    technologies: [
      'MITM Proxy',
      'Apple\'s NLC',
      'Python'
    ],
    icon: '/assets/images/abr.png',
    type: 'Academic',
  },
  {
    title: 'Portfolio Website',
    date: 'Summer 2025',
    description: [
      'Built a personal portfolio web application using React.js and Next.js.',
      'Configured GitHub Pages for deployment and automated the hosting process.',
    ],
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Github'],
    icon: '/assets/images/website.png',
    type: 'Personal',
    github: 'https://github.com/Shikhar16078/portfolio',
  },
  {
    title: 'Snipper',
    date: 'Winter – Spring 2026',
    description: [
      'Shipped a production-ready cross-platform desktop app for storing, tagging, and instantly searching frequently used text, with folder organization and bulk multi-select built in.',
      'Delivered 4 public releases by owning the full release cycle, shipping a self-updating installer and integrating Google OAuth and the Drive API for secure cloud sync of user data.',
    ],
    technologies: ['Electron', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Google OAuth', 'Drive API'],
    icon: '/assets/images/snipper.png',
    type: 'Personal',
    github: 'https://github.com/Shikhar16078/Snipper',
  }
];


export const educationData = [
  {
    degree: 'M.S. in Computer Science',
    institution: 'University of California, Riverside',
    period: 'Sept 2024 – Dec 2025',
    gpa: 'GPA: 3.95/4.00',
    description:
      'Even though I was a highly appreciated member of my team at Nagarro, I felt the need to further enhance my skills and deepen my understanding of advanced Computer Science concepts. This led me to pursue a Master of Science in Computer Science at the University of California, Riverside after nearly three years of industry experience. At UCR, I have explored Artificial Intelligence, Machine Learning, Natural Language Processing, Design and Analysis of Algorithms, Distributed Systems, Databases and other fascinating areas of Computer Science. This degree has strengthened my foundations in Computer Science and continues to support my growth as I move forward in my career.',
    website: 'https://www.ucr.edu/',
    courses: [
      'Design and Analysis of Algorithms',
      'Artificial Intelligence',
      'Machine Learning',
      'Introduction to Natural Language Processing',
      'Distributed Systems',
      'Advanced Database Management Systems',
      'Advanced Computer Networks'
    ],
    icon: '/assets/images/ucr.png',
  },
  {
    degree: 'B.Tech. in Information Technology',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University, India',
    period: 'Aug 2016 – Sept 2020',
    gpa: 'CGPA: 7.47/10.00',
    description: 'With a passion for engineering after completing my 12th grade, I joined Inderprastha Engineering College, affiliated with Dr. A.P.J. Abdul Kalam Technical University. During my time there, I developed a strong foundation in Computer Science fundamentals, which enabled me to secure three job offers by the end of my bachelor’s degree, ultimately leading me to join Nagarro as an Associate Software Engineer. I am grateful to my professors and mentors for their guidance in shaping my journey as a Computer Science student.',
    website: 'https://aktu.ac.in/',
    courses: [
      'Data Structures & Algorithms',
      'Object-Oriented Techniques',
      'Operating Systems',
      'Web Technology',
      'Software Engineering',
    ],
    icon: '/assets/images/aktu.png',
  },
];

export const awardsData = [
  {
    title: 'Star of the Month',
    issuer: 'Nagarro',
    date: 'Mar 2021 – Sept 2022',
    description: 'Recognized quarterly as the most impactful software engineer on the team.',
    icon: '/assets/images/nagarro.jpg',
  },
  {
    title: 'UCR Data Science Fellowship',
    issuer: 'University of California, Riverside',
    date: 'Summer 2025',
    description: 'Awarded a fellowship for strong academic performance and potential in computer science.',
    icon: '/assets/images/ucr.png',
  },
  {
    title: 'Mentorship Recognition',
    issuer: 'Nagarro',
    date: 'Jan 2021 – Sept 2022',
    description: 'Conducted monthly mentorship sessions to guide junior engineers in best practices and project work.',
    icon: '/assets/images/nagarro.jpg',
  },
  {
    title: 'Grader',
    issuer: 'University of California, Riverside',
    date: 'Spring 2025 – Fall 2025',
    description: 'Hired twice for effectively grading "CS141: Intermediate Data Structures and Algorithms", ensuring precise evaluation of assignments, quizzes, and exams.',
    icon: '/assets/images/ucr.png',
  },  
];


export const experienceData = [
  {
    role: 'Software Engineer',
    company: 'Translation Commons',
    period: 'June 2026 – Present',
    icon: '/assets/images/langnav.png',
    summary: 'I own the PostgreSQL and Python ETL backend that is replacing a heavy browser-side TSV pipeline for language, locale, and territory data.',
    highlights: [
      { value: 'Up to 125 MB', label: 'less browser memory as data processing moves to the backend' },
      { value: 'Backend owner', label: 'PostgreSQL, ETL, and APIs built to power the entire frontend' },
      { value: 'Full-stack fixes', label: 'GitHub issues and UI bugs resolved across the React app' },
    ],
    stack: ['Python', 'PostgreSQL', 'Supabase', 'PostgREST', 'ETL', 'TypeScript', 'React'],
    description: `At Translation Commons, I work on a frontend application built around language, locale, and territory data. Today, the app loads all of this data from flat TSV files and processes it in the browser, which puts a heavy load on client-side memory.

    I am focused on building a backend to replace it: a PostgreSQL database on Supabase with a relational schema and materialized views that reconcile conflicting source datasets, a Python ETL pipeline to load the data, and PostgREST APIs so the frontend can query only what it needs instead of downloading everything up front.`,
    responsibilities: [
      'Cutting client-side heap usage by up to 125 MB by moving a heavy browser-side fetch pipeline into a queryable PostgreSQL database on Supabase, loaded by a Python ETL pipeline.',
      'Own the backend that will power the entire frontend, from database architecture and ETL to the APIs the app consumes.',
      'Replacing flat TSV lookups with fast, queryable access to language, locale, and territory data through a relational schema and materialized views that reconcile conflicting source datasets.',
      'Building PostgREST APIs that give the frontend structured, on-demand data access.',
      'Resolving GitHub issues and fixing UI bugs across the TypeScript, React, and Tailwind CSS frontend.',
    ],
  },
  {
    role: 'Agentic Software Engineer',
    company: 'University of California, Riverside',
    period: 'June 2025 – Aug 2025',
    icon: '/assets/images/ucr.png',
    summary: 'Designed and led an AI-powered course planning platform for UCR students, built in collaboration with Google on an agentic workflow.',
    highlights: [
      { value: 'Hours → ~30 min', label: 'course planning time for students' },
      { value: 'Lead architect', label: 'designed and led the multi-agent system on Google ADK' },
      { value: 'Built with Google', label: "showcased the system design to Google's team as a joint UCR project" },
      { value: 'Calendar view', label: 'chatbot and interactive schedule for a smoother planning experience' },
    ],
    stack: ['Python', 'Google ADK', 'LLMs', 'RAG', 'React', 'REST APIs'],
    description: `During my Data Science Fellowship at UCR, I worked on solving a major friction point students face every quarter when planning their courses. The process was highly fragmented and manual — students had to check course offerings, track completed courses, refer to recommended degree plans, and verify eligibility across multiple university systems, making planning time-consuming and often confusing.

  I led the design and development of a one-stop AI-powered solution to streamline this experience. The system intelligently combines student history, degree requirements, and real-time course availability to generate personalized schedules. As the project evolved, I expanded the system by integrating structured university data, enabling it to handle academic policies, constraints, and FAQs, making it a more comprehensive and practical tool for students.`,
    responsibilities: [
      'Reduced course planning from hours of manual searching to ~30 minutes by building a one-stop AI-powered platform for UCR students to discover courses, validate prerequisites, and generate personalized schedules from live quarter offerings.',
      'Led the project and designed its system architecture end to end, from agent orchestration through backend APIs to the React frontend.',
      'Delivered a multi-agent workflow on Google ADK with agent orchestration, session persistence, and multi-step reasoning for context-aware recommendations.',
      "Collaborated with Google throughout the project, showcasing the system design to Google's team as a joint effort with UCR.",
      'Improved the planning experience with a React chatbot and an interactive calendar view that lets students see and refine their generated schedules.',
      'Extended the system with structured university data so it could handle academic policies, constraints, and FAQs as a true one-stop solution.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Nagarro',
    period: 'Jan 2020 – Sept 2022',
    icon: '/assets/images/nagarro.jpg',
    summary: 'Built event-driven microservices and reliability tooling that kept real-time inventory in sync for a large-scale automobile client.',
    highlights: [
      { value: '10K/sec', label: 'events processed by event-driven microservices' },
      { value: '~99%', label: 'data accuracy via automated multi-region reconciliation' },
      { value: '50% faster', label: 'incident detection with integrated monitoring and alerting' },
      { value: '2 days → 1 hr', label: 'environment setup with automated VM provisioning' },
    ],
    stack: ['.NET Core', 'AWS Lambda', 'Amazon SQS', 'EC2', 'Terraform', 'CloudWatch', 'Splunk', 'Oracle 18c'],
    description: `At Nagarro, our team worked on a distributed system responsible for maintaining data consistency across multiple services for a large-scale automobile client. These systems needed to stay synchronized in near real-time, with changes flowing in both directions. This introduced challenges around handling continuous streams of events, ensuring reliability, and maintaining consistency across services even in the presence of failures.\n
    To address this, we built a robust event-driven synchronization system that processed incoming change events, propagated updates across services, and ensured data integrity. The system was designed to handle failures gracefully and maintain consistency at scale, while supporting reliable operation in a production environment.`,
    responsibilities: [
      'Scaled event-driven microservices to 10,000 events/sec by building high-throughput .NET Core publishers that synced real-time inventory updates from multiple upstream systems via Amazon SQS and AWS Lambda.',
      'Improved data accuracy to ~99% by developing a multi-region reconciliation pipeline on AWS EC2 that automatically recovered failed events, reducing manual intervention to ~1–2%.',
      'Accelerated incident detection by 50% by integrating monitoring and alerting with CloudWatch, New Relic, Splunk, and PagerDuty across production services.',
      'Slashed environment setup time from 2 days to 1 hour by leading the rollout of an automated VM provisioning system using PowerShell and Chocolatey, adopted across multiple engineering teams.',
      'Cut production deployment time by 15% by building AWS-based CI/CD pipelines with Terraform.',
      'Optimized Oracle 18c database performance by designing tables, views, triggers, and stored procedures aligned with system SLOs.',
      'Enabled safe feature rollouts using LaunchDarkly feature flags, reducing deployment risk in production systems.',
    ],
  },
];

export const skillsData = {
  languages: [
    { name: 'Python' },
    { name: 'C#' },
    { name: 'Java' },
    { name: 'JavaScript' },
    { name: 'TypeScript' },
  ],

  backend: [
    { name: '.NET Core' },
    { name: 'FastAPI' },
    { name: 'Flask' },
    { name: 'Apache Spark' },
    { name: 'PyLucene' },

    { name: 'Microservices' },
    { name: 'Distributed Systems' },
    { name: 'Event-Driven Architecture' },
    { name: 'REST APIs' },
    { name: 'PostgREST' },
    { name: 'ETL Pipelines' },
  ],

  ai: [
    { name: 'LLMs' },
    { name: 'SLMs' },
    { name: 'RAG' },
    { name: 'Agentic AI' },
    { name: 'Google ADK' },
    { name: 'OpenAI API' },
    { name: 'Anthropic Claude API' },
    { name: 'BERT' },
  ],

  frontend: [
    { name: 'React' },
    { name: 'Tailwind CSS' },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'Bootstrap' },
    { name: 'Electron' },
  ],

  cloud: [
    { name: 'AWS' },
    { name: 'Lambda' },
    { name: 'SQS' },
    { name: 'EC2' },
    { name: 'S3' },
    { name: 'CloudWatch' },
    { name: 'Google Cloud Platform' },
    { name: 'Docker' },
    { name: 'Terraform' },
    { name: 'CI/CD' },
  ],

  databases: [
    { name: 'PostgreSQL' },
    { name: 'Supabase' },
    { name: 'MySQL' },
    { name: 'Oracle 18c' },
  ],

  tools: [
    { name: 'Git' },
    { name: 'GitHub' },
    { name: 'Vite' },
    { name: 'Claude Code' },
    { name: 'Windsurf' },
    { name: 'Splunk' },
    { name: 'New Relic' },
    { name: 'PagerDuty' },
    { name: 'PowerShell' },
    { name: 'MITM Proxy' },
  ],
};

export const recommendationsData = [
  {
    quote: "I highly recommend Shikhar for any technical role due to his strong technical, collaborative, and communication skills. His dedication is evident as he frequently works outside regular hours to enhance his knowledge and apply it effectively during work hours. Shikhar is an excellent team player.",
    author: "Meenal Goyal",
    title: "Technology Lead, Nagarro",
    profile: "https://www.linkedin.com/in/meenal-goyal-32271147/",
  },
  {
    quote: "I highly recommend Shikhar for any development role. He possesses extensive project knowledge and was instrumental in helping QAs understand the actual testing requirements. Shikhar is very approachable and open to any sort of discussion, a testament to his excellent teamwork skills.",
    author: "Jagjeet Singh",
    title: "QA Principal Engineer, Nagarro",
    profile: "https://www.linkedin.com/in/jagjeet-singh-72292a6b/",
  },
  {
    quote: "One standout quality I observed in Shikhar is his relentless drive for improvement and his openness to constructive feedback—an invaluable trait in software engineering. He consistently introduced new ideas and strategies that enhanced our team's performance. Shikhar went above and beyond to support his teammates.",
    author: "Aman Singh Parihar",
    title: "Staff Engineer, Nagarro",
    profile: "https://www.linkedin.com/in/aman-singh-parihar-0b1630107/",
  }
];
