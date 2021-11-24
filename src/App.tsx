import React from "react";
import "./App.css";

type PositionType = {
  row: number;
  col: number;
};

/**
 * calculate a random index number for the provided max range
 * @param max max range
 * @returns index
 */
function getRandomIndex(max: number): number {
  const MIN_INDEX = 0;
  const res = Math.floor(Math.random() * (max - MIN_INDEX + 1) + MIN_INDEX);
  return res;
}

function App() {
  // sudoku dimension
  const SQUARE_DIMEN = 3;
  const DIMENSION = 9;

  const baseArray: number[] = new Array(DIMENSION).fill(0);
  // remove
  const finalArray: number[][] = [];

  for (let i = 0; i < DIMENSION; i++) {
    finalArray.push([...baseArray]);
  }

  const possibleValues: number[][][] = [];
  const possibArray: number[][] = [];
  for (let i = 0; i < DIMENSION; i++) possibArray.push([]);

  for (let i = 0; i < DIMENSION; i++) possibleValues.push([...possibArray]);

  /**
   *set random values based in available values
   * @param i row value
   * @param init column initial value
   * @param end column last value
   * @param availabeValues available values list for current square
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

  /**
   * set possibles values for a position
   * @param i row number
   * @param init initial col number
   * @param end end col number
   */
  const setPossibleValuesSquare = (i: number, init: number, end: number): void => {
    for (let j = init; j < end; j++) {
      const basicValuesList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const currentUsedNumbers: number[] = [];
      const arrayLength: number[][] = [];

      finalArray[i].map((item) => {
        if (item !== 0 && !currentUsedNumbers.includes(item)) currentUsedNumbers.push(item);
      });
      colValues[j].map((item) => {
        if (!currentUsedNumbers.includes(item)) currentUsedNumbers.push(item);
      });

      const currentPossVal = basicValuesList.filter((item) => !currentUsedNumbers.includes(item));

      arrayLength.push([...currentPossVal]);
      possibleValues[i][j] = [...currentPossVal];
    }
  };

  /**
   * extract values from possible values array and set the values to current square
   * @param i row number
   * @param init initial col number
   * @param end end col number
   */
  const setCurrentPossValSquare = (i: number, init: number, end: number): void => {
    for (let j = init; j < end; j++) {
      currentPossValues.push([...possibleValues[i][j]]);
    }
  };

  /**
   * set current position
   * @param selectedIndex index
   * @returns object with row and col values
   */
  const setCurrPos = (selectedIndex: number): PositionType => {
    switch (selectedIndex) {
      case 0:
        return { row: 0, col: 0 };
      case 1:
        return { row: 0, col: 1 };
      case 2:
        return { row: 0, col: 2 };
      case 3:
        return { row: 1, col: 0 };
      case 4:
        return { row: 1, col: 1 };
      case 5:
        return { row: 1, col: 2 };
      case 6:
        return { row: 2, col: 0 };
      case 7:
        return { row: 2, col: 1 };
      case 8:
        return { row: 2, col: 2 };
      default:
        console.error("error!! check setCurrPos function");
        return { row: 100, col: 100 };
    }
  };

  /**
   * Function ongoing ...
   * @param i
   * @param init
   */
  const setRegSquare = (i: number, init: number): void => {
    const usedValues: number[] = [];
    for (let j = 0; j < 9; j++) {
      const smallestLength = currentPossValues.reduce((a, b) => (a.length <= b.length ? a : b));
      const smallestLengthIndex = currentPossValues.indexOf(smallestLength);
      const currentValList = smallestLength.filter((item) => !usedValues.includes(item));

      const currentPosition = setCurrPos(smallestLengthIndex);

      const currentUsedNumbers: number[] = [];

      finalArray[i].map((item) => {
        if (item !== 0 && !currentUsedNumbers.includes(item)) currentUsedNumbers.push(item);
      });
      colValues[init + currentPosition.col].map((item) => {
        if (!currentUsedNumbers.includes(item)) currentUsedNumbers.push(item);
      });

      for (let pos = 0; pos < 9; pos++) {
        if (!currentUsedNumbers.includes(currentValList[pos])) usedValues.push(currentValList[pos]);
      }
      finalArray[i + currentPosition.row][init + currentPosition.col] = usedValues[j];
      colValues[j].push(usedValues[j]);

      currentValList.shift();
      for (let addValues = 0; addValues < 6; addValues++) {
        currentPossValues[smallestLengthIndex].push(i);
      }
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

  // fill possible values square Matrix.
  for (let i = 0; i < SQUARE_DIMEN; i++) {
    setPossibleValuesSquare(i, SQUARE_DIMEN, SQUARE_DIMEN * 2);
    setPossibleValuesSquare(i, SQUARE_DIMEN * 2, SQUARE_DIMEN * 3);
  }
  for (let i = SQUARE_DIMEN; i < SQUARE_DIMEN * 2; i++) {
    setPossibleValuesSquare(i, 0, SQUARE_DIMEN);
    setPossibleValuesSquare(i, SQUARE_DIMEN * 2, SQUARE_DIMEN * 3);
  }
  for (let i = SQUARE_DIMEN * 2; i < SQUARE_DIMEN * 3; i++) {
    setPossibleValuesSquare(i, 0, SQUARE_DIMEN);
    setPossibleValuesSquare(i, SQUARE_DIMEN, SQUARE_DIMEN * 2);
  }

  // fill current square values
  const currentPossValues: number[][] = [];
  for (let i = 0; i < SQUARE_DIMEN; i++) {
    if (i === 0) currentPossValues.length = 0;
    setCurrentPossValSquare(i, SQUARE_DIMEN, SQUARE_DIMEN * 2);

    //  setPossibleValuesSquare(i, SQUARE_DIMEN * 2, SQUARE_DIMEN * 3);
  }
  setRegSquare(0, SQUARE_DIMEN);

  for (let i = 0; i < SQUARE_DIMEN; i++) {
    if (i === 0) currentPossValues.length = 0;
    setCurrentPossValSquare(i, SQUARE_DIMEN * 2, SQUARE_DIMEN * 3);
  }
  setRegSquare(0, SQUARE_DIMEN * 2);

  return (
    <div className="App">
      <p>{finalArray[0]}</p>
      <p>{finalArray[1]}</p>
      <p>{finalArray[2]}</p>
      <p>{finalArray[3]}</p>
      <p>{finalArray[4]}</p>
      <p>{finalArray[5]}</p>
      <p>{finalArray[6]}</p>
      <p>{finalArray[7]}</p>
      <p>{finalArray[8]}</p>
    </div>
  );
}

export default App;
