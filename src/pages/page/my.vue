<template>
	<div class="my-wrapper">
		<my-header page-title='我'></my-header>

		<router-link tag='div' to='/profile' class="detail-wrapper-outer">
			<div class="img-wrapper-outer">
				<div class="img-wrapper">
					<img src="https://api.51aishanghui.com/static/user/0/4/avatar.1492178171.jpg" class="img">
				</div>
			</div>
			<div class="detail-wrapper">
				<p class="name">ys</p>
				<p class="">
					<span>手机号:</span>
					<span class="J_Phone">13693544218</span>
				</p>
				<p>
					<span>邀请码:</span>
					<span class="J_InviteCode">yh3332</span>
				</p>
			</div>
		</router-link>
		<router-link tag='ul' to='account' class="J_Rank bd bd-first">
			<li>
				<span class="J_Account account">
					<span>我的资产: 14.6</span>
					<span class="profit">浮动盈亏: 0.00</span>
				</span>
				<span class="arrow-right"></span>
			</li>
		</router-link>

		<ul class="bd bd-first">
			<li>
				<span  class="recovery-trade-password">
					<span>修改密码</span>
				</span>
				<span class="arrow-right"></span>
			</li>
			<li>
				<span  class="recharge">
					<span>入金</span>
				</span>
				<span class="arrow-right"></span>
			</li>
		</ul>
			
		<ul class="bd bd-second">
			<li>
				<span  class="my-count">
					<span>个人设置</span>
					<span class="desc-right">头像 昵称 隐私</span>
				</span>
				<span class="arrow-right"></span>
			</li>
			<li>
				<span  class="system_notice">
					<span>系统公告</span>
				</span>
				<span class="arrow-right"></span>
			</li>
			<li>
				<span  class="system_notice">
					<span>使用帮助</span>
				</span>
				<span class="arrow-right"></span>
			</li>
			<li>
				<span  class="system_notice">
					<span>关于我们</span>
				</span>
				<span class="arrow-right"></span>
			</li>
		</ul>

		<div class="btn">
			<span>退出</span>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.my-wrapper{
		background: #EFEFF4;
		//会出现横向滚动条
		overflow-x: hidden;
		.margin-top(80);
		.margin-bottom(100);
		.detail-wrapper-outer{
			.height(200);
			color: #807691;
			background: #fff;
			&>div{
				display: inline-block;
				&:first-child{
					float: left;
					.padding(30, 60);
				}
			}
			.img-wrapper-outer{
				.width(250);
				.height(200);
				.img(130, 130);
				.img-wrapper{		
					.border-radius(50%);
					overflow: hidden;
					.border(5, solid, #d9cff2);
					background: #967BDB;
					.padding(5);
					.img{
						.width(130);
						.height(130);
						.border-radius(50%);
					}
				}
			}
			.detail-wrapper{
				.padding-top(30);
				.padding-left(30);
				&>p{
					.margin-top(15);
				}
			}

		}
		.bd{
			li{
				position: relative;
				color: #807691;
				.arrow-right{
					position: absolute;
					.width(20);
					.height(30);
					.top(40);
					.right(0);
					background: url(../img/arrow-right.png);
					.background-size(50, 50);
				}
			}
		}
		.bd-first{
			background: #fff;
			.margin-top(40);
			.padding-left(30);
			.padding-right(30);
			.J_Account{
				display: inline-block;
				.width(640);
				.height(100);
				.line-height(100);
				.profit{
					.margin-left(120);
				}
			}
			.recovery-trade-password, .recharge{
				display: inline-block;
				.width(580);
				.height(100);
				.line-height(100);
			}
			.recovery-trade-password{
				.border-bottom(1, solid, #d0cfd5);
			}
		}
		.bd-second{
			.height(400);
			background: #fff;
			.margin-top(40);
			.padding-left(30);
			.padding-right(30);
			.my-count, .system_notice{
				display: inline-block;
				.width(640);
				.height(100);
				.line-height(100);
				.desc-right{
					.margin-left(260);
				}
			}
			.system_notice{
				.border-top(1, solid, #d0cfd5);
			}

		}
		.btn{
			.margin(30, 0);
			span{
				display: block;
				.width(380);
				.height(60);
				.line-height(60);
				.border-bottom(5, solid, #6b4db5);
				.border-radius(8);
				text-align: center;
				margin: 0 auto;
				color: #fff;
				background: #967adc;
			}
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header';
	import myFooter from '../components/footer';
	export default {
		name: 'my',
		data() {
			return {

			}
		},

		components: {
			myHeader,
			myFooter
		}
	}
</script>