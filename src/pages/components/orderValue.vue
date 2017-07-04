<template>
	<section class="order-content">
		<ul class="J_list">
			<li class="clearfix item first">
				<span class="tag">买涨</span>
				<div class="price-wrapper">
					<span class="J_FloatProfit">{{order.profit}}</span>
					<span class="currency">美元</span>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">交易量（手）：</p>
					<p>{{order.volume}}</p>
				</div>
				<div class="desc">
					<p class="name">交易利润（$）：</p>
					<p>{{order.profit}}</p>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">开仓价格 ：</p>
					<p>{{order.openPrice}}</p>
				</div>
				<div class="desc">
					<p class="name">手续费（$）：</p>
					<p>{{order.taxes}}</p>
				</div>
			</li>
		</ul>

		<ul v-if='showMore' class="J_list">
			<li class="clearfix item">
				<div class="desc">
					<p class="name">开仓时间 ：</p>
					<p>{{order.openTime}}</p>
				</div>
				<div class="desc">
					<p class="name">隔夜利息差 ：</p>
					<p>{{order.swap}}</p>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">止盈价格 ：</p>
					<p>{{order.takeProfit}}</p>
				</div>
				<div class="desc">
					<p class="name">止损价格 ：</p>
					<p>{{order.stopLoss}}</p>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">订单号 ：</p>
					<p>{{order.ticket}}</p>
				</div>
				<div class="desc">
					<p class="name">跟随自 ：</p>
					<p>{{order.follow_from_ticket}}</p>
				</div>
			</li>
		</ul>

		<div class="submit-wrapper">
			<div class="base submit">
				<div class='close-btn' @click='closeOrder'>立即平仓</div>
				<div class="modif-btn">修改订单</div>
			</div>
		</div>

		<span class="more" @click.stop='switchMore()'>
			<span></span>
		</span>
		<close-popup :close_params='close_params'></close-popup>
	</section>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.order-content{
		position: relative;
		.padding(20);
		color: #ccc;
		background: #160e23;
		.J_list{
			li{
				.border-bottom(1, solid, #353245);
			}
			.item.first{
				position: relative;
				width: auto;
				.height(120);
				.padding(5, 20);
				.tag{
					position: absolute;
					.top(50);
					.font-size(24);
				}
				.price-wrapper{
					float: none;
					.height(100);
					.line-height(100);
					.font-size(80);
					.padding-left(90);
					text-align: center;
					.currency{
						.font-size(30);
						.line-height(100);
						vertical-align: bottom;
					}
				}
			}
			.item{
				position: relative;
				.height(120);
				.padding(20, 0);
				.font-size(0);
				.desc{
					float: left;
					.width(300);
					.line-height(40);
					.font-size(24);
					p{
						.padding-left(50);
						.font-size(30);
						&.name{
							.font-size(20);
							color: #807691;
						}
					}
					&:last-child{
						.border-left(1, solid, #353245);
					}
				}
			}
		}
		.submit-wrapper{
			position: fixed;
			.height(100);
			.padding(10, 0);
			.left(0);
			.right(0);
			.bottom(0);
			background: #160e23;
			.base{
				div{
					.width(210);
					background: red;
					text-align: center;
					.line-height(65);
					background: #7688ba;
					color: #fff;
					.font-size(30);
					.border-radius(8);
					.border-bottom(3, solid, #5a6ba1);
					&.close-btn{
						position: absolute;
						.left(50);
					}
					&.modif-btn{
						position: absolute;
						.right(50);
						background-color: #967bdc;
						.border-bottom(3, solid, #6b4fb5);
					}
				}	
			}
		}
		.more{
			position: absolute;
			z-index: 15;
			.width(40);
			.height(40);
			.bottom(0);
			.left(301);
			.border-radius(50%);
			background: #564876;
			span{
				position: absolute;
				.top(15);
				.left(9);
				.triangle(10,#fff, transparent, transparent, transparent);
			}
		}
	}
</style>

<script type="text/javascript">
	import { mapGetters } from 'vuex';
	import mixins from '../common/accountMixins';
	import closePopup from '../components/close-popup';
	export default {
		name: 'orderValue',
		mixins: [mixins],
		data() {
			return {
				ticket: '',
				order: {
					volume: '--',
					profit: '--',
					openPrice: '--',
					taxes: '--',
					openTime: '--',
					swap: '--',
					takeProfit: '--',
					stopLoss: '--',
					ticket: '--',
					follow_from_ticket: '--',
					slippage: 10,
				},
				prices: {
					askPrice: '',
					bidPrice: '',
				},
				showMore: false,
				reContl: null,
				close_params: {
					success: false,
					order: null,
				},
			}
		},

		computed: {
			...mapGetters([
				"getCachePrice"
			]),

			curSymbol() {
				const userAccount = this.$store.state.userAccount.account;
				const curSymbol = this.$store.state.curSymbolInfoData;
				return this.init(userAccount, curSymbol);	
			},
		},

		methods: {
			init(userAccount, curSymbol) {
				this._initAttrs();
				if ( userAccount && curSymbol ) {
					this.getOrder();
					// this.cur_symbol = curSymbol;
					return curSymbol;
				}		
			},

			updateProfit(prof) {
				this.order.profit = parseFloat(prof.mainProfit).toFixed(2);
				return;
			},

			async refreshProfit() {
				if (this.reContl) {
					clearTimeout(this.reContl);
				}
				const account = this.$store.state.userAccount.account;
				let profitRet = await this.getFloatingProfit(account, [this.order], [this.order.symbol]);
				this.updateProfit(profitRet);

				this.reContl = setTimeout(() => {
					this.refreshProfit();
				}, 1000)
			},

			getOrder() {
				this.ajax({
					url: 'v1/order/' + this.ticket,
					type: 'GET',
					data: {
						access_token: this.cookie.get('token'),
					}
				}).then( (order) => {
					this.order = order.data.data;

					// 判断如果订单已经平仓 ， 则跳转的历史页
					if ( this.order.closeType.indexOf('None') === -1 ) {
						this.$router.push({ path: 'historyOrder' })
						return;
					}

					this.refreshProfit();
					return this.order;
				})
			},

			closeOrder() {
				// 挂单模式
				// if (true) {  
			 	//     return;
			 	//  }
			 	// 
				 
			 	if (!this.$PB.isDemo()) {
			 		// realToken = 0
			 		// this.unwinding(realToken);
			 	} else {
			 		this.unwinding(null);
			 	}
			},

			unwinding(realToken) {
				let params = this.getParams(realToken);

				this.ajax({
					url: '/v1/order/close/' + this.ticket,
					type: 'POST',
					data: params,
				}).then( (res) => {
					if ( res.data.data.status == 'closed' ) {
						this.close_params = {
							success: true,
							order: res.data.data,
						};

						this.$PB.getCurrentOrderList({}, true);
					}
				})
			},

			getParams(realToken) {
				let p;
			    if (this.order.cmd.toLowerCase().indexOf('buy') != -1) {
			      	p = this.prices.bidPrice;
			    } else {
			      	p = this.prices.askPrice;
			    }

			    let params = {
			        access_token: this.cookie.get('token'),
			        slippage: this.order.slippage,
			        closeprice: p
			    };

			    if (realToken) {
      				params.real_token = realToken;
    			};

    			return params;
			},

			destroy() {
				// 回收机制
				clearTimeout(this.reContl);
				this.prices = null;
				this.close_params = null

			},

			switchMore() {
				this.showMore = this.showMore ? false : true;
			},

			_initAttrs() {
				const account = this.$store.state.userAccount.account;
				this.ticket = this.$route.query.order;
			},
		},

		beforeDestroy() {
			this.destroy();
		},

		watch: {
			curSymbol(price) {
				return price
			},

			getCachePrice: {
				handler: function(prices) {
					let cur_symbol = this.$route.query.symbol,
						price = prices[cur_symbol];
					this.prices = price;
					// this.init(price, cur_symbol);
				},
				deep: true,
			},
		},

		components: {
			closePopup,
		}
	}
</script>