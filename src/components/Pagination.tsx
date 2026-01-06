import { ChevronLeftIcon } from "@/components/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/components/Icons/ChevronRightIcon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  canGoNext,
  canGoPrevious,
  handleNextPage,
  handlePreviousPage,
}: PaginationProps) => {
  return (
    <div className="flex gap-2.5 text-black items-center">
      <ChevronLeftIcon
        className={`md:w-7 md:h-7 w-5.5 h-5.5 cursor-pointer ${
          canGoPrevious ? "text-black" : "text-gray-400"
        }`}
        onClick={handlePreviousPage}
      />
      <span className="xl:text-[1.375rem] text-[1.188rem]">
        {currentPage}/{totalPages}
      </span>
      <ChevronRightIcon
        className={`md:w-7 md:h-7 w-5.5 h-5.5 cursor-pointer ${
          canGoNext ? "text-black" : "text-gray-400"
        }`}
        onClick={handleNextPage}
      />
    </div>
  );
};

