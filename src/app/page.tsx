"use client";

import Header from '@/components/header';
import HomeSection from '@/components/sections/home';
import ExperienceSection from '@/components/sections/experience';
import ProjectsSection from '@/components/sections/projects';
import EducationSection from '@/components/sections/education';
import AwardsSection from '@/components/sections/awards';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/footer';
import { useEffect, useState } from 'react';
import RecommendationsSection from '@/components/sections/recommendations';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = [
      'home', 
      'experience', 
      'projects', 
      'education', 
      'skills', 
      'awards', 
      'recommendations',
      'contact'
    ];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header activeSection={activeSection} />
      <main className="flex-1">
        <HomeSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <SkillsSection />
        <AwardsSection />
        <RecommendationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
