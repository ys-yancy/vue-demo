<template>
	<div class="order-share">
		<my-header page-title='交易'>
			<span slot='icon-logo' class='go-back' @click='$router.go(-1)'> < </span>
		</my-header>
		<section class="content">
			<div class="container-hd">
				<div class="hd">
					<span class="tag">{{params.cmd}}</span>
					<h2>
						<span>{{params.symbolName}}</span>
					</h2>
				</div>
				<div class="status-wrapper">
					<span class="sign">$</span>
					<span class="num J_FloatProfit">{{ticketParams.profit}}</span>
					<span class="status">当前盈利</span>
				</div>
				<div class="progress-wrapper">
					<div class="wrapper clearfix">
						<span class="title">当前盈利</span>
						<div class="progress-outer">
							<div class="progress">
								<div class="progress-inner float-profit" :style="{width:update.floatWidth}">
									<span class="desc">
										<span class="sign">$</span>
										<span class="J_FloatProfit">{{ticketParams.profit}}</span>
									</span>
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="wrapper clearfix">
						<span class="title">目标盈利</span>
						<div class="progress-outer">
							<div class="progress">
								<div class="progress-inner float-profit" :style="{width:update.marginWidth}">
									<span class="desc">
										<span class="sign">$</span>
										<span class="J_FloatProfit">{{}}</span>
									</span>
								</div>
							</div>
						</div>
					</div> -->
					<div class="wrapper clearfix">
						<span class="title">投入资金</span>
						<div class="progress-outer">
							<div class="progress">
								<div class="progress-inner float-profit" :style="{width:update.progressWidth}">
									<span class="desc">
										<span class="sign">$</span>
										<span class="J_FloatProfit">{{ticketParams.margin}}</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-wrapper">
				<div class="tab-nav-wrapper">
					<div class="tab-nav">投资人信息</div>
					<div class="tab-nav active">价格走势图</div>
				</div>
				<div class="tab-content-wrapper"></div>
			</div>
			<div class="bottom">
				<router-link class='link' to='/orderShare'>马上跟投</router-link>
				<p class="desc">任何投资都存在亏损的可能请谨慎</p>
			</div>
			<div class="circle-container">
				
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.order-share{
		background: #20243e url('../img/share-order-bg.png') 0 0 no-repeat;
		background-size: 100% auto;
		.padding-bottom(200);
		header{
			background: #160e23;
		}
		.container-hd{
			.margin-top(80);
			.hd{
				position: relative;
				.line-height(100);
				color: #fff;
				.tag{
					position: absolute;
					background: #25b9a8;
					.width(60);
					.height(30);
					.line-height(30);
					text-align: center;
					.top(35);
					.left(40);
				}
				h2{
					.font-size(33);
					text-align: center;
					color: #fff;
				}
			}
			.status-wrapper{
				color: #fff;
				.height(120);
				.line-height(120);
				text-align: center;
				.num{
					.font-size(50);
				}
			}
			.progress-wrapper{
				.height(232);
				color: #fff;
				.padding-left(20);
				.padding-top(60);
				.wrapper{
					.font-size(26);
					.height(40);
					.line-height(40);
					.margin-top(20);
					.title{
						float: left;
						.width(110);
					}
					.progress-outer{
						float: left;
						position: relative;
						.progress{
							position: absolute;
							.width(200);
							.progress-inner{
								position: absolute;
								.border-top(1, solid, #1695c2);
								background: #01bdf1;
								.width(20);
								.height(40);
								.border-radius(5);
								transition: all .8s ease-in;
								.desc{
									position: absolute;
									.right(-120);
									.font-size(24);
									.height(40);
									.line-height(40);
									white-space: nowrap;
								}
							}
						}
					}
				}
			}
		}
		.tab-wrapper{
			.margin-top(30);
			.tab-nav-wrapper{
				width: 100%;
				.font-size(0);
				.tab-nav{
					display: inline-block;
					width: 50%;
					.font-size(26);
					.padding(8);
					text-align: center;
					color: #fff;
					background: #3b4162;
					&.active{
						background: #5d4ec5;
					}
				}
			}
			.tab-content-wrapper{
				.height(320);
			}
		}
		.bottom{
			position: fixed;
			background: rgba(32,36,62,.95);
			.bottom(0);
			.right(0);
			.left(0);
			.padding(40, 0, 20, 0);
			a{
				display: block;
				background: #5d4ec5;
				.font-size(30);
				color: #fff;
				.width(420);
				.line-height(60);
				text-align: center;
				margin: 0 auto;
				.border-radius(10);
			}
			p{
				.width(400);
				.font-size(18);
				text-align: center;
				color: #898b99;
				.line-height(60);
				margin: 0 auto;
			}
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header.vue';
	export default {
		name: 'orderShare',
		data() {
			return {
				routeParams: '',
				ticketParams: '',
			}
		},

		methods: {
			async getOrderTicketList() {
				let list = await this.ajax({
					url: 'http://newapi.invhero.com/v1/order/' + this.routeParams.order,
					type: 'GET',
					data: {
						access_token: this.cookie.get('token'),
						_r: Math.random(),
					}
				}).then((data)=> {
					this.ticketParams = data.data.data;
					
					console.log(data.data.data)
				})
			}
		},

		created() {
			this.routeParams = this.$route.query;
			this.getOrderTicketList();

		},

		computed: {
			params() {

				return{
					cmd: this.routeParams.cmd == 'sell' ? '买跌' : '买涨',
					symbolName: this.routeParams.name,
					symbol: this.routeParams.symbol,
					invite: this.routeParams.invite_code,
					nickname: this.routeParams.nickname,
					ticket: this.routeParams.ticket,
					unit: this.routeParams.unit,
				}
			},

			update() {
				let profit = this.ticketParams.profit,
					margin = this.ticketParams.margin;
				let per = profit < 0 ? 0 : (profit / (2 * margin));
				let floatPer = per >= 2 ? 1 : per,
        			marginPer = per > 2 ? 2 : per,
        			progressPer = '50%';

				return {
					floatWidth: floatPer * 100 + '%',
					marginWidth: marginPer * 100 + '%',
					progressWidth: progressPer,
				}
			}
		},

		components: {
			myHeader,
		}
	}
</script>