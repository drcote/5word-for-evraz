import { random } from "lodash";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  createNewRecordRating,
  getAllWords,
  getCurrentUser,
  getRating,
  modifyRecordRaring,
} from "../../common";
import {
  Board,
  StartGame,
  Rating,
  FirstGame,
  Modal,
  Information,
} from "../../components";
import { TypeMessage } from "../../components/Information/Information.interface";
import { StatusGame } from "../../components/Rating/Rating.interface";
import {
  BASE_URL,
  LIST_RATING_GUID,
  LIST_WORLD_GUID,
} from "../../Static/consts";
import convertSecToTime from "../../Utils/convertSecToTime";
import "./Main.scss";

type InformationType = {
  typeMessage: TypeMessage;
  message: string;
};

type GameSettingsType = {
  group: string;
  theme: string;
  userId: number;
};

export const Main: React.FC = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isFirstGame, setIsFirstGame] = useState<boolean>(false);
  const [isInformation, setIsInformation] = useState<boolean>(false);
  const [information, setInformation] = useState<InformationType>({
    typeMessage: TypeMessage.Error,
    message: "Ошибка",
  });
  const [searchWord, setSearchWord] = useState<string[]>([]);
  const [gameSettings, setGameSettings] = useState<GameSettingsType>({
    group: "",
    theme: "",
    userId: 0,
  });
  const [userEmail, setUserEmail] = useState<string>("");
  const timer = useRef<NodeJS.Timer>();

  const prepareConfig = useCallback(async () => {
    const words = await getAllWords(BASE_URL, LIST_WORLD_GUID);
    const user = await getCurrentUser(BASE_URL);
    const ratingList = await getRating(BASE_URL, LIST_RATING_GUID);
    setUserEmail(user.email);
    const word = words.find(
      (item) => item.date.toDateString() === new Date().toDateString()
    );
    const futureWord = words.find((item) => item.date > new Date());
    const userRecords = ratingList.filter(
      (record) => record.userEmail === user.email
    );
    if (word && word.word !== "") {
      if (ratingList.length === 0 || userRecords.length === 0) {
        // Первая игра
        setIsFirstGame(true);
      }

      const userRecordToday = userRecords.find(
        (record) => record.date.toDateString() === new Date().toDateString()
      );
      if (userRecordToday) {
        setIsInformation(true);
        setInformation({ typeMessage: TypeMessage.End, message: "" });
      } else {
        await createNewRecordRating(
          BASE_URL,
          LIST_RATING_GUID,
          {
            userEmail: user.email,
            time: 3600,
            isWin: false,
            group: word.group,
            date: new Date(),
          }
        );
        const ratingListNew = await getRating(BASE_URL, LIST_RATING_GUID);
        const ratingToday = await ratingListNew.find(
          (item) => item.date.toDateString() === new Date().toDateString()
        );
        if (ratingToday) {
          setGameSettings({
            group: word.group,
            theme: word.theme,
            userId: ratingToday.id,
          });
          setSearchWord(word.word.toLowerCase().split(""));
        }
      }

      if (userRecordToday && futureWord) {
        setIsInformation(true);
        setInformation({
          typeMessage: TypeMessage.Continue,
          message: futureWord.date.toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      }
    }
    if (!word) {
      if (futureWord) {
        setIsInformation(true);
        setInformation({
          typeMessage: TypeMessage.Continue,
          message: futureWord.date.toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      } else {
        setIsInformation(true);
        setInformation({
          typeMessage: TypeMessage.Information,
          message: "Нет загаданного слова",
        });
      }
    }
  }, []);

  useEffect(() => {
    prepareConfig();
  }, [prepareConfig]);

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
      const body = {
        userEmail: userEmail,
        time: isWin ? time : 3600,
        isWin: isWin,
        group: gameSettings.group,
        date: new Date(),
      };
      modifyRecordRaring(BASE_URL, LIST_RATING_GUID, body, gameSettings.userId);
    }
  }, [isEnd, isWin]);

  return (
    <div className="main">
      <div className="headerMain">
        <div></div>
        <div className="themeWord">
          {gameSettings.theme ? `Тема: "${gameSettings.theme}"` : ""}
        </div>
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
            setInformation({ typeMessage: TypeMessage.End, message: "" });
          }}
        />
      </Modal>
      <Modal isHide={!isFirstGame}>
        <FirstGame onClose={() => setIsFirstGame(false)} />
      </Modal>
      <Modal isHide={!isInformation}>
        <Information information={information} />
      </Modal>
    </div>
  );
};
