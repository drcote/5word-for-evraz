export interface BoardProps {
  searchWord: string[];
  isStart: boolean;
  setWin: (win: boolean) => void;
  setEnd: (end: boolean) => void;
}
