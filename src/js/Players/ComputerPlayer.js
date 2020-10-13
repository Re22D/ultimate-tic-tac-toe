import {Player} from './Player.js';
// import {random} from '../../../node_modules/lodash/random.js';

const _ = window._;

export class ComputerPlayer extends Player{
    constructor(name, sign){
        super(name, sign, "Computer");
    }

    /**
     * Using currying, Generating a random cell id
     * @param {number} maxNum number of rows/columns of board
     * @returns {function} function who generates a random cell id that contains 4 digits
     */
    curriedGenerateCellId(maxNum){
        return ()=>{
            let cellId = "";

            // bulding cell id  (i < 4 for: 4 digits of cell id (outerRow, outerCol, innerRow, innerCol))
            for (let i = 0; i < 4; i++){
                // Returns a random number between min (included) and max (excluded):
                cellId += _.random(maxNum - 1);

            }
            return cellId;
        };
    }

    /**
     *
     * @param {number} maxNum number of rows/columns of board
     * @returns {number} cell id
     */
    async selectCellAsync(maxNum){
        const cell = await this.executeInDelay(1000, this.curriedGenerateCellId(maxNum));
        return cell;
    }

    /**
     * Executing the followed function in delay
     * @param {number} ms Delay time in milisecound
     * @param {function} fn Function to execute in delay
     */
    executeInDelay(ms, fn){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(fn());
            }, ms);
        });
    }

}
