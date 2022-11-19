import React from "react";
import convertSecToTime from "../../Utils/convertSecToTime";
import { Square } from "..";
import { RatingProps } from "./Rating.interface";
import "./Rating.scss";
import { TypeSquare } from "../Square/Square.interface";

export const Rating: React.FC<RatingProps> = (props) => {
  const { status, searchWord, time } = props;
  return (
    <div className="rating">
      <div>Вы {status}</div>
      <div>Загаданное слово:</div>
      <div className="word">
        {searchWord.map((letter, id) => (
          <Square typeSquare={TypeSquare.ThisLetter} key={id} letter={letter} />
        ))}
      </div>
      <div>Потраченное время: {convertSecToTime(time)}</div>
      <div>Место в рейтинге: 1</div>
    </div>
  );
};
