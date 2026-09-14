import { ArrowRight, CalendarDays, Luggage, MapPin, Users } from "lucide-react";
import { hubName } from "@/data/mock";
import { RideRequest } from "@/context/RideContext";
import { useLang } from "@/i18n/LanguageContext";

const RouteSummary = ({ request }: { request: RideRequest }) => {
  const { t } = useLang();
  const to = request.to === "custom" ? request.customTo ?? "" : hubName(request.to);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
      <div className="flex h-28 items-center justify-center bg-gradient-primary text-primary-foreground">
        <div className="flex items-center gap-3 px-4 text-center text-sm font-medium sm:text-base">
          <MapPin className="h-5 w-5" />
          <span>{hubName(request.from)}</span>
          <ArrowRight className="h-5 w-5" />
          <span>{to}</span>
        </div>
      </div>
      <div className="grid gap-3 p-5 text-sm sm:grid-cols-3">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" /> {request.date} · {request.time}
        </p>
        <p className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" /> {request.pax} {t("common.passengers")}
        </p>
        <p className="flex items-center gap-2">
          <Luggage className="h-4 w-4 text-primary" /> {request.bags} {t("common.bags")}
        </p>
      </div>
    </div>
  );
};

export default RouteSummary;
