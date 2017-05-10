<template>
	<div class="discover-wrapper">
		<my-header page-title='发现'>
			
		</my-header>
		<my-sliderImage></my-sliderImage>
		<section class="content">
			<ul>
				<router-link to='/timeline' tag='li'>
					<span class="account">投资圈</span>
					<span class="desc-right">看高手怎么赚钱</span>
					<span class="arrow-right"></span>
					<span class="desc-right"></span>
				</router-link>
				<router-link to='/friend' tag='li'>
					<span class="account">朋友赚我也赚</span>
					<span class="arrow-right"></span>
					<span class="desc-right">
						<span>$</span>
						<span>0</span>
					</span>
				</router-link>
				<router-link :to='{path: "/newTrade", query: {checkView: "newTrade"}}' tag='li'>
					<span class="account">最新交易</span>
					<span class="desc-right">系统最新交易一览无余</span>
					<span class="arrow-right"></span>	
				</router-link >
				<router-link :to='{path: "/newTrade", query: {checkView: "hotSale"}}' tag='li'>
					<span class="account">本月榜单</span>
					<span class="desc-right">真正的赚钱高手才能上榜</span>
					<span class="arrow-right"></span>	
				</router-link>
				<router-link :to='{path: "/newTrade", query: {checkView: "recentProfits"}}' tag='li'>
					<span class="account">近期盈利</span>
					<span class="desc-right">看看最近15天都谁在赚钱</span>
					<span class="arrow-right"></span>	
				</router-link>
			</ul>
		</section>
		<my-footer></my-footer>
	</div>
</template>

<style lang='less' scoped>
	@import '../style/variable.less';
	.discover-wrapper{
		background: #EFEFF4;
		color: #807691;
		.margin-top(20);
		.padding-bottom(275);
		.img-wrapper{
			
		}

		.content{
			background: #fff;
			ul{
				.padding(0, 30);
				li{
					position: relative;
					.height(90);
					.line-height(90);
					background: inherit;
					.border-bottom(1, solid, #d0cfd5);
					.desc-right{
						position: absolute;
						.right(50);
					}
					.arrow-right{
						position: absolute;
						.width(20);
						.height(50);
						background: red;
						.top(30);
						.right(0);
						background: url(../img/arrow-right.png);
						.background-size(50,50);
					}
				}
			}
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header.vue';
	import myFooter from '../components/footer.vue';
	import mySliderImage from '../components/sliderImage.vue';

	export default {
		name: 'discover',
		data() {
			return {

			}
		},

		components: {
			myHeader,
			myFooter,
			mySliderImage,
		}
	}
</script>