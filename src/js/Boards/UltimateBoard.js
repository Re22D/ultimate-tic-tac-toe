import {Board} from './Board.js';
import {PlayBoard} from './PlayBoard.js';

export class UltimateBoard extends Board{

    constructor(boardId, boardSize, elem, cellsElementMatrix){
        super(boardId, boardSize, elem, cellsElementMatrix);
        this.playBoards = this.initPlayBoards(cellsElementMatrix); // TODO: access to curr elem
    }

    /**
     * Creating all play boards (inside each big board cell) and initializing them with their table element.
     * @return matrix of corresponding play boards
     * @param {*} cellsElemArr
     */
    initPlayBoards(cellsElemArr){
        // For every Row in main board
        const pBoards = cellsElemArr.map(function(currRow, rowIndex){

            // For each column in main row (cell) - create a play board
            return currRow.map(this.createPlayBoard, this);

        }, this);

        return pBoards;
    }

    /**
     * Returns new playBoard object with it's corresponding table element
     * @param {object} currTbl
     * @param {number} cellIndex
     */
    createPlayBoard(currTbl, cellIndex){
        return new PlayBoard(`pBrd-${this.rowIndex}-${cellIndex}`, this.boardSize, currTbl);
    }

    /**
     * Returns the play board obj that assigned to that cell
     * @param {number} row
     * @param {number} col
     */
    getCellPlayBoard(row, col){
        return this.playBoards[row][col];
    }
}
