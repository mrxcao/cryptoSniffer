const axios = require('axios');
// https://api.binance.com
const API_URL = 'https://testnet.binance.vision';


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

module.exports = { get };