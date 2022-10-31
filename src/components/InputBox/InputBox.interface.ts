export interface InputBoxProps {
  id: number;
  autoFocus?: boolean;
  addNewLetter: (letter: string, id: number) => void;
}