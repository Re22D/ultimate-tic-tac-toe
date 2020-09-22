import createGameBoards from "./boardView.js";
import {UltimateBoard} from "./Boards/UltimateBoard.js";
import {HumenPlayer} from "./Players/HumenPlayer.js";
import {ComputerPlayer} from "./Players/ComputerPlayer.js";
import { Board } from "./Boards/Board.js";

const   boardSize = 3,
        elementsID = {gameStatus: 'gameStatus',
                    humPlayersign: 'humPlayerSign',
                    compPlayersign: 'compPlayerSign'};
let humPlayer,
    compPlayer,
    currPlayer,
    bigBoard,
    scoreBrd;


export function startGame(mainBoardElem, scoreElem, gameInfoElem){
    initGameBoards(mainBoardElem, scoreElem);
    initPlayers();
    initGameInfo(gameInfoElem);
    updateCurrPlayer();
}

function initGameBoards(mainBoardElem, scoreElem){
    // Creating all game boards
    const brds = createGameBoards(boardSize);

    mainBoardElem.appendChild(brds.mainBrd.tblElem);
    scoreElem.appendChild(brds.scoreBrd.tblElem);

    bigBoard = new UltimateBoard("brd-0", boardSize, brds.mainBrd.tblElem, brds.mainBrd.cellsArr);
    scoreBrd = new Board("scrBrd", boardSize, brds.scoreBrd.tblElem, brds.scoreBrd.cellsArr);

    addClickEventCells();
}

function initPlayers(plyr1, plyr2){
    humPlayer = new HumenPlayer("You", "X");
    compPlayer = new ComputerPlayer("Comp", "O");
}

function initGameInfo(gameInfoElem){
    // const elem =  document.createElement("p");
    //.setAttribute();

    $(`#${elementsID.humPlayersign}`).html(`<p>Player 1: ${humPlayer.sign}</p>`);
    $(`#${elementsID.compPlayersign}`).html(`<p>Player 2: ${compPlayer.sign}</p>`);
}

function updateCurrPlayer(){
    if (currPlayer === humPlayer){
        currPlayer = compPlayer;
    } else {
        currPlayer = humPlayer;
    }
    $(`#${elementsID.gameStatus}`).text(`Turn of: ${currPlayer.name}`);

    if (currPlayer instanceof ComputerPlayer){
        compMove();
    }
}

function addClickEventCells(){
    bigBoard.boardElem.addEventListener("click", cellClick);
}

function removeEvents(){
    bigBoard.boardElem.removeEventListener("click", cellClick);
}

// Handlinng cell click event
function cellClick(event){
    if (currPlayer instanceof ComputerPlayer){
        alert("Not your turn!");
        return;
    }

    const clsSt = event.target.closest('.innerCell');

    // If its not an inner cell that clicked
    if (clsSt === null){
        return;
    }

    playMove(clsSt.id);
}

// Extracting from cellId its positions in tables
function extractCellInfo(cellId){

   return {cellId: cellId,
            rowBig: cellId[0],
            colBig: cellId[1],
            rowPly: cellId[2],
            colPly: cellId[3]};
}

// Handling a play move
function playMove(selectedCellId){
    const clkCellInfo = extractCellInfo(selectedCellId);
    const currPlayBoard = bigBoard.getCellPlayBoard(clkCellInfo.rowBig, clkCellInfo.colBig);

    // If the clicked cell is empty and can be chosen
    if (currPlayBoard.isEmptyCell(clkCellInfo.rowPly, clkCellInfo.colPly)){
        $(`#${clkCellInfo.cellId}`).text(currPlayer.sign);

        updateWins(clkCellInfo, currPlayBoard);

        if (bigBoard.winStatus.isWin){
            endGame(true);
        } else {
            updateCurrPlayer();
        }

        return true;
    }
}

/**
 * Update local win and global win in case there is one
 * @param {object} cellInfo detailed selected cell info
 * @param {PlayBoard object} playBrd current play board
 */
function updateWins(cellInfo, playBrd){
    // Checking for local win (in play board, inside main cell)
    const cellWin = playBrd.setCellAndWin(cellInfo.rowPly, cellInfo.colPly, currPlayer.sign);

    // If there is a local win- checking for game win
    if (cellWin){
        bigBoard.setCellAndWin(cellInfo.rowBig, cellInfo.colBig, currPlayer.sign);
        scoreBrd.setCellAndWin(cellInfo.rowBig, cellInfo.colBig, currPlayer.sign);
        $(`#scrBrd${cellInfo.cellId.substr(0, 2)}`).text(currPlayer.sign); // TODO: Make it more general..
    }
}

/**
 * Ends the game with appropiate message
 * @param {boolean} isWin Is there a win?
 */
function endGame(isWin){
    if (isWin){
        $(`#${elementsID.gameStatus}`).text(`${currPlayer.name} won!`);
    } else {
        $(`#${elementsID.gameStatus}`).text('No one won :(');
    }

    removeEvents();
}

/**
 * Make a move of computer player
 */
async function compMove(){
    let cellId;
    do {
        cellId = await compPlayer.selectCellAsync(bigBoard.boardSize);
    }
    // As long the selected cell is not empty, select new one
    while (!playMove(cellId));

    // debugger;
    return;
}
