import AboutSection from "./components/homepage/about";
import BlogSection from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import ProjectSection from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { getBlogs } from "@/services";


export default async function Home() {
  const blogs = await getBlogs(3600);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <ProjectSection />
      <Education />
      <BlogSection blogs={blogs} />
      <ContactSection />
    </div>
  );
}
