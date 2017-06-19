import _ from '../service/page-base';
import symbol from '../pages/common/symbol';
export default {
	// 获取账户信息
	getAccount( {commit, state} ) {
		_.getAccount().then(function( account ) {
			commit('USERACCOUNT', account.data.data)
		})
	},

	// 获取交易页面的symbol
	getOptionList( {commit, state}, options ) {
		// axios.get('http://newapi.invhero.com/v3/demo/symbols6/?access_token=d4ea901c-66d4-404f-ae2b-ed5220bbdd32&_f=0.7636744918061493')
		symbol.getOptionSymbolList(options).then(function( optionList ) {
			commit('OPTIONLISTDATA', optionList.data.data);	
		})	
	},

	// 获取k线数据
	getStockSymbolList( {commit, state}, options ) {
		_.getStockSymbolList(options).then(function( StockSymbolList ) {
			commit('STOCKSYMBOLLIST', StockSymbolList.data.data.price);	
		})	
	},

	// 获取当前symbol信息
	getCurSymbolInfo( {commit, state}, options ) {
		_.getCurSymbolInfo(options).then(function( CurSymbolInfo ) {
			commit('CURSYMBOLINFO', CurSymbolInfo.data.data);	
		})
	},

	//没用到
	getInfoData({commit, state}, options) {
		_.getInfoData(options).then(function( infoData ) {
			commit('INFODATA', infoData.data.data.price);	
		})	
	},

	getUserLimt({commit, state}, options) {
		_.getWatchdataLimt(options).then(function( infoData ) {
			commit('WATCHDATALIMT', infoData.data.data.permission);	
		});

		_.getCurrentOrderLimt(options).then(function( infoData ) {
			commit('CURRENTORDERLIMT', infoData.data.data.permission);	
		});

		_.getHistoryOrderLimt(options).then(function( infoData ) {
			commit('HISTORYORDERLIMT', infoData.data.data.permission);	
		});

		_.getAllowFollowingLimt(options).then(function( infoData ) {
			commit('ALLOWFOLLOWINGLIMT', infoData.data.data.permission);	
		});	
	},

	// 订阅报价
	getStompCurrentPrice( {commit, state} ) {
		const onmessage_callback = symbolPrice => {

			let params = {
				symbol: symbolPrice[0],
          		askPrice: symbolPrice[1],
          		bidPrice: symbolPrice[3],
          		lastPrice: symbolPrice[5],
          		bid_price: [symbolPrice[3]],
          		ask_price: [symbolPrice[1]],
			}
			commit('CHAHESTOMPPRICES', params);
			commit('STOMPCURRENTPRICE', symbolPrice);
		}	
		symbol.getStompCurrentPrice(onmessage_callback);
	},

}