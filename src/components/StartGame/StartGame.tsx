import React from "react";
import { StartGameProps } from "./StartGame.interface";
import "./StartGame.scss";

export const StartGame: React.FC<StartGameProps> = (props) => {
  const { onStart } = props;
  return (
    <div className="startGame">
      <div onClick={onStart} className="startGameButton">
        Поехали
      </div>
    </div>
  );
};
