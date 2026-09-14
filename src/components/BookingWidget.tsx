import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { hubs } from "@/data/mock";
import { useLang } from "@/i18n/LanguageContext";
import { useRide } from "@/context/RideContext";

interface Props {
  prefill?: { from: string; to: string };
}

const CUSTOM = "__custom__";

const BookingWidget = ({ prefill }: Props) => {
  const { t } = useLang();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createRequest } = useRide();

  const [from, setFrom] = useState(prefill?.from ?? "");
  const [to, setTo] = useState(prefill?.to ?? "");
  const [customTo, setCustomTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [pax, setPax] = useState(2);
  const [bags, setBags] = useState(2);
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (prefill) {
      setFrom(prefill.from);
      setTo(prefill.to);
    }
  }, [prefill]);

  const fail = (key: string) => {
    toast({ title: t(key), variant: "destructive" });
    return false;
  };

  const submit = () => {
    if (!from) return fail("widget.error.pickup");
    if (!to) return fail("widget.error.dropoff");
    if (to !== CUSTOM && from === to) return fail("widget.error.same");
    if (to === CUSTOM && !customTo.trim()) return fail("widget.error.custom");
    if (!date || !time) return fail("widget.error.date");

    createRequest({
      from,
      to: to === CUSTOM ? "custom" : to,
      customTo: to === CUSTOM ? customTo.trim() : undefined,
      date,
      time,
      pax,
      bags,
      budgetUsd: budget ? Number(budget) : undefined,
    });
    navigate("/request");
  };

  const Stepper = ({ label, value, set, min }: { label: string; value: number; set: (n: number) => void; min: number }) => (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-2">
        <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => set(Math.max(min, value - 1))} aria-label={`-${label}`}>
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="text-sm font-semibold">{value}</span>
        <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => set(Math.min(20, value + 1))} aria-label={`+${label}`}>
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 text-card-foreground shadow-elegant sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">{t("widget.pickup")}</Label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger><SelectValue placeholder={t("widget.select")} /></SelectTrigger>
            <SelectContent>
              {hubs.map((h) => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">{t("widget.dropoff")}</Label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger><SelectValue placeholder={t("widget.select")} /></SelectTrigger>
            <SelectContent>
              {hubs.map((h) => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}
              <SelectItem value={CUSTOM}>{t("widget.custom")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {to === CUSTOM && (
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs font-medium text-muted-foreground">{t("widget.custom")}</Label>
            <Input value={customTo} onChange={(e) => setCustomTo(e.target.value)} placeholder={t("widget.customPlaceholder")} />
          </div>
        )}

        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">{t("widget.date")}</Label>
          <Input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">{t("widget.time")}</Label>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <Stepper label={t("widget.pax")} value={pax} set={setPax} min={1} />
        <Stepper label={t("widget.luggage")} value={bags} set={setBags} min={0} />

        <div className="space-y-1.5 sm:col-span-2">
          <Label className="text-xs font-medium text-muted-foreground">{t("widget.budget")}</Label>
          <Input type="number" min={0} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="150" />
        </div>
      </div>

      <Button onClick={submit} size="lg" className="mt-5 w-full gap-2 bg-gradient-primary text-primary-foreground hover:opacity-95">
        <Search className="h-4 w-4" />
        {t("widget.submit")}
      </Button>
    </div>
  );
};

export default BookingWidget;
