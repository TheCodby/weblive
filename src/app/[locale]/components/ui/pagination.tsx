import React from "react";
import LocaleLink from "../locale-link";
import Button from "./button";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
interface PaginationProps {
  currentPage: number;
  pages: number;
  path: string;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pages,
  path,
}) => {
  const shownPages = Array.from(Array(pages).keys())
    .map((pageN) => {
      return pageN + 1;
    })
    .filter(
      (pageNum: number) =>
        pageNum >= currentPage - 2 && pageNum <= currentPage + 2
    );
  return (
    <div className="flex flex-row gap-3 justify-center">
      {!shownPages.includes(1) && (
        <LocaleLink href={`${path}?page=1`}>
          <Button
            className={`bg-gray-200 h-full hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
          >
            <FaArrowCircleLeft />
          </Button>
        </LocaleLink>
      )}
      {shownPages.map((page) => {
        return (
          <LocaleLink href={`${path}?page=${page}`} key={page}>
            <Button
              className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center disabled:bg-gray-300 disabled:dark:bg-neutral-950 disabled:animate-none shadow-none`}
              disabled={page === currentPage}
            >
              {page}
            </Button>
          </LocaleLink>
        );
      })}
      {!shownPages.includes(pages) && (
        <LocaleLink href={`${path}?page=${pages}`}>
          <Button
            className={`bg-gray-200 h-full hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
          >
            <FaArrowCircleRight />
          </Button>
        </LocaleLink>
      )}
    </div>
  );
};

export default Pagination;
