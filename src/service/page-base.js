import __ from './IO';
import Cookie from '../pages/lib/cookie';
import Util from '../pages/common/util';
import Storage from '../pages/common/storage';
import Symbol from '../pages/common/symbol';
import Symbols from '../pages/common/symbols';
export default {
	/*
	*  @ token  	   测试服
	*  @ ccess_token   生产服
	*/

	// 获取账户信息
	async getAccount(isClearStore) {
		const params = {
			url: 'v4/user/',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
        		_r: Math.random(),
			},
		}

		let key = `${Cookie.get('token')}:account`;

		let store_account = await this.getStore(key);

		if ( !!store_account && !isClearStore ) {
			return store_account;
		}

		let account = await __.ajax(params);
		Storage.set(key, account.data.data);

		Cookie.set('demo_group', account.data.data.account.demo.group_name);
		Cookie.set('real_group', account.data.data.account.real.group_name);

		return account.data.data;
	},

	async getOptionSymbolList() {
		let demo = this.isDemo();
		let url = demo ? '/v3/demo/symbols6' : '/v3/real/symbols6';
		const params = {
			url,
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
        		_r: Math.random(),
			},
		}

		let data = await __.ajax(params);

		data = data.data.data;

		let optionSymbolList = [], key = this.isDemo() ? 'demoOptionList' : 'optionList'
		optionSymbolList = data.map( (item, index) => {
			return item.policy.symbol;
		});
		Storage.set(`${Cookie.get('token')}${key}`, optionSymbolList);
		return data;
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
	async getCurrentOrderList(options, isSetUp) {
		let key = this.getStorageKey('curorder');
		let cacheCurOrderList = Storage.get(key);
		cacheCurOrderList = JSON.parse(cacheCurOrderList);

		if ( cacheCurOrderList && !isSetUp ) {
			if (!!cacheCurOrderList.exp) {
				let now_time = Date.now();
				if ( now_time < cacheCurOrderList.exp ) {

					return cacheCurOrderList;
				}
			}		
		}


		const params = {
			url: 'v1/orders/' + Cookie.get('type') + '/current?',
			type: 'GET',
			data: {
				access_token: Cookie.get('token'),
				_r: Math.random(),
			},
		}

		let orderList = await __.ajax(params);

		orderList = orderList.data.data;
		let margin = 0,
			profit = 0,
			symbols = [];

		for ( let i = 0; i < orderList.length; i++ ) {
			let symbol = orderList[i].symbol;
			if (symbols.indexOf(symbol) === -1) {
	  		symbols.push(symbol);
	  		}
	  		margin += parseFloat(orderList[i].margin);
	  		profit += parseFloat(orderList[i].profit);
		}
				
		let cacheorderList = {
			list: orderList,
			symbols: symbols,
	        margin: margin,
	        profit: profit,
		};
		Object.defineProperty(cacheorderList, 'exp', {
			enumerable: true,
			writable: false,
			value: Date.now() + 1000 * 30
		})
		Storage.set(key, cacheorderList);
		return cacheorderList;
	},

	// 获取历史订单列表
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

	// 获取价格
	async getSymbolsPrices(symbol_price) {
		let params = {
			url: 'http://price.invhero.com/v2/price/current',
			type: 'GET',
			data: {
				symbol: symbol_price,
			},
			unjoin: true,
		};

		let data = await __.ajax(params);

		return data.data.data;
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
 	* 判断当前品种状态
	**/
	async checkStatus(symbol, account) {
		let closeTime = symbol.close_time[0];
    	//let curaccount = this.isDemo() ? account.demo : account.real;
    	let time = Date.now(), status = {};

    	if (closeTime && time < Util.getTime(closeTime.end) && time > Util.getTime(closeTime.start)) {
    		status = {
		        tag: '休市',
		        className: 'close',
		        type: 'close',
		        start: closeTime.end,
		        closeTime: closeTime.start,
		        reason: closeTime.reason
		    };
		    return status;
    	} else if (symbol.policy.real_enabled == '0' && symbol.policy.demo_enabled == '0') {
    		status.tag = '不可交易';
		    status.type = 'un-trade';
		    resolve(status);
    	} else if ( !this.isDemo() && symbol.policy.real_enabled == '0' ) {
    		status.tag = '限模拟';
      		status.className = 'simulate';
      		status.type = 'simulate';
      		return status;
    	} else {
    		return {};
    		// 如果已经开仓了, 那么就不用检查余额不足了
    		// if (false) {
      //   		return {};
    		// } else {
    		// 	let free_margin = account.free_margin;
		    //     this.calMarginWithMarketPrice(symbol, symbol.policy.min_vol, account).then(function(margin) {
			   //      if (free_margin <= margin) {
			   //          return {
			   //            	tag: '余额不足',
			   //            	type: 'more-money',
			   //          }
			   //      } else {
			   //          return {}
			   //      }
		    //     });
    		// }
    	}
	},

	getStorageKey(info) {
		let type = Cookie.get('type'),
			token = Cookie.get('token');
		return `${type}:${token}:${info}`

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