import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "es";

type Dict = Record<string, { en: string; es: string }>;

export const dict: Dict = {
  "brand.tagline": { en: "Private transport marketplace", es: "Mercado de transporte privado" },
  "nav.how": { en: "How it works", es: "Cómo funciona" },
  "nav.routes": { en: "Popular routes", es: "Rutas populares" },
  "nav.drivers": { en: "Driver portal", es: "Portal de conductores" },
  "nav.request": { en: "My request", es: "Mi solicitud" },

  "hero.title": { en: "Name your price for travel in Costa Rica", es: "Ponle precio a tu viaje en Costa Rica" },
  "hero.subtitle": {
    en: "Post your route once. Verified local drivers and shuttle operators compete with their best rates.",
    es: "Publica tu ruta una vez. Conductores y operadores locales verificados compiten con sus mejores tarifas.",
  },
  "hero.badge": { en: "Live driver bidding", es: "Ofertas de conductores en vivo" },

  "widget.pickup": { en: "Pickup location", es: "Lugar de recogida" },
  "widget.dropoff": { en: "Dropoff location", es: "Lugar de destino" },
  "widget.custom": { en: "Other address…", es: "Otra dirección…" },
  "widget.customPlaceholder": { en: "Type the exact address", es: "Escribe la dirección exacta" },
  "widget.date": { en: "Date", es: "Fecha" },
  "widget.time": { en: "Time", es: "Hora" },
  "widget.pax": { en: "Passengers", es: "Pasajeros" },
  "widget.luggage": { en: "Bags", es: "Maletas" },
  "widget.budget": { en: "Target budget (USD, optional)", es: "Presupuesto objetivo (USD, opcional)" },
  "widget.submit": { en: "Request bids", es: "Pedir ofertas" },
  "widget.select": { en: "Select…", es: "Selecciona…" },
  "widget.error.pickup": { en: "Choose a pickup location.", es: "Elige un lugar de recogida." },
  "widget.error.dropoff": { en: "Choose a dropoff location.", es: "Elige un lugar de destino." },
  "widget.error.same": { en: "Pickup and dropoff must be different.", es: "La recogida y el destino deben ser distintos." },
  "widget.error.date": { en: "Pick a date and time.", es: "Elige fecha y hora." },
  "widget.error.custom": { en: "Type the custom address.", es: "Escribe la dirección personalizada." },

  "how.title": { en: "How Via works", es: "Cómo funciona Via" },
  "how.1.title": { en: "Request your route", es: "Solicita tu ruta" },
  "how.1.body": { en: "Tell us where and when. No account, no calls, no haggling by message.", es: "Dinos dónde y cuándo. Sin cuenta, sin llamadas, sin regatear por mensaje." },
  "how.2.title": { en: "Local drivers bid", es: "Los conductores ofertan" },
  "how.2.body": { en: "Certified operators send real prices with vehicle, perks and ratings attached.", es: "Operadores certificados envían precios reales con vehículo, extras y calificaciones." },
  "how.3.title": { en: "Choose and ride", es: "Elige y viaja" },
  "how.3.body": { en: "Accept the bid you like, pay by card or SINPE Móvil, and chat on WhatsApp.", es: "Acepta la oferta que prefieras, paga con tarjeta o SINPE Móvil y coordina por WhatsApp." },

  "routes.title": { en: "Popular routes", es: "Rutas populares" },
  "routes.subtitle": { en: "Average winning bids from the last 30 days.", es: "Ofertas ganadoras promedio de los últimos 30 días." },
  "routes.avg": { en: "avg. winning bid", es: "oferta ganadora prom." },
  "routes.duration": { en: "drive time", es: "tiempo de viaje" },
  "routes.use": { en: "Use this route", es: "Usar esta ruta" },

  "req.title": { en: "Your ride request", es: "Tu solicitud de viaje" },
  "req.searching": { en: "Searching for available drivers in your area…", es: "Buscando conductores disponibles en tu zona…" },
  "req.rolling": { en: "Bids rolling in", es: "Ofertas llegando" },
  "req.bids": { en: "Live bids", es: "Ofertas en vivo" },
  "req.none": { en: "No request yet. Start one from the home page.", es: "Aún no hay solicitud. Inicia una desde la página principal." },
  "req.newRequest": { en: "New request", es: "Nueva solicitud" },
  "req.lowest": { en: "Lowest bid", es: "Oferta más baja" },
  "req.count": { en: "bids received", es: "ofertas recibidas" },
  "req.accept": { en: "Accept bid & book", es: "Aceptar oferta y reservar" },
  "req.trips": { en: "trips", es: "viajes" },
  "req.verified": { en: "Certified Tourist Transport", es: "Transporte Turístico Certificado" },
  "req.total": { en: "total", es: "total" },

  "driver.title": { en: "Driver & operator portal", es: "Portal de conductores y operadores" },
  "driver.subtitle": { en: "Bid on live passenger requests across Costa Rica.", es: "Oferta en solicitudes de pasajeros en vivo por toda Costa Rica." },
  "driver.available": { en: "Available requests", es: "Solicitudes disponibles" },
  "driver.active": { en: "My active rides", es: "Mis viajes activos" },
  "driver.earnings": { en: "Earnings", es: "Ingresos" },
  "driver.placeBid": { en: "Place a bid", es: "Enviar oferta" },
  "driver.yourPrice": { en: "Your price (USD)", es: "Tu precio (USD)" },
  "driver.vehicle": { en: "Vehicle from your fleet", es: "Vehículo de tu flota" },
  "driver.notes": { en: "Notes & amenities", es: "Notas y extras" },
  "driver.submitBid": { en: "Submit bid", es: "Enviar oferta" },
  "driver.bidSent": { en: "Bid sent to the passenger.", es: "Oferta enviada al pasajero." },
  "driver.budget": { en: "Passenger budget", es: "Presupuesto del pasajero" },
  "driver.currentLow": { en: "Current lowest bid", es: "Oferta más baja actual" },
  "driver.pending": { en: "Awaiting passenger", es: "Esperando al pasajero" },
  "driver.confirmed": { en: "Confirmed", es: "Confirmado" },
  "driver.completed": { en: "Completed", es: "Completado" },
  "driver.paidOut": { en: "Paid out", es: "Pagado" },
  "driver.upcoming": { en: "Upcoming trips", es: "Viajes próximos" },
  "driver.thisMonth": { en: "This month", es: "Este mes" },
  "driver.pendingPayout": { en: "Pending payout", es: "Pago pendiente" },

  "checkout.title": { en: "Confirm and pay", es: "Confirmar y pagar" },
  "checkout.fare": { en: "Fare summary", es: "Resumen de la tarifa" },
  "checkout.ride": { en: "Ride fare", es: "Tarifa del viaje" },
  "checkout.fee": { en: "Via service fee", es: "Comisión de Via" },
  "checkout.totalDue": { en: "Total due", es: "Total a pagar" },
  "checkout.method": { en: "Payment method", es: "Método de pago" },
  "checkout.card": { en: "Credit or debit card", es: "Tarjeta de crédito o débito" },
  "checkout.sinpe": { en: "SINPE Móvil transfer", es: "Transferencia SINPE Móvil" },
  "checkout.sinpeNote": { en: "Send to 8615-0055 and keep your reference number.", es: "Envía al 8615-0055 y guarda tu número de referencia." },
  "checkout.cardNumber": { en: "Card number", es: "Número de tarjeta" },
  "checkout.expiry": { en: "Expiry", es: "Vencimiento" },
  "checkout.cvc": { en: "CVC", es: "CVC" },
  "checkout.reference": { en: "SINPE reference", es: "Referencia SINPE" },
  "checkout.policy": { en: "Cancellation policy", es: "Política de cancelación" },
  "checkout.policyBody": { en: "Free cancellation up to 24 hours before pickup. After that, 50% of the fare is retained by the driver.", es: "Cancelación gratuita hasta 24 horas antes de la recogida. Después, el conductor retiene el 50% de la tarifa." },
  "checkout.pay": { en: "Pay and confirm ride", es: "Pagar y confirmar viaje" },
  "checkout.processing": { en: "Processing…", es: "Procesando…" },
  "checkout.error.card": { en: "Enter your full card details.", es: "Ingresa los datos completos de la tarjeta." },
  "checkout.error.ref": { en: "Enter your SINPE reference.", es: "Ingresa tu referencia SINPE." },
  "checkout.simulated": { en: "Payments are simulated in this demo.", es: "Los pagos son simulados en esta demostración." },

  "done.title": { en: "Your ride is confirmed", es: "Tu viaje está confirmado" },
  "done.body": { en: "Your driver has your route and will meet you at the pickup point.", es: "Tu conductor tiene tu ruta y te esperará en el punto de recogida." },
  "done.whatsapp": { en: "Message driver on WhatsApp", es: "Escribir al conductor por WhatsApp" },
  "done.home": { en: "Back to home", es: "Volver al inicio" },
  "done.code": { en: "Booking code", es: "Código de reserva" },

  "common.passengers": { en: "passengers", es: "pasajeros" },
  "common.bags": { en: "bags", es: "maletas" },
  "common.back": { en: "Back", es: "Volver" },
  "common.cancel": { en: "Cancel", es: "Cancelar" },
  "footer.rights": { en: "Via Costa Rica. Demo marketplace.", es: "Via Costa Rica. Mercado de demostración." },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict | string) => string;
}

const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("via-lang");
    return stored === "es" || stored === "en" ? stored : "en";
  });

  useEffect(() => {
    localStorage.setItem("via-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const t = useCallback((key: string) => dict[key]?.[lang] ?? key, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
