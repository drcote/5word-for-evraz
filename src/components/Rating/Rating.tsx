import React from "react";
import convertSecToTime from "../../Utils/convertSecToTime";
import { Square } from "..";
import { RatingProps, StatusGame } from "./Rating.interface";
import "./Rating.scss";
import { TypeSquare } from "../Square/Square.interface";

export const Rating: React.FC<RatingProps> = (props) => {
  const { status, searchWord, time, onClose } = props;
  return (
    <div className="rating">
      <div className="formClose" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
        >
          <path
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="m4.757 4.757 8.486 8.486M4.757 13.243l8.486-8.486"
          />
        </svg>
      </div>
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
