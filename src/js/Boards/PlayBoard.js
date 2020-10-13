import {Board} from './Board.js';

export class PlayBoard extends Board{

    constructor(boardId, boardSize, elem, cellsElementMatrix){
        super(boardId, boardSize, elem, cellsElementMatrix);
    }

    /**
     * Checks if the cell is empty, so it's a valid cell to choose
     * @param {number} row 
     * @param {number} col 
     */
    isEmptyCell(row, col){
        if (this.getCellValue(row, col) === null){
            return true;
        }
        return false;
    }
}
