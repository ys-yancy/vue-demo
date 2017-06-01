import __ from './IO';
import Cookie from '../pages/lib/cookie';
import Storage from '../pages/common/storage';
export default {
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

	async getMargin(openPrice, symbol, volume, account) {
		var d= new Promise(function(resolve, reject) {
			
		})
	},


	//
	_saveSymbols(data) {
		let listSymbols = [],
			type = 'demo',
			token = Cookie.get('token'),
			key = `${token}:${type}:symbols`;
		data = data.data.data;
		for ( let i = 0; i < data.length; i++ ) {
			listSymbols.push(data[i].policy.symbol);
		}

		Storage.set(key, listSymbols);
	},

	getStorageSymbols() {
		let type = 'demo',
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

}