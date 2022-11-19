export interface RatingProps {
  status: StatusGame;
  searchWord: string[];
  time: number;
}

export enum StatusGame {
  WIN = "победили",
  LOSS = "проиграли",
}
