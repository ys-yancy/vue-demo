import {
	OPTIONLISTDATA,
	STOMPCURRENTPRICE,
	STOCKSYMBOLLIST,
	INFODATA,
	CURSYMBOLINFO,
	USERACCOUNT,
	ISLOGIN,
	CHANGETYPE,
	WATCHDATALIMT,
	CURRENTORDERLIMT,
	HISTORYORDERLIMT,
	ALLOWFOLLOWINGLIMT,
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
}