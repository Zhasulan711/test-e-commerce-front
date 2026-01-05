import type { MouseEventHandler } from "react";

export type DefaultIconComponentProps = {
  onClick?: MouseEventHandler<SVGSVGElement>;
  isActive?: boolean;
  className?: string;
};
