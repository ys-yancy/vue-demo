<template>
	<section class="option-list">
		<ul id="J_list" class="list">
			<router-link :to='{path: "/proTrading", query: {symbolName: symbol.name, symbol: symbol.symbol, page: "option"}}' tag='li' v-for=' (symbol, index) in symbolList ' :key='symbol.name' ref='symbolListNode'  >
				<div class="symbol_wrapper" :class='{move: move == index}' > <!--class move-->
				<!-- <div class="symbol_wrapper" :class='{move: move == index}'> -->
					<div v-if='symbol.close' class="symbol_status">
						<span>休市</span>
					</div>
					<div class="symbol-name clearfix">
						<p class="name J_SymbolName">{{ symbol.name }}</p>
						<p class="symbol">{{ symbol.symbol }}</p>
					</div>
					<span class="symbol-bidprice price" :class='{up: symbol.isUp, down: !symbol.isUp}'>
						{{ symbol.bid_price }}
					</span>
				
					<span class="symbol-askprice price" :class='{up: symbol.isUp, down: !symbol.isUp}'>
						{{ symbol.ask_price }}
					</span>

					<span class="symbol-range bg-price" :class='{up: symbol.isBgUp, down: !symbol.isBgUp}'>
						0.125%

						<div class="swiperArea" @touchstart='swipeStart($event)' @touchmove.prevent='swipeMove($event, index)' @touchend='swipeEnd($event)'></div>
					</span>

					<div class="action-wrapper clearfix">
						<span class="up J_UpSymbol" @click.stop='moveTop(symbol.symbol, index);'>置顶</span>
						<span class="del J_DelSymbol" @click.stop='delSymbol(symbol.symbol, index);'>移除</span>
					</div>	
				</div>
			</router-link>
		</ul>
		<div class="add-wrapper">
			<a href="#" class="add">
				<span class="bar-x"></span>
				<span class="bar-y"></span>
			</a>
		</div>
	</section>
</template>

