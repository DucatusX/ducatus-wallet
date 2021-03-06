export const convertCoins = {
  DUC: { name: 'DUC', items: ['DUCX'] },
  DUCX: { name: 'DUCX', items: ['DUC', 'WDUCX'] },
  BTC: { name: 'BTC', items: ['DUC']},
  ETH: { name: 'ETH', items: ['DUC']},
  WDUCX: { name: 'WDUCX', items: ['DUCX'] }
};

export const convertSendCoins = ['DUC','DUCX', 'ETH' , 'BTC',]
export const convertGetCoins =  ['DUCX'];

export const coinInfo = {
  DUC: 'Ducatus',
  DUCX: 'DucatusX',
  ETH: 'Etherium',
  BTC: 'Bitcoin',
  WDUCX: 'WRAPPED DUCX'
};
