import cookie from '../lib/cookie';
import storage from './storage';
import io from '../../service/IO';
import F from '../lib/frame';

export default {
	// 以后优化缓存到本地
	cacheSymbols: {
		demo: {},
		real: {},
	},

	emptySymbols: {
	  	demo: {},
	  	real: {}
	},

	async get( symbols ) {
		if ( typeof symbols == 'string' ) {
			symbols = [symbols];
		}
		let optionList = this._get(symbols);

		//如果存在缓存直接读取
		if ( optionList ) {
			return optionList;
		} else {
			let params = new Object();
			params.type = 'GET';
			params.url = 'http://price.invhero.com/v2/symbol/snapshot?';
			params.data = {
				access_token: cookie.get('token'),
				group_name: cookie.get(`${cookie.get('type')}_group`) || 'real_default',
          		invite_code: '',
          		format: 'json',
			}
			params.unjoin = true;
			let symbolsArray = [],cache = this.emptySymbols[cookie.get('type')];

		    symbols.forEach((symbol) => {
		        if (!cache[symbol]) {
		          symbolsArray.push(symbol);
		        }
		    });

		    if ( symbolsArray.length === 0 ) {
		    	return [];
		    } else {
		    	let optionList = this._get(symbolsArray);
		        if (optionList) {
		          return optionList;
		        }
		    }

		    params.data.symbols = symbolsArray.join(',');
		    
		    let data = await io.ajax(params);
		    data = data.data.data;

		    symbols.forEach((symbol) => {
	            if (!this._inSymbol(data, symbol)) {
	              cache[symbol] = true;
	            }
          	});

		    this.saveSymbols(data);

			return data;
		}

	},

	getSymbolsStompPrice(onmessage_callback, symbols) {
		this.symbols = symbols || [];
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
		};

		const connect_callback = message => {
			console.log('Stomp连接成功！');

			for ( let i = 0; i < symbols.length; i++ ) {
				Client.subscribe('quote.' + 'real_default.' + symbols[i] +'?format=v2&throttle=1', onmessage)
			}
		}

		const error_callback = err => {
			console.log('Stomp连接失败！')
			this.getSymbolsStompPrice(onmessage_callback);
		}

		F.client && F.client.disconnect();
		const Client = Stomp.client(url);
		Client.connect(login, passcode, connect_callback, error_callback, host);

		Client.onopen = () => {
      		this.onopen = true;
      	}
		this.client = Client;
	},

	getAllStompSymbolsPrices(onmessage_callback) {
		let key = this.isDemo() ? 'demoOptionList' : 'optionList';
    	let token = cookie.get('token');
    	key = token + key;
    	let type = this.isDemo() ? 'demo' : 'real';
    	let d = ['XTIUSD.MICRO', 'XAUUSD.MICRO', 'XAGUSD.MICRO', 'EURUSD.MICRO', 'GBPUSD.MICRO'];
    	let defaultSymbols = [].concat(d);

    	let symbols = storage.get(key) || [];

    	let mySymbols = storage.get(this._getOptionSymbolListStoragekey());

    	try{

    		symbols = symbols && JSON.parse(symbols);
      		mySymbols = mySymbols && JSON.parse(mySymbols);

      		parse(symbols);
      		parse(mySymbols);

      		function parse(symbols) {
		        if (Array.isArray(symbols)) {
		          for (let i = 0, len = symbols.length; i < len; i++) {
		            if (defaultSymbols.indexOf(symbols[i]) === -1) {
		              defaultSymbols.push(symbols[i])
		            }
		          }
		        }
		    }

    	}catch(e){}

    	return this.getSymbolsStompPrice(onmessage_callback, defaultSymbols);
	},

	saveSymbols(symbols) {
		let cache = this.cacheSymbols[cookie.get('type')];
		for ( let i = 0; i < symbols.length; i++ ) {
			cache[symbols[i].policy.symbol] = symbols[i];
		}
		this._saveLocal(cache);
	},

	async getQuoteKeys(symbols) {
		let list = [];
		let optionList = await this.get(symbols);
		
		for ( let key in optionList ) {
			list.push(optionList[key].policy.quote_sub_routing_key);
		}
	    return list.join(',')
  	},

  	getOptionSymbols(isKey) {
  		let optionLists = this._getSelfSymbols();
  		return optionLists;
  	},

  	add(symbols) {
  		let newSymbol = false;
  		let newSymbols = [];
  		if ( typeof symbols == 'string' ) {
  			symbols = [symbols];
  		}

  		symbols.forEach( (item, index) => {
  			if ( this.symbols.indexOf(item) === -1 ) {
  				this.symbols.push(item);
  				newSymbol = true;
				newSymbols.push(item);
  			}
  		})

  		if ( newSymbol ) {
  			this._add(symbols);
  		}

  	},

  	_inSymbol: function(data, symbol) {
	    let inArray = false;
	    data.forEach((item) => {
	      if (item.policy.symbol === symbol) {
	        inArray = true;
	      }
	    });

	    return inArray;
  	},

  	_add(symbols, callback) {
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
	        callback(params);
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

  	_get(symbols) {
	    var type = cookie.get('type');

	    var cache = this.cacheSymbols[type];
	    var optionList = [];

	    for (let i = 0, len = symbols.length; i < len; i++) {
		    let symbol = symbols[i];
		    if (cache[symbol]) {
		        optionList.push(cache[symbol]);
		    } else {
		        return undefined;
		    }
	    }

	    return optionList;
  	},

	_saveLocal(cache) {
		let key = this._getOptionSymbolListStoragekey();
    	let mySymbols = storage.get(key);
    	if (mySymbols) {
    		mySymbols = JSON.parse(mySymbols);
    	} else {
    		mySymbols = [];
    	}
    	Object.keys(cache).forEach((key, index) => {
    		if (mySymbols.indexOf(key) === -1) {
    			mySymbols.push(key)
    		}
    	});
    	storage.set(key, mySymbols);
	},

	_allIn(symbols) {
	    let all = true;
	    let this_symbols = this.getOptionSymbols(true) || [];
	    this_symbols.forEach((symbol) => {
	      	if (symbols.indexOf(symbol) === -1) {
	        	all = false;
	      	}
	    });

	    return all;
  	},

  	_getSelfSymbols() {
  		let symolKey = this._getOptionSymbolListStoragekey();
  		let optionKey = cookie.get('type') === 'demo' ? 'demoOptionList' : 'optionList';
  		let mySymbol = JSON.parse(storage.get(symolKey)) || [];
  		let optionSym = JSON.parse(storage.get(`${cookie.get('token')}${optionKey}`)) || [];
  		optionSym.forEach( (item, index) => {
  			if ( mySymbol.indexOf(item) === -1 ) {
  				mySymbol.push(item)
  			}
  		})
    	return mySymbol;
  	},

  	_getOptionSymbolListStoragekey() {
  		let type = cookie.get('type') === 'demo' ? 'demo' : 'real';
    	let token = cookie.get('token');
    	let key = `${token}:${type}:symbols`;
    	return key;
  	},

  	isDemo() {
		let type = cookie.get('type');
		if ( type == 'demo' ) {
			return true;
		} else {
			return false;
		}
	},

}