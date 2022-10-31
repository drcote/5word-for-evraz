import { RefObject } from "react";

export interface InputBoxProps {
  id: number;
  autoFocus?: boolean;
  addNewLetter: (letter: string, id: number) => void;
  getRef: (e: HTMLInputElement) => void;
}
