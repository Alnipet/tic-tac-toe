window.addEventListener('load', startGame);

let boardEl = document.getElementById('board');
let modalEl = document.getElementById('modal');

let modalVisibility = document.getElementById('modal__window')

let resetButtons = document.getElementsByClassName('reset');

for (let btn of resetButtons) {
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
      modalEl.classList.remove('visible');
      modalVisibility.style.visibility = 'hidden';
      modalVisibility.style.opacity = '0';
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
  modalEl.classList.add('visible');

  setTimeout(() => modalVisibility.style.visibility = 'visible', 100);
  setTimeout(() => modalVisibility.style.opacity = '1', 100);
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