import {BoardsView} from "./BoardsView.js";
import {Game} from "./Game.js";
import {ComputerPlayer} from "./Players/ComputerPlayer.js";

export class GameController{
    /**
     *
     * @param {number} boardSize Game board size
     * @param {string} mainBoardElem Main board element
     * @param {string} scoreElem Score board element
     */
    constructor(boardSize){
        this.boardSize = boardSize;
        this.gameModel = new Game(boardSize);
        this.boardsView = new BoardsView(boardSize, 'bigBoard', 'scoreBoard');
        this.availableCellsCount = Math.pow(boardSize, 4);

        this.elementsID = {gameStatus: 'gameStatus',
                            humPlayerSign: 'humPlayerSign',
                            compPlayerSign: 'compPlayerSign'};

    }

    /**
     * Initializing all needed for game and starting a new game
     */
    startGame(){
        this.initGameBoards();
        this.initPlayers();
        this.boardsView.bindCellClicked(this.handleCellSelected);
        this.updateCurrPlayer();
    }

    initGameBoards(){
        // Creating all game boards
        this.gameModel.initGameBoards(this.boardsView.getMainAndScoreBoards);
    }

    initPlayers(){
        this.gameModel.initPlayers();

        $(`#${this.elementsID.humPlayerSign}`).text(`${this.gameModel.players.humPlayer.sign}`);
        $(`#${this.elementsID.compPlayerSign}`).text(`${this.gameModel.players.compPlayer.sign}`);
    }

    /**
     * Updating current player turn
     */
    updateCurrPlayer(){
        this.gameModel.updateCurrPlayer();

        $(`#${this.elementsID.gameStatus}`).text(`Turn of: ${this.gameModel.currPlayer.name}`);

        switch (this.gameModel.currPlayer.type) {
            case "Computer":
                // Let the spinner start spinning
                $('body').addClass('busy');
                this.compPlayerMove();
                break;
            case "Humen":
                // Stopping the spinner
                $('body').removeClass('busy');
                break;
            default:
                break;
        }
    }

    /**
     * Handels cell click and check if valid click
     * @param {number} cellId selected cell id
     */
    handleCellSelected = (cellId) => {
        if (this.gameModel.currPlayer.type === "Computer"){
            alert("Not your turn!");
            return;
        }

        this.playMove(cellId);
    };

    /**
     * Ends the game with appropiate message
     * @param {boolean} isWin Is there a win?
     */
    endGame(isWin){
        if (isWin){
            $(`#${this.elementsID.gameStatus}`).text(`${this.gameModel.currPlayer.name} won!`);
        } else {
            $(`#${this.elementsID.gameStatus}`).text('No one won :(');
        }

        this.boardsView.removeEvents();
    }

    /**
     *
     * @param {object} isLocalWin Is there a local win?
     * @param {number} cellId
     */
    updateScoreBoardIfWin(isLocalWin, cellId){
        if (isLocalWin){
           // Extract big cell id
            $(`#scrBrd${cellId.substr(0, 2)}`)
            .text(this.gameModel.currPlayer.sign); // TODO: Make it more general..
        }
    }

    /**
     * Make a move of computer player
     */
    async compPlayerMove(){
        let cellId;
        do {
            cellId = await this.gameModel.getCompPlayer.selectCellAsync(this.gameModel.boardSize);
        }
        // As long the selected cell is not empty, select new one
        while (!this.playMove(cellId));

        return;
    }

    /**
     * Handling a play move
     * @param {number} cellId
     */
    playMove(cellId){
        const playMoveStatus = this.gameModel.playMove(cellId);

        if (playMoveStatus.isValidCell === false){
            return;
        }

        $(`#${cellId}`).text(this.gameModel.currPlayer.sign);
        this.availableCellsCount--;

        this.updateScoreBoardIfWin(playMoveStatus.isLocalWin, cellId);

        if (playMoveStatus.isGlobalWin){
            this.endGame(true);
        } else if (this.availableCellsCount === 0){
            this.endGame(false);
        } else {
            this.updateCurrPlayer();
        }

        return true;
    }
}
