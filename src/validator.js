class Validator {

  constructor(){
    this.ROW_COL_COUNT = 9;
    this.SQUARE_SIZE = 3;
    this.BOARD_SIZE = 9 * 9;
  }

  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  /**
  * Extracts i-th row from the given sudoku board
  *
  * @param {[number]} board - The Sudoku board.
  * @param {number}   i     - The current row index.
  *
  * @return {[number]} Returns the exracted row.
  */
  _getRow(board, i){
    return board.slice( i * this.ROW_COL_COUNT,
                        i * this.ROW_COL_COUNT + this.ROW_COL_COUNT);
  }

  /**
  * Extracts i-th column from the given sudoku board
  *
  * @param {[number]} board - The Sudoku board.
  * @param {number}   i     - The current column index.
  *
  * @return {[number]} Returns the exracted column.
  */
  _getCol(board, i){
    let col = [];
    for (let x = 0; x < this.BOARD_SIZE; x=x+this.ROW_COL_COUNT) {
      col.push(board[x+i]);
    }
    return col
  }

  /**
  * Extracts i-th square from the given sudoku board
  *
  * @param {[number]} board - The Sudoku board.
  * @param {number}   i     - The current square index.
  *
  * @return {[number]} Returns the exracted square.
  */
  _getSquare(board, i){
    let square = [];
    let startIndx = this.ROW_COL_COUNT *
                    (Math.floor(i / this.SQUARE_SIZE) * this.SQUARE_SIZE) +
                    (i % this.SQUARE_SIZE) * this.SQUARE_SIZE;

    for (let x = 0; x < this.SQUARE_SIZE; x++) {
      square.push( ... board.slice(startIndx, startIndx + this.SQUARE_SIZE) )
      startIndx += this.ROW_COL_COUNT
    }
    return square
  }

  /**
  * Removes 0 values from the given list
  *
  * @param {[number]} list - The list to filter.
  * @return {[number]} Returns filtered list.
  */
  _removeZeroes(list){
    return list.filter( x =>  x !== 0)
  }

  /**
  * Checks if the given row contains any zeroes
  *
  * @param {[number]} row - The row to check.
  * @return {boolean} Returns true if the list does not contain any 0 values.
  */
  _isComplete(row){
    return row.length == this._removeZeroes(row).length
  }

  /**
  * Checks if the given list contains repeated numbers
  *
  * @param {[number]} list - The list to check.
  * @return {boolean} Returns true if the list does not contain any repeated numbers.
  */
  _isValid(list){
    list = this._removeZeroes(list)
    return list.length == (new Set(list)).size
  }

  /**
  * Validate the given sudoku. Currently supoorts only stadart 9x9 sudoku boards
  *
  * @param {string} sudoku - Sudoku as a utf-8 string.
  * @return {string} Returns a string according to requirements in README file.
  */
  validate(sudoku) {
    console.log(sudoku);
    const board = sudoku.replace(/[^0-9]/g,'')
                        .split('')
                        .map( x => parseInt(x) );
    let isValid = true,
        isComplete = true,
        row = [],
        col = [],
        square = [];

    for (let r = 0; r < this.ROW_COL_COUNT; r++) {
      row = this._getRow(board, r);
      col = this._getCol(board, r);
      square = this._getSquare(board, r);

      // Check sudoku validity. A puzzle is valid if:
      // 1. No numbers are repeated in any of the rows
      // 2. No numbers are repeated in any of the columns
      // 3. Every 9x9 square has no repeated numbers
      isValid = this._isValid(row) &&
                this._isValid(col) &&
                this._isValid(square)

      // Check sudoku completeness
      if(!this._isComplete(row)) isComplete = false;

      // Avoid unnecessary looping
      if(!isValid) break;
    }

    if (isValid && isComplete) return 'Sudoku is valid.'
    else if (isValid && !isComplete) return 'Sudoku is valid but incomplete.'
    return 'Sudoku is invalid.'
  }
}

module.exports = Validator
