import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

type store = {
  order: OrderItem[];
  addToCard: (product: Product) => void;
  incrementItem: (id: Product["id"]) => void;
  decrementItem: (id: Product["id"]) => void;
  deleteItem: (id: Product["id"]) => void;
  clearOrder: () => void;
};

export const useStore = create<store>((set, get) => ({
  order: [],
  addToCard: (product) => {
    const { categoryId, image, ...data } = product;
    let order: OrderItem[] = [];
    if (get().order.find((item) => item.id === product.id)) {
      order = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      );
    } else {
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }

    set(() => ({
      order,
    }));
  },
  incrementItem: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decrementItem: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.price * (item.quantity - 1),
            }
          : item
      ),
    }));
  },
  deleteItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },
  clearOrder: () => {
    set(() => ({
      order: [],
    }));
  },
}));
