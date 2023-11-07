const binanceAPI = require('../services/binanceAPI');

const getBTC = async () => {
	const SYMBOL = 'BTCUSDT';
	return await binanceAPI.get(SYMBOL);
};

module.exports = { getBTC };
