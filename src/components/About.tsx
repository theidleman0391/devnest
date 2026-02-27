import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { Terminal, Smartphone, Globe, Users, X } from "lucide-react";

const About = () => {
    const { t } = useI18n();
    const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

    const features = [
        {
            icon: <Terminal className="w-5 h-5 text-primary" />,
            title: t("about.feature.software"),
            desc: t("about.feature.software.desc")
        },
        {
            icon: <Smartphone className="w-5 h-5 text-primary" />,
            title: t("about.feature.mobile"),
            desc: t("about.feature.mobile.desc")
        },
        {
            icon: <Globe className="w-5 h-5 text-primary" />,
            title: t("about.feature.websites"),
            desc: t("about.feature.websites.desc")
        },
        {
            icon: <Users className="w-5 h-5 text-primary" />,
            title: t("about.feature.audience"),
            desc: t("about.feature.audience.desc")
        }
    ];

    return (
        <section id="about" className="py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="font-mono text-primary text-sm mb-4 block">
                        {t("about.comment")}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                        {t("about.heading")}
                    </h2>
                    <div className="bg-secondary/50 border border-border/50 rounded-lg p-6 md:p-8 backdrop-blur-sm">
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                            {t("about.description")}
                        </p>

                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => setSelectedFeature(index)}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -5,
                                        boxShadow: "0 0 20px rgba(var(--primary), 0.1)",
                                        borderColor: "hsl(var(--primary) / 0.5)"
                                    }}
                                    viewport={{ once: false, amount: 0.1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex flex-col items-center justify-center p-6 bg-background/50 backdrop-blur-md rounded-xl border border-border/50 text-center gap-4 cursor-pointer group"
                                >
                                    <div className="p-4 bg-secondary/80 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    <span className="font-mono text-sm text-foreground/80 group-hover:text-primary transition-colors duration-300 font-medium tracking-wide">
                                        {feature.title}
                                    </span>
                                    <span className="font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 mt-1">
                                        [ {t("about.action.details")} ]
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedFeature !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedFeature(null)}
                    >
                        <motion.div
                            className="relative w-full max-w-md bg-secondary border border-border/50 rounded-2xl p-6 shadow-2xl"
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedFeature(null)}
                                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-primary/20 rounded-full text-primary">
                                    {features[selectedFeature].icon}
                                </div>
                                <h3 className="font-mono text-xl font-bold text-foreground">
                                    {features[selectedFeature].title}
                                </h3>
                            </div>

                            <p className="text-muted-foreground leading-relaxed text-[15px]">
                                {features[selectedFeature].desc}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default About;
