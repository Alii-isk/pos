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

export interface IProduct {
  id: number;
  name: string;
  price: number;
  photo: string;
  quantity: number;
}
export interface ICart {
  products: IProduct[];
  addProduct: (product: IProduct) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<ICart>((set, get) => ({
  products: [],
  addProduct: (product: IProduct) => {
    const products = [...get().products];
    const productIndex = products.findIndex((p) => p.id === product.id);
    if (productIndex === -1) {
      products.push(product);
    } else {
      products[productIndex].quantity += product.quantity;
    }
    set({ products });
  },
  removeProduct: (productId: number) => {
    const products = [...get().products];
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
    }
    set({ products });
  },
  clearCart: () => set({ products: [] }),
}));
