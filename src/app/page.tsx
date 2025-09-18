"use client";

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/header';
import HomeSection from '@/components/sections/home';
import ExperienceSection from '@/components/sections/experience';
import ProjectsSection from '@/components/sections/projects';
import EducationSection from '@/components/sections/education';
import AwardsSection from '@/components/sections/awards';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRefs.current[entry.target.id] = entry;
        });

        const visibleSections = Object.values(sectionRefs.current).filter(
          (entry) => entry.isIntersecting
        );

        if (visibleSections.length > 0) {
          // Find the section that is most visible
          const mostVisibleSection = visibleSections.reduce(
            (max, entry) =>
              (entry.intersectionRatio > max.intersectionRatio ? entry : max),
            visibleSections[0]
          );
          setActiveSection(mostVisibleSection.target.id);
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when the section is in the middle of the viewport
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('main > section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
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
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
