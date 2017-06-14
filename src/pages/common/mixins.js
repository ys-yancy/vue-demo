import Util from '../common/util';
import Cookie from '../lib/cookie';
export const getType = () => {
	return Cookie.get('type');
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
		},
	}
}

const _isDemo = ()=> {
	let result = Cookie.get('type') == 'demo' ? true : false;
	return result;
}