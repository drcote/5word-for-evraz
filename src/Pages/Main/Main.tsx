import { random } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import {
  Board,
  StartGame,
  Rating,
  FirstGame,
  Modal,
  Information,
} from "../../components";
import { TypeMessage } from "../../components/Information/Infortation.interface";
import { StatusGame } from "../../components/Rating/Rating.interface";
import { LIBRARY } from "../../Static/wordLibrary5";
import convertSecToTime from "../../Utils/convertSecToTime";
import "./Main.scss";

export const Main: React.FC = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isFirstGame, setIsFirstGame] = useState<boolean>(false);
  const [isInformation, setIsInformation] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string[]>([]);
  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    const word = LIBRARY[random(0, LIBRARY.length - 1)];
    setSearchWord(word.toLowerCase().split(""));
  }, []);

  useEffect(() => {
    if (isStart ?? time === 0) {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  }, [isStart]);

  useEffect(() => {
    if (isEnd || isWin) {
      clearInterval(timer.current);
    }
  }, [isEnd, isWin]);

  return (
    <div className="main">
      {/* <div className="logo">Игра "5 букв"</div> */}
      <div className="headerMain">
        <div></div>
        <div className="themeWord">Тема: "Строительство"</div>
        <div className="timer">{convertSecToTime(time)}</div>
      </div>

      <div className="mainBoard">
        <Board
          setEnd={(end) => setIsEnd(end)}
          setWin={(win) => setIsWin(win)}
          searchWord={searchWord}
          isStart={isStart}
        />
      </div>
      <Modal isHide={isStart}>
        <StartGame onStart={() => setIsStart(true)} />
      </Modal>
      <Modal isHide={!isEnd}>
        <Rating
          status={isWin ? StatusGame.WIN : StatusGame.LOSS}
          searchWord={searchWord}
          time={time}
          onClose={() => {
            setIsEnd(false);
            setIsInformation(true);
          }}
        />
      </Modal>
      <Modal isHide={!isFirstGame}>
        <FirstGame onClose={() => setIsFirstGame(false)} />
      </Modal>
      <Modal isHide={!isInformation}>
        <Information typeMessage={TypeMessage.Start} />
      </Modal>
    </div>
  );
};
