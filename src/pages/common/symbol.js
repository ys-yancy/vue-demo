import cookie from '../lib/cookie';
import storage from './storage';
import io from '../../service/IO';
import F from '../lib/frame';

export default {
	prices: {},

	async getOptionSymbolList( options ) {


		//saveSymbols(symbolData) 应该存为数组
		// let cacheSymbolList = this.getSelfSymbols();

		// if ( cacheSymbolList ) {
		// 	return cacheSymbolList;
		// }

		options.url = 'v3/' + cookie.get('type') + '/symbols6/';

		options._r = Math.random();

		const params = {
			url: options.url,
			type: "GET",
			data: {
				access_token: options.access_token,
				_r: options._r,
			},
		}

		let symbolData = await io.ajax(params);

		//将获取到的symbol存起来
		this.saveSymbols(symbolData);
		return symbolData;
	},

	getStompCurrentPrice(onmessage_callback) {

		this.client && this.client.disconnect();
		this.onopen = false;

		let [ login, passcode, host, url ] = 
			[ 'gooduser', 'passwd1', 'localhost', 'ws://rtprice.invhero.com:61613/stomp' ];

		const onmessage = message => {
			message = JSON.parse( message.body );
			const symbolPrice = message.d.split(',');
			onmessage_callback(symbolPrice);

			let params = {
				symbol: symbolPrice[0],
          		askPrice: symbolPrice[1],
          		bidPrice: symbolPrice[3],
          		lastPrice: symbolPrice[5],
          		bid_price: [symbolPrice[3]],
          		ask_price: [symbolPrice[1]],
			}
			this.updatePrice(params);
		};

		const connect_callback = message => {
			console.log('Stomp连接成功！');
			const symbols = this.getOptionSymbols(true);
			for ( let i = 0; i < symbols.length; i++ ) {
				Client.subscribe('quote.' + 'real_default.' + symbols[i] +'?format=v2&throttle=1', onmessage)
			}
			
		}

		const error_callback = err => {
			console.log('Stomp连接失败！')
			this.getStompCurrentPrice(onmessage_callback);
		}

		F.client && F.client.disconnect();
		const Client = Stomp.client(url);
		Client.connect(login, passcode, connect_callback, error_callback, host);

		Client.onopen = () => {
      		this.onopen = true;
      	}
		this.client = Client;
	},

	saveSymbols(symbols) {
		symbols = symbols.data.data;
		let cache = {};
		for ( let i = 0; i < symbols.length; i++ ) {
			cache[symbols[i].policy.symbol] = symbols[i];
		}
		this._saveLocal(cache);
	},

	get(symbols) {
		let all = true,
			prices = [],
    		newSymbols = [];

    	if (typeof symbols === 'string') {
      		// symbols = [symbols];
      		symbols = Array.of(symbols);
    	}
    	
    	symbols.forEach((symbol) => {
		    if (!this.prices[symbol]) {
		        all = false;
		    } else {
		        prices.push(this.prices[symbol]);
		    }

		    if (symbols.indexOf(symbol) === -1) {
		        newSymbols.push(symbol);
		    }
		});

		if (prices.length === symbols.length && prices.length > 0 && (this._allIn(symbols) || all)) {
		    return prices;
		} else {
		    if (newSymbols.length > 0) {
		        this._add(newSymbols);
		    }
		}

	},

	getQuoteKeys(symbols) {
		let type = cookie.get('type') === 'demo' ? 'demo' : 'real';
	    let list = this.getOptionSymbols(true);
	    if ( symbols ) {
	    	list = symbols;
	    }

	    list = list.map((item, index) => {
	    	return `quote.${type}_default.${item}`;
	    });
	    return list.join(',')

  	},

  	updatePrice(params) {
  		let symbol = params.symbol;
    	// 过期时间  以后加过期时间
    	// params.expired = (new Date()).getTime() + Config.getExpiredTime();
    	this.prices[symbol] = params;
  	},

  	getOptionSymbols(isKey) {
  		let optionLists = this._getSelfSymbols();
  		if (isKey) {
  			return Object.keys(optionLists);
  		} 
  		return optionLists;
  	},

  	_add(symbols) {
	    let type = cookie.get('type') === 'demo' ? 'demo' : 'real';

	    let onmessage = (message) => {
	      try {
	        var body = JSON.parse(message.body);

	        var data = body.d.split(',');
	        var params = {
	          	symbol: data[0],
	          	askPrice: data[1],
	          	bidPrice: data[3],
	          	lastPrice: data[5],
	          	bid_price: [data[3]],
	          	ask_price: [data[1]]
	        };

	        this.updatePrice(params);
	      } catch (e) {}
	    }

	    // this.getGroupName().then((groupName) => {
      	for (var i = 0, len = symbols.length; i < len; i++) {
        	try {
          		this.client.subscribe('quote.' + 'real_default' + '.' + symbols[i] + '?format=v2&throttle=1', onmessage);
        	} catch (e) {}
      	}
	    // });
  	},

	_saveLocal(cache) {
		let key = this._getOptionSymbolListStoragekey();
    	let mySymbols = storage.get(key);
    	if (mySymbols) {
    		mySymbols = JSON.parse(mySymbols);
    	} else {
    		mySymbols = {}
    	}
    	Object.keys(cache).forEach((key, index) => {
    		if (!mySymbols[key]) {
    			mySymbols[key] = cache[key]
    		}
    	})
    	storage.set(key, mySymbols);
	},

	_allIn(symbols) {
	    let all = true;
	    let this_symbols = this.getOptionSymbols(true);

	    this_symbols.forEach((symbol) => {
	      	if (symbols.indexOf(symbol) === -1) {
	        	all = false;
	      	}
	    });

	    return all;
  	},

  	_getSelfSymbols() {
  		let key = this._getOptionSymbolListStoragekey();
    	let symbols = JSON.parse(storage.get(key));
    	return symbols
  	},

  	_getOptionSymbolListStoragekey() {
  		let type = cookie.get('type') === 'demo' ? 'demo' : 'real';
    	let token = cookie.get('token');
    	let key = `${token}:${type}:symbols`;
    	return key;
  	}

}