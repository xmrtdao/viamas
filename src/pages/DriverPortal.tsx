import { useState } from "react";
import { ArrowRight, CalendarDays, DollarSign, Users, Wallet } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageContext";
import { DriverRequest, driverRides, drivers, hubName, openRequests } from "@/data/mock";
import { useRide } from "@/context/RideContext";

const me = drivers[0];

const DriverPortal = () => {
  const { t } = useLang();
  const { toast } = useToast();
  const { request, addBid } = useRide();
  const [target, setTarget] = useState<DriverRequest | null>(null);
  const [price, setPrice] = useState("");
  const [vehicleId, setVehicleId] = useState(me.vehicles[0].id);
  const [notes, setNotes] = useState("");
  const [bidRequests, setBidRequests] = useState<string[]>([]);

  const liveRequests: DriverRequest[] = [
    ...(request
      ? [{
          id: request.id,
          from: request.from,
          to: request.to === "custom" ? (request.customTo ?? "Custom address") : request.to,
          date: request.date,
          time: request.time,
          pax: request.pax,
          bags: request.bags,
          budgetUsd: request.budgetUsd,
        }]
      : []),
    ...openRequests,
  ];

  const openBid = (r: DriverRequest) => {
    setTarget(r);
    setPrice(String(r.lowestBidUsd ? r.lowestBidUsd - 10 : r.budgetUsd ?? 150));
    setNotes("");
  };

  const submitBid = () => {
    if (!target || !price) return;
    if (request && target.id === request.id) {
      addBid({
        id: `bid-driver-${Date.now()}`,
        driverId: me.id,
        vehicleId,
        priceUsd: Number(price),
        perks: me.vehicles.find((v) => v.id === vehicleId)?.amenities ?? [],
        notes: notes || undefined,
        createdAt: Date.now(),
      });
    }
    setBidRequests((prev) => [...prev, target.id]);
    setTarget(null);
    toast({ title: t("driver.bidSent") });
  };

  const earnings = driverRides.filter((r) => r.status === "completed").reduce((s, r) => s + r.fareUsd, 0);
  const pending = driverRides.filter((r) => r.status !== "completed").reduce((s, r) => s + r.fareUsd, 0);

  const label = (id: string) => (hubName(id) === id ? id : hubName(id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <h1 className="text-3xl font-semibold tracking-tight">{t("driver.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("driver.subtitle")}</p>

        <Tabs defaultValue="available" className="mt-8">
          <TabsList>
            <TabsTrigger value="available">{t("driver.available")}</TabsTrigger>
            <TabsTrigger value="active">{t("driver.active")}</TabsTrigger>
            <TabsTrigger value="earnings">{t("driver.earnings")}</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6 space-y-4">
            {liveRequests.map((r) => (
              <article key={r.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <div className="min-w-[220px] flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-medium">
                    <span>{label(r.from)}</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{label(r.to)}</span>
                  </div>
                  <p className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {r.date} · {r.time}</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {r.pax}</span>
                  </p>
                </div>
                <div className="text-right text-sm">
                  {r.budgetUsd && <p className="text-muted-foreground">{t("driver.budget")}: <span className="font-semibold text-foreground">${r.budgetUsd}</span></p>}
                  {r.lowestBidUsd && <p className="text-muted-foreground">{t("driver.currentLow")}: <span className="font-semibold text-primary">${r.lowestBidUsd}</span></p>}
                </div>
                {bidRequests.includes(r.id) ? (
                  <Badge variant="secondary">{t("driver.pending")}</Badge>
                ) : (
                  <Button onClick={() => openBid(r)} className="bg-gradient-primary text-primary-foreground hover:opacity-95">
                    {t("driver.placeBid")}
                  </Button>
                )}
              </article>
            ))}
          </TabsContent>

          <TabsContent value="active" className="mt-6 space-y-4">
            {driverRides.map((r) => (
              <article key={r.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <div>
                  <div className="flex items-center gap-2 font-medium">
                    <span>{hubName(r.from)}</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{hubName(r.to)}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.date} · {r.pax} {t("common.passengers")}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={r.status === "completed" ? "secondary" : "default"}>
                    {t(`driver.${r.status}`)}
                  </Badge>
                  <p className="text-lg font-semibold text-primary">${r.fareUsd}</p>
                </div>
              </article>
            ))}
          </TabsContent>

          <TabsContent value="earnings" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                <DollarSign className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">{t("driver.thisMonth")}</p>
                <p className="text-3xl font-semibold">${earnings}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                <Wallet className="mb-3 h-5 w-5 text-accent" />
                <p className="text-sm text-muted-foreground">{t("driver.pendingPayout")}</p>
                <p className="text-3xl font-semibold">${pending}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                <CalendarDays className="mb-3 h-5 w-5 text-success" />
                <p className="text-sm text-muted-foreground">{t("driver.upcoming")}</p>
                <p className="text-3xl font-semibold">{driverRides.filter((r) => r.status !== "completed").length}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />

      <Dialog open={!!target} onOpenChange={(o) => !o && setTarget(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("driver.placeBid")}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>{t("driver.yourPrice")}</Label>
              <Input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>{t("driver.vehicle")}</Label>
              <Select value={vehicleId} onValueChange={setVehicleId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {me.vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>{v.label} · {v.seats}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>{t("driver.notes")}</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTarget(null)}>{t("common.cancel")}</Button>
            <Button onClick={submitBid} className="bg-gradient-primary text-primary-foreground hover:opacity-95">{t("driver.submitBid")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverPortal;
