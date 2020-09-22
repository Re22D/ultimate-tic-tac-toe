export class Board{
    constructor(boardId, boardSize, elem, tblCellsElemArr){
        this.boardId = boardId;
        this.boardSize = boardSize;
        this.boardElem = elem;
        this.tblCellsElemArr =  tblCellsElemArr; //  || this.createEmptyTwoDimArr(); // changeTo: tblElemRef
        this.cellsSignArr = this.createEmptyTwoDimArr();
        this.winStatus = {isWin: undefined, winSign: undefined};
    }

    /*
    NOTE: Cell id of play boards is in form of:
        4 digit numbers: <rowBigBoard><colBigBoard><rowInnerBoard><colInnerBoard>
    */

    //Returns a two dimention array, in the size of board
    createEmptyTwoDimArr(fillVal = null){
        return [...Array(this.boardSize)].map(() => Array(this.boardSize).fill(fillVal));
    }

    // Check if winning is valid for this board, and if so- updating the winning status
    checkWin(playerSign){
        // If someone already won in this board
        if (this.winStatus.isWin === true){
            return false;
        }

        const isWin = this.checkRowWin(playerSign) ||
                    this.checkColWin(playerSign) ||
                    this.checkDiagonalWin(playerSign);

        if (isWin){
            [this.winStatus.isWin, this.winStatus.winSign] = [true, playerSign];
        }

        return isWin;
    }

    checkRowWin(playerSign){
        let isWin;
        //console.log("BRD- check win-", this.cellsSignArr);
        for (let row = 0; row < this.boardSize; row++){
            isWin = false;
            for (let col = 0; col < this.boardSize; col++){
                if (this.cellsSignArr[row][col] !== playerSign){
                    isWin = false;
                    break;
                } else {
                    isWin = true;
                }
            }

            if (isWin){
                return true;
            }
        }
        // return true;
    }

    // TODO: make general check ?
    checkColWin(playerSign){
        let isWin;
        for (let col = 0; col < this.boardSize; col++){
            isWin = false;
            for (let row = 0; row < this.boardSize; row++){
                if (this.cellsSignArr[row][col] !== playerSign){
                    isWin = false;
                    break;
                } else {
                    isWin = true;
                }
            }
            if (isWin){
                return true;
            }
        }
    }

    checkDiagonalWin(playerSign){
        let isWin = true;
        const middleIndex = Math.floor(this.boardSize / 2);

        // Diagonal from left
        if (this.cellsSignArr[middleIndex][middleIndex] !== playerSign){
            return false;
        }

        for (let row = 0, col = 0; row < this.boardSize; row++, col++){

            if (this.cellsSignArr[row][col] !== playerSign){
                isWin = false;
                break;
            }
        }

        // Diagonal from right
        if (isWin){
            return true;
        }

        for (let row = 0, col = this.boardSize-1;
            col >= 0;
            row++, col--){

            if (this.cellsSignArr[row][col] !== playerSign){
                return false;
            }
        }
        return true;
    }

    /**
     * Getting cells' value
     * @param {number} row cells' row
     * @param {numer} col cells' column
     */
    getCellValue(row, col){
        return this.cellsSignArr[row][col];
    }

    // set cell with player's sign and update if it's a win
    setCellAndWin(row, col, sign){
        this.cellsSignArr[row][col] = sign;

        return this.checkWin(sign);
    }

}

