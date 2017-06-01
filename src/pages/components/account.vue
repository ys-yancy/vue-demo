<template>
	<div class="account">
		<div class="switch-wrapper clearfix" :class='{unfold: unfold}'>
			<span class="J_Switch demo" @click.stop='switchEvent("demo")'>模拟</span>
			<span class="J_Switch real" @click.stop='switchEvent("real")'>实盘</span>
			<span class="J_LSwitch" :class="{real: curSwitch}" v-if='isSwitch' @click.stop='switchUnfold()'>
				{{ cur_way }}
			</span>
			<span class="switch" :class="{real: curSwitch}" id="J_GetSwitch" @click.stop='switchUnfold()'>
				<span></span>
			</span>
		</div>

		<span></span>
		<span class="transition-l"></span>
		<span></span>

		<div class="item-wrapper">
			<ul :class='{pro: bg_color}'>
				<li>
					<p class="J_FreeMargin">402.13</p>
					<p class="desc">可用保证金($)</p>
				</li>
				<li>
					<p class="J_NetDeposit">1184.04</p>
					<p class="desc">账户净值($)</p>
				</li>
				<li>
					<p class="J_FloatProfit">-588.14</p>
					<p class="desc">浮动盈亏($)</p>
				</li>
				<li>
					<p class="J_Rate">129.90</p>
					<p class="desc">保证金比例(%)</p>
				</li>
				<li>
					<p class="J_Bonus">0.00</p>
					<p class="desc">保证金增金($)</p>
				</li>
			</ul>
		</div>

		<div class="recharge">
			<router-link to='/option' class='charge'>入金</router-link>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.account{
		position: relative;
		.width(640);
		.height(100);
		background: #dadbdd;
		.padding-left(120);
		.switch-wrapper{
			display: inline-block;
			background: #7686bb;
			position: absolute;
			z-index: 10;
			.min-width(165);
			.left(-87);
			-webkit-transition: -webkit-transform .3s ease-in;
    		transition: transform .3s ease-in;
			.J_Switch{
				display: inline-block;
				position: relative;
				z-index: 5;
				.width(80);
				.height(100);
				color: #fff;
				.font-size(26);
				.line-height(100);
				text-align: center;
				&.real{
					background: #6ca5c9;
				}
			}
			.J_LSwitch{
				display: inline-block;
				position: absolute;
				z-index: 7;
				.width(80);
				.height(100);
				.top(0);
				.right(0);
				color: #fff;
				.font-size(26);
				.line-height(100);
				text-align: center;
				background: #6ca5c9;
				&.real{
					background: #7686bb;
				}
			}
			.switch{
				display: inline-block;
				position: absolute;
				.width(50);
				.height(50);
				.border-radius(50%);
				.top(25);
				.left(145);
				background: #6ca5c9;
				&.real{
					background: #7686bb;
				}
				span{
					position: absolute;
					display: inline-block;
					.top(15);
					.left(28);
					.width(10);
					.height(10);
					.triangle(10,transparent, transparent, transparent, #fff );
					-webkit-transition: -webkit-all .3s ease;
					transition: all .3s ease;
				}
			}
			&.unfold{
				-webkit-transform: translateX(2rem);
				transform: translateX(2rem);
				.switch{
					span{
						transform: rotate(180deg);
						-ms-transform: rotate(180deg); 	/* IE 9 */
						-moz-transform: rotate(180deg); 	/* Firefox */
						-webkit-transform: rotate(180deg); /* Safari 和 Chrome */
						-o-transform: rotate(180deg); 
						.left(15);
					}
				}
			}
		}
		.transition-l{
			display: inline-block;
			position: absolute;
			.width(50);
			.height(100);
			.left(120);
		}
		.item-wrapper{
			.width(420);
			overflow: hidden;
			overflow-x: scroll;
			overflow-y: hidden;
			-webkit-overflow-scrolling: touch;
			transform: translateZ(0);
			ul{
				.width(1100);
				.height(100);
				.padding(20, 10);
				li{
					display: inline-block;
					.width(210);
					color: #967cdf;
					text-align: center;
					.border-right(1, solid, #978587);
					&:last-child{
						border:none;
					}
					.desc{
						color: #807691;
						.font-size(20);
					}
				}
				&.pro{
					li{
						color: #ccc;
					}
				}
			}
		}
		.recharge{
			position: absolute;
			display: inline-block;
			.width(100);
			.padding(5);
			.font-size(30);
			background: #967ddb;
			.top(25);
			.right(10);
			.border-bottom(5, solid, #6a4eb5);
			.charge{
				color: #fff;
			}
		}
	}

</style>

<script type="text/javascript">
	import { mapMutations } from 'vuex';
	export default {
		name: 'account',
		data() {
			return{
				unfold: false,
				isSwitch: true,
				cur_way: '模拟',
				curSwitch: true,
			}
		},

		props: ['bg_color'],

		methods: {
			...mapMutations({
				setType: 'CHANGETYPE',
				setIsShowLogin: 'ISSHOWLOGIN',
			}),

			switchUnfold() {
				this.curSwitch = false;
				this.unfold = this.unfold ? false : true;
				this.isSwitch = this.isSwitch ? false : true;
			},

			switchEvent(way) {
				this.setDesc(way);
				this.setType(way);
				this.cookie.set('type', way);
				this.isSwitch = true;
				this.unfold = this.unfold ? false : true;
			},

			setDesc(way) {
				if ( way === 'demo' ) {
					this.cur_way = '模拟';
					this.curSwitch = true;
					this.setIsShowLogin(false);
					this.cookie.expire('real_token');
				} else {
					this.cur_way = '实盘';
					this.curSwitch = false;
					this.setIsShowLogin(true);
				}
			},

		},

		created() {
			let type = this.$store.state.type;
			this.setDesc(type);
		},

		computed: {
			type() {
				return this.$store.state.type;
			}
		},

		watch: {
			type(type) {
				this.setType(type);
				this.cookie.set('type', type);
				this.setDesc(type);
			}
		}
	}
</script>