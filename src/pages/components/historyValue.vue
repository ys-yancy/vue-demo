<template>
	<section class="history-content">
		<ul class="J_list">
			<li class="clearfix item first">
				<span class="tag">买涨</span>
				<div class="price-wrapper">
					<span class="J_FloatProfit">981.15</span>
					<span class="currency">美元</span>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">交易量（手）：</p>
					<p>0.32</p>
				</div>
				<div class="desc">
					<p class="name">交易利润（$）：</p>
					<p>-3500.52</p>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">交易量（手）：</p>
					<p>0.32</p>
				</div>
				<div class="desc">
					<p class="name">交易利润（$）：</p>
					<p>-3500.52</p>
				</div>
			</li>
		</ul>

		<ul v-if='showMore' class="J_list">
			<li class="clearfix item">
				<div class="desc">
					<p class="name">交易量（手）：</p>
					<p>0.32</p>
				</div>
				<div class="desc">
					<p class="name">交易利润（$）：</p>
					<p>-3500.52</p>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">交易量（手）：</p>
					<p>0.32</p>
				</div>
				<div class="desc">
					<p class="name">交易利润（$）：</p>
					<p>-3500.52</p>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">交易量（手）：</p>
					<p>0.32</p>
				</div>
				<div class="desc">
					<p class="name">交易利润（$）：</p>
					<p>-3500.52</p>
				</div>
			</li>
			<li class="clearfix item">
				<div class="desc">
					<p class="name">交易量（手）：</p>
					<p>0.32</p>
				</div>
				<div class="desc">
					<p class="name">交易利润（$）：</p>
					<p>-3500.52</p>
				</div>
			</li>
		</ul>

		<span class="more" @click.stop='switchMore()'>
			<span></span>
		</span>
	</section>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.history-content{
		position: relative;
		.padding(20);
		.padding-bottom(106);
		color: #ccc;
		background: #160e23;
		.J_list{
			li{
				.border-bottom(1, solid, #353245);
			}
			.item.first{
				position: relative;
				width: auto;
				.height(120);
				.padding(5, 20);
				.tag{
					position: absolute;
					.top(50);
					.font-size(24);
				}
				.price-wrapper{
					float: none;
					.height(100);
					.line-height(100);
					.font-size(80);
					.padding-left(90);
					text-align: center;
					.currency{
						.font-size(30);
						.line-height(100);
						vertical-align: bottom;
					}
				}
			}
			.item{
				position: relative;
				.height(120);
				.padding(20, 0);
				.font-size(0);
				.desc{
					float: left;
					.width(300);
					.line-height(40);
					.font-size(24);
					p{
						.padding-left(50);
						.font-size(30);
						&.name{
							.font-size(20);
							color: #807691;
						}
					}
					&:last-child{
						.border-left(1, solid, #353245);
					}
				}
			}
		}
		.more{
			position: absolute;
			z-index: 15;
			.width(40);
			.height(40);
			.bottom(90);
			.left(301);
			.border-radius(50%);
			background: #564876;
			span{
				position: absolute;
				.top(15);
				.left(9);
				.triangle(10,#fff, transparent, transparent, transparent);
			}
		}
	}
</style>

<script type="text/javascript">
	export default {
		name: 'orderValue',
		data() {
			return {
				showMore: false,
			}
		},

		methods: {
			switchMore() {
				this.showMore = this.showMore ? false : true;
			}
		}
	}
</script>