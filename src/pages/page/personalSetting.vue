<template>
	<div class="per-wrapper">
		<my-header page-title='个人设置'>
			
		</my-header>
		<section class="portrait">
			<div class="img-wrapper-outer">
				<div class="img-wrapper">
					<img class="img" :src="account.avatar">
				</div>
			</div>
			<h2 class="name">{{ account.nickname }}</h2>
		</section>
		<section class="detail clearfix">
			<span class="profile-icon phone-icon"></span>
			<span class="phone">13693544218</span>
			<span class="profile-icon age-icon"></span>
			<span class="age">投资年龄66天</span>
		</section>
		<div class="auth">
			<div class="item data">
				<div class="head">
					<p class="title">允许别人查看我的[投资数据]</p>
					<span class="radio-wrapper off J_Data" :class="{off: !userLimt.dataLimt}" @click='setData(1)'></span>
				</div>
				<div class="body">
					开启后其他用户可以在您的"个人详情页面"查看您的投资统计数据.
				</div>
			</div>
			<div class="item order">
				<div class="head">
					<p class="title">允许别人查看我的[当前交易]</p>
					<span class="radio-wrapper J_Order" :class="{off: !userLimt.curOrderLimt}" @click='setData(2)'></span>
				</div>
				<div class="body">
					开启后其他用户可以在您的"个人详情页面"中查看您的当前交易.
				</div>
			</div>
			<div class="item history">
				<div class="head">
					<p class="title">允许别人查看我的[历史交易]</p>
					<span class="radio-wrapper J_History" :class="{off: !userLimt.hisOrderLimt}" @click='setData(3)'></span>
				</div>
				<div class="body">
					开启后其他用户可以在您的"个人详情页面"中查看您的历史交易.
				</div>
			</div>
			<div class="item quan">
				<div class="head">
					<p class="title">允许别人关注我</p>
					<span class="radio-wrapper J_Quan" :class="{off: !userLimt.followingLimt}" @click='setData(4)'></span>
				</div>
				<div class="body">
					开启后其他用户可以通过您的"个人详情页面"关注您, 这样您发布的订单或者其他内容会出现在他的"投资圈".
				</div>
			</div>
		</div>
	</div>
</template>

<style lang='less' scoped>
	@import '../style/variable.less';
	.per-wrapper{
		.portrait{
			.height(450);
			.margin-top(80);
			background: url('../img/profile.png');
			.background-size(640, 494);
			border: .1px solid transparent;
			.img-wrapper-outer{
				.width(250);
				.height(260);
				margin: 0 auto;
				.margin-top(93);
				.img(240, 240);
				.img-wrapper{		
					.border-radius(50%);
					overflow: hidden;
					background: #967BDB;
					.padding(5);
					.img{
						.width(240);
						.height(240);
						.border-radius(50%);
					}
				}
			}
			.name{
				color: #fff;
				.font-size(30);
				.line-height(60);
				text-align: center;
			}
		}
		.detail{
			position: relative;
			.font-size(0);
			.border-bottom(1, solid, #eaebef);
			.phone, .age{
				display: inline-block;
				width: 50%;
				.height(60);
				.font-size(26);
				text-align: center;
				.line-height(60);
			}
			.phone{
				.border-right(1, solid, #eaebef);
			}
			.profile-icon{
				position: absolute;
				display: inline-block;
				.width(30);
				.height(40);
				background: url('../img/profile-icon-my.png');
				.background-size(50, 150);
				z-index: 2;
				.bottom(8);
				&.age-icon{
					.right(255);
					.background-position(0, 3);
				}
				&.phone-icon{
					.left(40);
					.background-position(0, -40);
				}
			}
		}
		.auth{
			.padding(0, 40);
			.item{
				.font-size(26);
				.padding(40, 0);
				.border-bottom(1, solid, #ccc);
				.head{
					position: relative;
					.margin-bottom(10);
					.radio-wrapper{
						display: inline-block;
						position: absolute;
						.width(100);
						.height(52);
						background:url(../img/weixin-profile-radio.png) 0 0 no-repeat;
						.background-size(109, 276);
						.background-position(-6, -5);
						.top(0);
						.right(0);
						&.off{
							.background-position(-6, -215);
						}
					}
				}
				.body{
					color: #948f9f;
					.font-size(23);
					.padding-right(190);
				}
			}
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header';
	export default {
		name: 'personalSetting',
		data() {
			return {
				Limt: {},
			}
		},

		methods: {
			setData(index) {
				
				// this.ajax({
				// 	url: 'http://newapi.invhero.com/v1/user/profile/permission/data',
				// 	type: ""
				// })
			}
		},

		created() {
			this.$store.dispatch('getUserLimt', {});
		},

		computed: {
			account() {
				const account = this.$store.state.userAccount;
				let res = {
				}

				if (account) {
					res = account;
				}
				return res;
			},

			userLimt() {
				return this.Limt = {
					dataLimt: this.$store.state.watchdataLimt,
					curOrderLimt: this.$store.state.currentOrderLimt,
					hisOrderLimt: this.$store.state.historyOrderLimt,
					followingLimt: this.$store.state.allowFollowingLimt,
				}
			}
		},

		components: {
			myHeader,
		}
	}
</script>