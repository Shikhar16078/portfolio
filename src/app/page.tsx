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
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
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
