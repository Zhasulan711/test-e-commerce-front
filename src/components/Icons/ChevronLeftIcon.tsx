import { DefaultIconComponentProps } from "../../types";

export const ChevronLeftIcon = ({
  className,
  onClick,
}: DefaultIconComponentProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.75 28.5L14.25 19L23.75 9.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
