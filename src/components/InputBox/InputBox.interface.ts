import { RefObject } from "react";

export interface InputBoxProps {
  id: number;
  letter: string | undefined;
  autoFocus?: boolean;
  addNewLetter: (letter: string, id: number) => void;
  getRef: (e: HTMLInputElement) => void;
}
