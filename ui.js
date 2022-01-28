window.addEventListener('load', startGame);

let boardEl = document.getElementById('board');
let modalEl = document.getElementById('modal');
let resetButtons = document.getElementsByClassName('reset');

let modalVisibility = document.querySelector('.modal__window_hidden');
let winningLineVisibility = document.querySelector('.winning-line');

for (let btn of resetButtons) {
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');

      winningLineVisibility.classList.add('hidden');
      modalVisibility.classList.toggle('modal__window_show');
      winningLineVisibility.classList.remove('row-line')
      winningLineVisibility.classList.remove('column-line')

      winningLineVisibility.style.left = `0`;
      winningLineVisibility.style.top = `0`;

    }
    startGame();
  });
}

boardEl.addEventListener('click', function (event) {
  let targetClasses = event.target.classList;
  let targetData = event.target.dataset;
  if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
    click(targetData.row, targetData.col);
  }
});

function showWinner(winner) {
  let header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `🍾 Победил игрок №${winner + 1}! 🍾`;
  modalEl.classList.remove('hidden');

  winningLineVisibility.classList.remove('hidden');
  setTimeout(() => modalVisibility.classList.toggle('modal__window_show'), 500);
}

function renderBoard(board) {
  const fields = [];
  for (let [i, row] of board.entries()) {
    for (let [j, value] of row.entries()) {
      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-row="${i}" 
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};"
        >
          ${value || ''}
        </div>
      `);
    }
  }
  boardEl.innerHTML = fields.join('');
}

function showWinningLine(propertiesWinner) {
  console.log(propertiesWinner)

  if (propertiesWinner.typeOfWinning === 'row') {
    winningLineVisibility.classList.add('row-line')
    if (propertiesWinner.indexLine === '0') {
      winningLineVisibility.style.top = `6vw`;
    } 
    else {
      winningLineVisibility.style.top = `${6 + propertiesWinner.indexLine * 11.5}vw`;
    }
    console.log(winningLineVisibility.style.top);
  }

  if (propertiesWinner.typeOfWinning === 'column') {
    winningLineVisibility.classList.add('column-line')
    if (propertiesWinner.indexLine === '0') {
      winningLineVisibility.style.left = `6vw`;
    } 
    else {
      winningLineVisibility.style.left = `${6 + propertiesWinner.indexLine * 11.5}vw`;
    }
    console.log(winningLineVisibility.style.left);
  }



  /*
  if (propertiesWinner.indexLine === '1') {
    winningLineVisibility.style.top = `50%`;
  } 
  else if (propertiesWinner.indexLine === '0') {
    winningLineVisibility.style.top = `15%`;
  }
  else if (propertiesWinner.indexLine === '2') {
    winningLineVisibility.style.top = `85%`;
  }
  */
}