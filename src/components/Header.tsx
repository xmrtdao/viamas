import { Link, useLocation } from "react-router-dom";
import { Compass } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { t, lang, setLang } = useLang();
  const { pathname } = useLocation();

  const links = [
    { to: "/request", label: t("nav.request") },
    { to: "/drivers", label: t("nav.drivers") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
            <Compass className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-semibold tracking-tight">Via</span>
            <span className="hidden text-xs text-muted-foreground sm:block">{t("brand.tagline")}</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === l.to ? "bg-secondary text-secondary-foreground" : "text-muted-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-1 flex items-center rounded-full border border-border p-0.5">
            {(["en", "es"] as const).map((code) => (
              <Button
                key={code}
                variant={lang === code ? "default" : "ghost"}
                size="sm"
                className="h-7 rounded-full px-3 text-xs uppercase"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
              >
                {code}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
