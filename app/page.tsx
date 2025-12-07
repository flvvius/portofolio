import HeroNew from "@/components/HeroNew";
import NavbarNew from "@/components/NavbarNew";
import AboutNew from "@/components/AboutNew";
import ProjectsNew from "@/components/ProjectsNew";
import ExperienceNew from "@/components/ExperienceNew";
import TestimonialsNew from "@/components/TestimonialsNew";
import FooterNew from "@/components/FooterNew";

export const metadata = {
  title: "Flavius Cojocaru | Full-Stack Engineer",
  description:
    "building stuff that matters | coding idealist, thirst for knowledge and working on becoming better, romania based, wanting to shape my future",
};

export default function Home() {
  return (
    <main className="relative bg-black-100 min-h-screen">
      <NavbarNew />
      <div className="max-w-6xl mx-auto px-6">
        <HeroNew />
        <AboutNew />
        <ProjectsNew />
        <ExperienceNew />
        <TestimonialsNew />
        <FooterNew />
      </div>
    </main>
  );
}
