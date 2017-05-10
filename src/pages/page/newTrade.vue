<template>
	<div class="new-trade">
		<my-header :page-title='pageTitle'>
			<span slot='icon-logo' class='go-back' @click='$router.go(-1)'> < </span>
		</my-header>
		<nav class="nav-wrapper">
			<ul class="nav-list clearfix">
				<li class='clearfix' :class='{active: checkView =="hotSale"}' @click='menuController("hotSale")'>5月份榜单</li>
				<li class='clearfix' :class='{active: checkView =="newTrade"}' @click='menuController("newTrade")'>最新交易</li>
				<li class='clearfix' :class='{active: checkView =="recentProfits"}' @click='menuController("recentProfits")'>近期盈利</li>
			</ul>
		</nav>
		<section class="top-banner">
			<div class="month"></div>
			<div class="desc-wrapper">
				<p>最新交易的开仓定单</p>
			</div>

			<div  class="hotSale-info" v-if='checkView == "hotSale"'>
				<div class="left">总奖金:<span>0</span>元</div>
				<div class="right"><span>2017-05-31</span></div>
			</div>
		</section>
		
		<!-- 最新交易 -->
		<section v-if='checkView == "newTrade"' class="list-wrapper">
			<v-scroll :enableRefresh='false'>
				<ul id="J_list" class="list">
					<li v-for='(user, index) in list' :key='index'>
						<div class="img-wrapper-outer">
							<div class="img-wrapper">
								<img class="img" src="../img/my-sort-latest-down.png">
							</div>
						</div>
						<div class="symbol-wrapper">
							<p class="symbol">{{user.symbolName}}</p>
							<p class="name">{{user.nickname}}</p>
						</div>
						<span class="time">{{user.openTime}}</span>
					</li>
				</ul>
			</v-scroll>
		</section>

		<!-- 5月榜单 -->
		<section v-else-if='checkView == "hotSale"' class="list-wrapper">
			<v-scroll :enableRefresh='false'>
				<ul id="J_list" class="list">
					<li v-for='(user, index) in list' :key='index'>
						<div class="img-wrapper-outer">
							<div class="img-wrapper">
								<img class="img" :src="user.avatar">
							</div>
						</div>
						<div class="symbol-wrapper">
							<p class="name hotSale_name">{{user.nickname}}</p>
						</div>
						<span class="time">{{user.month_rate_of_return}}</span>
					</li>
				</ul>
			</v-scroll>
		</section>
		
		<!-- 近期盈利 -->
		<section v-else-if='checkView == "recentProfits"' class="list-wrapper">
			<v-scroll :enableRefresh='false'>
				<ul id="J_list" class="list">
					<li v-for='(user, index) in list' :key='index'>
						<div class="img-wrapper-outer">
							<div class="img-wrapper">
								<img class="img" :src="user.avatar">
							</div>
						</div>
						<div class="symbol-wrapper">
							<p class="name hotSale_name">{{user.nickname}}</p>
						</div>
						<span class="time">{{parseFloat(user.profit).toFixed(2)}}</span>
					</li>
				</ul>
			</v-scroll>
		</section>
	</div>
</template>

