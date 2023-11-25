import web3 from "./web3";
import compiledChessApp from './build/chesapp.json';


//this file exports the copy of the original contract

const destinyAddress = '0xbC91254d1bfF0356e3b74175D037B10A5523A925';
const instance = new web3.eth.Contract(compiledChessApp.abi,destinyAddress);


export default instance; 
