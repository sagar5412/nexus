import { atom } from "jotai";

export interface SavedArt {
  id: string;
  name: string;
  thumbnail: string;
  date: Date;
}

export interface UserProfile {
  id: string;
  username: string;
  coins: number;
}

// Atoms
export const userAtom = atom<UserProfile | null>(null);
export const savedArtsAtom = atom<SavedArt[]>([]);
export const filterQueryAtom = atom("");

// Derived Atoms
export const filteredArtsAtom = atom((get) => {
  const arts = get(savedArtsAtom);
  const query = get(filterQueryAtom).toLowerCase();

  if (!query) return arts;
  return arts.filter((art) => art.name.toLowerCase().includes(query));
});

// Async Atom Simulation
export const fetchUserArtsAtom = atom(async () => {
  // Simulate fetch
  await new Promise((r) => setTimeout(r, 1000));
  return [
    { id: "1", name: "My First Fractal", thumbnail: "", date: new Date() },
  ] as SavedArt[];
});
