<template>
	<div class="friend-wrapper">
		<my-header page-title='朋友赚 我也赚'>
			<span slot='icon-logo' class='go-back' @click='$router.go(-1)'> < </span>
		</my-header>
		<div class="info-no">
			<h2>除了做交易 邀请好友也能赚钱</h2>
			<router-link class='J_Detail detail' to='friends'>查看详情 ></router-link>
			<p class="desc">点击上方“+”去邀请好友</p>
		</div>
		<section class="info-list">
			<h1></h1>
			<div class="wrapper"></div>
			<v-scroll :on-refresh="getHistoryOrderList" :on-infinite="onInfinite" :isSetWrapper='true'
			:enableInfinite='false' :enableRefresh='false'>
				<ul class="J_Inner scrollInner">
					<li v-for='user in list' class="item clearfix " :key='user.nickname'>
						<div class="img-wrapper-outer">
							<div class="img-wrapper">
								<img :src="user.avatar" class="img">
							</div>
						</div>
						<div class="info">
							<h2>{{user.nickname}}</h2>
						</div>
						<span class="count-wrapper">
							<span>$</span>{{user.score}}
						</span>
					</li>
				</ul>
			</v-scroll>
		</section>
	</div>
</template>

<style lang="less">
	@import '../style/variable.less';
	.friend-wrapper{
		width: 100%;
		.margin-top(80);
		background: #EFEFF4;
		.info-no{
			text-align: center;
			.padding-top(40);
			.padding-bottom(40);
			background: #fff;
			h2{
				.font-size(34);
				color: #967adc;
				.line-height(80);
			}
			.detail{
				.font-size(20);
				.padding(5, 15);
				color: #fff;
				background: #967adc;
				.border-radius(15);
			}
			.desc{
				color: #473b61;
				.font-size(20);
				.margin-top(50);
			}
		}
		.info-list{
			position: relative;
			&>h1{
				.height(40);
				background: inherit;
			}
			.wrapper{
				.padding-top(120);
				background: #fff;
			}
			&::after{
				position: absolute;
				width: 100%;
				.height(170);
				.top(0);
				.left(0);
				content: "";
				background: #fff url(../img/friends-no-bg.png)0 0 no-repeat;
				.background-size(640, 170);

			}
			.yo-scroll{
				background: #fff;
				overflow-x: hidden;
				overflow-y: scroll;
				-webkit-overflow-scrolling: touch;
				.height(600);
			}
			.J_Inner{
				.padding-left(30);
				li{
					.height(160);
					.padding-top(20);
					.border-bottom(1, solid, #c8c7cc);
					.img-wrapper-outer{
						.width(160);
						.padding(10, 40);
						float: left;
						.img(80, 80);
						.img-wrapper{		
							.border-radius(50%);
							overflow: hidden;
							.border(5, solid, #d9cff2);
							background: #967BDB;
							.padding(5);
							.img{
								.width(80);
								.height(80);
								.border-radius(50%);
							}
						}
					}
					.info{
						.width(200);
						.font-size(26);
						float: left;
						.margin-top(45);
					}
					.count-wrapper{
						.font-size(30);
						.padding-right(10);
						float: right;
						.margin-top(40);
					}
				}			
			}
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header';
	import vScroll from '../components/scroll';
	export default {
		name: 'friend',
		data() {
			return {
				list: '',
			}
		},

		methods: {
			async getFriendList() {
				let list = await this.ajax({
					url: 'http://newapi.invhero.com/v1/rank/upline_reward/all/',
					type: 'GET',
					data: {
						access_token: this.cookie.get('token'),
						_r: Math.random(),
					}
				}).then((data)=> {
					this.list = data.data.data.list;
 					return this.list;
				});

				return list;
			},
		},

		created() {
			this.getFriendList();
		},

		components: {
			myHeader,
			vScroll,
		}

	}
</script>