// data.ts

import { Github, Linkedin, Server, Star } from 'lucide-react';

export const personalData = {
  name: 'Shikhar Kumar',
  title: "Software Engineer",
  bio: "Computer Science graduate student at UC Riverside with a strong interest in algorithms, cloud computing, and machine learning. I enjoy designing systems that are both intelligent and scalable.",
  email: 'skuma154@ucr.edu',
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
    title: 'Portfolio Website',
    date: 'Summer 2025',
    description: [
      'Built a personal portfolio web application using React.js and Next.js, using from Firebase Studio AI.',
      'Configured GitHub Pages for deployment and automated the hosting process.',
    ],
    technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Github'],
    icon: '/assets/images/portfolio.png',
    type: 'Personal',
  },
  {
    title: 'UCR Course Scheduler',
    date: 'Summer 2025',
    description: [
        'Developed a course scheduling application for UCR students with chatbot logic in Google ADK, exposed via FastAPI.',
        'Integrated into a React frontend with a dynamic calendar view for interactive schedule management.'
    ],
    technologies: ['React', 'FastAPI', 'Google ADK'],
    icon: '/assets/images/ucr.png',
    type: 'Academic',
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
      'Design and Analysis of Algorithms',
      'Artificial Intelligence',
      'Machine Learning',
      'Distributed Systems',
      'Advanced Database Management Systems',
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
    title: 'Graduate Fellowship',
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
    responsibilities: [
      'Designed an AI-powered course scheduling system that enabled UCR students to automatically select courses based on graduation requirements and personal preferences through an intelligent chatbot.',
      'Engineered the backend using Google Agent Development Kit (ADK), leveraging multiple agents for specialized tasks and exposing services via a FastAPI server to ensure scalability and modularity.',
      'Developed a modern frontend with Firebase Studio AI, featuring a split interface with an interactive calendar view on the left for a responsive chatbot panel on the right for real-time interaction.',
      'Integrated the frontend and backend through RESTful API calls, enabling seamless communication between the chatbot and scheduling interface for a smooth user experience.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Nagarro',
    period: 'Jan 2020 – Sept 2022',
    icon: '/assets/images/nagarro.jpg',
    responsibilities: [
      'Developed and maintained real-time data publishers in .NET Core, deployed as AWS Lambda functions, to synchronize microservices and ensure consistency across different systems.',
      'Designed and optimized Oracle 18c database components (tables, stored procedures, triggers), enhancing query performance, maintaining data integrity, and meeting defined system SLOs.',
      'Built and configured AWS CI/CD pipelines using Terraform, automating deployments, reducing release times by ~20%, and streamlining development workflows.',
      'Implemented monitoring and alerting by integrating AWS CloudWatch, New Relic, and Splunk, enabling proactive fault detection and achieving ~50% faster incident resolution.',
      'Led the rollout of automated VM setup with PowerShell scripts, reducing provisioning time from 2 days to ~1 hour; the solution was later adopted company-wide by other teams for its efficiency and time savings.',
    ],
  },
];

export const skillsData = {
  languages: [
    { name: 'Python' },
    { name: 'JavaScript' },
    { name: 'Java' },
    { name: 'C#' },
  ],
  frameworks: [
    { name: 'React' },
    { name: 'FastAPI' },
    { name: 'Flask' },
    { name: '.NET Core' },
    { name: 'Apache Spark' },
    { name: 'PyLucene' },
  ],
  tools: [
    { name: 'AWS' },
    { name: 'Docker' },
    { name: 'Git & GitHub' },
    { name: 'Terraform' },
    { name: 'PostgreSQL' },
    { name: 'MySQL' },
    { name: 'Oracle 18c' },
    { name: 'Splunk' },
    { name: 'New Relic' },
    { name: 'PowerShell' },
  ],
};

export const recommendationsData = [
  {
    quote: "I highly recommend Shikhar for any technical role due to his strong technical, collaborative, and communication skills. His dedication is evident as he frequently works outside regular hours to enhance his knowledge and apply it effectively during work hours. Shikhar is an excellent team player.",
    author: "Meenal Goyal",
    title: "Technology Lead, Nagarro",
    image: "https://media.licdn.com/dms/image/v2/D5603AQEXfLmockCIsA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1729225115202?e=1761177600&v=beta&t=rtzZLr-SImZaoC685E9cF-WNRZ7cJr2dBESu6hyDw18",
  },
  {
    quote: "I highly recommend Shikhar for any development role. He possesses extensive project knowledge and was instrumental in helping QAs understand the actual testing requirements. Shikhar is very approachable and open to any sort of discussion, a testament to his excellent teamwork skills.",
    author: "Jagjeet Singh",
    title: "QA Principal Engineer, Nagarro",
    image: "https://media.licdn.com/dms/image/v2/C4D03AQEGCcXnRmbIFw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1626535729295?e=1761177600&v=beta&t=sJ24-DiNQJ8AE_5z9k9d2LNSUgjlnXUGE402zLetLqQ",
  },
  {
    quote: "One standout quality I observed in Shikhar is his relentless drive for improvement and his openness to constructive feedback—an invaluable trait in software engineering. He consistently introduced new ideas and strategies that enhanced our team's performance. Shikhar went above and beyond to support his teammates.",
    author: "Aman Singh Parihar",
    title: "Staff Engineer, Nagarro",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHmqNauV-dUEA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1671250711407?e=1761177600&v=beta&t=FlAg56xypaz9q04dHjKFuEmdefn6CWi6ArhMxMC_0RA",
  }
];
