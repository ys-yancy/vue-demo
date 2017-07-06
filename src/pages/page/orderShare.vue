<template>
	<div class="order-share">
		<my-header page-title='交易'>
			<span slot='icon-logo' class='go-back item-back' @click='$router.go(-1)'></span>
		</my-header>
		<section class="content">
			<div class="container-hd">
				<div class="hd">
					<span class="tag" :class='{buy: params.cmd == "买涨"}'>{{params.cmd}}</span>
					<h2>
						<span>{{params.symbolName}}</span>
					</h2>
				</div>
				<div class="status-wrapper">
					<span class="sign">$</span>
					<span class="num J_FloatProfit">{{ticketParams.profit}}</span>
					<span class="status">当前盈利</span>
				</div>
				<div class="progress-wrapper">
					<div class="wrapper clearfix">
						<span class="title">当前盈利</span>
						<div class="progress-outer">
							<div class="progress">
								<div class="progress-inner float-profit" :style="{width:update.floatWidth}">
									<span class="desc">
										<span class="sign">$</span>
										<span class="J_FloatProfit">{{ticketParams.profit}}</span>
									</span>
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="wrapper clearfix">
						<span class="title">目标盈利</span>
						<div class="progress-outer">
							<div class="progress">
								<div class="progress-inner float-profit" :style="{width:update.marginWidth}">
									<span class="desc">
										<span class="sign">$</span>
										<span class="J_FloatProfit">{{}}</span>
									</span>
								</div>
							</div>
						</div>
					</div> -->
					<div class="wrapper clearfix">
						<span class="title">投入资金</span>
						<div class="progress-outer">
							<div class="progress">
								<div class="progress-inner float-profit" :style="{width:update.progressWidth}">
									<span class="desc">
										<span class="sign">$</span>
										<span class="J_FloatProfit">{{ticketParams.margin}}</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-wrapper">
				<div class="tab-nav-wrapper">
					<div class="tab-nav">投资人信息</div>
					<div class="tab-nav active">价格走势图</div>
				</div>
				<div class="tab-content-wrapper">
					<div class="tab-content">
						<div id="J_Chart" class="chart"></div>
						<div class="price-wrapper clearfix">
							<span class="open-price show">
								开仓:<span class="J_OpenPrice">{{ticketParams.openPrice}}</span>
							</span>
							<span class="profit-wrapper show">
								止盈:<span class="J_Profit">{{ticketParams.takeProfit}}</span>
							</span>
							<span class="stoploss-wrapper show">
								止损:<span class="J_StopLoss">{{ticketParams.stopLoss}}</span>
							</span>
							<span class="cur-price show">
								现价:<span class="J_CurPrice">
								{{this.chartLastData&&this.chartLastData[1] || ticketParams.openPrice}}
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<router-link class='link' to='/orderShare'>马上跟投</router-link>
				<p class="desc">任何投资都存在亏损的可能请谨慎</p>
			</div>
			<div class="circle-container">
				
			</div>
		</section>
	</div>
