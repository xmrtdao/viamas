import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { Bid, estimateBase, generateBid } from "@/data/mock";

export interface RideRequest {
  id: string;
  from: string;
  to: string;
  customTo?: string;
  date: string;
  time: string;
  pax: number;
  bags: number;
  budgetUsd?: number;
  createdAt: number;
}

interface State {
  request?: RideRequest;
  bids: Bid[];
  acceptedBidId?: string;
  bookingCode?: string;
}

interface Ctx extends State {
  createRequest: (r: Omit<RideRequest, "id" | "createdAt">) => void;
  addBid: (b: Bid) => void;
  acceptBid: (id: string) => void;
  confirmBooking: () => string;
  reset: () => void;
}

const STORAGE_KEY = "via-ride-state";
const RideContext = createContext<Ctx | undefined>(undefined);

const load = (): State => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as State) : { bids: [] };
  } catch {
    return { bids: [] };
  }
};

export const RideProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>(load);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const scheduleBids = useCallback((from: string, to: string) => {
    const base = estimateBase(from, to);
    timers.current.forEach(clearTimeout);
    timers.current = [3000, 6000, 9000].map((delay, i) =>
      window.setTimeout(() => {
        setState((prev) => (prev.acceptedBidId ? prev : { ...prev, bids: [...prev.bids, generateBid(base, i)] }));
      }, delay),
    );
  }, []);

  const createRequest = useCallback(
    (r: Omit<RideRequest, "id" | "createdAt">) => {
      const request: RideRequest = { ...r, id: `req-${Date.now()}`, createdAt: Date.now() };
      setState({ request, bids: [] });
      scheduleBids(r.from, r.to);
    },
    [scheduleBids],
  );

  const addBid = useCallback((b: Bid) => {
    setState((prev) => ({ ...prev, bids: [...prev.bids, b] }));
  }, []);

  const acceptBid = useCallback((id: string) => {
    timers.current.forEach(clearTimeout);
    setState((prev) => ({ ...prev, acceptedBidId: id }));
  }, []);

  const confirmBooking = useCallback(() => {
    const code = `VIA-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setState((prev) => ({ ...prev, bookingCode: code }));
    return code;
  }, []);

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setState({ bids: [] });
  }, []);

  return (
    <RideContext.Provider value={{ ...state, createRequest, addBid, acceptBid, confirmBooking, reset }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const ctx = useContext(RideContext);
  if (!ctx) throw new Error("useRide must be used inside RideProvider");
  return ctx;
};
