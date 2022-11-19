import React, { useCallback, useEffect, useState } from "react";
import { Button, Square, InputBox } from "..";
import { COUNT_WORDS, WORD_LENGTH } from "../../Static/consts";
import convertRelativeIndexToWordIndex from "../../Utils/convertRelativeIndexToWordIndex";
import { TypeSquare } from "../Square/Square.interface";
import { isEmpty } from "lodash";
import "./Board.scss";
import { LIBRARY } from "../../Static/wordLibrary5";
import { BoardProps } from "./Board.interface";

interface newLetterType {
  id: number;
  letter: string;
}

export const Board: React.FC<BoardProps> = (props) => {
  const { searchWord, isStart, setEnd, setWin } = props;

  const [words, setWords] = useState<string[]>([]);
  const [newLetters, setNewLetters] = useState<newLetterType[]>([]);
  const [refInputs, setRefInputs] = useState<HTMLInputElement[]>([]);

  useEffect(() => {
    const entireSearchWord = searchWord.join("");
    const maxCountWords = words.length / WORD_LENGTH;

    for (let countWords = 0; countWords <= maxCountWords; countWords++) {
      const lastIndex = countWords * WORD_LENGTH;
      const firstIndex = lastIndex - WORD_LENGTH;
      const word = words.slice(firstIndex, lastIndex).join("");

      if (
        !isEmpty(words) &&
        !isEmpty(searchWord) &&
        entireSearchWord === word
      ) {
        // выигрыш
        setEnd(true);
        setWin(true);
      }
      if (words.length === WORD_LENGTH * COUNT_WORDS) {
        // проигрыш
        setWin(false);
        setEnd(true);
      }
    }
  }, [words]);

  const addNewLetter = (letter: string, id: number): void => {
    const focusNextElement = (absoluteId: number): void => {
      const id = convertRelativeIndexToWordIndex(absoluteId);
      if (id + 1 < WORD_LENGTH) {
        refInputs[id + 1].focus();
      }
    };
    const focusPrevElement = (absoluteId: number): void => {
      const id = convertRelativeIndexToWordIndex(absoluteId);
      if (id > 0) {
        refInputs[id - 1].focus();
      }
    };
    const letterIndex = newLetters.findIndex((item) => item.id === id);
    if (letterIndex > -1) {
      const updateNewLetters = newLetters.map((item) => {
        if (item.id === id) {
          return { id, letter };
        }
        return item;
      });
      if (letter !== "") {
        focusNextElement(id);
      } else {
        focusPrevElement(id);
      }
      return setNewLetters(updateNewLetters);
    }
    focusNextElement(id);
    return setNewLetters((items) => [...items, { id, letter }]);
  };

  const addNewWord = (): void => {
    newLetters.sort((a, b) => (a.id > b.id ? 1 : -1));
    const newWord = newLetters
      .map((letter) => letter.letter)
      .join("")
      .toLowerCase();
    if (LIBRARY.includes(newWord)) {
      newLetters.forEach((letter) =>
        setWords((word) => [...word, letter.letter.toLowerCase()])
      );
      setNewLetters([]);
      setRefInputs([]);
    } else {
      console.log("Не правильное слово");
    }
  };

  const saveInputRef = useCallback((e: HTMLInputElement) => {
    if (e) {
      setRefInputs((refs) => [...refs, e]);
    }
  }, []);

  const renderSquares = (count: number) => {
    let content: JSX.Element[] = [];
    let inputCount = 0;

    for (let i = 0; i < count; i++) {
      let typeSquare = TypeSquare.Empty;
      let letter = undefined;
      let autoFocus = false;
      if (words[i] === undefined) {
        if (inputCount < WORD_LENGTH) {
          autoFocus = inputCount === 0 ? true : false;
          inputCount++;
          content.push(
            <InputBox
              getRef={saveInputRef}
              autoFocus={autoFocus}
              key={i}
              id={i}
              addNewLetter={addNewLetter}
              letter={newLetters.find((item) => item.id === i)?.letter}
            />
          );
        } else {
          content.push(<Square key={i} typeSquare={TypeSquare.Empty} />);
        }
      } else {
        letter = words[i];
        const wordIndex = convertRelativeIndexToWordIndex(i);
        if (words[i] === searchWord[wordIndex]) {
          typeSquare = TypeSquare.ThisLetter;
        } else {
          if (searchWord.includes(words[i])) {
            typeSquare = TypeSquare.ThereLetter;
          } else {
            typeSquare = TypeSquare.NoLetter;
          }
        }
        content.push(
          <Square key={i} letter={letter} typeSquare={typeSquare} />
        );
      }
    }
    return content;
  };

  const renderSquaresEmpty = (count: number) => {
    let i = 0;
    const content: JSX.Element[] = [];
    while (i < count) {
      content.push(<Square key={i} letter="" typeSquare={TypeSquare.Empty} />);
      i++;
    }
    return content;
  };

  const renderButton = useCallback(() => {
    return (
      newLetters.length === WORD_LENGTH &&
      isEmpty(newLetters.filter((item) => item.letter === ""))
    );
  }, [newLetters]);

  return (
    <>
      <div className="boardTable">
        {isStart
          ? renderSquares(WORD_LENGTH * COUNT_WORDS)
          : renderSquaresEmpty(WORD_LENGTH * COUNT_WORDS)}
      </div>
      {renderButton() ? <Button addNewWord={addNewWord} /> : null}
    </>
  );
};
