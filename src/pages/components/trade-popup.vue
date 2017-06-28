<template>
	<div v-if='orderSuccess.success' class="popup-wrapper-outer" @touchmove.prevent.stop>
		<div class="popup-wrapper" :class='{"show" : show }'>
			<ul class="clearfix">
				<li class="item clearfix">
					<h2 class="symbol-name">下单成功 {{orderSuccess.symbolName}}</h2>
					<span class="J_ClosePopup close-outer" @click.prevent.stop='closePopup'>
						<span class="icon"></span>
					</span>
				</li>
				<li class="item clearfix">
					<div class="left info">交易量(手)：
						<span class="num">{{orderSuccess.volume}}</span>
					</div>
					<div class="right info">开仓价格($)：
						<span class="num">{{orderSuccess.openPrice}}</span>
					</div>
				</li>
				<li class="item clearfix">
					<div class="left info">目标/止损($)：<span class="num">--/--</span></div>
					<div class="right info"></div>
				</li>
				<li class="item clearfix">
					<div class="left info">占用资金($)：
						<span class="num">{{orderSuccess.margin}}</span>
					</div>
					<div class="right info">创建方法：
						<span class="num">{{orderSuccess.large}}</span>
					</div>
				</li>
				<li class="item clearfix" v-if='false'>
					<span class='btn list'>分享订单</span>
				</li>
				<li class="item clearfix">
					<router-link class='btn order' to='/curretOrder'>查看我的交易</router-link>
				</li>
				<li class="item clearfix">
					<router-link class='btn list' to='/option'>返回商品列表</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<style lang='less' scoped>
	@import '../style/variable.less';
	.popup-wrapper-outer{
		position: fixed;
		z-index: 20;
		.top(0);
		.left(0);
		.right(0);
		.bottom(0);
		text-align: center;
		background: rgba(0, 0, 0, .4);
		.popup-wrapper{
			position: absolute;
			.left(0);
			.right(0);
			.bottom(0);
			background: #fff;
			-webkit-transition: all .6s ease;
			-moz-transition: all .6s ease;
			transition: all .6s ease;
			-webkie-transform: translateY(21rem) translateX(0);
			-moz-transform: translateY(21rem) translateX(0);
			transform: translateY(21rem) translateX(0);
			&.show{
				-webkit-transform: translateY(0) translateX(0);
				-moz-transform: translateY(0) translateX(0);
				transform: translateY(0) translateX(0);
			}
			ul{
				.padding(0, 30);
				.item{
					position: relative;
					.height(88);
					.line-height(88);
					text-align: left;
					.border-bottom(1, solid, #d2d2da);
					.symbol-name{
						.font-size(30);
					}
					.close-outer{
						position: absolute;
						.top(20);
						.right(0);
						.width(40);
						.height(40);
						.border-radius(50%);
						background: url(../img/bg-icon.png) no-repeat 0 0;
						.background-size(400, 1500);
						.background-position(12, -914);
					}
					.info{
						position: absolute;
						margin: auto;
						width: 50%;
						color: #473b61;
						.font-size(21);
						.top(0);
						.bottom(0);
						.height(50);
						.line-height(50);
						.num{
							display: inline-block;
							.font-size(26);
							.line-height(50);
							vertical-align: bottom;
						}
					}
					.left{
						.left(0);
						.border-right(1, solid, #d2d2da);
					}
					.right{
						.right(0);
						.padding-left(20);
					}
					.btn{
						display: inline-block;
						position: absolute;
						margin: auto;
						text-align: center;
						color: #fff;
						.font-size(23);
						.width(420);
						.height(55);
						.line-height(55);
						.border-radius(5);
						.top(0);
						.left(0);
						.right(0);
						.bottom(0);
						&.order{
							background-color: #7686ba;
							.border-bottom(5, solid, #5b6ba1);
						}
						&.list{
							background-color: #6da4ca;
							.border-bottom(5, solid, #5388ad);
						}
					}
					&:nth-child(5), &:nth-child(6){
						border:none;
					}
				}
			}
		}
	}
</style>

<script type="text/javascript">
	export default {
		name: 'popup',
		data() {
			return {
				show: false,
			}
		},

		props: {
			order_params: {
				type: Object,
				default: {
					success: false,
					isGuadan: false,
					order: null,
				},
				require: false,
			}
		},

		methods: {
			closePopup() {
				this.order_params.success = false;
			},

			getPopupParams(params) {
				console.log(params)
				if ( !params.order ) {
					return this.order_params;
				}

				let op = parseFloat(params.order.openPrice).toFixed(2),
					margin = parseFloat(params.order.margin).toFixed(2),
					large = params.isGuadan ? '挂单' : '现价',
					volume = params.order.volume;

				let _params = {
					success: params.success,
					isGuadan: params.isGuadan,
					symbolName: params.order.symbolName,
					openPrice: op,
					margin,
					large,
					volume,
				}

				setTimeout( () => {
					this.show = true;
				}, 100);

				return _params;

			}
		},

		computed: {
			orderSuccess() {
				let domParams = this.getPopupParams(this.order_params);
				return domParams;
			}
		}
	}
</script>