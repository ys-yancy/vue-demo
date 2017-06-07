<template>
	<div class="select-val">
		<div class="select-add">
			<ul class="leverage-wapper">
				<li class="lever">杠杆:<span class="lever-text">{{this.selectData.leverage ? this.selectData.leverage : '- -'}}</span>倍</li>
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
			<div class="set-guadan clearfix">
				<div class="icon-wrap">
					<span class="set-icon clearfix"></span>
					挂单
				</div>
			</div>
			<div class="open-price">
				<input type="number" name="" value="11">
			</div>
		</div>

		<div class="set-price" v-if='more'>
			<div class="stop-profit">
				<span>止盈价格:</span>
				<p><input type="number" value="111"></p>
				<span>目标盈利($)</span><span class="profit-num">11221</span>
			</div>
			<div class="stop-loss">
				<span>止损价格:</span>
				<p><input type="number" value="111"></p>
				<span>预期亏损($)</span><span class="profit-num">0.00</span>
			</div>
			<span class="border"></span>
		</div>
		<div class="base submit">
			<div class="sell">
			<p class="bid-price">{{ sell }}</p>
			买跌</div>
			<div class="buy">
			<p class="ask-price">{{ buy }}</p>
			买涨</div>
		</div>
		<span class="more" @click.stop='switchMore()'>
			<span></span>
		</span>
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
						background: red;
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
			&>div{
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
	import { mapMutations } from 'vuex';
	import _ from '../../service/page-base';
	export default {
		name: '',

		data() {
			return {
				value: 0.00,
				step: 0.5,
				minValume: 0.1,
				maxValume: 0.00,
				margin: 0,
				profit: 0,
				netDeposit: 0,
				freeMargin: 0,
				symbol: '',
				more: false,
				sell_price: '-- --',
				buy_price: '-- --',
				openPrice: '--',
				cur_symbol: '',
				account: {},
			}
		},

		props: ['selectData', 'curPrice', 'pip'],

		methods: {
			...mapMutations({
				changeVolume: 'COUNTDEFAULTVOLUME',
			}),
			set_volume(add) {
				this.step = parseFloat(this.pip);

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
				this.changeVolume({maxVolume: this.maxValume, volume: this.value});
				return this.value;
			},

			async getCurrentOrderList() {
				let ret = await _.getCurrentOrderList({}).then((data)=> {
					data = data.data.data;
					for ( let i = 0; i < data.length; i++ ) {
						this.margin += data[i].margin;
						this.profit += data[i].profit;
					}
					return data
				});
				return ret;
			},

			getDefaultVolume(userAccount, curSymbol) {
				this.getCurrentOrderList().then((data) => {
					const type = this.cookie.get('type');
					this.netDeposit = parseFloat(userAccount[type].balance) + parseFloat(this.profit);
					this.freeMargin = this.netDeposit - parseFloat(this.margin);

					let params = {
						symbol: curSymbol,
						account: userAccount,
						preparedMargin: this.freeMargin.toFixed(2),
					}
					this.$store.dispatch('countDefaultVolume', params);

				})
			},

			switchMore() {
				this.more = this.more ? false : true;
				return this.more; 
			}
		},

		computed: {
			curSymbol() {
				if ( this.selectData ) {
					return this.selectData;
				} else {
					return '';
				}
			},

			sell() {
				// infoBar组件当前价格更新有问题  
				if ( this.curPrice ) {
					this.sell_price = this.curPrice[3];
					return this.sell_price
				} else {
					return this.sell_price ? this.sell_price : '-- --';
				}
			},

			buy() {
				if ( this.curPrice ) {
					this.buy_price = this.curPrice[1];
					return this.buy_price
				} else {
					return this.buy_price ? this.buy_price : '-- --';
				}
			},

			defaultVolume() {
				let curSymbol = this.$store.state.curSymbolInfoData[0];
				let defaultVolume =  this.$store.state.defaultVolume;
				
				return defaultVolume;
			},

			curSymbolVolume() {
				return this.$store.state.curSymbolInfoData[0];
			},

			userMargin() {
				return parseFloat(this.$store.state.curOrderMargin).toFixed(2);
			},

		},

		created() {
			// console.log(this.selectData)
		},

		watch: {
			defaultVolume(volume) {
				const userAccount = this.$store.state.userAccount,
					  curSymbol = this.$store.state.curSymbolInfoData[0];

				if (volume && volume.volume) {

					this.value = parseFloat(volume.volume);

					this.maxValume = parseFloat(volume.maxVolume);

					if (curSymbol && userAccount) {

						let type = this.cookie.get('type'),
							symbol = curSymbol.policy.symbol,
							key = `${type}:${symbol}:curPrice`;

						_.getStore(key).then((data)=> {

							this.openPrice = ((parseFloat(data.ask_price) + parseFloat(data.bid_price))/2).toFixed(2);

							let params = {
								openPrice: this.openPrice,
								symbol: curSymbol,
								volume: this.value,
								account: userAccount.account,
							}

							this.$store.dispatch('countUserMargin',  params);

						})
					} 
				}

			},

			curSymbol(symbol) {
				let userAccount = this.$store.state.userAccount;
				if (symbol && userAccount.account) {
					this.getDefaultVolume(userAccount.account, symbol);
				}
			}
		}
	}
</script>