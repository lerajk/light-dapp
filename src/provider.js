import Api from '@parity/api';

const provider = window.web3
  ? window.web3.currentProvider
  : new Api.Provider.Ws('ws://127.0.0.1:8546');

export default provider;