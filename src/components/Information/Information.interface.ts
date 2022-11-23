export interface InformationProps {
  information: {
    typeMessage: TypeMessage;
    message: string;
  };
}

export enum TypeMessage {
  End = "Игра закончена",
  Start = "Игра начнётся",
  Continue = "Следующая игра начнется",
  Error = "Игра настроена не правильно, обратитесь к администратору",
  Information = "",
}
