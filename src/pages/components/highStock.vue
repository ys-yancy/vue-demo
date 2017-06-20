<template>
	<div class="Stock">
		<my-infoBar :up='up' :price='price' :curPrice='curPrice'></my-infoBar>

		<div id="stockWrap">
			
		</div>
		<div class="rang-seclect">
			<ul class="btn-wrap">
				<li class="seclect-btn" :class='{active: pitchActive[0]}' @click="initChart(0, 'm1')">1分钟</li>
				<li class="seclect-btn" :class='{active: pitchActive[1]}' @click="initChart(1, 'm5')">5分钟</li>
				<li class="seclect-btn" :class='{active: pitchActive[2]}' @click="initChart(2, 'm15')">15分钟</li>
				<li class="seclect-btn" :class='{active: pitchActive[3]}' @click="initChart(3, 'm30')">30分钟</li>
				<li class="seclect-btn" :class='{active: pitchActive[4]}' @click="initChart(4, 'h1')">1小时</li>
				<li class="seclect-btn" :class='{active: pitchActive[5]}' @click="initChart(5, 'd1')">1天</li>
			</ul>
		</div>
		<!--  账户信息条  -->
		<my-account v-if='page == "option"' :bg_color='true'></my-account>
		<!--  下单ui -->
		<my-seclect v-if='page == "option"' :selectData='selectData' :curPrice='curPrice' :pip='pip'></my-seclect>
		<!-- 平仓及修改订单ui -->
		<order-seclect v-else-if='page == "order"'></order-seclect>
		<!--  历史订单ui -->
		<history-seclect v-else-if='page == "history"'></history-seclect>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.Stock{
		.margin-top(80);
		#stockWrap{
			.height(400);
			background-color: #150D22;
		}
		.rang-seclect{
			background: #1E2132;
			.btn-wrap{
				font-size: 0;
				color: #656d78;
				.border-bottom(1px, solid, #484357);
				li{
					display: inline-block;
					.width(106);
					.height(40);
					.line-height(40);
					.font-size(26);
					text-align: center;
					&:first-child{
						.width(110);
					}
					&.active{
						background: #1C5E5D;
						color: #fff;
					}
				}
			}
		}
		.account{
			background: #1F1B2C;
		}
	}

</style>

