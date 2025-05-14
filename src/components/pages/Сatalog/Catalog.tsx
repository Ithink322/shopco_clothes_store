"use client";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Product } from "@/types/Product";
import ProductCard from "@/components/UI/ProductCard";
import noUiSlider, { API } from "nouislider";
import "nouislider/dist/nouislider.css";
import styles from "./styles.module.scss";
import cn from "clsx";
import { useFilterStore } from "@/store/filterStore";
import Pagination from "@/components/UI/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/app/utils/helpers";

interface SliderElement extends HTMLDivElement {
  noUiSlider?: API;
}

export const Catalog = () => {
  const t = useTranslations();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/catalog/getProducts");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch catalog products", err);
      }
    };

    fetchProducts();
  }, []);

  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false);
  const toggleFiltersMenu = () => setIsFiltersMenuOpen((prev) => !prev);

  const mobileSliderRef = useRef<HTMLDivElement | null>(null);
  const deskSliderRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { priceRange, setPriceRange, applyFilters } = useFilterStore();
  const handleApplyFilters = () => {
    applyFilters();
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ref = isMobile ? mobileSliderRef : deskSliderRef;
    if (!ref.current) return;

    const el = ref.current as SliderElement;

    if (el.noUiSlider) {
      el.noUiSlider.destroy();
    }

    noUiSlider.create(el, {
      start: priceRange,
      connect: true,
      range: { min: 80, max: 240 },
      step: 1,
      tooltips: [true, true],
      format: {
        to: (value) => `$${Math.round(value)}`,
        from: (value) => Number((value as string).replace("$", "")),
      },
    });

    el.noUiSlider?.on("change", (values: (number | string)[]) => {
      const parsed = values.map((v) =>
        typeof v === "string" ? Number(v.replace("$", "")) : v
      ) as [number, number];
      setPriceRange(parsed);
    });
  }, [isMobile, isFiltersMenuOpen, priceRange]);
  const {
    selectedColors,
    selectedSizes,
    appliedColors,
    appliedSizes,
    appliedPriceRange,
    toggleColor,
    toggleSize,
  } = useFilterStore();

  const colors = [
    "#00C12B",
    "#F50606",
    "#F5DD06",
    "#F57906",
    "#06CAF5",
    "#063AF5",
    "#7D06F5",
    "#F506A4",
    "#FFFFFF",
    "#000000",
  ];

  const sizes = [
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  }, [currentPage]);

  const { getFilteredProducts } = useFilterStore();
  const filteredProducts = getFilteredProducts(products);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { sortingCategory, setSortingCategory } = useFilterStore();
  const sortingCategories = ["Casual", "Formal", "Party", "Gym"];

  const handleCategorySelect = (category: string) => {
    setSortingCategory(category);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("paginate", category);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const paginateParam = searchParams.get("paginate");

    if (paginateParam) {
      setSortingCategory(paginateParam);
    } else {
      setSortingCategory(null);
    }
  }, [searchParams]);

  return (
    <div className={styles["container"]}>
      {searchParams.get("paginate") && (
        <span className={styles["container__sorting-category"]}>
          {t("Catalog.Models in category")} “
          {t(`FiltersMenu.${sortingCategory}`)}”
        </span>
      )}
      <div className={styles["container__texts"]}>
        <h1 className={styles["container__title"]}>Catalog</h1>
        <span className={styles["container__counter"]}>
          Showing 1-9 of {products.length} Products
        </span>
      </div>
      <div
        onClick={toggleFiltersMenu}
        className={styles["container__filters-btn"]}
      >
        <svg
          className={styles["container__filters-icon"]}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.75 7.75V13.5C8.75 13.6989 8.67098 13.8897 8.53033 14.0303C8.38968 14.171 8.19891 14.25 8 14.25C7.80109 14.25 7.61032 14.171 7.46967 14.0303C7.32902 13.8897 7.25 13.6989 7.25 13.5V7.75C7.25 7.55109 7.32902 7.36032 7.46967 7.21967C7.61032 7.07902 7.80109 7 8 7C8.19891 7 8.38968 7.07902 8.53033 7.21967C8.67098 7.36032 8.75 7.55109 8.75 7.75ZM12.5 12C12.3011 12 12.1103 12.079 11.9697 12.2197C11.829 12.3603 11.75 12.5511 11.75 12.75V13.5C11.75 13.6989 11.829 13.8897 11.9697 14.0303C12.1103 14.171 12.3011 14.25 12.5 14.25C12.6989 14.25 12.8897 14.171 13.0303 14.0303C13.171 13.8897 13.25 13.6989 13.25 13.5V12.75C13.25 12.5511 13.171 12.3603 13.0303 12.2197C12.8897 12.079 12.6989 12 12.5 12ZM14 9.5H13.25V2.5C13.25 2.30109 13.171 2.11032 13.0303 1.96967C12.8897 1.82902 12.6989 1.75 12.5 1.75C12.3011 1.75 12.1103 1.82902 11.9697 1.96967C11.829 2.11032 11.75 2.30109 11.75 2.5V9.5H11C10.8011 9.5 10.6103 9.57902 10.4697 9.71967C10.329 9.86032 10.25 10.0511 10.25 10.25C10.25 10.4489 10.329 10.6397 10.4697 10.7803C10.6103 10.921 10.8011 11 11 11H14C14.1989 11 14.3897 10.921 14.5303 10.7803C14.671 10.6397 14.75 10.4489 14.75 10.25C14.75 10.0511 14.671 9.86032 14.5303 9.71967C14.3897 9.57902 14.1989 9.5 14 9.5ZM3.5 10C3.30109 10 3.11032 10.079 2.96967 10.2197C2.82902 10.3603 2.75 10.5511 2.75 10.75V13.5C2.75 13.6989 2.82902 13.8897 2.96967 14.0303C3.11032 14.171 3.30109 14.25 3.5 14.25C3.69891 14.25 3.88968 14.171 4.03033 14.0303C4.17098 13.8897 4.25 13.6989 4.25 13.5V10.75C4.25 10.5511 4.17098 10.3603 4.03033 10.2197C3.88968 10.079 3.69891 10 3.5 10ZM5 7.5H4.25V2.5C4.25 2.30109 4.17098 2.11032 4.03033 1.96967C3.88968 1.82902 3.69891 1.75 3.5 1.75C3.30109 1.75 3.11032 1.82902 2.96967 1.96967C2.82902 2.11032 2.75 2.30109 2.75 2.5V7.5H2C1.80109 7.5 1.61032 7.57902 1.46967 7.71967C1.32902 7.86032 1.25 8.05109 1.25 8.25C1.25 8.44891 1.32902 8.63968 1.46967 8.78033C1.61032 8.92098 1.80109 9 2 9H5C5.19891 9 5.38968 8.92098 5.53033 8.78033C5.67098 8.63968 5.75 8.44891 5.75 8.25C5.75 8.05109 5.67098 7.86032 5.53033 7.71967C5.38968 7.57902 5.19891 7.5 5 7.5ZM9.5 4.5H8.75V2.5C8.75 2.30109 8.67098 2.11032 8.53033 1.96967C8.38968 1.82902 8.19891 1.75 8 1.75C7.80109 1.75 7.61032 1.82902 7.46967 1.96967C7.32902 2.11032 7.25 2.30109 7.25 2.5V4.5H6.5C6.30109 4.5 6.11032 4.57902 5.96967 4.71967C5.82902 4.86032 5.75 5.05109 5.75 5.25C5.75 5.44891 5.82902 5.63968 5.96967 5.78033C6.11032 5.92098 6.30109 6 6.5 6H9.5C9.69891 6 9.88968 5.92098 10.0303 5.78033C10.171 5.63968 10.25 5.44891 10.25 5.25C10.25 5.05109 10.171 4.86032 10.0303 4.71967C9.88968 4.57902 9.69891 4.5 9.5 4.5Z"
            fill="black"
          />
        </svg>
      </div>
      {isFiltersMenuOpen && (
        <div>
          <div className={styles["filters-menu-bg"]}></div>
          <div className={styles["filters-menu"]}>
            <div className={styles["filters-menu__content"]}>
              <span className={styles["filters-menu__title"]}>
                {t(`FiltersMenu.Filters`)}
              </span>
              <button
                onClick={toggleFiltersMenu}
                className={styles["filters-menu__close-btn"]}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2882 11.9617C13.4644 12.1378 13.5633 12.3767 13.5633 12.6258C13.5633 12.8749 13.4644 13.1137 13.2882 13.2898C13.1121 13.466 12.8733 13.5649 12.6242 13.5649C12.3751 13.5649 12.1362 13.466 11.9601 13.2898L6.99997 8.32812L2.03825 13.2883C1.86213 13.4644 1.62326 13.5633 1.37418 13.5633C1.12511 13.5633 0.886243 13.4644 0.710122 13.2883C0.534002 13.1122 0.435059 12.8733 0.435059 12.6242C0.435059 12.3751 0.534002 12.1363 0.710122 11.9602L5.67184 7L0.711685 2.03828C0.535564 1.86216 0.436621 1.62329 0.436621 1.37422C0.436621 1.12515 0.535564 0.886277 0.711685 0.710157C0.887805 0.534036 1.12668 0.435093 1.37575 0.435093C1.62482 0.435093 1.86369 0.534036 2.03981 0.710157L6.99997 5.67188L11.9617 0.709375C12.1378 0.533255 12.3767 0.434312 12.6257 0.434312C12.8748 0.434312 13.1137 0.533255 13.2898 0.709375C13.4659 0.885496 13.5649 1.12437 13.5649 1.37344C13.5649 1.62251 13.4659 1.86138 13.2898 2.0375L8.32809 7L13.2882 11.9617Z"
                    fill="rgba(0,0,0,0.4)"
                  />
                </svg>
              </button>
            </div>
            <div className={styles["filters-menu__body"]}>
              <span className={styles["filters-menu__category"]}>
                {t(`FiltersMenu.T-shirts`)}
              </span>
              <span className={styles["filters-menu__category"]}>
                {t(`FiltersMenu.Shorts`)}
              </span>
              <span className={styles["filters-menu__category"]}>
                {t(`FiltersMenu.Shirts`)}
              </span>
              <span className={styles["filters-menu__category"]}>
                {t(`FiltersMenu.Hoodie`)}
              </span>
              <span className={styles["filters-menu__category"]}>
                {t(`FiltersMenu.Jeans`)}
              </span>
            </div>
            <div className={styles["slider-range"]}>
              <span className={styles["slider-range__title"]}>
                {t(`FiltersMenu.Price`)}
              </span>
              <div
                ref={mobileSliderRef}
                className={styles["slider-range__range"]}
                id="range-slider"
              ></div>
            </div>
            <div className={styles["filters-menu__colors"]}>
              <span className={styles["filters-menu__title"]}>
                {t(`FiltersMenu.Colors`)}
              </span>
              <div className={styles["filters-menu__color-circles"]}>
                {colors.map((color, index) => (
                  <button
                    onClick={() => toggleColor(color)}
                    key={index}
                    style={{
                      width: "37px",
                      height: "37px",
                      backgroundColor: color,
                      border: "1px solid rgba(0,0,0,0.2)",
                      borderRadius: "50%",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    className={cn(styles["filters-menu__color-btn"], {
                      [styles["selected"]]: selectedColors.includes(color),
                    })}
                    title={color}
                  >
                    {selectedColors.includes(color) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          pointerEvents: "none",
                        }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles["filters-menu__sizes"]}>
              <span className={styles["filters-menu__title"]}>
                {t(`FiltersMenu.Size`)}
              </span>
              <div className={styles["filters-menu__size-btns"]}>
                {sizes.map((size, index) => (
                  <button
                    onClick={() => toggleSize(size)}
                    key={index}
                    className={cn(styles["filters-menu__size-btn"], {
                      [styles["selected"]]: selectedSizes.includes(size),
                    })}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles["filters-menu__dress-style"]}>
              <span className={styles["filters-menu__title"]}>
                {t(`FiltersMenu.Dress Style`)}
              </span>
              <div className={styles["filters-menu__container"]}>
                {sortingCategories.map((category) => (
                  <span
                    key={category}
                    className={`${styles["filters-menu__category"]} ${
                      sortingCategory === category ? styles.active : ""
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {t(`FiltersMenu.${category}`)}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleApplyFilters}
              className={styles["filters-menu__apply-filter-btn"]}
            >
              {t(`FiltersMenu.Apply Filter`)}
            </button>
          </div>
        </div>
      )}
      <div className={cn(styles["filters-menu"], styles["filters-menu--desk"])}>
        <div className={styles["filters-menu__content"]}>
          <span className={styles["filters-menu__title"]}>
            {t(`FiltersMenu.Filters`)}
          </span>
          <svg
            className={styles["container__filters-icon"]}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 7.75V13.5C8.75 13.6989 8.67098 13.8897 8.53033 14.0303C8.38968 14.171 8.19891 14.25 8 14.25C7.80109 14.25 7.61032 14.171 7.46967 14.0303C7.32902 13.8897 7.25 13.6989 7.25 13.5V7.75C7.25 7.55109 7.32902 7.36032 7.46967 7.21967C7.61032 7.07902 7.80109 7 8 7C8.19891 7 8.38968 7.07902 8.53033 7.21967C8.67098 7.36032 8.75 7.55109 8.75 7.75ZM12.5 12C12.3011 12 12.1103 12.079 11.9697 12.2197C11.829 12.3603 11.75 12.5511 11.75 12.75V13.5C11.75 13.6989 11.829 13.8897 11.9697 14.0303C12.1103 14.171 12.3011 14.25 12.5 14.25C12.6989 14.25 12.8897 14.171 13.0303 14.0303C13.171 13.8897 13.25 13.6989 13.25 13.5V12.75C13.25 12.5511 13.171 12.3603 13.0303 12.2197C12.8897 12.079 12.6989 12 12.5 12ZM14 9.5H13.25V2.5C13.25 2.30109 13.171 2.11032 13.0303 1.96967C12.8897 1.82902 12.6989 1.75 12.5 1.75C12.3011 1.75 12.1103 1.82902 11.9697 1.96967C11.829 2.11032 11.75 2.30109 11.75 2.5V9.5H11C10.8011 9.5 10.6103 9.57902 10.4697 9.71967C10.329 9.86032 10.25 10.0511 10.25 10.25C10.25 10.4489 10.329 10.6397 10.4697 10.7803C10.6103 10.921 10.8011 11 11 11H14C14.1989 11 14.3897 10.921 14.5303 10.7803C14.671 10.6397 14.75 10.4489 14.75 10.25C14.75 10.0511 14.671 9.86032 14.5303 9.71967C14.3897 9.57902 14.1989 9.5 14 9.5ZM3.5 10C3.30109 10 3.11032 10.079 2.96967 10.2197C2.82902 10.3603 2.75 10.5511 2.75 10.75V13.5C2.75 13.6989 2.82902 13.8897 2.96967 14.0303C3.11032 14.171 3.30109 14.25 3.5 14.25C3.69891 14.25 3.88968 14.171 4.03033 14.0303C4.17098 13.8897 4.25 13.6989 4.25 13.5V10.75C4.25 10.5511 4.17098 10.3603 4.03033 10.2197C3.88968 10.079 3.69891 10 3.5 10ZM5 7.5H4.25V2.5C4.25 2.30109 4.17098 2.11032 4.03033 1.96967C3.88968 1.82902 3.69891 1.75 3.5 1.75C3.30109 1.75 3.11032 1.82902 2.96967 1.96967C2.82902 2.11032 2.75 2.30109 2.75 2.5V7.5H2C1.80109 7.5 1.61032 7.57902 1.46967 7.71967C1.32902 7.86032 1.25 8.05109 1.25 8.25C1.25 8.44891 1.32902 8.63968 1.46967 8.78033C1.61032 8.92098 1.80109 9 2 9H5C5.19891 9 5.38968 8.92098 5.53033 8.78033C5.67098 8.63968 5.75 8.44891 5.75 8.25C5.75 8.05109 5.67098 7.86032 5.53033 7.71967C5.38968 7.57902 5.19891 7.5 5 7.5ZM9.5 4.5H8.75V2.5C8.75 2.30109 8.67098 2.11032 8.53033 1.96967C8.38968 1.82902 8.19891 1.75 8 1.75C7.80109 1.75 7.61032 1.82902 7.46967 1.96967C7.32902 2.11032 7.25 2.30109 7.25 2.5V4.5H6.5C6.30109 4.5 6.11032 4.57902 5.96967 4.71967C5.82902 4.86032 5.75 5.05109 5.75 5.25C5.75 5.44891 5.82902 5.63968 5.96967 5.78033C6.11032 5.92098 6.30109 6 6.5 6H9.5C9.69891 6 9.88968 5.92098 10.0303 5.78033C10.171 5.63968 10.25 5.44891 10.25 5.25C10.25 5.05109 10.171 4.86032 10.0303 4.71967C9.88968 4.57902 9.69891 4.5 9.5 4.5Z"
              fill="rgba(0,0,0,0.4)"
            />
          </svg>
        </div>
        <div className={styles["filters-menu__body"]}>
          <span className={styles["filters-menu__category"]}>
            {t(`FiltersMenu.T-shirts`)}
          </span>
          <span className={styles["filters-menu__category"]}>
            {t(`FiltersMenu.Shorts`)}
          </span>
          <span className={styles["filters-menu__category"]}>
            {t(`FiltersMenu.Shirts`)}
          </span>
          <span className={styles["filters-menu__category"]}>
            {t(`FiltersMenu.Hoodie`)}
          </span>
          <span className={styles["filters-menu__category"]}>
            {t(`FiltersMenu.Jeans`)}
          </span>
        </div>
        <div className={styles["slider-range"]}>
          <span className={styles["slider-range__title"]}>
            {t(`FiltersMenu.Price`)}
          </span>
          <div
            ref={deskSliderRef}
            className={styles["slider-range__range"]}
            id="range-slider"
          ></div>
        </div>
        <div className={styles["filters-menu__colors"]}>
          <span className={styles["filters-menu__title"]}>
            {t(`FiltersMenu.Colors`)}
          </span>
          <div className={styles["filters-menu__color-circles"]}>
            {colors.map((color, index) => (
              <button
                onClick={() => toggleColor(color)}
                key={index}
                style={{
                  width: "37px",
                  height: "37px",
                  backgroundColor: color,
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  position: "relative",
                }}
                className={cn(styles["filters-menu__color-btn"], {
                  [styles["selected"]]: selectedColors.includes(color),
                })}
                title={color}
              >
                {selectedColors.includes(color) && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5306 5.03063L6.5306 13.0306C6.46092 13.1005 6.37813 13.156 6.28696 13.1939C6.1958 13.2317 6.09806 13.2512 5.99935 13.2512C5.90064 13.2512 5.8029 13.2317 5.71173 13.1939C5.62057 13.156 5.53778 13.1005 5.4681 13.0306L1.9681 9.53063C1.89833 9.46087 1.84299 9.37804 1.80524 9.28689C1.76748 9.19574 1.74805 9.09804 1.74805 8.99938C1.74805 8.90072 1.76748 8.80302 1.80524 8.71187C1.84299 8.62072 1.89833 8.53789 1.9681 8.46813C2.03786 8.39837 2.12069 8.34302 2.21184 8.30527C2.30299 8.26751 2.40069 8.24808 2.49935 8.24808C2.59801 8.24808 2.69571 8.26751 2.78686 8.30527C2.87801 8.34302 2.96083 8.39837 3.0306 8.46813L5.99997 11.4375L13.4693 3.96938C13.6102 3.82848 13.8013 3.74933 14.0006 3.74933C14.1999 3.74933 14.391 3.82848 14.5318 3.96938C14.6727 4.11028 14.7519 4.30137 14.7519 4.50063C14.7519 4.69989 14.6727 4.89098 14.5318 5.03188L14.5306 5.03063Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className={styles["filters-menu__sizes"]}>
          <span className={styles["filters-menu__title"]}>
            {t(`FiltersMenu.Size`)}
          </span>
          <div className={styles["filters-menu__size-btns"]}>
            {sizes.map((size, index) => (
              <button
                onClick={() => toggleSize(size)}
                key={index}
                className={cn(styles["filters-menu__size-btn"], {
                  [styles["selected"]]: selectedSizes.includes(size),
                })}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className={styles["filters-menu__dress-style"]}>
          <span className={styles["filters-menu__title"]}>
            {t(`FiltersMenu.Dress Style`)}
          </span>
          <div className={styles["filters-menu__container"]}>
            {sortingCategories.map((category) => (
              <span
                key={category}
                className={`${styles["filters-menu__category"]} ${
                  sortingCategory === category ? styles.active : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {t(`FiltersMenu.${category}`)}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleApplyFilters}
          className={styles["filters-menu__apply-filter-btn"]}
        >
          {t(`FiltersMenu.Apply Filter`)}
        </button>
      </div>
      <div>
        {paginatedProducts.length === 0 ? (
          <p className={styles["container__no-results-message"]}>
            {t(`Catalog.No results message`)}
          </p>
        ) : (
          <div className={styles["container__products-list"]}>
            {paginatedProducts.map((product) => (
              <Link
                href={`/catalog/${slugify(product.title)}/${product.id}`}
                key={product.id}
              >
                <ProductCard
                  product={product}
                  className="product-card--small"
                  heroClassName="product-card__hero--small"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
