import web3 from './web3';
import Drive from './build/Drive.json';

const instance = new web3.eth.Contract((Drive.abi),'0x433FE4171ec88Dcb0bb3Fc512139edFbD8E1237a');


export default instance;