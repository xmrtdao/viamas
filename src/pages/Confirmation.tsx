import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteSummary from "@/components/RouteSummary";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { useRide } from "@/context/RideContext";
import { drivers, hubName } from "@/data/mock";

const Confirmation = () => {
  const { t, lang } = useLang();
  const { request, bids, acceptedBidId, bookingCode } = useRide();
  const bid = bids.find((b) => b.id === acceptedBidId);

  if (!request || !bid) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="container flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
          <p className="text-muted-foreground">{t("req.none")}</p>
          <Button asChild><Link to="/">{t("done.home")}</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const driver = drivers.find((d) => d.id === bid.driverId) ?? drivers[0];
  const to = request.to === "custom" ? request.customTo ?? "" : hubName(request.to);
  const message =
    lang === "es"
      ? `Hola ${driver.name}, soy tu pasajero de Via. Reserva ${bookingCode}: ${hubName(request.from)} a ${to}, el ${request.date} a las ${request.time}, ${request.pax} pasajeros. ¡Nos vemos!`
      : `Hi ${driver.name}, this is your Via passenger. Booking ${bookingCode}: ${hubName(request.from)} to ${to} on ${request.date} at ${request.time} for ${request.pax} passengers. See you soon!`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-3xl py-14">
        <div className="mb-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-success" />
          <h1 className="text-3xl font-semibold tracking-tight">{t("done.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("done.body")}</p>
          {bookingCode && (
            <p className="mt-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
              {t("done.code")}: {bookingCode}
            </p>
          )}
        </div>

        <RouteSummary request={request} />

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
          <img src={driver.photo} alt={driver.name} className="h-14 w-14 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold">{driver.name}</p>
            <p className="text-sm text-muted-foreground">{driver.company} · ${bid.priceUsd}</p>
          </div>
          <Button asChild className="gap-2 bg-gradient-primary text-primary-foreground hover:opacity-95">
            <a href={`https://wa.me/${driver.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> {t("done.whatsapp")}
            </a>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="outline"><Link to="/">{t("done.home")}</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
