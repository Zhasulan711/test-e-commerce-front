import type { MouseEventHandler } from "react";

export type DefaultIconComponentProps = {
  onClick?: MouseEventHandler<SVGSVGElement>;
  isActive?: boolean;
  className?: string;
};

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
