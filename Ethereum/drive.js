import web3 from './web3';
import Drive from './build/Drive.json';

const instance = new web3.eth.Contract((Drive.abi),'0xcD1e0b3EDa74EE2eEB67b85D393a1a27578A5837');


export default instance;