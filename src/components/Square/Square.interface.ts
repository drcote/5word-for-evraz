export interface SquareProps {
  id: number;
  typeSquare: TypeSquare;
  autoFocus?: boolean;
  letter?: string;
  addNewLetter: (letter: string, id: number) => void;
}

export enum TypeSquare {
  Input = "input",
  NoLetter = "noLetter",
  ThisLetter = "thisLetter",
  ThereLetter = "thereLetter",
  Empty = "empty",
}
