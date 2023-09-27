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
  increaseProductQuantity: (product: IProduct) => void;
  decreaseProductQuantity: (product: IProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<ICart>((set, get) => ({
  products: [],
  addProduct: (product: IProduct) => {
    const products = [...get().products];
    const productIndex = products.findIndex((p) => p.id === product.id);
    console.log("add",productIndex)
    if (productIndex === -1) {
      products.push(product);
      // change quantity to 1
      products[products.length - 1].quantity = 1;
      set({ products });
    } 
  },
  increaseProductQuantity: (product: IProduct) => {
    const products = [...get().products];
    const productIndex = products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      products[productIndex].quantity += 1;
    } else {
      get().addProduct(product);
    }
    set({ products });
  },
  decreaseProductQuantity: (product: IProduct) => {
    const products = [...get().products];
    const productIndex = products.findIndex((p) => p.id === product.id);
    // do not allow to decrease quantity below 0 if quantity is 0 remove product
    if (productIndex !== -1) {
      if (products[productIndex].quantity > 0) {
        products[productIndex].quantity -= 1;
      } else {
        get().removeProduct(product.id);
      }
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
