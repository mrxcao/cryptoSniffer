const axios = require('axios');
// https://api.binance.com
const API_URL = 'https://testnet.binance.vision';
const API_KEY = '';

const get = async (SYMBOL, candles = 21) => {
	try {
		const { data } = await axios.get(API_URL + '/api/v3/klines?limit=' + candles + '&interval=15m&symbol=' + SYMBOL);
		return data;
	}
	catch (error) {
		console.log('error.code', error.code);
		return null;
	}
};

//  https://github.com/luiztools/imersao-botdev-2023
const post = async (order) => {
	const { data } = await axios.post(
		API_URL + '/api/v3/order',
		new URLSearchParams(order).toString(),
		{
			headers: { 'X-MBX-APIKEY': API_KEY },
		});
	console.log(data);
};

module.exports = { get, post };