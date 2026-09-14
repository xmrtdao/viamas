import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Radio } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteSummary from "@/components/RouteSummary";
import BidCard from "@/components/BidCard";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { useRide } from "@/context/RideContext";
import { Bid } from "@/data/mock";

const RideRequest = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { request, bids, acceptBid, reset } = useRide();

  const sorted = useMemo(() => [...bids].sort((a, b) => a.priceUsd - b.priceUsd), [bids]);

  const accept = (bid: Bid) => {
    acceptBid(bid.id);
    navigate("/checkout");
  };

  if (!request) {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{t("req.title")}</h1>
          <Button variant="outline" onClick={() => { reset(); navigate("/"); }}>{t("req.newRequest")}</Button>
        </div>

        <RouteSummary request={request} />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-secondary/50 px-4 py-3 text-sm">
          <p className="flex items-center gap-2 font-medium">
            {bids.length === 0 ? (
              <><Loader2 className="h-4 w-4 animate-spin text-primary" /> {t("req.searching")}</>
            ) : (
              <><Radio className="h-4 w-4 animate-pulse-ring text-success" /> {t("req.rolling")}</>
            )}
          </p>
          <p className="text-muted-foreground">
            {bids.length} {t("req.count")}
            {sorted.length > 0 && ` · ${t("req.lowest")}: $${sorted[0].priceUsd}`}
          </p>
        </div>

        <h2 className="mb-4 mt-8 text-xl font-semibold">{t("req.bids")}</h2>
        <div className="space-y-4">
          {sorted.length === 0 && (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-2xl border border-border/60 bg-muted/60" />
              ))}
            </div>
          )}
          {sorted.map((bid, i) => (
            <BidCard key={bid.id} bid={bid} lowest={i === 0 && sorted.length > 1} onAccept={accept} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RideRequest;
