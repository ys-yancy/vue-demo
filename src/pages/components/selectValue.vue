<template>
	<div class="select-val">
		<div class="select-add">
			<ul class="leverage-wapper">
				<li class="lever">杠杆:
					<span class="lever-text">
						{{curSymbol&&curSymbol.leverage ? curSymbol.leverage : '- -'}}
					</span>倍
				</li>
				<li class="desc">1手=
				<span class="desc-text">
					{{curSymbol ? curSymbol.policy.lot_size : '- -'}}
				</span>
					{{curSymbol ? curSymbol.policy.unit : '- -'}}
				</li>
				<li class="attribute"><span class="attribute-text">属性详情</span></li>
			</ul>
			<div class="btn-wrapper">
				<div class="minus btn" @click='set_volume(0)'>-</div>
				<div class="add btn" @click='set_volume(1)'>+</div>
				<input type="number" name="" class="num" v-model="value"/>
			</div>

			<div class="volume-count-wrapper clearfix">
				<p class="max-limit">最大可买(手):
					<span class="max-val">{{ this.maxValume }}</span>
				</p>
				<p class="capital">占用资金($):
					<span class="capital-val">{{ userMargin }}</span>
				</p>
				<span class="border"></span>
			</div>

		</div>

		<div class="fill-data clearfix" v-if='more'>
			<div class="set-guadan clearfix" @click='switchGuadan'>
				<div class="icon-wrap">
					<span class="set-icon clearfix" :class='{ guandan: isGuadan, no_guadan: !isGuadan }'></span>
					挂单
				</div>
			</div>
			<div class="open-price">
				<input type="number" :disabled='!isGuadan' name="" value="">
			</div>
		</div>

		<div class="set-price" v-if='more'>
			<div class="stop-profit">
				<span>止盈价格:</span>
				<p><input type="number" v-model='takePrice'/></p>
				<span>目标盈利($)</span><span class="profit-num">{{ take_profit }}</span>
			</div>
			<div class="stop-loss">
				<span>止损价格:</span>
				<p><input type="number" v-model='stopPrice'></p>
				<span>预期亏损($)</span><span class="profit-num">{{stop_loss}}</span>
			</div>
			<span class="border"></span>
		</div>

		<div>
			<div v-if='isClose != null && !isClose' class="base submit">
				<div class="sell" :class='{ guandan: isGuadan }' @click='action(false)'>
					<p class="bid-price">{{ sell_price }}</p>
					{{ isGuadan ? '挂单买跌' : '买跌' }}
				</div>
				<div class="buy" :class='{ guandan: isGuadan }' @click='action(true)'>
					<p class="ask-price">{{ buy_price }}</p>
					{{ isGuadan ? '挂单买涨' : '买涨' }}
				</div>
			</div>

			<div v-if='isClose != null && isClose' class="base close">
				<div class="close-wrapper">
					<p class="desc">{{ symbol_status && symbol_status.tag }}</p>
					<p class="date">下次开始时间 {{ symbol_status && symbol_status.start }}</p>
				</div>
			</div>
		</div>
		
		<span class="more" @click.stop='switchMore()'>
			<span></span>
		</span>

		<my-popup :order_params='order_params'></my-popup>
	</div>
	
</template>

