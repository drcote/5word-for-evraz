import React from "react";
import { ButtonProps } from "./Button.interface";
import "./Button.scss";

export const Button: React.FC<ButtonProps> = (props) => {
  const { addNewWord } = props;
  return (
    <div className="button" onClick={addNewWord}>
      Сохранить
    </div>
  );
};
