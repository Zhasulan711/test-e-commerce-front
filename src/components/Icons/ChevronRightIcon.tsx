import { DefaultIconComponentProps } from "../../types";

export const ChevronRightIcon = ({
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
        d="M14.2939 28.5901L23.8234 19.0607L14.2939 9.53125"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
