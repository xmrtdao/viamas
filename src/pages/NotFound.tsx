import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";

const NotFound = () => {
  const { t } = useLang();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <h1 className="text-5xl font-semibold">404</h1>
        <Button asChild><Link to="/">{t("done.home")}</Link></Button>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
