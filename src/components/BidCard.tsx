import { BadgeCheck, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bid, drivers } from "@/data/mock";
import { useLang } from "@/i18n/LanguageContext";

interface Props {
  bid: Bid;
  lowest?: boolean;
  onAccept: (bid: Bid) => void;
}

const BidCard = ({ bid, lowest, onAccept }: Props) => {
  const { t } = useLang();
  const driver = drivers.find((d) => d.id === bid.driverId) ?? drivers[0];
  const vehicle = driver.vehicles.find((v) => v.id === bid.vehicleId) ?? driver.vehicles[0];

  return (
    <article className="animate-fade-up rounded-2xl border border-border/60 bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-start gap-4">
        <img src={driver.photo} alt={driver.name} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
        <div className="min-w-[180px] flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{driver.name}</h3>
            {driver.verified && (
              <Badge className="gap-1 bg-success text-success-foreground hover:bg-success">
                <BadgeCheck className="h-3.5 w-3.5" />
                {t("req.verified")}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{driver.company}</p>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1 font-medium">
              <Star className="h-4 w-4 fill-accent text-accent" /> {driver.rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">{driver.trips} {t("req.trips")}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" /> {vehicle.seats}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {vehicle.label} – {vehicle.amenities.join(", ")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {bid.perks.map((p) => (
              <Badge key={p} variant="secondary" className="font-normal">{p}</Badge>
            ))}
          </div>
          {bid.notes && <p className="mt-2 text-sm italic text-muted-foreground">“{bid.notes}”</p>}
        </div>

        <div className="ml-auto text-right">
          {lowest && <Badge className="mb-2 bg-accent text-accent-foreground hover:bg-accent">{t("req.lowest")}</Badge>}
          <p className="text-3xl font-semibold text-primary">${bid.priceUsd}</p>
          <p className="text-xs text-muted-foreground">{t("req.total")}</p>
          <Button className="mt-3 bg-gradient-primary text-primary-foreground hover:opacity-95" onClick={() => onAccept(bid)}>
            {t("req.accept")}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BidCard;
