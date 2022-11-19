export interface InformationProps {
  typeMessage: TypeMessage;
}

export enum TypeMessage {
  End = "Игра закончена",
  Start = "Игра начнётся",
  Continue = "Следующая игра начнется",
}
