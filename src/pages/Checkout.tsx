import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Loader2, ShieldCheck, Smartphone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteSummary from "@/components/RouteSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LanguageContext";
import { useRide } from "@/context/RideContext";
import { drivers } from "@/data/mock";

const Checkout = () => {
  const { t } = useLang();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { request, bids, acceptedBidId, confirmBooking } = useRide();
  const [method, setMethod] = useState<"card" | "sinpe">("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

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
  const fee = Math.round(bid.priceUsd * 0.08);
  const total = bid.priceUsd + fee;

  const pay = () => {
    if (method === "card" && (!card.number || !card.expiry || !card.cvc)) {
      toast({ title: t("checkout.error.card"), variant: "destructive" });
      return;
    }
    if (method === "sinpe" && !reference.trim()) {
      toast({ title: t("checkout.error.ref"), variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      confirmBooking();
      navigate("/confirmation");
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">{t("checkout.title")}</h1>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <RouteSummary request={request} />

            <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <h2 className="mb-4 font-semibold">{t("checkout.method")}</h2>
              <RadioGroup value={method} onValueChange={(v) => setMethod(v as "card" | "sinpe")} className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3">
                  <RadioGroupItem value="card" id="pay-card" />
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{t("checkout.card")}</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3">
                  <RadioGroupItem value="sinpe" id="pay-sinpe" />
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{t("checkout.sinpe")}</span>
                </label>
              </RadioGroup>

              {method === "card" ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label>{t("checkout.cardNumber")}</Label>
                    <Input inputMode="numeric" placeholder="4242 4242 4242 4242" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("checkout.expiry")}</Label>
                    <Input placeholder="12/28" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>{t("checkout.cvc")}</Label>
                    <Input placeholder="123" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">{t("checkout.sinpeNote")}</p>
                  <Label>{t("checkout.reference")}</Label>
                  <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="123456789" />
                </div>
              )}

              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" /> {t("checkout.simulated")}
              </p>
            </section>

            <section className="rounded-2xl border border-border/60 bg-secondary/40 p-5">
              <h2 className="mb-2 font-semibold">{t("checkout.policy")}</h2>
              <p className="text-sm text-muted-foreground">{t("checkout.policyBody")}</p>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-border/60 bg-card p-5 shadow-card lg:sticky lg:top-24">
            <h2 className="mb-4 font-semibold">{t("checkout.fare")}</h2>
            <div className="mb-4 flex items-center gap-3">
              <img src={driver.photo} alt={driver.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-medium">{driver.name}</p>
                <p className="text-sm text-muted-foreground">{driver.company}</p>
              </div>
            </div>
            <Separator />
            <dl className="my-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">{t("checkout.ride")}</dt><dd>${bid.priceUsd}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">{t("checkout.fee")}</dt><dd>${fee}</dd></div>
            </dl>
            <Separator />
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-medium">{t("checkout.totalDue")}</span>
              <span className="text-3xl font-semibold text-primary">${total}</span>
            </div>
            <Button onClick={pay} disabled={loading} size="lg" className="mt-5 w-full bg-gradient-primary text-primary-foreground hover:opacity-95">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("checkout.processing")}</> : t("checkout.pay")}
            </Button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
