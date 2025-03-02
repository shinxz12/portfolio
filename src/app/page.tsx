import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import BlogSection from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { Blog } from "./components/homepage/blog/types";

// interface BlogPost {
//   id: number;
//   title: string;
//   cover_image: string | null;
//   url: string;
// }

async function getData(): Promise<Blog[]> {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Blog[] = await res.json();

  return data.filter((item) => item.cover_image).sort(() => Math.random() - 0.5);
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <BlogSection blogs={blogs} />
      <ContactSection />
    </div>
  );
}
