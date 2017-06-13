import __ from './IO';
import Cookie from '../pages/lib/cookie';
import Storage from '../pages/common/storage';
import Symbol from '../pages/common/symbol';
import Symbols from '../pages/common/symbols';
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
		// 应该缓存  但是有时间限制
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
		let type = Cookie.get('type'),
			token = Cookie.get('token'),
			key = `${type}:${token}:curorder`

		let cacheCurOrderList = Storage.get(key);
		if ( cacheCurOrderList ) {
			return JSON.parse(cacheCurOrderList);
		}
		const params = {
			url: 'v1/orders/' + Cookie.get('type') + '/current?',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
				_r: Math.random(),
			},
		}

		let currentOrderList = await __.ajax(params);
		Storage.set(key, currentOrderList);
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

	async getMargin(openPrice, symbol, volume, account) {
		const isDemo = this.isDemo();
		let accountwrapper = isDemo ? account['demo'] : account['real'];
		account = accountwrapper;

		// 杠杆
	    let max_leverage = isDemo ? symbol.policy.demo_max_leverage : symbol.policy.real_max_leverage;
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
	    	return margin()
	    } else {
	    	trading_home_symbol = trading_currency + currency; //这里要根据当前账户类型选择real或者demo!!!!!!!!!!!

  			let alg = 0;
  			if (!Symbols.has(trading_home_symbol)) {
		        trading_home_symbol = currency + trading_currency;
		        alg = 1;
		    }

		    let price = await this.getCurrentPrice(trading_home_symbol);

	    	if ( alg == 0 ) {
	    		if (price && price.bid_price && price.ask_price) {
		            trading_home_price = (parseFloat(price.bid_price) + parseFloat(price.ask_price)) / 2;
		            return margin();
		        }
	    	} else {
	    		if (price && price.bid_price && price.ask_price) {
		            trading_home_price = (parseFloat(price.bid_price) + parseFloat(price.ask_price)) / 2;
		            trading_home_price = 1 / trading_home_price;
		            let marginVal = margin();
		            return marginVal;

		        } else {
		            return Promise.reject()
		        }
	    	}
	    }

	    // 在这里用 function 声明  变量提升
	    function margin() {
	    	let margin = parseFloat(symbol.policy.lot_size) * volume * parseFloat(mid_price) / (parseFloat(trading_leverage) / parseFloat(trading_home_price));
	    	return margin;
	    }
	},

	/**
   	* 输入交易账户, 交易品种, 交易量, 按当前市场价格计算占用保证金
   	* symbol: 从2.2.2.4 接口获取的symbol对象
   	* volume: 交易量, 单位 手(Lot)
   	* account: 从2.2.2.5 接口获取的account对象
   	**/

   	async calMarginWithMarketPrice(symbol, volume, account) {
   		let price = await this.getCurrentPrice(symbol.policy.symbol, true);

   		if ( Array.isArray(price) ) {
   			price = price[0];
   		}

   		let midPirce = (parseFloat(price.bid_price) + parseFloat(price.ask_price)) / 2;
   		let margin = await this.getMargin(midPirce, symbol, volume, account);
   		return margin;
   	},

   	/**
	* 计算默认交易量, 使用可用保证金的10%算
	*
   	**/

   	async calVolume(symbol, account, preparedMargin) {
   		let margin = await this.calMarginWithMarketPrice(symbol, symbol.policy.min_vol, account);
   		account = this.isDemo() ? account.demo : account.real;
   		let maxMargin = preparedMargin;
   		preparedMargin = preparedMargin * .1;
   		let volume = getVolume(preparedMargin);
		let maxVolume = getVolume(maxMargin);
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
   	},

   	/**
   	* 传入价格信息, 计算对应的止盈止损的金额, 用户下单UI
   	* account 账户对象
    * cmd 交易类型 buy 或者 sell
    * symbol 商品对象
    * volume 交易量, 例如0.02
    * openPrice 开仓价格, 例如EURUSD开仓 1.10233
    * stopLoss 止损价格, 例如EURUSD止损 1.08000
    * takeProfit 止盈价格, 例如EURUSD止盈 1.20000
    *
    **/

    async calMoney(account, symbol, volume, openPrice, stopLoss, takeProfit) {
	    // 开仓价格与当前价格的价差, cmd还有挂单的可能性, 但是挂单没有浮动盈亏
	    let stoploss_price_delta = 0;
	    let takeprofit_price_delta = 0;

	    // 品种trading_currency于账户home_currency的报价
	    let trading_currency = symbol.policy.trading_currency;
	    let trading_home_price = 0;
	    account = this.isDemo() ? account.demo : account.real;

	    if (stopLoss != 0) {
	      	stoploss_price_delta = stopLoss - openPrice;
		    if (stoploss_price_delta > 0) {
		        stoploss_price_delta = 0 - stoploss_price_delta;
		    }
	      /*
	      if (symbol.cmd == 'buy') {
	          stoploss_price_delta = stopLoss - openPrice;
	      } else {
	          stoploss_price_delta = openPrice - stopLoss;
	      }
	      */
	    }

	    if (takeProfit != 0) {
		    takeprofit_price_delta = takeProfit - openPrice;
		    if (takeprofit_price_delta < 0) {
		        takeprofit_price_delta = 0 - takeprofit_price_delta;
		    }
		      /*
		      if (symbol.cmd == 'buy') {
		          takeprofit_price_delta = takeProfit - openPrice;
		      } else {
		          takeprofit_price_delta = openPrice - takeProfit;
		      }
		      */
	    }

	    if (trading_currency == account.currency) { //这里要根据当前账户类型选择real或者demo!!!!!!!!!!!
	      trading_home_price = 1;
	      return money();
	    } else {
	      	var trading_home_symbol = trading_currency + account.currency; //这里要根据当前账户类型选择real或者demo!!!!!!!!!!!
	      	var alg = 0;
	      	if (!Symbols.has(trading_home_symbol)) {
	        	trading_home_symbol = account.currency + trading_currency;
	        	alg = 1;
	      	}

	    	let price = await this.getCurrentPrice(trading_home_symbol, true);

        	if (alg == 0) {
        	  	if (price && price.bid_price && price.ask_price) {
        	    	trading_home_price = (parseFloat(price.bid_price[0]) + parseFloat(price.ask_price[0])) / 2;
        	    	return money();
        	  	}
        	} else {
        	  	//trading_home_symbol = account.currency + trading_currency;
        	  	//self.getCurrentPrice(trading_home_symbol, true).then(function(price) {
        	  	if (price && price.bid_price && price.ask_price) {
        	    	trading_home_price = (parseFloat(price.bid_price[0]) + parseFloat(price.ask_price[0])) / 2;
        	    	trading_home_price = 1 / trading_home_price;
        	    	let moneyVal = money();
        	    	return moneyVal;
        	  	} else {
        	    	return Promise.reject();
        	  	}
        	}
	    };

	    function money() {
	      return {
	        takeProfit: parseFloat(takeprofit_price_delta) * parseFloat(symbol.policy.lot_size) * volume * parseFloat(trading_home_price),
	        stopLoss: parseFloat(stoploss_price_delta) * parseFloat(symbol.policy.lot_size) * volume * parseFloat(trading_home_price)
	      }
	    }
  	},

  	/**
    * 传入账户信息, 订单信息, 计算当前持仓的浮动盈亏  1个订单
    *
    * @param {Boolean} returnObj 返回每个订单的浮动盈亏  默认返回全部
    */

    async getFloatingProfit(account, orderList, symbols) {
      	let orderLen = orderList.length,
      		mainProfit = 0,
      		floatList = {},
      		count = 0,
      		type = this.isDemo() ? 'demo' : 'real';

		    if (orderLen === 0) {
		      return 0;
		    }

    		let groupName = account;



    	let prices = await this.getCurrentPrice(symbols, 'profit');
    	// let optionList = Symbol.get(symbols);
    	let optionList = Symbol.getOptionSymbols();
	    try {
	        let deferreds = await getProfitList(optionList, prices, orderList);
	    } catch (e) {}

    	// $.when.apply($, deferreds).done(function() { // 猜测只要deferreds 有变化就会执行
       	return ({mainProfit: mainProfit, floatList: floatList || [], prices: prices || []});
    	// });

	    async function getProfitList(optionList, prices, orderList) {
	      	let deferreds = [];
		    for ( let i = 0; i < orderList.length; i++ ) {
		    	let ret = await getProfit(orderList[i], prices, optionList);
		    	deferreds.push(ret);
		    }
	      	return deferreds;
	    }

	    async function getProfit(item, prices, optionList) {
	        let symbol = item.symbol,
	        	current_price = getPrice(prices, symbol),
	        	policy = getSym(optionList, symbol).policy;

		    // 如果从服务器没有获得某品种的价格, 那么就不做计算
		    if (!current_price) {
		        return 0;
		    }

	      	// 开仓价格与当前价格的价差, cmd还有挂单的可能性, 但是挂单没有浮动盈亏
	      	let price_delta = 0;
	      	if (item.status == 'open' && item.cmd.indexOf('buy') != -1) {

	        	price_delta = current_price.bid_price[0] - item.openPrice;

	      	} else if (item.status == 'open' && item.cmd.indexOf('sell') != -1) {

	        	price_delta = item.openPrice - current_price.ask_price[0];
	       
	      	}

	      	// 品种trading_currency于账户home_currency的报价
	      	let trading_currency = policy.trading_currency;
	      	let trading_home_price = 0;

	      	if (trading_currency == account[type].currency) { //这里要根据当前账户类型选择real或者demo!!!!!!!!!!!
	        	trading_home_price = 1;
	        	return (profit(trading_home_price, item))
	      	} else {

	        	let trading_home_symbol = trading_currency + account[type].currency; //这里要根据当前账户类型选择real或者demo!!!!!!!!!!!
	
	        	let alg = 0;
	        	// 提前判断，如果当前品种不在列表里，则转换，减少请求
	        	if (!Symbols.has(trading_home_symbol)) {
	        	  	trading_home_symbol = account[type].currency + trading_currency;
	        	  	alg = 1;
	        	}
	
	        	let temp_price = this.getCurrentPrice(trading_home_symbol, true);
          		if (alg == 0) {
            		if (temp_price && temp_price.bid_price) {
            	  		trading_home_price = parseFloat(temp_price.bid_price[0]);
	
            	  		// trading_home_price = (parseFloat(temp_price.bid_price[0]) + parseFloat(temp_price.ask_price[0]) )/ 2;
            	  		return (profit(trading_home_price, item))
            		}
          		} else {
            		// trading_home_symbol = account[type].currency + trading_currency; //这里要根据当前账户类型选择real或者demo!!!!!!!!!!
            		if (temp_price && temp_price.ask_price) {
	
            	  		trading_home_price = parseFloat(temp_price.ask_price[0]);
	
            	  		// trading_home_price = (parseFloat(temp_price.bid_price[0]) + parseFloat(temp_price.ask_price[0])) / 2;
            	  		trading_home_price = 1 / trading_home_price;
            	  		return (profit(trading_home_price, item));
            		} else {
            	  		return profit(0, item)
            		}
          		}
	    	}

		    function profit(trading_home_price, item) {
		        // 只有status=open的订单才需要计算profit
		        let profitNum = parseFloat(item.profit);
		        if (item.status == 'open') {
		          	profitNum = parseFloat(price_delta) * parseFloat(policy.lot_size) * parseFloat(item.volume) * parseFloat(trading_home_price);
		          	profitNum = profitNum + parseFloat(item.swap || 0) - parseFloat(item.commission || 0);
		        }

		        floatList[item.ticket] = profitNum;
		        mainProfit += profitNum;
		        return profitNum;
		    }
	    }

	    function getPrice(prices, symbol) {
	      	for (let i = 0, len = prices.length; i < len; i++) {	
	        	if (prices[i].symbol === symbol) {
	          		return prices[i];
	        	}
	      	}
	    }

	    function getSym(optionList, symbol) {
	      	for (let i in optionList ) {
	        	if (optionList[i].policy.symbol == symbol) {
	          		return optionList[i];
	        	}
	      	}
	    }
  	},

   	//获取当前品种的价格 当前价格是优化的关键
	async getCurrentPrice(symbol, returnObj) {
		let type = this.isDemo() ? 'demo' : 'real';
		let ret = await this._getPrice(symbol, returnObj);
		//在这里放到stroage里,  以后改进
		let key = `${type}:${symbol}:curPrice`;
		Storage.set(key, ret);
    	return ret;
	},

	async _getPrice(symbol, returnObj) {
		let type = Cookie.get('type');

		if ( typeof symbol !== 'string' ) {
			symbol = symbol[0];
		}
		let curPrice = Symbol.get(symbol);

		//stomp 推下来
		if ( curPrice && curPrice.length ) {
			return curPrice;
		}

		// 从v2/price取价格
		let symbol_price = Symbol.getQuoteKeys();

		let params = {
			url: 'http://price.invhero.com/v2/price/current',
			type: 'GET',
			data: {
				symbol: symbol_price,
			},
			unjoin: true,
		}

		let data = await __.ajax(params);

		data = data.data.data;

		if (returnObj == 'profit') {
			return data;
		}

		// 有时 v2/price/current 拿不到价格
		for ( let i = 0; i < data.length; i++ ) {
			let params = {
				symbol: data[i].symbol,
      			askPrice: data[i].ask_price[0],
      			bidPrice: data[i].bid_price[0],
      			lastPrice: data[i].last_price,
      			bid_price: [data[i].bid_price[0]],
      			ask_price: [data[i].ask_price[0]],
			}

			Symbol.updatePrice(params);

			if ( data[i].symbol == symbol ) {		
				return returnObj = params;
			}
		}
		return returnObj;
	},

	async getStore(key) {
		const val = Storage.get(key);
		return JSON.parse(val);
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