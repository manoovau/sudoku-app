import React from "react";
import "./App.css";

/**
 * calculate a random number for the provided range
 * @param min min range number
 * @param max max range number
 * @returns random number
 */
function randomNumSudoku(): number {
  // sudoku number range is 1 to 9
  const MIN_NUMBER = 1;
  const MAX_NUMBER = 9;
  return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1) + MIN_NUMBER);
}

function getRandomIndex(max: number): number {
  const MIN_INDEX = 0;
  console.log("max value inside getRandomIndex " + max);
  const res = Math.floor(Math.random() * (max - MIN_INDEX + 1) + MIN_INDEX);
  return res;
}

function isZero(value: number): boolean {
  if (value === 0) return true;
  return false;
}

function compareNumbers(value1: number, value2: number): boolean {
  if (value1 === value2) return true;
  return false;
}

function App() {
  // sudoku dimension
  const SQUARE_DIMEN = 3;
  const DIMENSION = 9;

  const tests = randomNumSudoku();

  const baseArray: number[] = new Array(DIMENSION).fill(0);
  // remove
  const finalArray: number[][] = [];

  for (let i = 0; i < DIMENSION; i++) {
    finalArray.push([...baseArray]);
  }
  console.log("Initial final array");
  console.log(finalArray);

  /**
   *
   * @param i
   * @param init
   * @param end
   * @param availabeValues
   */
  const setDiagonalSquare = (
    i: number,
    init: number,
    end: number,
    availabeValues: number[],
  ): void => {
    for (let j = init; j < end; j++) {
      const index = getRandomIndex(availabeValues.length - 1);
      finalArray[i][j] = availabeValues[index];
      availabeValues.splice(index, 1);
    }
  };

  // fill diagonal square Matrix.
  const currentSquare: number[] = [];
  for (let i = 0; i < DIMENSION; i++) {
    if (i < 3) {
      if (i === 0) for (let i = 0; i < finalArray[0].length; i++) currentSquare.push(i + 1);
      setDiagonalSquare(i, 0, SQUARE_DIMEN, currentSquare);
    }

    if (i > 2 && i < 6) {
      if (i === 3) for (let i = 0; i < finalArray[0].length; i++) currentSquare.push(i + 1);
      setDiagonalSquare(i, SQUARE_DIMEN, SQUARE_DIMEN * 2, currentSquare);
    }

    if (i > 5) {
      if (i === 6) for (let i = 0; i < finalArray[0].length; i++) currentSquare.push(i + 1);
      setDiagonalSquare(i, SQUARE_DIMEN * 2, SQUARE_DIMEN * 3, currentSquare);
    }
  }

  const colValues: number[][] = [
    [finalArray[0][0], finalArray[1][0], finalArray[2][0]],
    [finalArray[0][1], finalArray[1][1], finalArray[2][1]],
    [finalArray[0][2], finalArray[1][2], finalArray[2][2]],
    [finalArray[3][3], finalArray[4][3], finalArray[5][3]],
    [finalArray[3][4], finalArray[4][4], finalArray[5][4]],
    [finalArray[3][5], finalArray[4][5], finalArray[5][5]],
    [finalArray[6][6], finalArray[7][6], finalArray[8][6]],
    [finalArray[6][7], finalArray[7][7], finalArray[8][7]],
    [finalArray[6][8], finalArray[7][8], finalArray[8][8]],
  ];

  const temp = [randomNumSudoku(), randomNumSudoku(), randomNumSudoku()];
  console.log("temp");
  console.log(temp);

  return <div className="App">{temp}</div>;
}

export default App;
