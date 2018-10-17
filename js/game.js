const GAME_SIZE = 25;
const board = new Board(GAME_SIZE);
let gameStopped = true;
let gameInterval;

/**
 * When the document is ready, setup the game
 */
$(document).ready(function() {
  setUpEmptyCanvas();
  setUpPresets();
  renderCanvas();
});

/**
 * Setup an empty Game of Life canvas
 */
function setUpEmptyCanvas() {
  for (let i = 0; i < GAME_SIZE; i++) {
    for (let j = 0; j < GAME_SIZE; j++) {
      let $cell = $("<div>", {class: "game-cell", id: "game-cell-" + i + "-" + j});
      $cell.click(() => {toggleCell(i, j)});
      $("#game-board").append($cell);
    }
  }
}

/**
 * Setup the preset canvas options
 */
function setUpPresets() {
  $select = $("#game-presets");
  Object.keys(PRESETS).map((presetName) => {
    let $option = $("<option>").val(presetName).text(presetName);
    $select.append($option);
  });
}

/**
 * Render the Game of Life canvas using the board
 */
function renderCanvas() {
  for (let i = 0; i < GAME_SIZE; i++) {
    for (let j = 0; j < GAME_SIZE; j++) {
      $gameCell = getCellFromCoordinates(i, j);
      $gameCell.removeClass("game-cell-active");
      if (board.isCellActive(i, j)) {
        $gameCell.addClass("game-cell-active");
      }
    }
  }
}

/**
 * Get the cell element from coordinates
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 * @return {jQuery} the corresponding cell element
 */
function getCellFromCoordinates(x, y) {
  return $("#game-cell-" + x + "-" + y);
}

/**
 * Toggle the cell between dead and live when the game is stopped
 * @param {number} x - x coordinate of cell
 * @param {number} y - y coordinate of cell
 */
function toggleCell(x, y) {
  if (gameStopped) {
    $gameCell = getCellFromCoordinates(x, y);
    if (board.isCellActive(x, y)) {
      $gameCell.removeClass("game-cell-active");
    } else {
      $gameCell.addClass("game-cell-active");
    }
    board.toggleCell(x, y);
  }
}

/**
 * Change the preset Game of Life canvas
 * @param {string} preset - which preset to change to
 */
function changePreset(preset) {
  board.changePreset(preset);
  renderCanvas();
}

/**
 * Progress the game by one step
 */
function stepBoard() {
  board.step();
  renderCanvas();
}

/**
 * Start the game
 */
function startGame() {
  $("#game-stop").removeClass("hidden");
  $("#game-start").addClass("hidden");
  $("#game-presets").attr("disabled", true);
  gameStopped = false;
  gameInterval = setInterval(() => {
    stepBoard();
  }, 200);
}

/**
 * Stop the game
 */
function stopGame() {
  $("#game-stop").addClass("hidden");
  $("#game-start").removeClass("hidden");
  $("#game-presets").removeAttr("disabled");
  gameStopped = true;
  clearInterval(gameInterval);
}

