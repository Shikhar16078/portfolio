// data.ts

import { Github, Linkedin, Globe } from 'lucide-react';

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
    title: 'AI-Powered Course Scheduler',
    description: 'A web application that helps students schedule their courses using an AI-powered chatbot. Features a dynamic calendar view for easy schedule management.',
    technologies: ['React', 'FastAPI', 'Google ADK', 'Dialogflow'],
    image: 'project-scheduler',
    link: '#',
  },
  {
    title: 'Microservice Data Publisher',
    description: 'A real-time data publisher using .NET Core and AWS Lambda to ensure data synchronization across various microservices in a large-scale automobile project.',
    technologies: ['.NET Core', 'AWS Lambda', 'Oracle 18c', 'Terraform'],
    image: 'project-microservice',
    link: '#',
  },
  {
    title: 'Automated VM Setup',
    description: 'A PowerShell script that automates the setup of development virtual machines, reducing setup time from two days to approximately one hour.',
    technologies: ['PowerShell', 'VMware', 'Windows Server'],
    image: 'project-vm',
    link: '#',
  },
];

export const educationData = [
  {
    degree: 'M.S. in Computer Science',
    institution: 'University of California, Riverside',
    period: 'Sept 2024 – Dec 2025',
    description:
      'GPA: 3.96/4.00. Relevant coursework: Algorithms, Artificial Intelligence, Machine Learning, Distributed Systems.',
  },
  {
    degree: 'B.Tech. in Information Technology',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University, India',
    period: 'Aug 2016 – Sept 2020',
    description: 'CGPA: 7.47/10.00.',
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
    { name: 'Python', proficiency: 90 },
    { name: 'C#', proficiency: 85 },
    { name: 'Java', proficiency: 75 },
    { name: 'JavaScript', proficiency: 70 },
  ],
  frameworks: [
    { name: '.NET Core', proficiency: 85 },
    { name: 'Flask', proficiency: 80 },
    { name: 'FastAPI', proficiency: 75 },
    { name: 'Apache Spark', proficiency: 70 },
    { name: 'React', proficiency: 70 },
    { name: 'PyLucene', proficiency: 60 },
  ],
  tools: [
    { name: 'AWS', proficiency: 85 },
    { name: 'Terraform', proficiency: 80 },
    { name: 'Docker', proficiency: 80 },
    { name: 'PostgreSQL', proficiency: 75 },
    { name: 'Oracle 18c', proficiency: 75 },
    { name: 'MySQL', proficiency: 70 },
    { name: 'Git & GitHub', proficiency: 90 },
    { name: 'Splunk', proficiency: 70 },
    { name: 'New Relic', proficiency: 65 },
    { name: 'PowerShell', proficiency: 65 },
  ],
};
