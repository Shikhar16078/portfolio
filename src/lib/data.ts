// data.ts

import { Github, Linkedin, Server } from 'lucide-react';

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
    title: 'Reddit Search Engine',
    date: 'Fall 2024',
    description: [
        'Built a search engine over 100K+ Reddit posts by crawling data with PRAW API and indexing with PyLucene.',
        'Designed a Flask web app for querying and displaying results with sub-second response times.'
    ],
    technologies: ['Python', 'PRAW', 'PyLucene', 'Flask'],
    icon: '/assets/images/reddit.png',
  },
  {
    title: 'IMDB Reviews Analysis',
    date: 'Winter 2025',
    description: [
        'Conducted sentiment analysis on 50K+ IMDB reviews using Apache Spark.',
        'Built a Flask web application with real-time querying and visualization, backed by a PostgreSQL database in Docker.'
    ],
    technologies: ['Apache Spark', 'PostgreSQL', 'Docker', 'Flask'],
    icon: '/assets/images/imdb.png',
  },
  {
    title: 'UCR Course Scheduler',
    date: 'Spring 2025',
    description: [
        'Developed a course scheduling application for UCR students with chatbot logic in Google ADK, exposed via FastAPI.',
        'Integrated into a React frontend with a dynamic calendar view for interactive schedule management.'
    ],
    technologies: ['React', 'FastAPI', 'Google ADK'],
    icon: '/assets/images/ucr.png',
  },
];


export const educationData = [
  {
    degree: 'M.S. in Computer Science',
    institution: 'University of California, Riverside',
    period: 'Sept 2024 – Dec 2025',
    gpa: 'GPA: 3.96/4.00',
    description:
      'Even though I was a highly appreciated member of my team at Nagarro, I felt the need to further enhance my skills and deepen my understanding of advanced Computer Science concepts. This led me to pursue a Master of Science in Computer Science at the University of California, Riverside after nearly three years of industry experience. At UCR, I have explored Artificial Intelligence, Algorithms, Distributed Systems, and other fascinating areas of Computer Science. Yet, my journey of learning continues here at UCR as I strive to further hone my expertise in this ever-evolving field.',
    website: 'https://www.ucr.edu/',
    courses: [
      'Advanced Algorithms',
      'Artificial Intelligence',
      'Machine Learning',
      'Distributed Systems',
      'Database Management Systems',
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
      'Object-Oriented Programming',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering',
    ],
    icon: '/assets/images/aktu.png',
  },
];

export const awardsData = [
  {
    title: 'Star of the Month',
    issuer: 'Nagarro',
    date: '2020 – 2022',
    description: 'Recognized quarterly as the most impactful software engineer on the team.',
  },
  {
    title: 'Graduate Fellowship',
    issuer: 'University of California, Riverside',
    date: '2024',
    description: 'Awarded a fellowship for strong academic performance and potential in computer science.',
  },
  {
    title: 'Dean\'s Honor List',
    issuer: 'University of California, Riverside',
    date: '2024',
    description: 'Maintained a 3.96 GPA, earning placement on the Dean’s Honor List for academic excellence.',
  },
  {
    title: 'Mentorship Recognition',
    issuer: 'Nagarro',
    date: '2021 – 2022',
    description: 'Conducted monthly mentorship sessions to guide junior engineers in best practices and project work.',
  },
  {
    title: 'Grader',
    issuer: 'University of California, Riverside',
    date: 'Spring 2025 – Fall 2025',
    description: 'Hired twice for effectively grading "CS141: Intermediate Data Structures and Algorithms", ensuring precise evaluation of assignments, quizzes, and exams.',
  },  
];


export const experienceData = [
  {
    role: 'Data Science Fellowship',
    company: 'University of California, Riverside',
    period: 'June 2025 – Aug 2025',
    icon: '/assets/images/ucr.png',
    responsibilities: [
      'Designed an AI-powered course scheduling system that enabled UCR students to automatically select courses based on graduation requirements and personal preferences through an intelligent chatbot.',
      'Engineered the backend using Google Agent Development Kit (ADK), leveraging multiple agents for specialized tasks and exposing services via a FastAPI server to ensure scalability and modularity.',
      'Developed a modern frontend with Firebase Studio AI, featuring a split interface with an interactive calendar view on the left for course visualization and a responsive chatbot panel on the right for real-time interaction.',
      'Integrated the frontend and backend through RESTful API calls, enabling seamless communication between the chatbot and scheduling interface for a smooth user experience.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Nagarro',
    period: 'Jan 2020 – Sept 2022',
    icon: '/assets/images/nagarro.jpg',
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
    { name: 'Python' },
    { name: 'C#' },
    { name: 'Java' },
    { name: 'JavaScript' },
  ],
  frameworks: [
    { name: '.NET Core' },
    { name: 'Flask' },
    { name: 'FastAPI' },
    { name: 'Apache Spark' },
    { name: 'React' },
    { name: 'PyLucene' },
  ],
  tools: [
    { name: 'AWS' },
    { name: 'Terraform' },
    { name: 'Docker' },
    { name: 'PostgreSQL' },
    { name: 'Oracle 18c' },
    { name: 'MySQL' },
    { name: 'Git & GitHub' },
    { name: 'Splunk' },
    { name: 'New Relic' },
    { name: 'PowerShell' },
  ],
};
