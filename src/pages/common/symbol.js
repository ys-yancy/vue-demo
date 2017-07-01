import cookie from '../lib/cookie';
import storage from './storage';
import io from '../../service/IO';
import F from '../lib/frame';

export default {
	cacheSymbols: {
		demo: {},
		real: {},
	},

	emptySymbols: {
	  	demo: {},
	  	real: {}
	},

	async get( symbols ) {

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

	_inSymbol: function(data, symbol) {
	    let inArray = false;
	    data.forEach((item) => {
	      if (item.policy.symbol === symbol) {
	        inArray = true;
	      }
	    });

	    return inArray;
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
		};

		const connect_callback = message => {
			console.log('Stomp连接成功！');
			// const symbols = this.getOptionSymbols(true);
			this.getOptionSymbolsAsStomp( (symbols) => {
				for ( let i = 0; i < symbols.length; i++ ) {
					Client.subscribe('quote.' + 'real_default.' + symbols[i] +'?format=v2&throttle=1', onmessage)
				}
			});
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

  	getOptionSymbolsAsStomp( callback ) {
  		let self = this;
  		let optionLists = this._getSelfSymbols();
  		if ( !optionLists ) {
			setTimeout( () => {
				this.getOptionSymbolsAsStomp(callback);
			}, 500 );
			return;
  		}
  		callback(optionLists)
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
	    let this_symbols = this.getOptionSymbols(true);
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
  		let mySymbol = JSON.parse(storage.get(symolKey));
  		let optionSym = JSON.parse(storage.get(`${cookie.get('token')}${optionKey}`));
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
  	}

}