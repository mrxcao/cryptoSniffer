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
let contador = 0;

async function start() {
	const data = await binance.getBTC();
	contador++;
	if (data) {

		const candle = data[data.length - 1];
		const price = parseFloat(candle[4]);
		const sma = tools.calcSMA(data);
		const buyPrice = (sma * 0.999);
		const sellPrice = (sma * 1.00001);


		console.clear();
		console.log(':: NODE_ENV', new Date(), process.env.NODE_ENV);
		console.log('IsOpened:   ' + isOpened);
		console.log('Price:      ' + price);
		console.log('SMA:        ' + sma);
		console.log('buyPrice:  ', buyPrice);
		console.log('sellPrice: ', sellPrice);

		if (price <= buyPrice && isOpened === false) {
			console.log('comprar');
			actions.push({ type: 'BUY', time: new Date(), price });
			isOpened = true;
		}
		else if (price >= sellPrice && isOpened === true) {
			console.log('vender');
			actions.push({ type: 'SELL', time: new Date(), price });
			isOpened = false;
		}
		else {console.log(`:: ${aguardar / 1000}sec   ${contador} times`);}
		const gain = tools.getGain(actions);
		console.log('gain', gain);
		console.log('actions', actions);
	}
}

setInterval(start, aguardar);

start();