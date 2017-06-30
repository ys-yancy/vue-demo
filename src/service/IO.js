import axios from 'axios';
import Toast from '../pages/common/Toast';
export default {
	errorMessage: {
		'400': '没找到地址',
	},

	ajax(options) {
		let url = options.url,
			  type = options.type,
			  data = options.data;
		data._r = Math.random();

		if (!options.unjoin) {
      		options.url = options.url[0] !== '/' ? '/' + options.url : options.url;
      		// url = Config.getAjaxPrefix() + options.url;
      		url = 'http://newapi.invhero.com' + options.url;
		}

		const defaultOptions = {
			url,

			method: type,

			headers: {'Content-Type':'application/x-www-form-urlencoded'},

			params: data,

  			data,

  			timeout: 2000,

  			responseType: 'json',

  			// withCredentials: true,
		}

		const d = new Promise( (resolve, reject) => {

			axios(defaultOptions).then( (data) => {

				if ( data.status == 200 ) {
					
					if ( data.data.status == 200 ) {
						resolve(data);
					} else if ( data.data.status == 404 ) {
						
					} else {
						let errCode = new String(data.data.status);
						let str = errCode + ': ';
						if ( this.errorMessage[errCode] )
							str += this.errorMessage[errCode];
						else 
							str += '未知错误';
						if ( !options.noToast ) {
							new Toast('error', str);
						}
					}

				} else {
					if ( data.data.status == 400 ) {
						//Toast提示
						alert('密码错误')

					}

					reject(data)
				}
			}, (err) => {

				if ( err.status ) {

					//Toast错误

				}

				reject(data)

			});
		})
		

		return d;		

	},

	postURL(url) {
		const form = document.createElement('FORM');
		form.method = 'POST';
		form.style.display = 'none';
		document.body.appendChild(form);
		form.action = url.replace(/\?(.*)/,function(_, urlArgs) {
			urlArgs.replace(/\+/g, ' ').replace(/([^&=]+)=([^&=]*)/g, function(input, key, value) {
				input = document.createElement('INPUT');
				input.type = 'hidden';
				input.name = decodeURIComponent(key);
				input.value = decodeURIComponent(value);
				form.appendChild(input);
			});
			return '';
		});
		form.submit();
	}
}