</template>
<style lang="less" scoped>
	@import '../style/variable.less';
	.order-share{
		background: #20243e url('../img/share-order-bg.png') 0 0 no-repeat;
		background-size: 100% auto;
		.padding-bottom(200);
		header{
			background: #160e23;
		}
		.container-hd{
			.margin-top(80);
			.hd{
				position: relative;
				.line-height(100);
				color: #fff;
				.tag{
					position: absolute;
					background: #25b9a8;
					.width(60);
					.height(30);
					.line-height(30);
					text-align: center;
					.top(35);
					.left(40);
					&.buy{
						background: #ff6b6b;
					}
				}
				h2{
					.font-size(33);
					text-align: center;
					color: #fff;
				}
			}
			.status-wrapper{
				color: #fff;
				.height(120);
				.line-height(120);
				text-align: center;
				.num{
					.font-size(50);
				}
			}
			.progress-wrapper{
				.height(232);
				color: #fff;
				.padding-left(20);
				.padding-top(60);
				.wrapper{
					.font-size(26);
					.height(40);
					.line-height(40);
					.margin-top(20);
					.title{
						float: left;
						.width(110);
					}
					.progress-outer{
						float: left;
						position: relative;
						.progress{
							position: absolute;
							.width(200);
							.progress-inner{
								position: absolute;
								.border-top(1, solid, #1695c2);
								background: #01bdf1;
								.width(20);
								.height(40);
								.border-radius(5);
								transition: all .8s ease-in;
								.desc{
									position: absolute;
									.right(-120);
									.font-size(24);
									.height(40);
									.line-height(40);
									white-space: nowrap;
								}
							}
						}
					}
				}
			}
		}
		.tab-wrapper{
			.margin-top(30);
			.tab-nav-wrapper{
				width: 100%;
				.font-size(0);
				.tab-nav{
					display: inline-block;
					width: 50%;
					.font-size(26);
					.padding(8);
					text-align: center;
					color: #fff;
					background: #3b4162;
					&.active{
						background: #5d4ec5;
					}
				}
			}
			.tab-content-wrapper{
				position: relative;
				.height(315);
				.price-wrapper{
					position: absolute;
					.width(640);
					.bottom(0);
					.font-size(0);
					color: #01bdf1;
					.padding-left(20);
					background: #3b4162;
					&>span{
						display: inline-block;
						.font-size(22);
						.width(155);
					}
				}
			}
		}
		.bottom{
			position: fixed;
			background: rgba(32,36,62,.95);
			.bottom(0);
			.right(0);
			.left(0);
			.padding(30, 0, 20, 0);
			a{
				display: block;
				background: #5d4ec5;
				.font-size(30);
				color: #fff;
				.width(420);
				.line-height(50);
				text-align: center;
				margin: 0 auto;
				.border-radius(10);
			}
			p{
				.width(400);
				.font-size(18);
				text-align: center;
				color: #898b99;
				.line-height(60);
				margin: 0 auto;
			}
		}
	}
</style>

<script type="text/javascript">
	import Util from '../common/util';
	import myHeader from '../components/header.vue';
	import myMixinAreaChart from '../common/initAreaChart';
	export default {
		name: 'orderShare',
		data() {
			return {
				routeParams: '',
				ticketParams: '',
				chartLastData: '',
				symbolPriceList: [],
			}
		},

		mixins: [myMixinAreaChart],

		methods: {
			init() {
				this._initParams();
				this.getOrderTicketList();
				this.getAreaChartSymbolList();
			},

			destroy() {
				this.routeParams = null;
				this.ticketParams = null;
				this.chartLastData = null;
				this.symbolPriceList = null;
			},

			async getOrderTicketList() {
				let params = {
					url: 'v1/order/' + this.routeParams.order,
					type: 'GET',
					data: {
						access_token: this.cookie.get('token'),
						_r: Math.random(),
					}
				}
				let data = await this.ajax(params);
				this.ticketParams = data.data.data;			
				return this.ticketParams;
			},

			async getAreaChartSymbolList() {

				let params = {
					id: this.routeParams.symbol,
					tf: 'm30',
					group_name: 'b2b_demo_0',
				}

				let symbolList = await this.$PB.getStockSymbolList(params);
				let data = symbolList.data.data.price;

        		var count = 0;

        		for ( let i = data.length - 1; i > 0; i-- ) {
					const item = data[i];
					++count;
					this.symbolPriceList.push([
			          Util.getTime(item.beijing_time),
			          item.open,
			          item.high,
			          item.low,
			          item.close
			        ]);

			        if (count > 50) {
            			break;
          			}
				}



				this.symbolPriceList.sort(function(a, b) {
			        return a[0] > b[0] ? 1 : -1;
			    });

			    this.chartLastData = this.symbolPriceList[this.symbolPriceList.length-1];

			    this.initAreaChart(this.symbolPriceList);

				return this.symbolPriceList;
			},

			_initParams() {
				this.routeParams = this.$route.query;
			},
		},

		created() {
			this.init();
		},

		beforeDestroy() {
			this.destroy();
		},

		computed: {
			params() {

				return{
					cmd: this.routeParams.cmd == 'sell' ? '买跌' : '买涨',
					symbolName: this.routeParams.name,
					symbol: this.routeParams.symbol,
					invite: this.routeParams.invite_code,
					nickname: this.routeParams.nickname,
					ticket: this.routeParams.ticket,
					unit: this.routeParams.unit,
				}
			},

			update() {
				let profit = this.ticketParams.profit,
					margin = this.ticketParams.margin;
				let per = profit < 0 ? 0 : (profit / (2 * margin));
				let floatPer = per >= 2 ? 1 : per,
        			marginPer = per > 2 ? 2 : per,
        			progressPer = '50%';

				return {
					floatWidth: floatPer * 100 + '%',
					marginWidth: marginPer * 100 + '%',
					progressWidth: progressPer,
				}
			},

			curPrice() {
				let subscribe_price = this.$store.state.symbolCurrentPrice,
					cur_symbol = this.routeParams.symbol,
					subscribe_symbol = subscribe_price[0];

				if  ( cur_symbol === subscribe_symbol ) {
					return subscribe_price;
				}
				return;	
			},
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

						//updata the chart lastData
						this.addChartPoint(this.chartLastData);
					}	
				} else {
					// console.log('else: ' + price)
				}
			}
		},

		components: {
			myHeader,
		}
	}
</script>