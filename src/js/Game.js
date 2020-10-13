import {HumenPlayer} from "./Players/HumenPlayer.js";
import {ComputerPlayer} from "./Players/ComputerPlayer.js";
import {UltimateBoard} from "./Boards/UltimateBoard.js";
import { Board } from "./Boards/Board.js";

export class Game{

    constructor(boardSize){
        this.boardSize = boardSize;
        this.players = {};
    }

    get getMainBoard() {
        return this.mainBoard;
    }

    get getCompPlayer(){
        return this.players.compPlayer;
    }

    /**
     * Initialize game
     */
    initGame(){
        this.initPlayers();
        this.updateCurrPlayer();
    }

    /**
     * Initialize game players
     */
    initPlayers(){
        this.players.humPlayer = new HumenPlayer("You", "X");
        this.players.compPlayer = new ComputerPlayer("Comp", "O");
    }

    /**
     * Initialize main & score boards
     * @param {object} param0 {mainBrd, scoreBrd}
     */
    initGameBoards({mainBrd, scoreBrd}){
        this.mainBoard = new UltimateBoard("brd-0", this.boardSize, mainBrd.tableElement, mainBrd.cellsElementMatrix);
        this.scoreBoard = new Board("scrBrd", this.boardSize, scoreBrd.tableElement, scoreBrd.cellsElementMatrix);
    }

    /**
     * Update current player turn
     */
    updateCurrPlayer(){
        if (this.currPlayer === this.players.humPlayer){
            this.currPlayer = this.players.compPlayer;
        } else {
            this.currPlayer = this.players.humPlayer;
        }
    }


    /**
     * Handling a play move
     * @param {number} selectedCellId
     */
    playMove(selectedCellId){

        const clkCellInfo = this.extractCellInfo(selectedCellId),
                currPlayBoard = this.mainBoard.getCellPlayBoard(clkCellInfo.rowBig, clkCellInfo.colBig),
                returnValues = {isValidCell: false};

        // If the clicked cell is empty and can be chosen
        if (currPlayBoard.isEmptyCell(clkCellInfo.rowPly, clkCellInfo.colPly)){

            returnValues.isValidCell = true;
            returnValues.isLocalWin = this.updateWinsAndIsLocalWin(clkCellInfo, currPlayBoard);

            if (this.mainBoard.winStatus.isWin){
                returnValues.isGlobalWin = true;
            }
        }

        return returnValues;
    }

    /**
     * Extracting from the given cell Id its positions in main and play board
     * @param {number} cellId Table cells' id
     * @returns Object with the corresponding values
     */
    extractCellInfo(cellId){

        return {cellId: cellId,
                rowBig: cellId[0],
                colBig: cellId[1],
                rowPly: cellId[2],
                colPly: cellId[3]};
    }

    /**
     * Update local win and global win in case there is one
     * @param {object} cellInfo detailed selected cell info
     * @param {PlayBoard object} playBrd current play board
     */
    updateWinsAndIsLocalWin(cellInfo, playBrd){

        // Checking for local win (in play board, inside main cell)
        const cellWin = playBrd.setCellAndWin(cellInfo.rowPly, cellInfo.colPly, this.currPlayer.sign);

        // If there is a local win- checking for game (global) win
        if (cellWin){
            this.mainBoard.setCellAndWin(cellInfo.rowBig, cellInfo.colBig, this.currPlayer.sign);
            this.scoreBoard.setCellAndWin(cellInfo.rowBig, cellInfo.colBig, this.currPlayer.sign);
            return true;
        }

        return false;
    }
}