<style lang='less' scoped>
	@import '../style/variable.less';
	.new-trade{
		background: #b60005;
		/*.margin-top(80);*/
		nav{
			background-color: #967BDC;
			.height(72);
			.margin-top(80);
			.nav-list{
				position: relative;
				z-index: 2;
				display: flex;
				display: -webkit-flex;
				.line-height(72);	
				.border-top(1, solid, #fff);
				list-style: none;
				justify-content: space-between;
				background: rgba(0,0,0,.5);
				li{
					color: #ea5413;
				}
				.active{
					position: relative;
					color:#fff;
					&:after{
						position: absolute;
						.width(105);
						.height(2);
						background:yellow;
						.top(0);
						.left(-5);
					}
					&.first:after{
						.left(-30);
					}
				}
			}
		}
		.top-banner{
			position: relative;
			width: 100%;
			.height(500);
			.margin-top(-72);
			background: url(../img/my-sort-month.png) 0 0 no-repeat;
			background-size: 100% auto;
			.month{
				position: absolute;
				.width(350);
				.height(100);
				.top(190);
				.left(150);
				background: red;
				background: url('../img/my-sort-latest.png') 0 0 no-repeat;
				.background-size(640, 103);
				.background-position(-155, 0);
			}
			.desc-wrapper{
				position: absolute;
				.font-size(22);
				.top(310);
				.left(220);
			}
			.hotSale-info{
				position: absolute;
				width: 100%;
				.font-size(26);
				.padding(0, 40);
				.bottom(0);
				color: #f7ee13;
				.left{
					float: left;
				}
				.right{
					float: right;
				}
			}
		}
		.list-wrapper{
			.padding(0, 20);
			.list{
				background: #fff;
				li{
					position: relative;
					.border-bottom(1, solid, #c8c7cc);
					.padding(20, 0);
					.img-wrapper-outer{
						.width(90);
						.height(90);
						background:#75e4c1;
						.border-radius(50%);
						overflow: hidden;
						.margin-left(30);
						.img(90, 90);
					}
					.symbol-wrapper{
						position: absolute;
						.width(300);
						.font-size(26);
						.line-height(40);
						.left(150);
						.top(30);
						.hotSale_name{
							.margin-top(25);
						}
					}
					.time{
						position: absolute;
						.font-size(26);
						.right(20);
						.top(55);
					}
				}
			}
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header.vue';
	import vScroll from '../components/scroll.vue';
	export default{
		name: 'newTrade',
		data() {
			return {
				checkView: '',
				pageTitle: '',
				page: 0,
				page_size: 10,
				wl: 'tzyh365',
				list: '',
				hotSale: {
					equity_threshold: 100,
					monthly_invite: 10000,
					limit: 10,
				}
			}
		},

		methods: {

			menuController(info) {
				this.checkView = info;
				this.commandMode(info);
				this.$router.push({path: 'newTrade', query: { checkView: info }});
			},

			commandMode(info) {
				switch( info ) {
					case 'hotSale':
						this.pageTitle = '本月榜单';
						this.getHotSaleList();
						break;
					case 'newTrade': 
						this.pageTitle = '最新交易';
						this.getNewTradeList();
						break;
					case 'recentProfits': 
						this.pageTitle = '近期盈利';
						this.getProfitsList();
						break;
					default: 
						break;
				}
				return;
			},

			/**
			**  以后应该创建一个getData.js
			**  用于存放所有请求
			**/
			async getNewTradeList() {			
				let list = await this.ajax({
					url: 'http://newapi.invhero.com/v1/rank/order/latest',
					type: 'GET',
					data: {
						page: this.page,
						page_size: this.page_size,
						wl: this.wl,
						_r: Math.random(),
					}
				}).then((data)=> {
					this.list = data.data.data;
					return this.list;
				})
			},

			async getHotSaleList() {			
				let list = await this.ajax({
					url: 'http://newapi.invhero.com/v1/rank/ror/month',
					type: 'GET',
					data: {
						equity_threshold: this.hotSale.equity_threshold,
						monthly_invite: this.hotSale.monthly_invite,
						limit: this.hotSale.limit,
						wl: this.wl,
						_r: Math.random(),
					}
				}).then((data)=> {
					this.list = data.data.data;
					return this.list;
				})
			},

			async getProfitsList() {			
				let list = await this.ajax({
					url: 'http://newapi.invhero.com/v1/rank/user_profit/15/10',
					type: 'GET',
					data: {
						wl: this.wl,
						_r: Math.random(),
					}
				}).then((data)=> {
					this.list = data.data.data;
					console.log(this.list)
					return this.list;
				})
			}
		},

		mounted() {
			this.$nextTick(function() {
				new this.$sticky({el: '.nav-wrapper'});
			})
		},

		created() {
			this.checkView = this.$route.query.checkView;
			this.commandMode(this.checkView);
		},

		components: {
			myHeader,
			vScroll,
		}
	} 

</script>