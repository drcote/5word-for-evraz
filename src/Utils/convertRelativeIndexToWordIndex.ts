import { WORD_LENGTH } from "../Static/consts";

function convertRelativeIndexToWordIndex(relativeIndex: number):number {

  const numberOfLines = Math.trunc(relativeIndex/WORD_LENGTH);
  return relativeIndex - numberOfLines * WORD_LENGTH;
}

export default convertRelativeIndexToWordIndex;