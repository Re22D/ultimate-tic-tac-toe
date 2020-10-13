
const innerPlayCellClassName = "innerCell";

/* eslint-disable no-trailing-spaces */
export class BoardsView{

    /**
     * 
     * @param {string} boardID board element id
     * @param {number} boardSize 
     * @param {string} tableClassName board table element class
     */
    constructor(boardSize, mainBoardElementId, scoreBoardElementId){
        this.boardSize = boardSize;

        this.mainBoardElemId = mainBoardElementId;
        this.scoreBoardElemId = scoreBoardElementId;

        this.mainBoardElements = {};
        this.scoreBoardElements = {};

        this.createGameBoards();
    }

    get getMainAndScoreBoards(){
        return {mainBrd: this.mainBoardElements, scoreBrd: this.scoreBoardElements};
    }

    /**
     * Creates one table board element
     * @param {string} boardID board element id
     * @param {string} tableClass board table element class
     * @param {string} cellClass board cell element class
     */
    createSingleBoard(boardID, tableClass, cellClass){
        const tableElem = document.createElement("table");
        const cellsElementMatrix = [];
        tableElem.setAttribute("id", boardID);
        tableElem.setAttribute("class", tableClass);

        // Setting table rows
        for (let rowI = 0; rowI < this.boardSize; rowI++){

            const newRowElem =  document.createElement("tr");
            const rowElemArray = [];
            tableElem.appendChild(newRowElem);

            for (let colI = 0; colI < this.boardSize; colI++){
                
                const newCell =  document.createElement("td"); 
                const cellId =  `${boardID}${rowI}${colI}`;
                newCell.setAttribute("id", cellId); // TODO: General the ID to file def
                newCell.setAttribute("class", cellClass);
                rowElemArray.push(newCell);

                newRowElem.appendChild(newCell);
            }
            cellsElementMatrix.push(rowElemArray);
        }
        
        return {tableElem, cellsElementMatrix};
    }

    //  TODO: score board that will ref to mainBoard vals ?

    /**
     * Initializing entire game boards
     */
    createGameBoards(){
        // Creating main game board
        const mainBrd = this.createSingleBoard('mainBrd', null, 'outerCell');
        
        // Initializing each cell of big board with its own board
        for (let rowI = 0; rowI < this.boardSize; rowI++){
            
            for (let cellI = 0; cellI < this.boardSize; cellI++){
                const cellId = `${rowI}${cellI}`;
                const brd = this.createSingleBoard(cellId, 'innerTbl', innerPlayCellClassName);
                
                // mainBrd.cellsElementMatrix[rowI][cellI] value references the cell of big table 
                mainBrd.cellsElementMatrix[rowI][cellI].appendChild(brd.tableElem);
                mainBrd.cellsElementMatrix[rowI][cellI] = brd.tableElem;
            }
        }
        this.mainBoardElements = mainBrd;
       $(`#${this.mainBoardElemId}`).append(mainBrd.tableElem);
        
        const scoreBrd = this.createSingleBoard('scrBrd', 'scrTbl', 'scrCell');
        this.scoreBoardElements = scoreBrd; 
        $(`#${this.scoreBoardElemId}`).append(scoreBrd.tableElem);
    }

    /**
     * Binds handler to cell click event
     * @param {callback} handler 
     */
    bindCellClicked(handler){
        $(`#${this.mainBoardElemId}`).on("click", event =>{
            if (event.target.className !== innerPlayCellClassName){
                return;
            }

            handler(event.target.id);
        });

    }
    
    /**
     * Removes click event from board
     */
    removeEvents(){
        $(`#${this.mainBoardElemId}`).off("click");
    }

    /**
     * Ends the game with appropiate message
     * @param {boolean} isWin Is there a win?
     */
    endGame(isWin, currPlayerName){
        if (isWin){
            $(`#${this.elementsID.gameStatus}`).text(`${currPlayerName} won!`);
        } else {
            $(`#${this.elementsID.gameStatus}`).text('No one won :(');
        }

        this.removeEvents();
    }
}
