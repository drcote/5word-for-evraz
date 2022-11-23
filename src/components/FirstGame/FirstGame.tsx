import React, { useRef, useEffect } from "react";
import { Square } from "../../components";
import { TypeSquare } from "../Square/Square.interface";
import "./FirstGame.scss";
import { FirstGameProps } from "./FirstGameInterface";

export const FirstGame: React.FC<FirstGameProps> = (props) => {
  const { onClose, onStart } = props;
  const refFirstGame = useRef<HTMLDivElement>(null);

  const onOutsideClick = (e: any) => {
    if (refFirstGame && !refFirstGame.current?.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", onOutsideClick);
    return () => document.removeEventListener("click", onOutsideClick);
  }, []);

  return (
    <div className="firstGame" ref={refFirstGame}>
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
      <div className="caption">Игра "5 БУКВ"</div>
      <div className="desc">
        Цель игры: отгадать слово из 5 букв за 6 попыток.
      </div>
      <div className="letter">
        <Square key={1} letter="" typeSquare={TypeSquare.Empty} />
        <div className="letterDesc">Пустая ячейка</div>
      </div>
      <div className="letter">
        <Square key={2} letter="а" typeSquare={TypeSquare.NoLetter} />
        <div className="letterDesc">Эта буква не содержится в слове</div>
      </div>
      <div className="letter">
        <Square key={3} letter="а" typeSquare={TypeSquare.ThereLetter} />
        <div className="letterDesc">
          Эта буква есть в слове, но стоит не на своем месте
        </div>
      </div>
      <div className="letter">
        <Square key={4} letter="а" typeSquare={TypeSquare.ThisLetter} />
        <div className="letterDesc">
          Эта буква есть в слове и стоит на своем месте
        </div>
      </div>
      <div className="desc">При перезагрузке и закрытии окна, игра завершится автоматически.</div>
      <div style={{marginTop:'30px'}}>
        <div className="startGameButton" onClick={onStart}>Понятно, начнём</div>
      </div>
    </div>
  );
};
