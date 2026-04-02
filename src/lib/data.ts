// data.ts

import { Github, Linkedin, Server, Star } from 'lucide-react';

export const personalData = {
  name: 'Shikhar Kumar',
  title: "Software Engineer",
  bio: "Software engineer with a Master’s degree in Computer Science from UC Riverside and 3 years of experience at Nagarro, building scalable systems and data-driven solutions.",
  email: 'skuma154@ucr.edu',
  phone: '+1 (951) 377-2505',
};

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shikhar1999/', icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com/Shikhar16078', icon: Github }
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
      'Built a personal portfolio web application using React.js and Next.js, using from Firebase Studio AI.',
      'Configured GitHub Pages for deployment and automated the hosting process.',
    ],
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Github'],
    icon: '/assets/images/website.png',
    type: 'Personal',
    github: 'https://github.com/Shikhar16078/portfolio',
  },
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
    description: 'With a passion for engineering after completing my 12 th grade, I joined Inderprastha Engineering College, affiliated with Dr. A.P.J. Abdul Kalam Technical University. During my time there, I developed a strong foundation in Computer Science fundamentals, which enabled me to secure three job offers by the end of my bachelor’s degree, ultimately leading me to join Nagarro as an Associate Software Engineer. I am grateful to my professors and mentors for their guidance in shaping my journey as a Computer Science student.',
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
  role: 'Data Science Fellowship',
  company: 'University of California, Riverside',
  period: 'June 2025 – Aug 2025',
  icon: '/assets/images/ucr.png',
  description: `During my Data Science Fellowship at UCR, I worked on solving a major friction point students face every quarter when planning their courses. The process was highly fragmented and manual — students had to check course offerings, track completed courses, refer to recommended degree plans, and verify eligibility across multiple university systems, making planning time-consuming and often confusing.

  I led the design and development of a one-stop AI-powered solution to streamline this experience. The system intelligently combines student history, degree requirements, and real-time course availability to generate personalized schedules. As the project evolved, I expanded the system by integrating structured university data, enabling it to handle academic policies, constraints, and FAQs, making it a more comprehensive and practical tool for students.`,
    responsibilities: [
      'Built an AI-powered course scheduling platform that reduced planning time from hours to ~30 minutes by automating course discovery, prerequisite validation, and personalized schedule generation.',
      'Designed and led the system architecture in collaboration with Google, implementing an agentic workflow using Google ADK with multi-agent orchestration for context-aware recommendations.',
      'Developed backend services and exposed them via APIs, enabling seamless integration between the AI system and frontend interface.',
      'Built a React-based frontend with a chatbot interface for real-time interaction and an interactive calendar for schedule visualization, improving usability and decision-making.',
      'Extended the system by integrating structured university data into the workflow, enabling intelligent handling of academic policies, constraints, and broader student queries to move toward a true one-stop solution.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Nagarro',
    period: 'Jan 2020 – Sept 2022',
    icon: '/assets/images/nagarro.jpg',
    description: `At Nagarro, our team worked on a distributed system responsible for maintaining data consistency across multiple services for a large-scale automobile client. These systems needed to stay synchronized in near real-time, with changes flowing in both directions. This introduced challenges around handling continuous streams of events, ensuring reliability, and maintaining consistency across services even in the presence of failures.\n
    To address this, we built a robust event-driven synchronization system that processed incoming change events, propagated updates across services, and ensured data integrity. The system was designed to handle failures gracefully and maintain consistency at scale, while supporting reliable operation in a production environment.`,
    responsibilities: [
      'Built high-throughput event-driven data pipelines processing ~1,000 events/sec using .NET Core, AWS Lambda, and Amazon SQS, enabling reliable real-time synchronization across microservices.',
      'Improved system reliability to ~99% data accuracy by developing a reconciliation pipeline on AWS EC2 across multiple regions, reducing manual intervention to ~1–2% of failed events.',
      'Optimized Oracle 18c database performance by designing tables, views, triggers, and stored procedures aligned with system SLOs.',
      'Reduced deployment time by ~15% by building AWS-based CI/CD pipelines using Terraform, streamlining release workflows.',
      'Implemented monitoring and alerting using CloudWatch, New Relic, Splunk, and PagerDuty, achieving ~50% faster incident detection and resolution.',
      'Led development of an automated VM provisioning system using PowerShell and Chocolatey, reducing setup time from 2 days to ~1 hour and driving adoption across teams.',
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
  ],

  frontend: [
    { name: 'React' },
    { name: 'Tailwind CSS' },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'Bootstrap' },
  ],

  cloud: [
    { name: 'AWS' },
    { name: 'Lambda' },
    { name: 'SQS' },
    { name: 'EC2' },
    { name: 'CloudWatch' },
    { name: 'Docker' },
    { name: 'Terraform' },
  ],

  databases: [
    { name: 'PostgreSQL' },
    { name: 'MySQL' },
    { name: 'Oracle 18c' },
  ],

  tools: [
    { name: 'Git' },
    { name: 'GitHub' },
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
