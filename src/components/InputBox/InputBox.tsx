import React, { RefObject } from "react";
import { InputBoxProps } from "./InputBox.interface";
import clsx from "clsx";
import "./InputBox.scss";

export const InputBox: React.FC<InputBoxProps> = (props) => {
  const { id, addNewLetter, autoFocus, getRef } = props;
  return (
    <div className={clsx("square", "input")}>
      <input
        ref={getRef}
        autoFocus={autoFocus}
        tabIndex={id + 1}
        maxLength={1}
        onChange={(e) => addNewLetter(e.target.value, id)}
        type="text"
      />
    </div>
  );
};
