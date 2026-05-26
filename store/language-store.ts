import type { LanguageCode } from "@/types/learning";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type LanguageState = {
  selectedLanguageId: LanguageCode | null;
  _hasHydrated: boolean;
  setSelectedLanguage: (id: LanguageCode) => void;
  clearSelectedLanguage: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      _hasHydrated: false,
      setSelectedLanguage: (id) => set({ selectedLanguageId: id }),
      clearSelectedLanguage: () => set({ selectedLanguageId: null }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedLanguageId: state.selectedLanguageId,
      }),
      onRehydrateStorage: () => () => {
        useLanguageStore.getState().setHasHydrated(true);
      },
    }
  )
);

useLanguageStore.persist.onFinishHydration(() => {
  useLanguageStore.getState().setHasHydrated(true);
});

export async function clearLanguageStorage() {
  await useLanguageStore.persist.clearStorage();
  useLanguageStore.setState({
    selectedLanguageId: null,
    _hasHydrated: true,
  });
}
