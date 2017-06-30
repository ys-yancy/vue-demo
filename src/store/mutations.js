import {
	STOMPCURRENTPRICE,
	STOCKSYMBOLLIST,
	CURSYMBOLINFO,
	USERACCOUNT,
	ISLOGIN,
	CHANGETYPE,
	CHANGETEALTOKEN,
	ISSHOWLOGIN,
	WATCHDATALIMT,
	CURRENTORDERLIMT,
	HISTORYORDERLIMT,
	ALLOWFOLLOWINGLIMT,
	CACHECURORDERPRIFIT,
	CACHEPROFITS,
	CHAHESTOMPPRICES,
} from './mutations_types';

export default {
	[USERACCOUNT]( state, account ) {
		state.userAccount = account;
	},

	[ISLOGIN]( state, login ) {
		state.isLogin = login;
	},

	[CHANGETYPE]( state, type ) {
		state.type = type;
	},

	[CHANGETEALTOKEN]( state, real_token ) {
		state.real_token = real_token;
	},

	[ISSHOWLOGIN]( state, isShowLogin ) {
		state.isShowLogin = isShowLogin;
	},

	[STOMPCURRENTPRICE]( state, CurrentPrice ) {
		state.symbolCurrentPrice = CurrentPrice;
	},

	[STOCKSYMBOLLIST]( state, stockList ) {
		state.stockSymbolList = stockList;
	},

	[CURSYMBOLINFO]( state, curSymbolInfoData ) {
		state.curSymbolInfoData = curSymbolInfoData[0];
	},

	[WATCHDATALIMT]( state, limt ) {
		state.watchdataLimt = limt;
	},
	[CURRENTORDERLIMT]( state, limt ) {
		state.currentOrderLimt = limt;
	},
	[HISTORYORDERLIMT]( state, limt ) {
		state.historyOrderLimt = limt;
	},
	[ALLOWFOLLOWINGLIMT]( state, limt ) {
		state.allowFollowingLimt = limt;
	},
	// 以后优化
	[CACHECURORDERPRIFIT]( state, profits ) {
		state.cacheCurOrderProfit = profits;
	},
	[CACHEPROFITS](state, profits) {
		state.chcheProfits = profits;
	},
	[CHAHESTOMPPRICES]( state, prices ) {
		let symbol = prices.symbol;

		if ( !state.isConnectStompSuccess && prices.from == 'stomp' ) {
			state.isConnectStompSuccess = true;
		}

		state.cacheStompPrices.triggerVier = state.cacheStompPrices.triggerVier ? 0 : 1;	
		state.cacheStompPrices[symbol] = prices;
	}

}