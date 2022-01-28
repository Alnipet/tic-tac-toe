window.addEventListener('load', startGame);

let boardEl = document.getElementById('board');
let modalEl = document.getElementById('modal');
let resetButtons = document.getElementsByClassName('reset');

let modalVisibility = document.querySelector('.modal__window_hidden');
let winningLineVisibility = document.getElementById('winning-line');

for (let btn of resetButtons) {
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');

      winningLineVisibility.classList.add('hidden');
      modalVisibility.classList.toggle('modal__window_show');
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
  setTimeout(() => modalVisibility.classList.toggle('modal__window_show'), 100);
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

function showWinningLine(indexLine) {
  console.log(indexLine)
  if (indexLine.indexLine > 0) {
    winningLineVisibility.style.top = `50%`;
  }
}