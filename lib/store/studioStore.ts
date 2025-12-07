import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface ArtState {
  artName: string;
  uniforms: Record<string, any>;
}

interface StudioState extends ArtState {
  history: ArtState[];
  historyIndex: number;
  setArtName: (name: string) => void;
  setUniform: (key: string, value: any) => void;
  undo: () => void;
  redo: () => void;
  saveSnapshot: () => void;
}

export const useStudioStore = create<StudioState>()(
  subscribeWithSelector((set, get) => ({
    artName: "FractalFlow",
    uniforms: {
      time: { value: 0 }, // managed mostly by canvas rAF
      complexity: { value: 0.5 },
      speed: { value: 0.1 },
      color1: { value: [1, 0, 0] },
    },
    history: [],
    historyIndex: -1,

    setArtName: (name) => set({ artName: name }),

    setUniform: (key, value) => {
      set((state) => ({
        uniforms: {
          ...state.uniforms,
          [key]: { ...state.uniforms[key], value },
        },
      }));
    },

    saveSnapshot: () => {
      const { artName, uniforms, history, historyIndex } = get();
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ artName, uniforms });

      // Limit history size
      if (newHistory.length > 20) newHistory.shift();

      set({
        history: newHistory,
        historyIndex: newHistory.length - 1,
      });
    },

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex > 0) {
        const prevState = history[historyIndex - 1];
        set({
          artName: prevState.artName,
          uniforms: prevState.uniforms,
          historyIndex: historyIndex - 1,
        });
      }
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex < history.length - 1) {
        const nextState = history[historyIndex + 1];
        set({
          artName: nextState.artName,
          uniforms: nextState.uniforms,
          historyIndex: historyIndex + 1,
        });
      }
    },
  })),
);
