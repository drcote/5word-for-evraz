import React, { useCallback, useEffect, useState } from "react";
import { Button, Square, InputBox } from "..";
import { COUNT_WORDS, WORD_LENGTH } from "../../Static/consts";
import convertRelativeIndexToWordIndex from "../../Utils/convertRelativeIndexToWordIndex";
import { TypeSquare } from "../Square/Square.interface";
import { isEmpty, random } from "lodash";
import "./Board.scss";
import { LIBRARY } from "../../Static/wordLibrary5";
import { Modal } from "@mui/material";

interface newLetterType {
  id: number;
  letter: string;
}

export const Board = () => {
  const [searchWord, setSearchWord] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [newLetters, setNewLetters] = useState<newLetterType[]>([]);
  const [refInputs, setRefInputs] = useState<HTMLInputElement[]>([]);

  const [showSearchWord, setShowSearchWord] = useState<boolean>(false); // вывести искомое слово
  const [showNewLetters, setShowNewLetters] = useState<boolean>(false); // вывести введенное слово

  useEffect(() => {
    const word = LIBRARY[random(0, LIBRARY.length - 1)];
    setSearchWord(word.toLowerCase().split(""));
  }, []);
  // console.log(searchWord);
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
        // alert("Ответ верный");
        // setWords([]);
      }
      if (words.length === WORD_LENGTH * COUNT_WORDS) {
        setWords([]);
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

  console.log(newLetters);

  const addNewWord = (): void => {
    newLetters.sort((a, b) => (a.id > b.id ? 1 : -1));
    const newWord = newLetters
      .map((letter) => letter.letter)
      .join("")
      .toLowerCase();
    // console.log(newWord);
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

  // console.log(refInputs);

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

  const renderButton = useCallback(() => {
    return (
      newLetters.length === WORD_LENGTH &&
      isEmpty(newLetters.filter((item) => item.letter === ""))
    );
  }, [newLetters]);

  return (
    <div>
      <div className="boardTable">
        {renderSquares(WORD_LENGTH * COUNT_WORDS)}
      </div>
      {renderButton() ? <Button addNewWord={addNewWord} /> : null}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          alignContent: "space-between",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => setShowSearchWord(!showSearchWord)}>
          Загаданное слово
        </button>
        <button onClick={() => setShowNewLetters(!showNewLetters)}>
          Введенное слово
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "space-between",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "25px",
            visibility: showSearchWord ? "visible" : "hidden",
          }}
        >
          {searchWord}
        </div>
        <div
          style={{
            fontSize: "25px",
            visibility: showNewLetters ? "visible" : "hidden",
          }}
        >
          {newLetters
            .map((letter) => letter.letter)
            .join("")
            .toLowerCase()}
        </div>
      </div>
    </div>
  );
};