<style lang="less">
	@import '../style/variable.less';
	.select-val{
		position: relative;
		background: #160E23;
		.width(640);
		.padding-bottom(156);
		.select-add{
			position: relative;
			.font-size(0);
			.leverage-wapper{
				background: #160E23;
				color: #807691;
				li{
					display: inline-block;
					.width(213);
					.height(60);
					.line-height(60);
					.font-size(18);
					text-align: center;
					&.attribute{
						color: #967ddb;
					}
				}
			}
			.btn-wrapper{
				position: relative;
				.width(640);
				.height(90);
				.font-size(24);
				.padding(0, 50);
				background: #160E23;
				.btn{
					position: relative;
					z-index: 2;
					.width(80);
					.height(50);
					.line-height(50);
					text-align:center;
					background: #967DDB;
					.margin-top(20);
					.font-size(60);
					color: #fff;
					.border-radius(6);
					vertical-align: bottom;

					&.minus{
						float: left;
					}
					&.add{
						float: right;
					}
				}
				.num{
					position: absolute;
					.width(400);
					.top(19);
					.height(50);
					.padding-left(170);
					border:none;
					.border-bottom(1px, solid, #a092c4);
					background: inherit;
					vertical-align: bottom;
					color: #967adc;
					outline: 0;
				}
			}
			.volume-count-wrapper{
				position: relative;
				.width(640);
				.font-size(20);
				color: #807691;
				.padding(0, 30);
				.padding-bottom(20);
				background: #160E23;
				p{
					display: inline-block;
					.width(280);
					.height(60);
					.line-height(60);
					text-align: left;
					.padding-left(20);
					&.capital{
						text-align: right;
						.padding-right(20);
					}
				}
				.border{
					position: absolute;
					.width(0);
					.height(60);
					.border-right(1px, solid, #353244);
					.top(0);
					.left(313);
				}

			}
		}

		.fill-data{
			.width(640);
			color: #807691;
			background: #160E23;
			div{
				display: inline-block;
				vertical-align: middle;
			}
			.set-guadan{
				.width(270);
				.height(110);
				.padding(30);
				.icon-wrap{
					.height(50);
					.line-height(50);
					.margin-left(40);
					span{
						display: inline-block;
						.width(100);
						.height(50);
						.margin-right(20);
						float: left;
						background: url(../img/pro-trading-guadan-close.png) 0 0 no-repeat;
						.background-size(91,49);
						&.guandan{
							background: url(../img/pro-trading-guadan-open.png) 0 0 no-repeat;
						}
					}
				}
			}
			.open-price{
				.width(300);
				.height(50);
				.border(1px, solid, #65577a);
				input{
					.height(50);
					color: #ccc;
					.line-height(50);
					.padding-left(24);
					background: inherit;
					border: none;
					outline: 0;
				}
			}
		}
		.set-price{
			position: relative;
			.height(200);
			color:#807691;
			.border-bottom(1px, solid,#353244);
			div{
				display: inline-block;
				.width(316);
				.height(200);
				.padding(5, 40);
				.padding-top(30);
				vertical-align: bottom;
			}
			.stop-profit,.stop-loss{
				p{	
					.width(220);
					.height(50);
					.margin(8, 0);
					border: 1px solid #65577a;
					input{
						.width(220);
						.height(50);
						color: #ccc;
						.line-height(50);
						border: none;
						background: inherit;
						outline: 0;
						.padding-left(24);
					}
				}
				span{
					.font-size(20);
				}
			}
			&>.border{
				position:absolute;
				width: 0;
				.bottom(0);
				.left(313);
				.border-right(1px, solid, #353244);
				.height(170);
			}
		}
		.base{
			position: fixed;
			.bottom(0);
			z-index: 10;
			.width(640);
			.font-size(30);
			color: #fff;
			.padding(25, 50);
			background: rgba(22,14,35, .6);
			&.submit>div{
				display: inline-block;
				.width(220);
				.height(98);
				text-align: center;
				.border-radius(7);
				.border-bottom(5, solid, #1c5e5d);
				background-color: #25B9A8;
				p{
					.height(40);
					.line-height(40);
				}
				&:last-child{
					float:right;
					background-color: #F9584A;
				}
				&.guandan{
					background: #7b768c;
				}
			}
			.close-wrapper{
				position: relative;
				z-index: 10;
				.width(480);
				.height(68);
				.margin-left(30);
				.border-bottom(3, solid, #32264e);
				background-color: #473b61;
				.border-radius(8);
				.desc{
					text-align: center;
					.font-size(26);
					.padding-top(5);
				}
				.date{
					text-align: center;
					.font-size(16);
					.line-height(24);
					color: #7b768c;
				}
			}
		}
		.more{
			position: absolute;
			z-index: 15;
			.width(40);
			.height(40);
			.bottom(154);
			.left(294);
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
	import { mapMutations, mapGetters } from 'vuex';
	import mixins from '../common/accountMixins';
	import myPopup from '../components/trade-popup';
	export default {
		name: '',
		mixins: [mixins],
		data() {
			return {
				value: 0.00,
				step: 0.5,
				minValume: 0.1,
				maxValume: 0.00,
				userMargin: 0.00,
				takePrice: '',
				stopPrice: '',
				takeProfit: '0.00',
				stopLoss: '0.00',
				symbol_status: null,
				isClose: null,
				more: false,
				isGuadan: false,
				sell_price: '-- --',
				buy_price: '-- --',
				order_params: {
					success: false,
					isGuadan: false,
					order: null,
				},
			}
		},

		methods: {
			init(userAccount, curSymbol) {
				if ( userAccount && curSymbol ) {

					curSymbol.leverage = this.getLeverage(curSymbol, userAccount);

					this.step = curSymbol.policy.pip;

					//判断品种状态
					this.checkSymbolStatus(curSymbol, userAccount);
					// 计算默认交易量
					this.getDefaultVolume(userAccount, curSymbol);

					this.cur_symbol = curSymbol;

					return this.cur_symbol;
				}		
			},

			set_volume(add) {
				this.step = parseFloat(this.step);

				if (add) {
					if ( this.value >= this.maxValume ) {
						return;
					}
					// 有一个小数保留问题待解决
					this.value = parseFloat(this.value + this.step).toFixed(2);
				} else {
					if ( this.value <= this.minValume ) {
						return;
					}
					this.value = parseFloat(this.value - this.step).toFixed(2);
				}

				this.changeDefaultVolume({maxVolume: this.maxValume, volume: this.value});
			},

			switchGuadan() {
				this.isGuadan = this.isGuadan ? false : true;
			},

			async getDefaultVolume(account, curSymbol) {
				let type = this.cookie.get('type');
				let orderList = await this.$PB.getCurrentOrderList();
				let profitRet = await this.getFloatingProfit(account, orderList.list, orderList.symbols);

				let prices = profitRet.prices,
					profit = profitRet.mainProfit,
					floatOption = profitRet.floatList;

				let netDeposit = parseFloat(account[type].balance) + parseFloat(profit);

				let freeMargin = netDeposit - parseFloat(orderList.margin);
	
				let volume = await this.calVolume(curSymbol, account, freeMargin);

				this.changeDefaultVolume(volume);
			},

			async changeDefaultVolume(volume) {

				this.value = parseFloat(volume.volume);
				this.maxValume = parseFloat(volume.maxVolume);

				let getMarginCallback = this._getMargin();

				let userMargin = await getMarginCallback(volume.volume);

				this.userMargin = userMargin.toFixed(2);
			},

			_getMargin() {
				let _p = this.get_user_account_openprices();
				return async (volume) => {
					let margin = await this.getMargin(_p.openPrice, _p.curSymbol, volume, _p.account);
					return margin;
				}

			},

			async checkSymbolStatus(account, symbol) {
				let status = await this.$PB.checkStatus(account, symbol);
				this.isClose = status.type == 'close' ? true : false;
				return this.symbol_status = status;
			},

			switchMore() {
				this.more = this.more ? false : true;
				return this.more; 
			},

			action(isBuy) {
				let up = !!isBuy;
				let params = this.getParams(up);
				this._addOrder(params, up)
			},

			/**
		    * 获取交易品种的交易杠杆 (实际上这段代码就是calMarginWithOpenPrice方法中的一部分)
		    * symbol: 从2.2.2.4 接口获取的symbol对象
		    * account: 从2.2.2.5 接口获取的account对象
		    **/
			getLeverage(symbol, account) {
				const type = this.$getType();
				let isDemo = type === 'demo' ? true : false;
    			let max_leverage = isDemo ? symbol.policy.demo_max_leverage : symbol.policy.real_max_leverage;
    			let trading_leverage = account[type].leverage * symbol.policy.leverage_multiplier;
   				max_leverage = parseFloat(max_leverage);
    			trading_leverage = parseFloat(trading_leverage);

				trading_leverage = trading_leverage < max_leverage ? trading_leverage : max_leverage;

    			return trading_leverage;
			},

			getParams(up, cmd) {
				let	openPrice = up ? this.buy_price : this.sell_price,
					type;

				//挂单使用输入的价格
				if (this.isGuadan) {
					openPrice = 0;
				}

				let params = {
					openprice: openPrice, 
      				volume: this.value,
      				takeprofit: parseFloat(this.takeProfit),
      				stoploss: parseFloat(this.stopLoss),
				}

				if (cmd) {
					params.type = cmd;
					return params;
				}

				//非挂单
				if (!this.isGuadan) {
					type = up ? 'BUY' : 'SELL';
				} else {
					let op = parseFloat(params.openprice);
				    let p = parseFloat(this.sell_price);
				    if (up) {
				        type = op < p ? 'BUY LIMIT' : 'BUY STOP';
				    } else {
				        type = op > p ? 'SELL LIMIT' : 'SELL STOP';
				    }
				}

				params.type = type;
				return params;
			},	

			/**
			 * [get_user_account_openprices] 
			 * @return {[returnObj : account symbol, openPrices ]} moren返回全部
			 */
			get_user_account_openprices(returnObj) { 
				let userAccount = this.$store.state.userAccount.account;
				let curSymbol = this.$store.state.curSymbolInfoData;
				let symbolName = this.$route.query.symbol,
					price = this.getCachePrice[symbolName];

				let openPrice = ((parseFloat(price.askPrice) + parseFloat(price.bidPrice))/2).toFixed(2);

				if ( returnObj == 'account' ) {
					return userAccount
				} else if ( returnObj == 'symbol' ) {
					return curSymbol;
				} else if ( returnObj == 'openPrices' ) {
					return openPrice;
				} else {
					returnObj = {
						account: userAccount,
						curSymbol,
						openPrice,
					}
					return returnObj;
				}
			},

			_addOrder(params, up) {
				let accountType = this.$getType();
				let cur_symbol = this.get_user_account_openprices('symbol');
				let slippage = parseFloat(cur_symbol.policy.default_slippage) * parseFloat(cur_symbol.policy.pip);
				let data = {
			        access_token: this.cookie.get('token'),
			        symbol: cur_symbol.policy.symbol,
			        ui: 4,
			        slippage: slippage
			    };

			    data = Object.assign(params, data);
			    if ( accountType == 'demo' ) {
			    	this._submitOrder(data, accountType, up);
			    } else {
			    	/* 
				     * protrading.html点击“买涨”、“买跌”及
				     * order.html点击“立即平仓”后如果需要输入交易密码，
				     * 那么输入交易密码后将不再继续进行下单或平仓操作，仅仅回到当前页面。
				     */
			    }

			},

			_submitOrder(data, accountType, up) {
				let	openPrice = up ? this.buy_price : this.sell_price,
					guadan = !!this.isGuadan;

				// if (this.followFromTicket) {
			 //      	data.follow_from_ticket = this.followFromTicket;
			 //    }

				this.ajax({
					url: '/v1/order/open/' + accountType,
      				data: data,
      				type: 'post'
				}).then( (res) => {
					data = res.data;
					console.log(data.status)
					if ( data.status == 200 ) {
						let params = {
							success: true,
							isGuadan: this.isGuadan,
							order: data.data,
						}
						this.order_params = params;
						// 在这里获取当前订单
						this.$PB.getCurrentOrderList({}, true);
					}
				})
			}
		},

		computed: {
			...mapGetters([
				"getCachePrice",
				'getProfit',
			]),

			curSymbol() {
				const userAccount = this.$store.state.userAccount.account;
				const curSymbol = this.$store.state.curSymbolInfoData;
				return this.init(userAccount, curSymbol);	
			},

			take_profit() {
				let _p = this.get_user_account_openprices();

				if (!this.takePrice) return '0.00';

				let ret = this.calMoney(_p.account, _p.curSymbol, this.value, _p.openPrice, 0, this.takePrice);

				ret.then((calMoney) => {
					this.takeProfit = parseFloat(calMoney.takeProfit).toFixed(2);
					return this.takeProfit;
				});
				return this.takeProfit;
			},

			stop_loss() {
				let _p = this.get_user_account_openprices();

				if (!this.stopPrice) return '0.00';

				let ret = this.calMoney(_p.account, _p.curSymbol, this.value, _p.openPrice, this.stopPrice, 0);

				ret.then((calMoney) => {
					this.stopLoss = parseFloat(calMoney.stopLoss).toFixed(2);
					return this.stopLoss;
				});
				return this.stopLoss;
			},

		},

		created() {
			
		},

		watch: {

			getCachePrice: {
				deep: true,
				handler: function(curVal, oldVal) {
　　　　　　　　　	let symbol = this.$route.query.symbol;
					try{
						this.sell_price = curVal[symbol].bidPrice;
						this.buy_price = curVal[symbol].askPrice;	
					}catch(e) {}	
　　　　　　　　},
			}
		},

		components: {
			myPopup:  myPopup,
		}
	}
</script>