<style lang='less' scoped>
	@import '../style/variable.less';
	.option-list{
		background: #f4f3fb;
		.padding-bottom(240);
		#J_list{
			li{	
				position: relative;
				.width(640);
				.height(120);
				overflow: hidden;
				background-color: #fff;
				.padding(10, 60);
				.border-bottom(10, solid, #f4f3fb);
				.symbol_wrapper{
					position: relative;
					.width(820);
					transform: translateX(0);
					-webkit-transform: translateX(0);
					transition: all 0.4s ease-in;
					-webkit-transition: all 0.4s ease;
					.symbol_status{
						position: absolute;
						.width(24);
						.left(-40);
						.top(20);
						.font-size(16);
						color: #68449f;
						.padding(3,1);
						.border(1, solid, #68449f);
					}
					.symbol-name{
						.width(160);
						.height(90);
						color: #807691;
						.line-height(100);
						.padding-top(10);
						.font-size(27);
						float: left;
						.margin-right(20);
						.border-right(1, solid, #807691);
						p{
							.width(120);
							.height(40);
							.line-height(40);
							text-align: left;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							&:last-child{
								width: 100%;
								.font-size(20);
							}
						}
					}
					.price{
						float: left;
						.width(110);
						.height(100);
						.font-size(26);
						.line-height(100);
						text-align: left;
						&.up{
							color: #f9584a;
						}
						&.down{
							color: #32d8a3;
						}
					}
					.symbol-bidprice{
						.margin-right(30);
					}
					.symbol-range{
						position: absolute;
						.top(32);
						.right(260);
						color: #fff;
						background: #f9584a;
						.padding(4, 15);
						.border-radius(5);
						&.up{
							background: #f9584a;
						}
						&.down{
							background: #32d8a3;
						}
					}
					&:last-child{
						.margin-bottom(80);
					}
					&:nth-child(3){
						display: block;
					}
					.action-wrapper{
						position: absolute;
						.top(-10);
						.right(0);
						.font-size(0);
						span{
							display: inline-block;
							.width(120);
							.height(110);
							.font-size(30);
							color: #fff;
							.line-height(110);
							text-align: center;
						}
						.J_UpSymbol{
							background: #7686BA;
						}
						.J_DelSymbol{
							background: #F9584A;
						}
					}
					&.move{
						transform: translateX(-6rem);
						-webkit-transform: translateX(-6rem);
					}
				}

				.swiperArea{
					position: absolute;
					.width(170);
					.height(100);
					.top(-36);
					.right(0);	
				}
				
			}
		}
		.add-wrapper{
			.margin-top(10);
			background: #fff;
			.padding(30, 0);
			text-align: center;
			.add{
				position: relative;
				display: inline-block;
				.width(100);
				.height(100);
				.border(3, dashed, #ccc);
				.bar-x{
					position: absolute;
					display: inline-block;
					.width(60);
					.height(5);
					.top(47);
					.left(20);
					background: #ccc;
				}
				.bar-y{
					position: absolute;
					display: inline-block;
					.width(5);
					.height(60);
					.top(20);
					.left(47);
					background: #ccc;
				}
			}
		}
	}

</style>

<script type="text/javascript">
	/**
	**  在这里没用v-touch是因为:用了之后,如果拖动过程中出现水平方向倾向,则上下方向拖动失灵;
	**  用了js原生Touch事件,也有Bug(touchmove只执行一次), 解决方法为设置某个区域左右滑动；
	**/

	import { mapState, mapActions, mapMutations } from 'vuex';
	import { mixins } from '../common/mixins';
	export default {
		name: 'option',

		mixins: [mixins],

		data() {
			return {
				startX: 0,
				startY: null,
				move: null,
				old_bidPrice: 0,
				old_askPrice: 0,
				symbol_list: [],
			}
		},

		methods: {
			

			...mapMutations([
				'OPTIONLISTDATA',
			]),

			swipeStart(e) {
				this.startX = e.targetTouches[0].pageX;
				this.startY = e.targetTouches[0].pageY;
			},

			swipeMove(e, index) {

				const x = e.targetTouches[0].pageX;
				const y = e.targetTouches[0].pageY;
				if (x-this.startX < -100) {
					return this.move = index;
				} else {
					return this.move = null;
				}
			},

			swipeEnd(e) {
				
			},

			moveTop(symbol, index) {
				let topSymbol = this.symbol_list.splice(index, 1)[0];

				this.symbol_list.unshift(topSymbol);
				this.OPTIONLISTDATA(this.symbol_list);

				return this.move = null;	
			},

			delSymbol(symbol, index) {
				let isDel = this.removeSymbol(symbol);

				if (isDel) {
					let curOptionSymbolList = this.$store.state.symbolList;
					curOptionSymbolList.splice(index, 1);

					this.symbol_list.splice(index, 1);

					this.OPTIONLISTDATA(curOptionSymbolList);
				};

				return this.move = null;
			},
		},

		mounted() {

		},

		created() {
			this.$store.dispatch('getOptionList', {
				access_token: this.cookie.get('token'),
			});
		},

		computed: {
			symbolList() {
				// 做个练习  真的的数据处理交给vuex处理
				const symbolList = this.$store.state.symbolList;
				const symbolStompList = this.$store.state.symbolCurrentPrice;
				// 有个bug   在这里先解决一下
				for ( let i = 0; i < symbolList.length&&(this.symbol_list.length <= symbolList.length -1); i++ ) {
					this.$PB.checkStatus(symbolList[i]).then((status)=> {					
						const symbolParam = {
							name: symbolList[i].quote.name,
							symbol: symbolList[i].quote.symbol,
							ask_price: symbolList[i].quote.ask_price[0],
							bid_price: symbolList[i].quote.bid_price[0],
							close_price: symbolList[i].close_price,
							isUp: 1,
							isBgUp: 1,
							close: (status && status.type) == 'close' ? true : false,
						}
						this.symbol_list.push(symbolParam);
					});
				}

				if ( this.symbol_list.length && !!symbolStompList ) {
					for ( let i = 0; i < this.symbol_list.length; i++ ) {
						if ( this.symbol_list[i].symbol === symbolStompList[0] ) {

							//(新价格.bid >= 老价格.bid || 新价格.ask >= 老价格.ask) 两个报价颜色设置为红色
							const is_up = (symbolStompList[3] - this.symbol_list[i].bid_price || symbolStompList[1] - this.symbol_list[i].ask_price) > 0 ? true : false;

							// if (涨幅>0) {涨幅背景为红色}
							const is_bgUp = ((+symbolStompList[3]) + (+symbolStompList[1]) - 2 * this.symbol_list[i].close_price) > 0 ? true : false;

							const newSymbolParam = {
								name: this.symbol_list[i].name,
								symbol: this.symbol_list[i].symbol,
								bid_price: symbolStompList[3],
								ask_price: symbolStompList[1],
								close_price: this.symbol_list[i].close_price,
								isUp: is_up,
								isBgUp: is_bgUp,
								close: this.symbol_list[i].close,
							}

							this.$set( this.symbol_list, i, newSymbolParam );
						}
					}
				}

				return this.symbol_list;
			},
			...mapState({
				list: state=> state.symbolList,
				type: state=> state.type,
			}),

		},

		watch: {
			list( list ) {
				let stompIsConnect = !this.$store.state.symbolCurrentPrice;
				if ( !!list && stompIsConnect ) {
					// 在这理触发stomp
					// this.$store.dispatch('getStompCurrentPrice');
				}
			},

			symbol_list(list) {

			},

			type(type) {
				// 刷新数据在这里进行
				const isShowLogin = this.$store.state.isShowLogin;
				if (!isShowLogin) {
					this.$store.dispatch('getOptionList', {
						access_token: this.cookie.get('token'),
					});
				}
			}
		}
	}

</script>