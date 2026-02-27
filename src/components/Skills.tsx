import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

const Skills = () => {
  const { t } = useI18n();

  const skills = {
    frontend: [
      { name: t("skill.react"), level: 95 },
      { name: t("skill.typescript"), level: 90 },
      { name: t("skill.tailwind"), level: 95 },
      { name: t("skill.framer"), level: 80 },
    ],
    backend: [
      { name: t("skill.supabase"), level: 90 },
      { name: t("skill.postgresql"), level: 85 },
      { name: t("skill.nodejs"), level: 85 },
      { name: t("skill.restapi"), level: 90 },
    ],
    growth: [
      { name: t("skill.googleads"), level: 90 },
      { name: t("skill.fbads"), level: 90 },
      { name: t("skill.seo"), level: 85 },
      { name: t("skill.emailmarketing"), level: 80 },
      { name: t("skill.cro"), level: 80 },
      { name: t("skill.analytics"), level: 85 },
    ],
  };

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-primary text-sm mb-2">{t("skills.comment")}</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-12">{t("skills.heading")}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="font-mono text-sm text-muted-foreground mb-6 uppercase tracking-wider">{t("skills.frontend")}</h3>
            <div className="space-y-5">
              {skills.frontend.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="font-mono text-sm text-muted-foreground mb-6 uppercase tracking-wider">{t("skills.backend")}</h3>
            <div className="space-y-5">
              {skills.backend.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <h3 className="font-mono text-sm text-muted-foreground mb-6 uppercase tracking-wider">{t("skills.growth")}</h3>
            <div className="space-y-5">
              {skills.growth.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, delay: 0.4 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
