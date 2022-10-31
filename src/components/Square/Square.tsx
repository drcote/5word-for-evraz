import clsx from "clsx";
import React from "react";
import { SquareProps, TypeSquare } from "./Square.interface";
import "./Square.scss";

export const Square: React.FC<SquareProps> = (props) => {
  const { id, letter, typeSquare, autoFocus, addNewLetter } = props;
  return (
    <div className={clsx("square", typeSquare)}>
      {typeSquare === TypeSquare.Input ? (
        <input
          autoFocus={autoFocus}
          tabIndex={id + 1}
          maxLength={1}
          onChange={(e) => addNewLetter(e.target.value, id)}
        />
      ) : (
        <div>{letter}</div>
      )}
    </div>
  );
};
