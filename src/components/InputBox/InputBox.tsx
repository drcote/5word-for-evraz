import React from "react";
import { InputBoxProps } from "./InputBox.interface";
import clsx from "clsx";
import "./InputBox.scss";

export const InputBox: React.FC<InputBoxProps> = (props) => {
  const { id, addNewLetter, autoFocus } = props;
  return (
    <div className={clsx("square", "input")}>
      <input
        autoFocus={autoFocus}
        tabIndex={id + 1}
        maxLength={1}
        onChange={(e) => addNewLetter(e.target.value, id)}
      />
    </div>
  );
};
