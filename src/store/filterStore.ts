import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/Product";

interface FilterState {
  selectedColors: string[];
  selectedSizes: string[];
  priceRange: [number, number];
  appliedColors: string[];
  appliedSizes: string[];
  appliedPriceRange: [number, number];
  toggleColor: (color: string) => void;
  toggleSize: (size: string) => void;
  setPriceRange: (range: [number, number]) => void;
  applyFilters: () => void;
  getFilteredProducts: (products: Product[]) => Product[];
  sortingCategory: string | null;
  setSortingCategory: (category: string | null) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      selectedColors: [],
      selectedSizes: [],
      priceRange: [80, 240],
      appliedColors: [],
      appliedSizes: [],
      appliedPriceRange: [80, 240],
      sortingCategory: null,

      toggleColor: (color) =>
        set((state) => ({
          selectedColors: state.selectedColors.includes(color)
            ? state.selectedColors.filter((c) => c !== color)
            : [...state.selectedColors, color],
        })),

      toggleSize: (size) =>
        set((state) => ({
          selectedSizes: state.selectedSizes.includes(size)
            ? state.selectedSizes.filter((s) => s !== size)
            : [...state.selectedSizes, size],
        })),

      setPriceRange: (range) => set({ priceRange: range }),

      applyFilters: () =>
        set((state) => ({
          appliedColors: state.selectedColors,
          appliedSizes: state.selectedSizes,
          appliedPriceRange: state.priceRange,
        })),

      getFilteredProducts: (products) => {
        const {
          appliedColors,
          appliedSizes,
          appliedPriceRange,
          sortingCategory,
        } = get();

        return products.filter((product) => {
          const productColors = product.colors || [];
          const productSizes = product.sizes || [];
          const productCategory = product.sortingCategory;

          const matchesColor =
            appliedColors.length === 0 ||
            productColors.some((color) => appliedColors.includes(color));

          const matchesSize =
            appliedSizes.length === 0 ||
            productSizes.some((size) => appliedSizes.includes(size));

          const price = parseFloat(product.currentPrice.replace("$", ""));
          const matchesPrice =
            price >= appliedPriceRange[0] && price <= appliedPriceRange[1];

          const matchesCategory =
            !sortingCategory || productCategory === sortingCategory;

          return matchesColor && matchesSize && matchesPrice && matchesCategory;
        });
      },
      setSortingCategory: (category) => set({ sortingCategory: category }),
    }),
    {
      name: "filter-storage",
    }
  )
);
