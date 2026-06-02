import type { Metadata } from "next";
import Topbar from "@/components/Topbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import BackToHome from "@/components/BackToHome";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description: "Selected and full project work — mobile apps, POS, and e-commerce platforms.",
};

export default function WorkPage() {
  return (
    <>
      <Topbar base="/" />
      <main id="top" className="work-page">
        <div className="container work-top">
          <BackToHome />
        </div>
        <Projects all />
        <Footer />
      </main>
    </>
  );
}
