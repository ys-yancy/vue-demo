import {
	OPTIONLISTDATA,
	STOMPCURRENTPRICE,
	STOCKSYMBOLLIST,
	INFODATA,
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
	COUNTUSERMARGIN,
	COUNTDEFAULTVOLUME,
	CACHECURORDERPRIFIT,
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

	[OPTIONLISTDATA]( state, dataList ) {
		state.symbolList = dataList;
	},

	[STOMPCURRENTPRICE]( state, CurrentPrice ) {
		state.symbolCurrentPrice = CurrentPrice;
	},

	[STOCKSYMBOLLIST]( state, stockList ) {
		state.stockSymbolList = stockList;
	},

	[INFODATA]( state, infoData ) {
		state.infoData = infoData;
	},

	[CURSYMBOLINFO]( state, curSymbolInfoData ) {
		state.curSymbolInfoData = curSymbolInfoData;
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
	[COUNTUSERMARGIN]( state, curOrderMargin ) {
		state.curOrderMargin = curOrderMargin;
	},
	[COUNTDEFAULTVOLUME]( state, volume ) {
		state.defaultVolume = volume;
	},
	// 以后优化
	[CACHECURORDERPRIFIT]( state, profits ) {
		state.cacheCurOrderProfit = profits;
	},
	[CHAHESTOMPPRICES]( state, prices ) {
		let symbol = prices.symbol;
		state.cacheStompPrices[symbol] = prices;
	}

}