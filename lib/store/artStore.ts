import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ArtState {
  artName: string;
  uniforms: Record<string, number>;
  color: number[];
  isPlaying: boolean;

  setArtName: (name: string) => void;
  setUniform: (key: string, value: number) => void;
  setColor: (rgb: number[]) => void;
  togglePlay: () => void;
  reset: () => void;
}

const INITIAL_STATE = {
  artName: "FractalFlow",
  uniforms: {
    complexity: 0.5,
    speed: 0.1,
  },
  color: [1, 0, 0],
  isPlaying: true,
};

export const useArtStore = create<ArtState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setArtName: (name) => set({ artName: name }),

      setUniform: (key, value) =>
        set((state) => ({
          uniforms: { ...state.uniforms, [key]: value },
        })),

      setColor: (rgb) => set({ color: rgb }),

      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      reset: () => set(INITIAL_STATE),
    }),
    {
      name: "nexus-art-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
