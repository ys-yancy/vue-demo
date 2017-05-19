<template>
	<div class="account-wrapper">
		<my-header page-title='我的账户'>
			<span slot='icon-logo' class='go-back' @click='$router.go(-1)'> < </span>
			<span slot='right-icon' class="pocket clearfix">记账簿</span>
		</my-header>
		<section class="account">
			<ul class="demo J_Content">
				<li class="item">
					<span class="name">账户余额</span>
					<span class="num">
						$<span>{{userAccount.demo.balance}}</span>
					</span>
				</li>
				<li class="item">
					<span class="name">浮动盈亏</span>
					<span class="num">
						$<span>{{userAccount.demo.floatingProfit}}</span>
					</span>
				</li>
				<li class="item">
					<span class="name">可用保证金</span>
					<span class="num">
						$<span>{{userAccount.demo.free_margin}}</span>
					</span>
				</li>
				<li class="item">
					<span class="name">已用保证金</span>
					<span class="num">
						$<span>{{userAccount.demo.margin}}</span>
					</span>
				</li>
				<li class="item">
					<span class="name">账户净值</span>
					<span class="num">
						$<span>{{userAccount.demo.equity}}</span>
					</span>
				</li>
				<li class="item">
					<span class="name">保证金增金</span>
					<span class="num">
						$<span>{{userAccount.demo.bonus}}</span>
					</span>
				</li>
				<li class="item">
					<span class="name">保证金比例</span>
					<span class="num">
						$<span>183.26%</span>
					</span>
				</li>
			</ul>
		</section>
		<div class="btn-wrapper">
			<div class="recharge J_VerifyLogin">
				<a>账户入金</a>
			</div>
			<div class="extract J_VerifyLogin">
				<a>账户出金</a>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.account-wrapper{
		header{
			.pocket{
				position: absolute;
				display: inline-block;
				.height(50);
				.line-height(50);
				.font-size(22);
				.padding(0, 15);
				.right(10);
				.top(15);
				color: #fff;
				.border(1, solid, #fff);
			}
		}
		.account{
			.J_Content{
				.font-size(30);
				color: #817792;
				.margin-top(80);
				li{
					.padding(30, 0);
					.border-bottom(1, solid, #e7e6eb);
					.padding-left(40);
					.padding-right(20);
					.num{
						float: right;
						.font-size(24);
					}
				}
			}
		}
		.btn-wrapper{
			.margin-top(180);
			.padding-left(80);
			.J_VerifyLogin{
				display: inline-block;
				.width(200);
				.height(60);
				background: #967bdc;
				color: #fff;
				.font-size(28);
				.line-height(60);
				text-align: center;
				.border-bottom(5, solid, #7e64c5);
				.border-radius(10);
				&.extract{
					.margin-left(40);
					background: #7686ba;
					.border-bottom(5, solid, #5b6aa1);

				}
			}
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header';
	export default {
		name: 'account',
		data() {
			return {

			}
		},

		methods: {

		},

		created() {

		},

		computed: {
			userAccount() {
				const account = this.$store.state.userAccount;
				let res = {
					real: {},
					demo: {},
				}

				if (account) {
					res = account.account;
				}
				return res;
			}
		},

		components: {
			myHeader,
		}
	}
</script>