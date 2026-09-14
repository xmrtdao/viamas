import { useLang } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="border-t border-border/70 py-8">
      <div className="container text-sm text-muted-foreground">
        © {new Date().getFullYear()} {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
