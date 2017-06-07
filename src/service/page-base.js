import __ from './IO';
import Cookie from '../pages/lib/cookie';
import Storage from '../pages/common/storage';
export default {
	price: {},
	/*
	*  @ token  	   测试服
	*  @ ccess_token   生产服
	*/

	// 获取账户信息
	async getAccount() {
		const params = {
			url: 'v4/user/',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
        		_r: Math.random(),
			},
		}

		let account = '';

		let key = `${Cookie.get('token')}:account`;

		let store_account = await this.getStore(key);

		if ( store_account != null && store_account != '' ) {
			account = store_account;
		} else {
			account = await __.ajax(params);
			Storage.set(key, account);
		}

		Cookie.set('demo_group', account.data.data.account.demo.group_name);
		Cookie.set('real_group', account.data.data.account.real.group_name);

		return account;
	},

	// 获取交易页面的symbol
	async getOptionSymbolList( options ) {
		options.url = 'v3/' + Cookie.get('type') + '/symbols6/';

		options._r = Math.random();

		const params = {
			url: options.url,
			type: "GET",
			data: {
				access_token: options.access_token,
				_r: options._r,
			},
		}

		let symbolData = await __.ajax(params);

		//将获取到的symbol存起来
		this._saveSymbols(symbolData);

		return symbolData;
	},

	//获取k线图数据
	async getStockSymbolList(options) {
		options.url = 'http://price.invhero.com/v3/price/candle/';
		const id = options.id, tf = options.tf, group_name = options.group_name;
		const params = {
			url: options.url,
			type: 'GET',
			data: {
				id,
				tf,
				group_name,
			},
			unjoin: true,
		}

		let stockSymbolList = await __.ajax(params);

		return stockSymbolList;

	},

	// 获取每每一天的数据
	async getInfoData(options) {
		const id = options.id, group_name = options.group_name;
		const params = {
			url: 'http://price.invhero.com/v3/price/candle/',
			type: 'GET',
			data: {
				id,
				tf: 'd1',
				group_name,
			},
			unjoin: true,
		}

		let infoData = await __.ajax(params);

		return infoData;
	},

	// 获取当前品种的信息
	async getCurSymbolInfo(options) {
		const id = options.id, group_name = options.group_name;
		const params = {
			url: 'v3/' + Cookie.get('type') + '/symbols6/',
			type: 'GET',
			data: {
				symbols: options.symbols,
				access_token: Cookie.get('token'),
			},
		}

		let CurSymbolInfo = await __.ajax(params);
		
		return CurSymbolInfo;
	},

	// 获取当前订单列表
	async getCurrentOrderList(options) {
		const params = {
			url: 'v1/orders/' + Cookie.get('type') + '/current?',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
				_r: Math.random(),
			},
		}

		let currentOrderList = await __.ajax(params);

		return currentOrderList;
	},

	// 获取当前订单列表
	async getHistoryOrderList(options) {
		const params = {
			url: 'v1/orders/' + Cookie.get('type') + '/history/list?',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
				page_num: options.page,
				_r: Math.random(),
			},
		}

		let currentOrderList = await __.ajax(params);

		return currentOrderList;
	},

	// 个人设置

	async getWatchdataLimt(options) {
		const params = {
			url: 'v1/user/profile/permission/data',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
				invite_code: Cookie.get('inviteCode'),
				_r: Math.random(),
			},
		}

		let watchdataLimt = await __.ajax(params);

		return watchdataLimt;
	},

	async getCurrentOrderLimt(options) {
		const params = {
			url: 'v1/user/profile/permission/current_order',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
				invite_code: Cookie.get('inviteCode'),
				_r: Math.random(),
			},
		}

		let currentOrderLimt = await __.ajax(params);

		return currentOrderLimt;
	},

	async getHistoryOrderLimt(options) {
		const params = {
			url: 'v1/user/profile/permission/history_order',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
				invite_code: Cookie.get('inviteCode'),
				_r: Math.random(),
			},
		}

		let historyOrderLimt = await __.ajax(params);

		return historyOrderLimt;
	},

	async getAllowFollowingLimt(options) {
		const params = {
			url: 'v1/user/profile/permission/allow_following',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
				invite_code: Cookie.get('inviteCode'),
				_r: Math.random(),
			},
		}

		let allowFollowingLimt = await __.ajax(params);

		return allowFollowingLimt;
	},

	/**
	* 输入开仓价格, 交易账户, 交易品种, 交易量, 计算占用保证金
	* openPrice: 设定的开仓价格
	* symbol: 从2.2.2.4 接口获取的symbol对象
	* volume: 交易量, 单位 手(Lot)
	* account: 从2.2.2.5 接口获取的account对象
	**/

	getMargin(openPrice, symbol, volume, account) {
		const isDemo = this.isDemo();
		let accountwrapper = isDemo ? account['demo'] : account['real'];

		const d= new Promise((resolve, reject) => {
			// 杠杆
		    let max_leverage = isDemo ? symbol.policy.demo_max_leverage : symbol.policy.real_max_leverage;
		    let account = accountwrapper;
		    let currency = account.currency;
		    let trading_leverage = account.leverage * symbol.policy.leverage_multiplier; // 这里的account.leverage是对应demo或者real账户的leverage

		    trading_leverage = trading_leverage < max_leverage ? trading_leverage : max_leverage;

		    // 品种成交价格
		    let mid_price = openPrice,
		    trading_currency = symbol.policy.trading_currency,
		    trading_home_symbol = trading_currency;

		    let trading_home_price = 0;

		    // 品种trading_currency于账户home_currency的报价
		    if ( trading_currency == currency ) {
		    	trading_home_price = 1;
		    	resolve(margin());
		    } else {
		    	trading_home_symbol = trading_currency + currency; //这里要根据当前账户类型选择real或者demo!!!!!!!!!!!
      			let alg = 0;
      	// 		if (!Symbols.has(trading_home_symbol)) {
			    //     trading_home_symbol = currency + trading_currency;
			    //     alg = 1;
			    // }

			    this.getCurrentPrice(trading_home_symbol, true).then((price) => {
			    	if ( alg == 0 ) {
			    		if (price && price.bid_price && price.ask_price) {
				            trading_home_price = (parseFloat(price.bid_price) + parseFloat(price.ask_price)) / 2;
				            resolve(margin());
				        }
			    	} else {
			    		if (price && price.bid_price && price.ask_price) {
				            trading_home_price = (parseFloat(price.bid_price) + parseFloat(price.ask_price)) / 2;
				            trading_home_price = 1 / trading_home_price;
				            let marginVal = margin();
				            resolve(marginVal);
				        } else {
				            reject();
				        }
			    	}
			    })


		    }

		    // 在这里用 function 声明  变量提升
		    function margin() {
		    	let margin = parseFloat(symbol.policy.lot_size) * volume * parseFloat(mid_price) / (parseFloat(trading_leverage) / parseFloat(trading_home_price));
		    	return margin;
		    }

		})

		return d;
	},

	/**
	* 计算默认交易量, 使用可用保证金的10%算
	*
   	**/

   	calVolume(symbol, account, preparedMargin) {
   		return this.calMarginWithMarketPrice(symbol, symbol.policy.min_vol, account).then((margin) => {
   			account = this.isDemo() ? account.demo : account.real;

		    let maxMargin = preparedMargin;
		    preparedMargin = preparedMargin * .1;

		    var volume = getVolume(preparedMargin);
		    var maxVolume = getVolume(maxMargin);


		    return {
		        volume: volume,
		        maxVolume: maxVolume
		    };

		    function getVolume(hasMargin)  {
		        // 不够交易最小交易量的情况
		        if (hasMargin < margin)
		          return 0;
		        var vol = hasMargin / margin;
		        var min_vol = symbol.policy.min_vol;
		        vol = vol * min_vol;
		        if (min_vol < 1) {
		          min_vol = 1 / min_vol;
		          vol = vol.toFixed(min_vol.toString().length - 1);
		        } else {
		          vol = parseInt(vol / min_vol);
		        }

		        vol = vol > parseFloat(symbol.policy.max_vol) ? symbol.policy.max_vol : vol;

		        return vol;
		    }
   		})
   	},

	//获取当前品种的价格
	getCurrentPrice(symbol) {
		return new Promise(( resolve, reject ) => {

			let type = this.isDemo() ? 'demo' : 'real';

    		let ret = this.getPrice(symbol), price = {};
    		//在这里放到stroage里,  
    		let key = `${type}:${symbol}:curPrice`
	    	if (ret[symbol] && ret[symbol] == undefined) {    		
	    		ret.then((data)=> {
	    			Storage.set(key, data);
	    			resolve(data)
	    			
	    		})
	    	} else {
	    		Storage.set(key, ret);
	    		resolve(ret)

	    	}

		})
	},

	/**
   	* 输入交易账户, 交易品种, 交易量, 按当前市场价格计算占用保证金
   	* symbol: 从2.2.2.4 接口获取的symbol对象
   	* volume: 交易量, 单位 手(Lot)
   	* account: 从2.2.2.5 接口获取的account对象
   	**/

   	calMarginWithMarketPrice(symbol, volume, account) {
   		return this.getCurrentPrice(symbol.policy.symbol, true).then((price) => {
	      	// var midPirce = price.price === '--' ? 0 : (parseFloat(price.bid_price) + parseFloat(price.ask_price)) / 2;
	      	var midPirce = (parseFloat(price.bid_price) + parseFloat(price.ask_price)) / 2;
	      	return this.getMargin(midPirce, symbol, volume, account);
	    });
   	},

	// 
	_saveSymbols(data) {
		let listSymbols = [],
			type = Cookie.get('type'),
			token = Cookie.get('token'),
			key = `${token}:${type}:symbols`;
		data = data.data.data;
		for ( let i = 0; i < data.length; i++ ) {
			listSymbols.push(data[i].policy.symbol);
		}
		Storage.set(key, listSymbols);
	},

	getStorageSymbols() {
		let type = Cookie.get('type'),
			token = Cookie.get('token'),
			key = `${token}:${type}:symbols`;
		return Storage.get(key);
	},

	getStore(key) {
		return new Promise(function( resolve, reject ) {
			const val = Storage.get(key);
			resolve(JSON.parse(val));
		})
	},

	getPrice(symbol) {
		let type = Cookie.get('type')
		let curPrice = this.price[symbol];
		//  如果stomp 推下来
		if ( curPrice ) {
			return {
				symbol: curPrice[0],
				ask_price: curPrice[1],
				bid_price: curPrice[3],
				received_time: curPrice[7],
			}
		}

		// 从v2/price取价格
		let cur_symbol = `quote.${type}_default.${symbol}`;
		
		return __.ajax({
			url: 'http://price.invhero.com/v2/price/current',
			type: 'GET',
			data: {
				symbol: cur_symbol,
			},
			unjoin: true,
		}).then((data) => {
			data = data.data.data[0];
			if (data == undefined) {
				return {}
			}
			return {
				symbol: data.symbol,
				ask_price: data.ask_price[0],
				bid_price: data.bid_price[0],
				received_time: data.received_time,
			}
		})

	},

	isDemo() {
		let type = Cookie.get('type');
		if ( type == 'demo' ) {
			return true;
		} else {
			return false;
		}
	},



}