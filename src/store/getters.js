export default {
	async getStompPrices(state, symbols, a) {
		let cachePrices = state.cacheStompPrices;
		if (cachePrices) {
			return cachePrices;
		}
	},

	getCachePrice(state) {
		let cachePrices = state.cacheStompPrices;
		if (cachePrices) {
			return cachePrices;
		}
	},
}