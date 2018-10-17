const PRESETS = {
  empty: [],
  glider: [[9,12], [10,10], [10,12], [11,11], [11,12]], 
  blinker: [[12,11], [12,12], [12,13]],
  pulsar: [[6,8],[6,9],[6,10],[6,14],[6,15],[6,16],[8,6],[8,11],[8,13],[8,18],[9,6],[9,11],[9,13],[9,18],[10,6],[10,11],[10,13],[10,18],[11,8],[11,9],[11,10],[11,14],[11,15],[11,16],[13,8],[13,9],[13,10],[13,14],[13,15],[13,16],[14,6],[14,11],[14,13],[14,18],[15,6],[15,11],[15,13],[15,18],[16,6],[16,11],[16,13],[16,18],[18,8],[18,9],[18,10],[18,14],[18,15],[18,16]],
}

/** Class representing a Game of Life board */
class Board {
  /**
   * Create a Game of Life board
   * @param {number} size - The size of the board
   */
  constructor(size) {
    this.size = size;
    this.board = this.getEmptyBoard();
  }

  /**
   * @return {array} 2D array representing an empty board
   */
  getEmptyBoard() {
    return Array(this.size).fill().map(() => Array(this.size).fill(false));
  }

  /**
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @return {boolean} if cell is active
   */
  isCellActive(x, y) {
    return this.board[x][y];
  }

  /**
   * Toggles the cell between live and dead
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   */
  toggleCell(x, y) {
    this.board[x][y] = !this.board[x][y];
  }

  /**
   * Changes the preset starting position of the board
   * @param {string} presetKey - which preset position to start at
   */
  changePreset(presetKey) {
    this.board = this.getEmptyBoard();
    PRESETS[presetKey].map((cell) => {
      this.toggleCell(cell[0], cell[1]);
    });
  }

  /**
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @return {boolean} if cell is in bounds
   */
  isCellInBounds(x, y) {
    return x >= 0 && y >= 0 && x < GAME_SIZE && y < GAME_SIZE;
  }

  /**
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @return {number} how many live neighbors the cell has
   */
  getLiveNeighbors(x, y) {
    let liveNeighbors = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i == 0 && j == 0) && this.isCellInBounds(x + i, y + j) && this.isCellActive(x + i, y + j)) {
          liveNeighbors++;
        }
      }
    }
    return liveNeighbors;
  }

  /**
   * Progresses the game by one step
   */
  step() {
    const newBoard = this.board.map(row => row.slice());
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const liveNeighbors = this.getLiveNeighbors(i, j);
        if (this.isCellActive(i, j)) {
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            newBoard[i][j] = false;
          }
        } else {
          if (liveNeighbors == 3) {
            newBoard[i][j] = true;
          }
        }
      }
    }
    this.board = newBoard;
  }
}