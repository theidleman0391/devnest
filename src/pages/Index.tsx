import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import { useI18n } from "@/i18n/I18nProvider";

const Index = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <footer className="py-8 text-center border-t border-border/50">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · {t("footer.text")}
        </p>
      </footer>
    </div>
  );
};

export default Index;
