const crypto = require('crypto');
const binanceAPI = require('../services/binanceAPI');

const getBTC = async () => {
	const SYMBOL = 'BTCUSDT';
	return await binanceAPI.get(SYMBOL);
};


async function newOrder(symbol, quantity, side) {
	const order = { symbol, quantity, side };
	order.type = 'MARKET';
	order.timestamp = Date.now();

	const signature = crypto
		.createHmac('sha256', SECRET_KEY)
		.update(new URLSearchParams(order).toString())
		.digest('hex');

	order.signature = signature;

	try {
		binanceAPI.post();
	}
	catch (err) {
		// para erros e soluções com essa API, consulte https://www.luiztools.com.br/post/erros-comuns-com-as-apis-da-binance/
		console.error(err.response.data);
	}
}


module.exports = { getBTC, newOrder };
