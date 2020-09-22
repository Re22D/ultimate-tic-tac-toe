let boardSize;
const pCellClsName = "innerCell";

/* eslint-disable no-trailing-spaces */

/*
 Initializing entire game boards
 TODO: score board that will ref to mainBoard vals ?
*/
export default function createGameBoards(brdSize){
    boardSize = brdSize;

    // Creating main game board
    const mainBrd = createBoard("mainBrd");
    
    // Initializing each cell of big board with its own board
    for (let rowI = 0; rowI < boardSize; rowI++){
        
        for (let cellI = 0; cellI < boardSize; cellI++){
            
            // const cellId = `tblCell-${rowI}-${cellI}`;
            const cellId = `${rowI}${cellI}`;
            const brd = createBoard(cellId, pCellClsName, 'innerTbl');
            //clickOnCells(brd.tblElem);
            
            // mainBrd.cellsArr[rowI][cellI] value references the cell of big table 
            mainBrd.cellsArr[rowI][cellI].appendChild(brd.tblElem);
            // mainBrd.cellsArr[rowI][cellI] = brd.cellsArr;
            mainBrd.cellsArr[rowI][cellI] = brd.tblElem;
        }
    }
    
    const scoreBrd = createBoard("scrBrd", "scrCell", "scrTbl");

    return {mainBrd, scoreBrd};
}

/*
Creating one table board element.
*/
function createBoard(boardID, cellCls = 'outerCell', tblCls = null){
    const tblElem = document.createElement("table");
    const cellsArr = [];
    tblElem.setAttribute("id", boardID);
    tblElem.setAttribute("class", tblCls);

    // Setting table rows
    for (let rowI = 0; rowI < boardSize; rowI++){

        const newRow =  document.createElement("tr");
        const rowArr = [];
        tblElem.appendChild(newRow);

        for (let colI = 0; colI < boardSize; colI++){
            
            const newCell =  document.createElement("td"); 
            // const cellId =  `${boardID}_${rowI}-${colI}`;
            const cellId =  `${boardID}${rowI}${colI}`;
            newCell.setAttribute("id", cellId); // TODO: General the ID to file def
            newCell.setAttribute("class", cellCls);
            //boardObj.boardArr[cellNum] = newCell;
            rowArr.push(newCell);

            newRow.appendChild(newCell);
        }
        cellsArr.push(rowArr);
    }
    
    return {tblElem, cellsArr};
}
