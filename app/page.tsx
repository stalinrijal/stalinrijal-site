import "./styles/home/index.css";
import { BackgroundLayers } from "@/components/home/BackgroundLayers";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { Experience } from "@/components/home/Experience";
import { Skills } from "@/components/home/Skills";
import { Certifications } from "@/components/home/Certifications";
import { Projects } from "@/components/home/Projects";
import { BlogMarquee } from "@/components/home/BlogMarquee";
import { Recommendations } from "@/components/home/Recommendations";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="home">
      <BackgroundLayers />
      <Nav />
      <Hero />
      <StatsBar />
      <Experience />
      <Skills />
      <Certifications />
      <Projects />
      <BlogMarquee />
      <Recommendations />
      <Contact />
      <Footer />
    </div>
  );
}