<script type="text/javascript">
	import Util from '../common/util';
	import HighStock from '../common/initCharts';
	import mySeclect from '../components/selectValue';
	import orderSeclect from '../components/orderValue';
	import historySeclect from '../components/historyValue';
	import myInfoBar from '../components/infoBar';
	import myAccount from '../components/account';
	export default {
		name: 'highStock',

		data() {
			return {
				up: false,
				unit: '',
				margin: 0,
				profit: 0,
				netDeposit: 0,
				freeMargin: 0,
				price: {
					todayPrice: '',
					yesterdayPrice: '',
				},
				defaultVol: 0,
				pip: 0,
				instance: '',
				selectData: '',
				chartLastData: null,
				updateController: null,
				//这一步稍后优化
				pitchActive: [false, false, false, true, false, false],
				stockSymbolList: [],
				page: false,
			}
		},

		props: ['params'],

		methods: {
			async getStockList( params = this.params ) {
				this.stockSymbolList.splice(0);
				let data = await this.$PB.getStockSymbolList(params);
        		data = data.data.data.price;
        		var count = 0, listArr = [];
        		for ( let i = data.length - 1; i > 0; i-- ) {
					const item = data[i];
					++count;
					this.stockSymbolList.push([
			          Util.getTime(item.beijing_time),
			          item.open,
			          item.high,
			          item.low,
			          item.close
			        ]);

			        if ( count > 50 ) {
			        	break;
			        }

				}

				this.stockSymbolList.sort(function(a, b) {
			        return a[0] > b[0] ? 1 : -1;
			    });
			    this.chartLastData = this.stockSymbolList[this.stockSymbolList.length-1];
			    this.getInfoData();
				return this.stockSymbolList;
			},

			async initChart(index, param = 'm30') {
				// this.pitchActive = true;
				const oldIndex = this.pitchActive.indexOf(true);

				if (index !== undefined) {
					this.pitchActive.splice(oldIndex, 1, false);
					this.pitchActive.splice(index, 1, true);
				}

				this.params.tf = param;

				let data = await this.getStockList(this.params);
				//create Chart
				if (this.instance) {
					HighStock.setChartData(data);
				}
				this.instance = HighStock.initChart(data);	
			},

			async getInfoData(params = this.params) {
				let data = await this.$PB.getInfoData(params);
				data = data.data.data.price;

				const priceData = data.slice(data.length - 2);

				//后续优化方向
				this.price.todayPrice = priceData[1],
  				this.price.yesterdayPrice = priceData[0];

  				//不清楚unit什么意思，暂时给2
  				if (this.price.todayPrice) {
  					this.price.todayPrice.unit = this.unit ? this.unit : 2;
  					this.price.todayPrice.close = this.price.yesterdayPrice.close;
  					this.price.todayPrice.price = this.chartLastData[4]&&this.chartLastData[4];
  				}

  				this.up = this.price.todayPrice.price - this.price.todayPrice.close > 0 ? true : false;

				setTimeout(()=> {
					this.getInfoData();
				}, 5000)
			},

			async getCurrentOrderList() {
				let data = await this.$PB.getCurrentOrderList({})
				data = data.data.data;
				for ( let i = 0; i < data.length; i++ ) {
					this.margin += data[i].margin;
					this.profit += data[i].profit;
				}
				return data

			},

			async getDefaultVolume(userAccount, curSymbol) {
				let data = await this.getCurrentOrderList();
				const type = this.cookie.get('type');

				this.netDeposit = parseFloat(userAccount[type].balance) + parseFloat(this.profit);
				this.freeMargin = this.netDeposit - parseFloat(this.margin);

				let params = {
					symbol: curSymbol,
					account: userAccount,
					preparedMargin: this.freeMargin,
				}

				this.$store.dispatch('countDefaultVolume', params);
			},

			/**
		    * 获取交易品种的交易杠杆 (实际上这段代码就是calMarginWithOpenPrice方法中的一部分)
		    * symbol: 从2.2.2.4 接口获取的symbol对象
		    * account: 从2.2.2.5 接口获取的account对象
		    **/
			getLeverage(symbol, account) {
				const type = 'demo';//this.isDemo() ? 'demo' : 'real';
    			let max_leverage = symbol.policy.demo_max_leverage;//this.isDemo() ? symbol.policy.demo_max_leverage : symbol.policy.real_max_leverage;

    			let trading_leverage = account[type].leverage * symbol.policy.leverage_multiplier;
   				max_leverage = parseFloat(max_leverage);
    			trading_leverage = parseFloat(trading_leverage);

				trading_leverage = trading_leverage < max_leverage ? trading_leverage : max_leverage;

				// this.selectData.lever = trading_leverage;

    			return trading_leverage;
			},

			updateChart() {

				if ( this.chartLastData ) {
					let data = this.chartLastData.map( ( item, index ) => {
						if ( index == 0 ) {
							return Date.now();
						} else {
							return item;
						}
					})
					HighStock.addChartPoint(data);
				}

				this.updateController = setTimeout( () => {
					this.updateChart();
				}, 1000 )
			},

			changeSelect() {
				let p = this.$route.query.page;
				this.page = p;
			},

		},

		mounted() {
			
		},

		created() {
			this.initChart();
			this.changeSelect();
		},

		mounted() {
			this.updateChart();
		},

		computed: {
			curPrice() {
				let subscribe_price = this.$store.state.symbolCurrentPrice,
					cur_symbol = this.params.symbols,
					subscribe_symbol = subscribe_price&&subscribe_price[0] ? subscribe_price[0] : false;

				if  ( subscribe_symbol, cur_symbol === subscribe_symbol ) {
					return subscribe_price;
				}
				return;	
			},

			curSymbol_userAccount() {
				const userAccount = this.$store.state.userAccount;
				const curSymbol = this.$store.state.curSymbolInfoData[0];

				if ( curSymbol ) {
					this.unit = curSymbol.policy.min_quote_unit;
					this.pip = curSymbol.policy.pip;
				}

				return {
					userAccount,
					curSymbol,
				}
			}
		},

		beforeDestroy() {
			clearTimeout(this.updateController);
		},

		watch: {
			curPrice(price) {
				if (price) {

					let cur_symbol = this.params.symbols,
						subscribe_symbol = price[0];
			
					const bidPrice = parseFloat(price[3]);

					if (this.chartLastData) {

						const curData1 = Util.getTime(price[7]),
						curData2 = this.chartLastData[2]&&this.chartLastData[2] < bidPrice ? bidPrice : this.chartLastData[2],
						curData3 = this.chartLastData[3]&&this.chartLastData[3] < bidPrice ? bidPrice : this.chartLastData[3],
						curData4 = bidPrice;

						this.chartLastData.splice(0, 1, curData1);
						this.chartLastData.splice(2, 1, curData2);
						this.chartLastData.splice(3, 1, curData3);
						this.chartLastData.splice(4, 1, curData4);

						// updata the chart lastData
						// HighStock.addChartPoint(this.chartLastData);
					}	
				} else {
					// console.log('else: ' + price)
				}
			},

			curSymbol_userAccount(param) {
				const curSymbol = param.curSymbol,
					userAccount = param.userAccount;
				if (curSymbol && userAccount) {
					// this.getDefaultVolume(userAccount.account, curSymbol);
					let leverage = this.getLeverage(curSymbol, userAccount.account);
					curSymbol.leverage = leverage;
					return this.selectData = curSymbol;
				}
			}
		},

		components: {
			mySeclect, 
			myInfoBar,
			myAccount,
			orderSeclect,
			historySeclect,
		}

	}
</script>