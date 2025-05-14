import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/Product";

interface WishlistState {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        const exists = get().wishlist.some((p) => p.id === product.id);
        set({
          wishlist: exists
            ? get().wishlist.filter((p) => p.id !== product.id)
            : [...get().wishlist, product],
        });
      },
      isInWishlist: (id) => get().wishlist.some((p) => p.id === id),
    }),
    {
      name: "wishlist-storage", // key in localStorage
    }
  )
);
