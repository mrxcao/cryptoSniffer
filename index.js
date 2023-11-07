require('dotenv').config();

const binance = require('./modules/binance');
const tools = require('./modules/tools');
let isOpened = false;
const aguardar = 3000;
/*
const BUY_PRICE = 34160;
const SELL_PRICE = 34501;
*/

const actions = [];

async function start() {
	console.clear();
	console.log(':: NODE_ENV', process.env.NODE_ENV);

	const data = await binance.getBTC();
	if (data) {
		const candle = data[data.length - 1];
		const price = parseFloat(candle[4]);

		console.log('Price: ' + price);
		const sma = tools.calcSMA(data);
		console.log('SMA: ' + sma);
		console.log('IsOpened: ' + isOpened);

		if (price <= (sma * 0.9) && isOpened === false) {
			console.log('comprar');
			actions.push({ type: 'BUY', time: new Date(), price });
			isOpened = true;
		}
		else if (price >= (sma * 1.1) && isOpened === true) {
			console.log('vender');
			actions.push({ type: 'SELL', time: new Date(), price });
			isOpened = false;
		}
		else {console.log(`:: ${aguardar / 1000}sec`);}
		const gain = tools.getGain(actions);
		console.log('gain', gain);
		console.log('actions', actions);
	}
}

setInterval(start, aguardar);

start();