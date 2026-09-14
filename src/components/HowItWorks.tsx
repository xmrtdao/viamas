import { MapPin, Gavel, CarFront } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const steps = [
  { icon: MapPin, key: "1" },
  { icon: Gavel, key: "2" },
  { icon: CarFront, key: "3" },
];

const HowItWorks = () => {
  const { t } = useLang();
  return (
    <section id="how" className="container py-16">
      <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight">{t("how.title")}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, key }, i) => (
          <article key={key} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">0{key}</p>
            <h3 className="mb-2 text-lg font-semibold">{t(`how.${key}.title`)}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t(`how.${key}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
