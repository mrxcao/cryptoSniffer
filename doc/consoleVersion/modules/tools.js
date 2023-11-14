const calcSMA = (data) => {
	const closes = data.map(candle => parseFloat(candle[4]));
	const sum = closes.reduce((a, b) => a + b);
	return sum / data.length;
};
const getGain = (arr) => {
	let gain = 0;
	for (const c of arr) {
		if (c.type == 'BUY') {
			gain -= c.price;
		}
		else if (c.type == 'SELL') {
			gain += c.price;
		}
	}
	return gain;
};


module.exports = { calcSMA, getGain };