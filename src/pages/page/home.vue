<template>
	<div class="transactionPage">
		<my-header page-title='交易'>
			<span slot='icon-logo' class='go-back' @click='$router.go(-1)'> 使用帮助 </span>
			<div slot='right-icon' class="right-icon">
				<span class="add-icon"> + </span>
			</div>
		</my-header>

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
	}
</style>

<script type="text/javascript">
	import myFooter from '../components/footer';
	import myHeader from '../components/header';
	import myAccount from '../components/account';
	import myMarquee from '../components/marquee';
	import F from '../lib/frame.js';

	export default {
		name: 'home',

		data() {
			return {
				Client: '',
				stompBody: ''
			}
		},

		methods: {

		},

		mounted() {
			console.log('Home加载完毕！');
			console.log(this)
			this.$nextTick(function() {
				new this.$sticky({el: '.nav-list'});
			})
			
		},

		components: {
			myHeader: myHeader,
			myFooter: myFooter,
			myAccount: myAccount,
			myMarquee: myMarquee,
		}

	}
</script>