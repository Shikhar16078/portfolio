// data.ts

import { Github, Linkedin, Globe, Award } from 'lucide-react';

export const personalData = {
  name: 'Shikhar Kumar',
  title: "Software Engineer",
  bio: "Master’s student in Computer Science at UC Riverside (GPA 3.96) with 3 years of industry experience at Nagarro. Skilled in backend development, cloud infrastructure, and applied machine learning.",
  email: 'skuma154@ucr.edu',
};

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shikhar1999/', icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com/Shikhar16078', icon: Github }
];

export const projectsData = [
  {
    title: 'UCR Course Scheduler',
    description: 'Developed a course scheduling application for UCR students with chatbot logic in Google ADK, exposed via FastAPI. Integrated into a React frontend with a dynamic calendar view for interactive schedule management.',
    technologies: ['React', 'FastAPI', 'Google ADK'],
    link: '#',
  },
  {
    title: 'Reddit Search Engine',
    description: 'Built a search engine over 100K+ Reddit posts by crawling data with PRAW API and indexing with PyLucene. Designed a Flask web app for querying and displaying results with sub-second response times.',
    technologies: ['Python', 'PRAW', 'PyLucene', 'Flask'],
    link: '#',
  },
  {
    title: 'IMDB Reviews Analysis',
    description: 'Conducted sentiment analysis on 50K+ IMDB reviews using Apache Spark. Built a Flask web application with real-time querying and visualization, backed by a PostgreSQL database in Docker.',
    technologies: ['Apache Spark', 'PostgreSQL', 'Docker', 'Flask'],
    link: '#',
  },
];


export const educationData = [
  {
    degree: 'M.S. in Computer Science',
    institution: 'University of California, Riverside',
    period: 'Sept 2024 – Dec 2025',
    gpa: 'GPA: 3.96/4.00',
    description:
      'Deepened expertise in advanced algorithms, AI, and distributed systems.',
    website: 'https://www.ucr.edu/',
    courses: [
      'Advanced Algorithms',
      'Artificial Intelligence',
      'Machine Learning',
      'Distributed Systems',
      'Database Management Systems',
    ],
  },
  {
    degree: 'B.Tech. in Information Technology',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University, India',
    period: 'Aug 2016 – Sept 2020',
    gpa: 'CGPA: 7.47/10.00',
    description: 'Built a strong foundation in core computer science principles.',
    website: 'https://aktu.ac.in/',
    courses: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
    ],
  },
];

export const awardsData = [
    {
      title: 'Top Performer Award',
      issuer: 'Nagarro',
      date: '2021',
      description: 'Recognized as a top performer for outstanding contributions to the project and exceptional performance.',
    },
    {
      title: 'Spot Award for Innovation',
      issuer: 'Nagarro',
      date: '2020',
      description: 'Awarded for developing an innovative PowerShell script that significantly reduced VM setup time.',
    },
    {
      title: 'Dean\'s Honor List',
      issuer: 'University of California, Riverside',
      date: '2024',
      description: 'Achieved a GPA of 3.96, placing me on the Dean\'s Honor List for academic excellence.',
    },
    {
      title: 'Graduate Fellowship',
      issuer: 'University of California, Riverside',
      date: '2024',
      description: 'Awarded a fellowship for strong academic background and potential for research in computer science.',
    },
  ];

export const experienceData = [
  {
    role: 'Data Science Fellow',
    company: 'University of California, Riverside',
    period: 'June 2025 – Aug 2025',
    responsibilities: [
      'Built a course scheduling application with chatbot logic in Google ADK, exposed via FastAPI.',
      'Integrated the chatbot into a React web application with a dynamic calendar view for schedule management.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Nagarro',
    period: 'Jan 2020 – Sept 2022',
    responsibilities: [
      'Developed and maintained real-time data publishers in .NET Core with AWS Lambda for microservice synchronization.',
      'Designed Oracle 18c database components (tables, stored procedures, triggers) to improve performance and meet SLOs.',
      'Built AWS CI/CD pipelines with Terraform, cutting deployment time by ~20% and streamlining workflows.',
      'Implemented monitoring and alerting with AWS CloudWatch, New Relic, and Splunk, enabling ~50% faster fault detection.',
      'Led rollout of an automated VM setup in PowerShell, reducing setup time from 2 days to ~1 hour.',
    ],
  },
];

export const skillsData = {
  languages: [
    { name: 'Python', proficiency: 95 },
    { name: 'C#', proficiency: 90 },
    { name: 'Java', proficiency: 85 },
    { name: 'JavaScript', proficiency: 80 },
  ],
  frameworks: [
    { name: '.NET Core', proficiency: 90 },
    { name: 'Flask', proficiency: 85 },
    { name: 'FastAPI', proficiency: 85 },
    { name: 'Apache Spark', proficiency: 80 },
    { name: 'React', proficiency: 80 },
    { name: 'PyLucene', proficiency: 75 },
  ],
  tools: [
    { name: 'AWS', proficiency: 90 },
    { name: 'Terraform', proficiency: 85 },
    { name: 'Docker', proficiency: 85 },
    { name: 'PostgreSQL', proficiency: 80 },
    { name: 'Oracle 18c', proficiency: 80 },
    { name: 'MySQL', proficiency: 75 },
    { name: 'Git & GitHub', proficiency: 95 },
    { name: 'Splunk', proficiency: 80 },
    { name: 'New Relic', proficiency: 80 },
    { name: 'PowerShell', proficiency: 85 },
  ],
};
