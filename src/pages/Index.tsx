import { useState } from "react";
import { Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingWidget from "@/components/BookingWidget";
import HowItWorks from "@/components/HowItWorks";
import PopularRoutes from "@/components/PopularRoutes";
import { useLang } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLang();
  const [prefill, setPrefill] = useState<{ from: string; to: string }>();

  const selectRoute = (from: string, to: string) => {
    setPrefill({ from, to });
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative">
          <img
            src="https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=1920&q=70"
            alt="Coastline road in Costa Rica"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="container relative grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="text-primary-foreground">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <Zap className="h-3.5 w-3.5 animate-pulse-ring" /> {t("hero.badge")}
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{t("hero.title")}</h1>
              <p className="mt-4 max-w-xl text-base opacity-90 sm:text-lg">{t("hero.subtitle")}</p>
            </div>
            <div id="quote">
              <BookingWidget prefill={prefill} />
            </div>
          </div>
        </section>

        <HowItWorks />
        <PopularRoutes onSelect={selectRoute} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
