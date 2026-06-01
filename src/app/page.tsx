import Topbar from "@/components/Topbar";
import LayerRail from "@/components/LayerRail";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Topbar />
      <LayerRail />
      <main id="top">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Clients />
        <Manifesto />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
