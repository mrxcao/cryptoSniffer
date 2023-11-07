const calcSMA = (data) => {
	const closes = data.map(candle => parseFloat(candle[4]));
	const sum = closes.reduce((a, b) => a + b);
	return sum / data.length;
};

module.exports = { calcSMA };