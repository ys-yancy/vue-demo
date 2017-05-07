import {
	OPTIONLISTDATA,
	STOMPCURRENTPRICE,
	STOCKSYMBOLLIST,
	INFODATA,
	CURSYMBOLINFO,
	USERACCOUNT,
	ISLOGIN,
} from './mutations_types';

export default {
	[USERACCOUNT]( state, account ) {
		state.userAccount = account;
	},

	[ISLOGIN]( state, login ) {
		state.isLogin = login;
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
	}
}