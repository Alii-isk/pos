import { create } from "zustand";

const defaultState = {
  isProductModalOpen: false,

};

export interface IUI {
  isProductModalOpen: boolean;
  toggleProductModal: () => void;

}

export const useUIStore = create<IUI>((set, get) => ({
  ...defaultState,
  setIsProductModalOpen: (isProductModalOpen: boolean) =>
    set({ isProductModalOpen }),
    toggleProductModal: () =>
    set({ isProductModalOpen: !get().isProductModalOpen }),
}));
