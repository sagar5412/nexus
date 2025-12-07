import { atom } from "jotai";

export interface RealtimeMetrics {
  activeUsers: number;
  fps: number;
  serverLoad: number;
}

export const liveMetricsAtom = atom<RealtimeMetrics>({
  activeUsers: 1,
  fps: 60,
  serverLoad: 0.1,
});

export const connectionStatusAtom = atom<
  "connected" | "disconnected" | "error"
>("connected");
