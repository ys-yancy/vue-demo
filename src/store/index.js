import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';
import cookie from '../pages/lib/cookie'

Vue.use(Vuex);

const state = {
	symbolList: [],
	symbolCurrentPrice: null, //  目前还有地反用到 之后全用cacheStompPrices
	stockSymbolList: [],
	infoData: [],
	curSymbolInfoData: '',
	userAccount: '',
	isLogin: '',
	isShowLogin: false,
	type: cookie.get('type'),
	real_token: cookie.get('real_token'),
	watchdataLimt: 1,
	currentOrderLimt: 1,
	historyOrderLimt: 1,
	allowFollowingLimt: 1,
	cacheCurOrderProfit: false,
	chcheProfits: 0,
	isConnectStompSuccess: false,
	cacheStompPrices: {
		triggerVier: 0, // 因为vue数据是响应式的， 所以加一个触发变量
		// fromStomp: false, //价格是否来自stomp
	},
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})