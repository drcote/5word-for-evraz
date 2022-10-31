export interface SquareProps {
  typeSquare: TypeSquare;
  letter?: string;
}

export enum TypeSquare {
  NoLetter = "noLetter",
  ThisLetter = "thisLetter",
  ThereLetter = "thereLetter",
  Empty = "empty",
}
