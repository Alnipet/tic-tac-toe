let players = ['x', 'o'];
let activePlayer = 0;
let board;

function startGame() {

  //очищаем массив
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  //рендерим игровое поле
  renderBoard(board);
};

function click(rowNumber, columnNumber) {

  let propertiesWinner;

  //записываем в массив результат события
  board[rowNumber][columnNumber] = players[activePlayer];

  //рендерим игровое поле
  renderBoard(board);

  function rowValidation() {
    let counterInRow = 0;

    //проходим по строке поля, ищем выигрышную комбинацию
    for (let indexInRow in board[rowNumber]) {
      if (board[rowNumber][indexInRow] === players[activePlayer]) {
        counterInRow++;
        if (counterInRow === board[rowNumber].length) {
          return propertiesWinner = {typeOfWinning: 'row', indexLine: rowNumber};
        }
      }
    }
  }

  function columnValidation() {
    let counterInColumn = 0;

    //проходим по строке поля, ищем выигрышную комбинацию
    for (let indexInColumn = 0; indexInColumn < board.length; indexInColumn++) {
      if (board[indexInColumn][columnNumber] === players[activePlayer]) {
        counterInColumn++;
        if (counterInColumn === board.length) {
          return propertiesWinner = {typeOfWinning: 'column', indexLine: columnNumber};
        }
      }
    }
  }

  function leftDiagValidation() {
    let counterInLeftDiag = 0;

    //проходим по левой диагонали поля, ищем выигрышную комбинацию
    for (let indexLeftDiag in board[rowNumber]) {
      let counterInRightDiag = 0;
      if (board[indexLeftDiag][indexLeftDiag] === players[activePlayer]) {
        counterInLeftDiag++;
        if (counterInLeftDiag === board.length) {
          return propertiesWinner = {typeOfWinning: 'left', indexLine: null};
        }
      }
    }
  }

  function rightDiagValidation() {
    let counterInRightDiag = 0;
    let rowNumberDiag = 0;

    //проходим по правой диагонали поля, ищем выигрышную комбинацию
    for (let indexRightDiag = board[rowNumber].length - 1; indexRightDiag >= 0; indexRightDiag--) {
      if (board[rowNumberDiag][indexRightDiag] === players[activePlayer]) {
        counterInRightDiag++;
        rowNumberDiag++;
        if (counterInRightDiag === board[rowNumber].length) {
          return propertiesWinner = {typeOfWinning: 'right', indexLine: null};
        }
      }
    }
  }

  function playerChange() {
    if (activePlayer === 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }
    return activePlayer;
  }

  // проверяем есть ли выигрышные комбинации 
  if (rowValidation() || columnValidation() || leftDiagValidation() || rightDiagValidation()) {
    showWinner(activePlayer);
    showWinningLine(propertiesWinner)
  }
  else {
    //победных комбинаций нет, меняем игрока
    playerChange()
  }
}