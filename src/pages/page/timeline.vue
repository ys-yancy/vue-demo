<template>
	<div class="timeline">
		<my-header page-title='投资圈'>
			<span slot='icon-logo' class='go-back item-back' @click='$router.go(-1)'></span>
		</my-header>
		<div class="self-wrapper">
			<div class="info-wrapper">
				<div class="img-wrapper-outer">
					<div class="img-wrapper">
						<router-link class='img' to='timeline' tag='img' src='http://wx.qlogo.cn/mmopen/OLnXLhYC64k8myaIE9BxFRgPQqTvMLKjsTRAZADnw28g2UhPBoya3UFxic8Ugia6N1Kf9zGszzpa5OUQp3ryR484PszdJNApCib/0'/>
					</div>
				</div>
				<p class="name">Y s</p>
			</div>
			<div class="detail-wrapper">
				<ul class="clearfix">
					<router-link to='timeline' tag='li'>
						<p>0</p>
						<p>粉丝</p>
					</router-link>
					<router-link to='timeline' tag='li'>
						<p>0</p>
						<p>关注</p>
					</router-link>
				</ul>
			</div>
		</div>

		<section class="list">
			<ul>
				<li v-for='user in timeList' :key='user.symbol'>
					<div class="left">
						<div class="img-wrapper-outer">
							<div class="img-wrapper">
								<router-link class='img' to='timeline' tag='img' :src='user.avatar'/>
							</div>
						</div>
					</div>
					<div class="right">
						<div class="hd clearfix">
							<p class="name">{{user.nickname}}</p>
							<p class="date">{{user.created}}</p>
						</div>
						<div class="bd">
							<p class="desc">{{user.type}}</p>
							<router-link class="order-wrapper clearfix" to='timeline1' tag='div'>
								<div class="symbol-wrapper">
									<div class="left">
										<span class="tag"></span>
										<p class="name">{{user.symbolName}}</p>
										<p class="symbol">{{user.symbol}}</p>
										<p class="status">{{user.status}}</p>
									</div>
									<div class="right">
										<p class="title">盈亏</p>
										<div class="profit">
											<span class="dollar">$</span>
											<span class="int">{{user.profit}}</span>
											<span class="float">10</span>
										</div>
									</div>
								</div>
							</router-link>
						</div>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>

<style lang='less' scoped>
	@import '../style/variable.less';
	
	.timeline{
		width:100%;
		color: #473b61;
		background: #EFEFF4;
		.margin-top(80);
		.self-wrapper{
			/*.height(200);*/
			.padding(30);
			position: relative;
			background: #fff;
			&>div{	
				display: inline-block;
			}
			.info-wrapper{
				float: left;
				.name{
					position: absolute;
					.bottom(10);
					.left(110);
				}
			}
			.img-wrapper-outer{
				.width(200);
				/*.height(200);*/
				.padding(10, 40);
				.img(90, 90);
				.img-wrapper{		
					.border-radius(50%);
					overflow: hidden;
					.border(5, solid, #d9cff2);
					background: #967BDB;
					.padding(5);
					.img{
						.width(90);
						.height(90);
						.border-radius(50%);
					}
				}
			}
			.detail-wrapper{
				.width(380);
				.padding(30, 0);
				margin: 0 auto;
				ul{
					li{
						display: inline-block;
						.width(170);
						.font-size(30);
						text-align: center;
						color: #473b61;;
						p{
							.height(40);
							.font-size(20);
							&:first-child{
								.font-size(30);
								color: #967adc;
							}
						}
						&:last-child{
							.border-left(1, solid, #ccc);
						}
					}
				}
			}
		}
		.list{
			width: 100%;
			.height(600);
			background: #fff;
			.margin-top(50);
			li{
				.height(300);
				.margin-bottom(10);
				&>.left{
					.width(120);
					height: 100%;
					overflow: hidden;
					float: left;
					.img-wrapper-outer{
						.width(200);
						/*.height(200);*/
						.padding(30, 20);
						.img(70, 70);
						.img-wrapper{		
							.border-radius(50%);
							overflow: hidden;
							.border(5, solid, #d9cff2);
							background: #967BDB;
							.padding(5);
							.img{
								.width(70);
								.height(70);
								.border-radius(50%);
							}
						}
					}
	
				}
				&>.right{
					.width(500);
					.height(265);
					float: right;
					.padding-right(30);
					.hd{
						.height(40);
						.margin-top(20);
						.font-size(28);
						.name{
							float: left;
						}
						.date{
							float: right;
						}
					}
					.bd{
						.desc{
							.font-size(24);
							.padding(8, 0);
						}
						.order-wrapper{
							.padding(20, 0);
							background: #F5F5F7;
							.border-radius(10);
							.font-size(20);
							.left{
								.width(220);
								.font-size(20);
								.border-right(1, solid, #ccc);
								.padding-left(40);
								.padding-right(5);
								float: left;
								.status{
									.height(80);
									.line-height(80);
								}
							}
							.right{
								float: right;
								.width(240);
								.padding-left(30);
								.profit{
									.height(106);
									.line-height(106);
									.font-size(30);
									.padding-left(40);

								}
								
							}
						}
					}
				}
			}	
		}
	}

</style>

<script type="text/javascript">
	import myHeader from '../components/header';
	export default {
		name: 'timeline',
		data() {
			return {
				timeList: '',
			}
		},

		methods: {
			async getList() {
				let list = await this.ajax({
					url: 'v1/user/timeline/home',
					type: 'GET',
					data: {
						access_token: this.cookie.get('token'),
						_r: Math.random(),
					}
				}).then((data)=> {
					this.timeList = data.data.data;
					return this.timeList;
				})
			}
		},

		created() {
			this.getList();
		},

		components: {
			myHeader,
		}
	}
</script>