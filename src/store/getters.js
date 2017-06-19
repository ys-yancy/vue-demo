export default {
	async getStompPrices(state, symbols, a) {
		let cachePrices = state.cacheStompPrices;
		if (cachePrices) {
			return cachePrices;
		}
	}
}