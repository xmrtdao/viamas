import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hubName, popularRoutes } from "@/data/mock";
import { useLang } from "@/i18n/LanguageContext";

interface Props {
  onSelect: (from: string, to: string) => void;
}

const PopularRoutes = ({ onSelect }: Props) => {
  const { t } = useLang();
  return (
    <section id="routes" className="bg-secondary/40 py-16">
      <div className="container">
        <h2 className="text-3xl font-semibold tracking-tight">{t("routes.title")}</h2>
        <p className="mb-8 mt-2 text-muted-foreground">{t("routes.subtitle")}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((r) => (
            <article key={`${r.from}-${r.to}`} className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-shadow hover:shadow-elegant">
              <img src={r.image} alt={`${hubName(r.from)} to ${hubName(r.to)}`} loading="lazy" className="h-40 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>{hubName(r.from)}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
                  <span>{hubName(r.to)}</span>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-primary">${r.avgUsd}</p>
                    <p className="text-xs text-muted-foreground">{t("routes.avg")}</p>
                  </div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {r.hours}
                  </p>
                </div>
                <Button variant="outline" className="mt-4 w-full" onClick={() => onSelect(r.from, r.to)}>
                  {t("routes.use")}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
