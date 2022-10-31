import clsx from "clsx";
import React from "react";
import { SquareProps } from "./Square.interface";
import "./Square.scss";

export const Square: React.FC<SquareProps> = (props) => {
  const { id, letter, typeSquare, autoFocus, addNewLetter } = props;
  return (
    <div className={clsx("square", typeSquare)}>
      <div>{letter}</div>
    </div>
  );
};
