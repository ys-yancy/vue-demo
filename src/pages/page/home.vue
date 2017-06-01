<template>
	<div class="transactionPage">
		<my-header page-title='交易'>
			<span slot='icon-logo' class='go-back' @click='$router.go(-1)'> 使用帮助 </span>
			<div slot='right-icon' class="right-icon">
				<span class="add-icon" @click.prevent.stop='addClicked'> + </span>
			</div>
		</my-header>
		<div v-show='isShortcutShow' class="shortcut-wrapper-outer" 
		@touchmove.prevent.stop 
		@click.prevent.stop='hideShortcut'>
			<my-shortcut :on-changecode='showchangeCode'></my-shortcut>

		</div>
		<nav class="nav-wrapper">
			<ul class="nav-list">
				<router-link to='/option' class='clearfix first'>自选</router-link>
				<router-link to='/curretOrder' class='clearfix'>当前交易</router-link>
				<router-link to='/historyOrder' class='clearfix'>历史交易</router-link>
			</ul>
		</nav>

		<my-marquee></my-marquee>

		<router-view></router-view>

		<my-account></my-account>

		<my-footer></my-footer>

		<my-dialog v-if='exchangeCode'
		:is-showDiglog='exchangeCode'
		:on-confirm='confirmClicked' 
		:on-close = 'closeClicked'
		>
			<input type='text' class="dialog-input" placeholder="输入兑换码" />
		</my-dialog>

		<my-login></my-login>
	</div>
</template>
<style lang='less' scoped>
	@import '../style/variable.less';
	.transactionPage{
		text-align: center;
		header{
			.go-back{
				.width(115);
				.height(36);
				.line-height(36);
				.margin-top(23);
				color: #fff;
				.font-size(22);
				.border(1, solid, #fff);
			}
			.add-icon{
				.font-size(50);
				color: #E6E0F7;
			}
		}
		.shortcut-wrapper-outer{
			position: fixed;
			z-index: 20;
			.top(0);
			.left(0);
			.right(0);
			.bottom(0);
			background: rgba(0, 0, 0, .7);
		}
		nav{
			background-color: #967BDC;
			.nav-list{
				display: flex;
				display: -webkit-flex;
				.height(72);
				.line-height(72);
				.margin-top(80);
				.border-top(1, solid, #fff);
				list-style: none;
				justify-content: space-around;
				background-color: #967BDC;
				a{
					color: #68449f;
				}
				.active{
					position: relative;
					color:#fff;
					&:after{
						position: absolute;
						.width(105);
						.height(2);
						background:#68449f;
						.top(0);
						.left(-5);
					}
					&.first:after{
						.left(-30);
					}
				}
			}
		}
		.account{
			position: fixed;
			z-index: 10;
			.bottom(90);
		}
		.dialog-wrapper-outer{
			.dialog-input{
				.height(50);
				.border(1, solid, #967adc);
				outline: 0;
				text-align: center;
				.border-radius(5);
			}
		}	
	}
</style>

<script type="text/javascript">
	import myFooter from '../components/footer';
	import myHeader from '../components/header';
	import myAccount from '../components/account';
	import myMarquee from '../components/marquee';
	import myShortcut from '../components/shortcut';

	import myLogin from '../components/login';

	//应该放的app里用vuex控制
	import myDialog from '../components/dialog';
	import F from '../lib/frame.js';

	export default {
		name: 'home',

		data() {
			return {
				Client: '',
				stompBody: '',
				exchangeCode: false,
				isShortcutShow: false,
			}
		},

		methods: {
			hideShortcut() {
				this.isShortcutShow = false;
			},

			addClicked() {
				this.isShortcutShow = this.isShortcutShow ? false : true;
			},

			showchangeCode(calback) {
				this.exchangeCode = true;
			},

			confirmClicked(calback) {
				this.exchangeCode = this.exchangeCode ? false : true;
			},

			closeClicked(calback) {
				this.exchangeCode = false;
			},

		},

		mounted() {
			this.$nextTick(function() {
				new this.$sticky({el: '.nav-list'});
			})
			
		},

		components: {
			myHeader: myHeader,
			myFooter: myFooter,
			myAccount: myAccount,
			myMarquee: myMarquee,
			myShortcut: myShortcut,
			myDialog: myDialog,
			myLogin: myLogin,
		}

	}
</script>