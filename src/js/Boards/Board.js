export class Board {
    constructor(boardId, boardSize, elem, cellsElementMatrix){
        this.boardId = boardId;
        this.boardSize = boardSize;
        this.boardElem = elem;
        this.cellsElementMatrix =  cellsElementMatrix; //  || this.createEmptyMatrix(); // changeTo: tblElemRef
        this.cellsSignMatrix = this.createEmptyMatrix();
        this.winStatus = {isWin: undefined, winSign: undefined};
    }

    /*
    NOTE: Cell id of play boards is in form of:
        4 digit numbers: <rowBigBoard><colBigBoard><rowInnerBoard><colInnerBoard>
    */

    /**
     * Returns a two dimention array, in the size of board
     * @param {*} fillVal value to fill in boards. default: null
     */
    createEmptyMatrix(fillVal = null){
        return [...Array(this.boardSize)].map(() => Array(this.boardSize).fill(fillVal));
    }

    /**
     * Check if new winning is valid for this board, and if so- updating the winning status
     * @param {char} playerSign X/O
     * @returns {bool} win status
     */
    checkNewWin(playerSign){
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

    /**
     * Check board rows for win
     * @param {char} playerSign current players sign - X/O
     */
    checkRowWin(playerSign){
        const sameSign = currSign => currSign === playerSign;

        const result = this.cellsSignMatrix.find((currRow)=>{
            return currRow.every(sameSign);
        });

        return result ? true : false;
    }

    // TODO: make general check ?
    /**
     * Check board columns for win
     * @param {char} playerSign current players sign - X/O
     */
    checkColWin(playerSign){
        let isWin;
        for (let col = 0; col < this.boardSize; col++){
            isWin = false;
            for (let row = 0; row < this.boardSize; row++){
                if (this.cellsSignMatrix[row][col] !== playerSign){
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

    /**
     * Check board diagonals for win
     * @param {char} playerSign current players sign - X/O
     */
    checkDiagonalWin(playerSign){
        let isWin = true;
        const middleIndex = Math.floor(this.boardSize / 2);

        // If the middle cell isn't of players' sign - there is no any diagonal win
        if (this.cellsSignMatrix[middleIndex][middleIndex] !== playerSign){
            return false;
        }

        // Diagonal from left
        for (let i = 0; i < this.boardSize; i++){

            if (this.cellsSignMatrix[i][i] !== playerSign){
                isWin = false;
                break;
            }
        }

        if (isWin){
            return true;
        }

        // Diagonal from right
        for (let row = 0, col = this.boardSize-1;
            col >= 0;
            row++, col--){

            if (this.cellsSignMatrix[row][col] !== playerSign){
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
        return this.cellsSignMatrix[row][col];
    }

    /**
     * Set cell with player's sign and update if it's a win
     * @param {number} row Selected row number
     * @param {number} col Selected row number
     * @param {string} sign Players' sign - X/O
     * @returns true/false - whether there is a win
     */
    setCellAndWin(row, col, sign){
        this.cellsSignMatrix[row][col] = sign;

        return this.checkNewWin(sign);
    }

}

