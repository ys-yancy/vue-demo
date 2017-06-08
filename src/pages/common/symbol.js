import cookie from '../lib/cookie';
import storage from './storage';
import io from '../../service/IO';
import F from '../lib/frame';
// import symbols from '../common/symbols';

export default {
	async getOptionSymbolList( options ) {

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
		let [ login, passcode, host, url ] = 
			[ 'gooduser', 'passwd1', 'localhost', 'ws://rtprice.invhero.com:61613/stomp' ];

		const onmessage = message => {
			message = JSON.parse( message.body );
			const symbolPrice = message.d.split(',');
			onmessage_callback(symbolPrice);
		};

		const connect_callback = message => {
			console.log('Stomp连接成功！');
			const symbols = this.get();
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

	saveSymbols(symbols) {
		symbols = symbols.data.data;
		let cache = {};
		for ( let i = 0; i < symbols.length; i++ ) {
			cache[symbols[i].policy.symbol] = symbols[i];
		}

		this._saveLocal(cache);
	},

	get() {
		let type = cookie.get('type') === 'demo' ? 'demo' : 'real';
    	let token = cookie.get('token');
    	let key = `${token}:${type}:symbols`;
    	let symbols = JSON.parse(storage.get(key));
    	return symbols;
	},

	getQuoteKeys(symbols) {
		let type = cookie.get('type') === 'demo' ? 'demo' : 'real';
	    let list = this.get();
	    list = list.map((item, index) => {
	    	return `quote.${type}_default.${item}`;
	    });
	    return list.join(',')

  	},

	_saveLocal(cache) {
		let type = cookie.get('type') === 'demo' ? 'demo' : 'real';
    	let token = cookie.get('token');
    	let key = `${token}:${type}:symbols`;

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
	},

}