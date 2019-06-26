import Api from '@parity/api';

const provider = new Api.Provider.Ws('ws://127.0.0.1:8546');

export default provider;