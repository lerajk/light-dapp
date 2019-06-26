import React from 'react';
import ReactDOM from 'react-dom';
import light, { blockNumber$, balanceOf$, post$, makeContract, postRaw$ } from '@parity/light.js';

import App from './App';
import provider from './provider';
import { map } from 'rxjs/operators';

import medianizerJson from './artifcats/Medianizer.json'

import ethereumjs from 'ethereumjs-tx'
import Web3 from 'web3'


const infuraApi = 'https://ropsten.infura.io/v3/2b39b963592e405d98c5d76a3901b497'
const myAddress = '0x4308C4533006420aCf64430442caa4653D2F2355'
const secondAddress = '0x9Df27e38f7eEB3f3e06De1b2Aea027CdCEf346aa'
const mySeed = 'skirt anchor zoo throw cement agent clutch exhaust lobster erase force crazy'
const myPrivateK = '122637A061092A775A2198E2CE55AAD4A402056EB65FE57986D6C961EC660F23'

light.setProvider(provider);

blockNumber$().subscribe(blockNumber =>
  console.log('blockNumber', blockNumber)
);

balanceOf$(myAddress)
  .pipe( // We can chain operators
    map(balance => balance.toFormat(2)), // Format the number nicely
    map(balance => `${balance} ETH`) // Append 'ETH'
  )
  .subscribe(balance => console.log('balance', balance));

//Post

post$({
    from: myAddress,
    to: secondAddress,
    value: 100 * 1e15 // value in wei
  }, {
    passphrase: mySeed
  }).subscribe(console.log);


const medianizerAddr = medianizerJson.networks["3"].address
const medianizerAbi = medianizerJson.abi
let web3 = new Web3(infuraApi)
let contractInstance = new web3.eth.Contract(medianizerAbi, medianizerAddr)



const medianizer = makeContract(
  medianizerAddr,
  medianizerAbi
)

//Read
medianizer 
  .getOwnerToFeed$(
    myAddress
  )
  .subscribe( addr => console.log(`${myAddress} owns ${addr}`) )


//Send
// medianizer
//   .unstake$(
//     myAddress,
//     {
//       from: myAddress,
//       passphrase: mySeed
//     }
//   )
//   .subscribe(receipt => console.log('this is unstake result :', receipt))

//PostRaw

// async function signing() {
//   try {
//     let gasPrice = await contractInstance.methods.unstake(myAddress).estimateGas()

//     // let txObject = {
//     //   nonce: await web3.eth.getTransactionCount(myAddress),
//     //   to: medianizerAddr,
//     //   value: 0,
//     //   chainId: 3,
//     //   gasPrice: gasPrice
//     // }

//     // let p = new Buffer.from(myPrivateK, 'hex')
//     // let transaction  = new Tx(txObject)
//     // transaction.sign(p)
//     // let rawTx = '0x' + transaction.serialize().toString('hex')
//     var tx = new ethereumjs.Tx({
//       nonce: await web3.eth.getTransactionCount(myAddress),
//       to: medianizerAddr,
//       value: 0,
//       chainId: 3,
//       gasPrice: gasPrice
//     })
//     tx.sign(ethereumjs.Buffer.Buffer.from(myPrivateK, 'hex'))
//     var rawTx = '0x' + tx.serialize().toString('hex')
//     return rawTx
//   }
//   catch(error) {
//     console.log('error :', error)
//   }
// }

// (async () => {
//   let rawTx = await signing()
//   postRaw$(rawTx)
//     .subscribe(receipt => console.log('rawPost result: ', receipt))
// })();




ReactDOM.render(<App />, document.getElementById('root'));