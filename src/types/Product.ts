export interface Product {
  id: number;
  hero?: string;
  heroes: string[];
  title: string;
  currentPrice: string;
  previousPrice?: string;
  discount?: string;
  desc: string;
  colors: string[];
  sizes: string[];
  averageRating?: number;
  sortingCategory?: string;
}
