import {startGame} from "./handleGame.js";

const gameBigBoard = document.getElementById("bigBoard");
const scoreElem = document.getElementById("scoreBoard"); // $("#scoreBoard");
const gameInfoElem = $("#gameInfo");

startGame(gameBigBoard, scoreElem, gameInfoElem);
// console.log(gameBigBoard);
