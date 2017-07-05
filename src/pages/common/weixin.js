import io from '../../service/IO';
export default {
	isWeinxin() {
		let ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},

	onShareSuccess(shareKind) {

	},

	notifyShareBehavior(shareKind, isAppMessage) {

	},

	/**
	* shareKind: 
	* 'order': 分享当前订单    
	* 'history': 分享历史订单
	* 'invite': 邀请好友
	* 'recommend': 今日推荐
	*/
	async setupWeiXinShare(shareKind, url) {
		let lo = window.location.href,
			registerList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
			debug = false;
		if (lo.indexOf('waibao') != -1 || lo.indexOf('localhost') != -1) {
		    debug = true;
		}

		const params = {
			url: '..',
			data: {
		        wl: 'tzyh',
		        url: url || window.location.href
	      	},
	      	unjoin: true
		}

		let data = io.ajax(params);
			data = data.data;

		wx.config({
	        debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	        appId: data.appId, // 必填，公众号的唯一标识
	        timestamp: data.timestamp, // 必填，生成签名的时间戳
	        nonceStr: data.nonceStr, // 必填，生成签名的随机串
	        signature: data.signature, // 必填，签名，见附录1
	        jsApiList: registerList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	    });

		/**
		 * @param i 分享imamge
		 * @param t 分享标题
		 * @param d 分享描述
		 * @param l 分享链接
		 */

		wx.ready(() => {
			// var inviteCode = self.cookie.get('inviteCode');
        	let i t, d, l;
        	let avatar, nick;

        	// 分享当前订单
        	if ( shareKind == 'order' ) {
        		i = '';
        		t = '';
        		d = '',
        		l = '';
        	} 
        	//分享历史订单
        	else if ( shareKind == 'history' ) {
        		i = '';
        		t = '';
        		d = '',
        		l = '';
        	}
        	//分享极速交易
        	else if ( shareKind == 'rapid' ) {
        		i = '';
        		t = '';
        		d = '',
        		l = '';
        	}
        	//每日分享
        	else if ( shareKind == 'recommend' ) {
        		i = '';
        		t = '';
        		d = '',
        		l = '';
        	}
        	//个人详情页面
        	else if ( shareKind == 'profile' ) {
        		i = '';
        		t = '';
        		d = '',
        		l = '';
        	}
        	//默认邀请页面
        	else if ( shareKind == 'default_invite' ) {
        		i = '';
        		t = '';
        		d = '',
        		l = '';
        	}
        	//邀请好友
        	else {
        		i = '';
        		t = '';
        		d = '',
        		l = '';
        	}

        	//分享给朋友
        	wx.onMenuShareAppMessage({
        		title: t, // 分享标题
		        desc: d, // 分享描述
		        link: l, // 分享链接
		        imgUrl: i, // 分享图标
		        type: 'link', // 分享类型,music、video或link，不填默认为link
		        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		        success: function(o) {
		        	// 分享成功回调
		        	// new Toast('分享成功!');
		         	// this.notifyShareBehavior(shareKind, true);
		         	// this.shareSuccess && this.shareSuccess();
		        },
		        cancel: function(o) {
		        	// 取消分享回调
		            // new Toast('取消分享, 您的朋友就看不到了!');
		        },
        	});

        	//分享到朋友圈
        	wx.onMenuShareTimeline({
        		title: t, // 分享标题
		        link: l, // 分享链接
		        imgUrl: i, // 分享图标
		        success: function() {
		          	// 用户确认分享后执行的回调函数
		          	
		        },
		        cancel: function() {
		          	// 用户取消分享后执行的回调函数
		          	new Toast('取消分享, 您的朋友就看不到了!');
		        }
        	});

        	wx.onMenuShareQQ({
		        title: t, // 分享标题
		        desc: d, // 分享描述
		        link: l, // 分享链接
		        imgUrl: i, // 分享图标
		        success: function() {
		           
		        },
		        cancel: function() {
		            
		        }
	        });

	        wx.onMenuShareWeibo({
		        title: t, // 分享标题
		        desc: d, // 分享描述
		        link: l, // 分享链接
		        imgUrl: i, // 分享图标
		        success: function() {
		           
		        },
		        cancel: function() {

		        }
	        });

	        wx.onMenuShareQZone({
		        title: t, // 分享标题
		        desc: d, // 分享描述
		        link: l, // 分享链接
		        imgUrl: i, // 分享图标
		        success: function() {
		           
		        },
		        cancel: function() {
		            
		        }
	        });

		})
	},
}