export interface RatingProps {
  status: StatusGame;
  searchWord: string[];
  time: number;
  onClose: () => void;
}

export enum StatusGame {
  WIN = "победили",
  LOSS = "проиграли",
}
