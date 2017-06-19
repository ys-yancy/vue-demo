import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';
import cookie from '../pages/lib/cookie'

Vue.use(Vuex);

const state = {
	symbolList: [],
	symbolCurrentPrice: null,
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
	curOrderMargin: 0, //占用保证金
	defaultVolume: null, // 默认交易量
	cacheCurOrderProfit: false,
	cacheStompPrices: {},
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})