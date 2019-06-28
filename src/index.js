import React from 'react';
import ReactDOM from 'react-dom';
import light, { balanceOf$, blockNumber$ } from '@parity/light.js';

import App from './App';
import provider from './provider';

light.setProvider(provider);

blockNumber$().subscribe(blockNumber =>
  console.log('blockNumber', blockNumber)
);
balanceOf$('0x407d73d8a49eeb85d32cf465507dd71d507100c1').subscribe(balance =>
  console.log('balance', balance)
);

ReactDOM.render(<App />, document.getElementById('root'));