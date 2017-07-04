<template>
<div  v-if='closedSuccess.success' class="popup-wrapper-outer">
	<div class="popup-wrapper" :class='{"show" : show }'>
		<ul class="clearfix">
			<li class="clearfix item title">
				<span class="warpper-icon-outer">
					<span class="warpper-icon">
						<span class="icon"></span>
					</span>
				</span>
				<h2 class="desc">平仓成功</h2>
				<router-link tag='span' class="close-icon" to='/historyOrder' @click='closePop'></router-link>
			</li>
			<li class="clearfix item">
				<span class="left">平仓价格：</span>
				<span class="right num">{{closedSuccess.closePrice}}</span>
			</li>
			<li class="clearfix item">
				<span class="left">盈利金额：</span>
				<span class="right num">{{closedSuccess.profit}}</span>
			</li>
			<li class="clearfix item"></li>
			<li class="clearfix item btn-wrapper">
				<router-link class='btn' to='/historyOrder'>确定</router-link>
			</li>
		</ul>
	</div>
</div>
</template>

<style lang="less" scoped>
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
			position: fixed;
			z-index: 50;
			.left(0);
			.right(0);
			.bottom(0);
			color: #473b61;
			background: #fff;
			-webkit-transition: all .6s ease;
			-moz-transition: all .6s ease;
			-ms-transition: all .6s ease;
			transition: all .6s ease;
			-webkit-transform: translateY(21rem);
			-moz-transform: translateY(21rem);
			-ms-transfrom: translateY(21rem);
			transform: translateY(21rem);
			&.show{
				-webkit-transform: translateY(0);
				-moz-transform: translateY(0);
				-ms-transfrom: translateY(0);
				transform: translateY(0);
			}
			ul{
				.padding(0, 30);
				.font-size(20);
				.item{
					position: relative;
					.line-height(90);
					.border-bottom(1, solid, #d2d2da);
					.left{
						float: left;
					}
					.right{
						float: right;
					}
					&.title{
						.warpper-icon-outer{
							position: absolute;
							display: inline-block;
							.left(0);
							.width(100);
							.height(100);
							.border-radius(50%);
							-webkit-transform: translateY(-50%);
							background: #fff;
							.warpper-icon{
								position: absolute;
								margin: auto;
								background: #473b61 url(../img/bg-icon.png) no-repeat 0 0;
								.background-size(400, 1500);
								.background-position(5, -220);
								.width(90);
								.height(90);
								.top(0);
								.left(0);
								.right(0);
								.bottom(0);
								.border-radius(50%);
							}
						}
						h2{
							text-align: left;
							.font-size(26);
							.padding-left(150);
						}
						.close-icon{
							position: absolute;
							.top(10);
							.right(0);
							.width(40);
							.height(40);
							.border-radius(50%);
							background: url(../img/bg-icon.png) no-repeat 0 0;
							.background-size(400, 1500);
							.background-position(12, -914);
						}
					}
					&.btn-wrapper{
						.width(640);
						display: table-cell;
						text-align: center;
						vertical-align: middle;
						border: none;
						.btn{
							display: inline-block;
							.width(420);
							.height(55);
							.line-height(55);
							.border-radius(5);
							background: #7686ba;
							.border-bottom(3, solid, #5b6ba1);
							.font-size(24);
							color: #fff;
							vertical-align: middle;
						}
					}
				}
			}
		}
	}
	
</style>

<script type="text/javascript">
	export default {
		name: 'close-popup',
		data() {
			return {
				show: false
			}
		},

		props: {
			close_params: {
				type: Object,
				default: {
					success: false,
					order: null,
				},
				require: false,
			}
		},

		methods: {
			closePop() {
				this.show = false;
			},

			getPopupParams(params) {
				this.show = false;
				if ( !params.order ) {
					return this.close_params;
				}

				let _params = {
					success: params.success,
					closePrice: parseFloat(params.order.closePrice).toFixed(2),
					profit: parseFloat(params.order.profit).toFixed(2),
				}

				setTimeout( () => {
					this.show = true;
				}, 50);

				return _params;
				
			},

			destroy() {
				// 回收机制
				this.close_params = null;

			},
		},

		beforeDestroy() {
			this.destroy();
		},

		computed: {
			closedSuccess() {
				let domParams = this.getPopupParams(this.close_params);
				return domParams;
			}
		}
	}
</script>