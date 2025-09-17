import { Github, Linkedin, Twitter } from 'lucide-react';

export const personalData = {
  name: 'Alex Doe',
  title: 'Software Engineer',
  bio: 'A passionate Software Engineer with a knack for building beautiful and functional web applications. I turn ideas into reality with code.',
  email: 'hello@alexdoe.com',
};

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', url: 'https://twitter.com', icon: Twitter },
];

export const educationData = [
  {
    degree: 'M.S. in Computer Science',
    institution: 'University of Technology',
    period: '2018 - 2020',
    description: 'Focused on advanced algorithms, machine learning, and distributed systems.'
  },
  {
    degree: 'B.S. in Software Engineering',
    institution: 'State University',
    period: '2014 - 2018',
    description: 'Graduated with honors. Active member of the coding club and participated in several hackathons.'
  }
];

export const experienceData = [
  {
    role: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    period: '2020 - Present',
    responsibilities: [
      'Led the development of a new client-facing dashboard using React and TypeScript.',
      'Architected and implemented a scalable microservices backend with Node.js and Docker.',
      'Mentored junior engineers and conducted code reviews to maintain code quality.',
      'Improved application performance by 30% through code optimization and database tuning.'
    ]
  },
  {
    role: 'Software Engineer Intern',
    company: 'Innovate Co.',
    period: 'Summer 2017',
    responsibilities: [
      'Assisted in developing new features for a legacy web application.',
      'Wrote unit and integration tests to improve code coverage.',
      'Collaborated with the design team to implement UI mockups.'
    ]
  }
];

export const skillsData = {
  languages: [
    { name: 'JavaScript', proficiency: 95 },
    { name: 'TypeScript', proficiency: 90 },
    { name: 'Python', proficiency: 80 },
    { name: 'HTML/CSS', proficiency: 98 },
  ],
  frameworks: [
    { name: 'React', proficiency: 95 },
    { name: 'Next.js', proficiency: 90 },
    { name: 'Node.js', proficiency: 88 },
    { name: 'Express', proficiency: 85 },
  ],
  tools: [
    { name: 'Git & GitHub', proficiency: 95 },
    { name: 'Docker', proficiency: 80 },
    { name: 'Figma', proficiency: 70 },
    { name: 'Jira', proficiency: 90 },
  ]
};
