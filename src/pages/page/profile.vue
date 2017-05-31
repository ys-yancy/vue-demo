<template>
	<div class="profile-wrapper-outer">
		<my-header page-title='个人资料'>
			<span slot='icon-logo' class='go-back' @click='$router.go(-1)'> < </span>
		</my-header>
		<section class="info">
			<div class="img-wrapper-outer">
				<div class="img-wrapper">
					<img class="img" :src="userAccount.avatar">
				</div>
			</div>
			<h2 class="name">{{userInfoData.nick_name}}</h2>
			<div class="detail-wrapper">
				<div class="left">
					<p>
						<span class="small">$</span>
						<span class="J_TotalProfit">{{userInfoData.gross_profit}}</span>
					</p>
					<p class="desc">全时收益</p>
				</div>
				<div class='right'>
					<p>
						%<span class="small">{{userInfoData.month_ror_rank}}</span>
					</p>
					<p class="desc">月均收益率</p>
				</div>
				<a href="">数据分析</a>
			</div>
		</section>
		<section class="list">
			<div class="hd">Ta的交易</div>
			<ul class="clearfix">
				<li class="empty">
					Ta当前无交易
					<router-link to='pro' class='history'>
						查看历史交易
					</router-link>
				</li>
			</ul>
		</section>
		<section class="sort">
			<h2>
				<router-link :to='{path: "/newTrade", query: {checkView: "hotSale"}}'>Ta的榜单排名
					<span class="number">
						<span class="J_Rank">无</span>
					</span>
					<span class="link">
						<span class="arrow-right"></span>
					</span>
				</router-link>
			</h2>
		</section>
		<section class="other">
			
		</section>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.profile-wrapper-outer{
		.padding-top(80);
		.info{
			text-align: center;
			.img-wrapper-outer{
				.width(180);
				.height(180);
				margin: 0 auto;
				.margin-top(30);
				.img(160, 160);
				.img-wrapper{		
					.border-radius(50%);
					overflow: hidden;
					.border(5, solid, #d9cff2);
					background: #967BDB;
					.padding(5);
					.img{
						.width(160);
						.height(160);
						.border-radius(50%);
					}
				}
			}
			.name{
				.font-size(30);
				.line-height(60);
				text-align: center;
			}
			.detail-wrapper>{
				position: relative;
				.margin-top(20);
				.padding-top(10);
			 	.height(120);
			    display: -webkit-flex;
			    display: flex;
			    position: relative;
			    &>div{
				    -webkit-flex: 1;
				    flex: 1;
				    p{
				    	.height(60);
				    	span{
				    		.font-size(30);
				    	}
				    }
				    &.left{
				    	text-align: right;
				    	.padding-right(40);
				    	.border-right(1, solid, #ceced2);
				    }
				    &.right{
				    	text-align: left;
				    	.padding-left(40);
				    }
			    }
			    a{
			    	position: absolute;
			    	.width(130);
			    	.font-size(24);
			    	.right(30);
			    	.top(50);
			    	background: #967adc;
			    	.border-radius(15);
			    }
			}
		}
		.list{
			.hd{
				.line-height(40);
				.font-size(20);
				background: #efeff4;
				.padding-left(24);
				.border-top(1, solid, #cdccd1);
				.border-bottom(1, solid, #cdccd1);
			}
			ul{
				.height(140);
				.empty{
					.line-height(50);
					.font-size(26);
					.margin-top(40);
					.padding-left(200);
					.history{
						.margin-left(50);
					}
				}
			}
		}
		.sort{
			position: relative;
			.line-height(100);
			.border-top(1, solid, #d3d2d6);
			.border-bottom(1, solid, #d3d2d6);
    		.padding-left(30);
    		.font-size(28);
    		color: #473b61;
    		a{
    			color: #473b61;
    		}
    		span{
    			display: inline-block;
    			&.number{
    				.width(360);
					text-align: right;
    			}
    			&.link{
    				.width(60);
    			}
    		}
		}
		.other{
			.min-height(40);
			background: #efeff4;
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header';
	export default {
		name: 'profile',
		data() {
			return {
				userInfoData: '',
			}
		},

		methods: {
			async getUserInfo() {
				let info = await this.ajax({
					url: 'v1/user/profile/info?',
					type: 'GET',
					data: {
						equity_threshold: 50,
						monthly_invite: 0,
						invite_code: this.cookie.get('inviteCode'),
						access_token: this.cookie.get('token'),
						wl: this.cookie.get('wl'),
					},
				}).then((data)=> {
					this.userInfoData = data.data.data;
					return this.userInfoData;
				})
			}
		},

		created() {
			this.getUserInfo();
		},

		computed: {
			userAccount() {
				return this.$store.state.userAccount;
			}
		},

		components: {
			myHeader,
		}
	}
</script>