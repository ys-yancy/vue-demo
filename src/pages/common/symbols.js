const symbols = [
  'EURRUB',
  'NZDSGD',
  'GBPHUF',
  'GBPNOK',
  'GBPDKK', 'GBPPLN', 'GBPTRY', 'GBPSGD', 'EURMXN', 'GBPHKD', 'GBPMXN', 'GBPZAR', 'EURZAR', 'EURSGD', 'EURHKD', 'HKDJPY', 'EURDKK', 'NOKJPY', 'SEKJPY', 'TRYJPY', 'SGDJPY', 'ZARJPY', 'EURHUF', 'EURNOK', 'CHFSEK', 'CHFNOK', 'GBPSEK', 'EURPLN', 'EURTRY', 'NZDCAD', 'NZDCHF', 'CADCHF', 'EURSEK', 'USDNOK', 'USDRUB', 'AUDCHF', 'USDSGD', 'USDDKK', 'CHFJPY', 'USDHUF', 'EURNZD', 'CADJPY', 'USDPLN', 'AUDCAD', 'GBPCHF', 'GBPNZD', 'GBPCAD', 'USDSEK', 'AUDNZD', 'USDMXN', 'USDZAR', 'USDTRY', 'EURCAD', 'USDHKD', 'EURAUD', 'GBPAUD', 'USDCAD', 'NZDUSD', 'EURGBP', 'EURCHF', 'AUDUSD', 'AUDJPY', 'GBPJPY', 'EURJPY', 'NZDJPY', 'USDCHF', 'GBPUSD', 'USDJPY', 'EURUSD', 'GBPCZK', 'EURCZK', 'USDCNH', 'USDCZK', 'XW1USD',
];

export default {
  has(symbol) {
    if (symbols.indexOf(symbol) === -1) {
      return false;
    }

    return true;
  },

  getAll() {
    return symbols;
  }
}