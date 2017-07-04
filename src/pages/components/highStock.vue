<template>
	<div class="Stock">
		<my-infoBar :pip='pip'></my-infoBar>

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
		<my-seclect v-if='page == "option"'></my-seclect>
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
	import { mapGetters } from 'vuex';
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
				unit: '',
				pip: 0,
				instance: '',
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
				// params 以后要解耦  从连接里拿
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
				}, 500 )
			},

			_updateChart(cur_symbol, price) {
				if (price) {
					const subscribe_symbol = price.askPrice;
					const bidPrice = parseFloat(price.bidPrice);
					if (this.chartLastData) {

						const curData1 = Date.now(),//Util.getTime(price[7]),
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

			changeSelect() {
				let p = this.$route.query.page;
				this.page = p;
			},

			destroy() {
				// 回收机制
				clearTimeout(this.updateController);
				this.instance = null;
				this.chartLastData = null;
				this.updateController = null;
				this.pitchActive = null;
				this.stockSymbolList = null;
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
			...mapGetters([
				"getCachePrice"
			]),
		},

		beforeDestroy() {
			this.destroy();
		},

		watch: {
			getCachePrice: {
				handler: function(prices) {
					let cur_symbol = this.params.symbols,
						price = prices[cur_symbol];

					this._updateChart(cur_symbol, price);
				},
				deep: true,
			},
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