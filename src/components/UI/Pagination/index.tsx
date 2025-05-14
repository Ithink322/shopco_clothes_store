import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const generatePages = () => {
    const pages: (number | string)[] = [];

    const lastPage = totalPages;
    const secondLastPage = totalPages - 1;

    if (totalPages <= (isMobile ? 5 : 7)) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (isMobile) {
      if (currentPage <= 2) {
        pages.push(1, 2, "...", secondLastPage, lastPage);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, 2, "...", secondLastPage, lastPage);
      } else {
        pages.push(1, 2, "...", currentPage, lastPage);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", secondLastPage, lastPage);
      } else if (currentPage >= secondLastPage) {
        pages.push(1, 2, 3, "...", secondLastPage, lastPage);
      } else {
        pages.push(1, 2, 3, "...", currentPage, secondLastPage, lastPage);
      }
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className={styles["pagination"]}>
      <button
        className={styles["pagination__prev-btn"]}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6668 6.00004H1.3335M1.3335 6.00004L6.00016 10.6667M1.3335 6.00004L6.00016 1.33337"
            stroke="black"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Previous
      </button>
      <div>
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className={styles["break"]}>
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={
                currentPage === page ? styles["active"] : styles["page"]
              }
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className={styles["pagination__next-btn"]}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.3335 6.00004H10.6668M10.6668 6.00004L6.00016 1.33337M10.6668 6.00004L6.00016 10.6667"
            stroke="black"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
