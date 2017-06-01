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
	type: cookie.get('type'),
	watchdataLimt: 1,
	currentOrderLimt: 1,
	historyOrderLimt: 1,
	allowFollowingLimt: 1,
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})