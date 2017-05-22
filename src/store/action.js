import _ from '../service/page-base';
import F from '../pages/lib/frame';
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
		_.getOptionSymbolList(options).then(function( optionList ) {
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
		let [ login, passcode, host, url ] = 
			[ 'gooduser', 'passwd1', 'localhost', 'ws://rtprice.invhero.com:61613/stomp' ];

		onmessage = message => {
			message = JSON.parse( message.body );
			const symbolPrice = message.d.split(',');
			commit('STOMPCURRENTPRICE', symbolPrice);
		}

		const connect_callback = message => {
			console.log('Stomp连接成功！');
			const symbols = JSON.parse(_.getStorageSymbols());

			for ( let i = 0; i < symbols.length; i++ ) {
				Client.subscribe('quote.' + 'real_default.' + symbols[i] +'?format=v2&throttle=1', onmessage)
			}
			
		}

		const error_callback = err => {
			console.log('Stomp连接失败！')
		}

		F.client && F.client.disconnect();
		const Client = Stomp.client(url);
		Client.connect(login, passcode, connect_callback, error_callback, host);
	},

}