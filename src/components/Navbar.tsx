import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  const links = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" onClick={(e) => handleScroll(e, "#")} className="font-mono font-bold text-primary text-sm">
          &lt;DevNest /&gt;
        </a>

        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <div className="hidden md:flex gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="font-mono text-xs px-2 py-1 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden font-mono text-xs text-muted-foreground"
          >
            {open ? t("nav.close") : t("nav.menu")}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors block"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
