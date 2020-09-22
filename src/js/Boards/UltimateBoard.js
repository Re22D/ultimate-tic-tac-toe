import {Board} from './Board.js';
import {PlayBoard} from './PlayBoard.js';

export class UltimateBoard extends Board{

    constructor(boardId, boardSize, elem, tblCellsElemArr){
        super(boardId, boardSize, elem, tblCellsElemArr);
        this.playBoards = this.initPlayBoards(tblCellsElemArr); // TODO: access to curr elem
    }

    /*
     Creating all play boards (inside each big board cell) and initializing them with their table element.
     Return 2 dim. array of corresponding play boards
     */
    initPlayBoards(cellsElemArr){
        // For every Row in main board
        const pBoards = cellsElemArr.map(function(currRow, rowIndex){

            // For each column in main row (cell) - create a play board
            return currRow.map(this.createPlayBoard, this);

        }, this);

        return pBoards;
    }

    /*
    Returns new playBoard obj with it's corresponding table element
    */
    createPlayBoard(currTbl, cellIndex){
        return new PlayBoard(`pBrd-${this.rowIndex}-${cellIndex}`, this.boardSize, currTbl);
    }

    /*
        Returns the play board obj that assigned to that cell
    */
    getCellPlayBoard(row, col){
        return this.playBoards[row][col];
    }

    // TODO: remove. not used?
    cellWin(cellId, sign){
        this.cellsSignArr[cellId[0]][cellId[1]][cellId[2]][cellId[3]] = sign;
    }
}
