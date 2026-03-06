import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] flex flex-col items-center">
      <Navbar />
      <section id="hero" className="w-full">
        <ScrollyCanvas />
      </section>
      <About />
      <Skills />
      <section id="featured-creations" className="w-full">
        <Projects />
      </section>
      <Certifications />
      <Contact />
    </main>
  );
}
