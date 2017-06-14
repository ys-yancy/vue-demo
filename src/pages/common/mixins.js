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

		$_sticky(config) {
			let el = document.querySelector(config.el),
		        marginTop = el.style.marginTop,
		        curElPos = el.style.position;

		    el.style.position = '-webkit-sticky';
		    el.style.width = '100%';
		    el.style.zIndex = 10;
		    el.style.top = 0;

		    if ( el && (curElPos.indexOf("sticky") == -1)) {

		        let RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
		            function(c) {
		                setTimeout(c, 1 / 60 * 1000);
		            };

		        let CAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;

		        function timeHandler() {
		            let winScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		            let scrollTop = el.offsetTop;
		         
		            if (winScrollTop > scrollTop) {
		    
		                el.style.marginTop = '0';
		                el.style.position = 'fixed';   
		                
		            } else {

		                el.style.position = 'static';
		                el.style.marginTop = marginTop;
		            }
		        }


		        window.addEventListener('scroll', function() {
		            RAF(timeHandler);
		        })
		        
		    }
		},

		$_setPlaceHolder() {
			// let nav = this.nav;
		 //    let marginTop = nav.css('margin-top'),
		 //        marginBottom = nav.css('margin-bottom'),
		 //        height = nav.height();
		 //    let placeHolder = $('<div style="height: ' + height + 'px;margin-top:' + marginTop + ';margin-bottom:' + marginBottom + ';display:none;"></div>');
		 //    nav.before(placeHolder);
		    // this.placeHolder = placeHolder;
		},

		$_destroySticky() {

		},
	}
}
