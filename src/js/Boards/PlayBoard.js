import {Board} from './Board.js';

export class PlayBoard extends Board{

    constructor(boardId, boardSize, elem, tblCellsElemArr){
        super(boardId, boardSize, elem, tblCellsElemArr);

         //this.boardElem.addEventListener("click", eveHan); // TODO: Find how to assign to obj elem
    }

    // Checks if the cell is empty, so we can put game sign in it
    isEmptyCell(row, col){
        if (this.getCellValue(row, col) === null){
            return true;
        }
        return false;
    }
}
