import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/Product";

interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (
    product: Product,
    selectedSize: string,
    selectedColor: string,
    quantity?: number
  ) => void;
  removeFromCart: (
    id: number,
    selectedSize: string,
    selectedColor: string
  ) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      hydrated: false,

      addToCart: (product, selectedSize, selectedColor, quantity = 1) => {
        const currentCart = get().cart;
        const existing = currentCart.find(
          (item) =>
            item.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
        );

        const updatedCart = existing
          ? currentCart.map((item) =>
              item.id === product.id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          : [
              ...currentCart,
              { ...product, selectedSize, selectedColor, quantity },
            ];

        set({ cart: updatedCart });
      },

      removeFromCart: (id, selectedSize, selectedColor) => {
        const filtered = get().cart.filter(
          (item) =>
            !(
              item.id === id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
            )
        );
        set({ cart: filtered });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "cart-storage") {
      const storedValue = event.newValue
        ? JSON.parse(event.newValue)
        : { state: { cart: [] } };
      useCartStore.setState({ cart: storedValue.state.cart });
    }
  });
}
