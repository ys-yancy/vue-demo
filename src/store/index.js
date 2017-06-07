import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import cookie from '../pages/lib/cookie'

Vue.use(Vuex);

const state = {
	symbolList: [],
	symbolCurrentPrice: [],
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
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})