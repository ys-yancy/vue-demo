export default {
	config: {
		candleUpdateTime: 500 ,// 蜡烛图刷新频率

		accountUpdateTime: 2000, //account条刷新频率

		infoBarUpdateTime: 10000, //信息条刷新时间
	},

	originRateOne: 20 * 60, //单位 s, 保证金比例弹框过期时间

	originRateTwo: 60 * 60 * 12, //单位 s, 保证金比例弹框过期时间

	realPassword:  Infinity,//60 * 60 * 10, // 单位 s,  实盘过期时间

	orderShare: 3 * 60, // 单位 s, 分享订单匿名token的过期时间

	rankEquityThreshold: 500, // 榜单的初始净值

	// ajax请求前缀
	ajaxPrefix: '', // 正式环境

	invitePrefix: '', // 邀请链接

	// H5版本代号
  	version: '0220',

	//生产服默认 APPID
  	appid: 'wxf587c0d17e265b55',

  	// 杠杆使用率
  	lever: 40,

  	// 目标盈利 与 投资额度关系  目标盈利 = 投资额度 * profitIndex
  	profitIndex: 1,

	// 24交易ui默认配置可用保证金
	freeMargin: 15,

	broadcast: {
    	option: {
	      	tags: 'option',

	      	interval: 60 * 1000, // 控制接口的间隔时间
	
	      	speed: 10, // 每秒滚动10像素

	      	slideInterval: 6 * 1000 // 间隔 控制的是停留时间
	    },

	    trade: {
	      	tags: 'trade',

	      	interval: 5 * 1000,

	      	speed: 5,

	      	slideInterval: 6 * 1000 // 间隔
	    },

	    proTrading: {
	      	tags: 'pro-trading',

	      	interval: 5 * 1000,

	      	speed: 3,

	      	slideInterval: 6 * 1000 // 间隔
	    },

	    order: {
	      	tags: 'order',

	      	interval: 5 * 1000,

	      	speed: 1,

	      	slideInterval: 6 * 1000 // 间隔
	    }
	},

	// 步长
  	step: 5,

  	rapidDefaultInv: 5, // rapid 默认交易量

  	optionListCacheTime: 1000 * 60 * 60 * 1, // option列表缓存时间 1小时

  	orderListCacheTime: 1000 * 60 * 5, // 当前列表缓存时间 5分钟

  	expiredTime: 30 * 1000, // 价格30s过期

	getCandleUpdateTime() {
		return this.config.candleUpdateTime;
	},

	getAccountUpdateTime() {
		return this.config.accountUpdateTime;
	},

	getInfoBarUpdateTime() {
		return this.config.infoBarUpdateTime;
	},

	getOptinListCacheTime() {
		return this.optionListCacheTime;
	},

	getOrderListCacheTime() {
		return this.orderListCacheTime;
	},

}