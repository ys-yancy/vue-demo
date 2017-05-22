import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);

const state = {
	symbolList: [],
	symbolCurrentPrice: [],
	stockSymbolList: [],
	infoData: [],
	curSymbolInfoData: '',
	userAccount: '',
	isLogin: '',
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