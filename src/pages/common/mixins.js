import Util from '../common/util';
import Cookie from '../lib/cookie';
export const getType = () => {
	return Cookie.get('type');
}

/**
 * 判断当前品种状态
**/

export const checkStatus = (symbol, account)=> {
	return new Promise(( resolve, reject )=> {
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
		    resolve(status);
    	} else if (symbol.policy.real_enabled == '0' && symbol.policy.demo_enabled == '0') {
    		status.tag = '不可交易';
		    status.type = 'un-trade';
		    resolve(status);
    	} else if ( !_isDemo() && symbol.policy.real_enabled == '0' ) {
    		status.tag = '限模拟';
      		status.className = 'simulate';
      		status.type = 'simulate';
      		resolve(status);
    	} else {
    		resolve(status);
    	}
	})
}

export const mixins = {
	data() {
		return {

		}
	},

	methods: {
		async removeSymbol(symbol) {
			let result = await this.ajax({
				url: 'v1/user/fav/symbol/',
				type: 'delete',
			    data: {
			        symbol,
			        access_token: this.cookie.get('token'),
			    }
			}).then((data)=> {
				return true;
			})
		}
	}
}

const _isDemo = ()=> {
	let result = Cookie.get('type') == 'demo' ? true : false;
	return result;
}