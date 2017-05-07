<template>
	<div class="infoBar">
		<section class="info" :class='{up: up}'>
			<div class="cur-wrapper">
				<p id="J_Price">{{curPrice&&curPrice[3] ? curPrice[3] : infoData.price}}</p>
				<span class="range" id="J_range">{{diffPriceRatio.diffPrice}}</span>
				<span class="range-percent" id="J_percent">{{diffPriceRatio.Ratio}}%</span>
			</div>
			<div class="detail-wrapper">
				<div>
					<span class="price-today">今开:{{infoData.open}}</span>
					<span class="highest">最高:{{infoData.high}}</span>
				</div>
				<div>
					<span class="prec">作收:{{infoData.yesterdayClose}}</span>
					<span class="lowest">最低:{{infoData.low}}</span>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.infoBar{
		.info{
			.width(640);
			.height(128);
			.padding-left(30);
			background: -webkit-gradient(linear, 0 50%, 100% 50%, from(#36dfa1), to(#25b9a8));
            background: -webkit-linear-gradient(left, #36dfa1, #25b9a8);
            background: -o-linear-gradient(left, #36dfa1, #25b9a8);
            &.up{
            	background: -webkit-gradient(linear, 0 50%, 100% 50%, from(#f07a60), to(#f1375e));
                background: -webkit-linear-gradient(left, #f07a60, #f1375e);
                background: -o-linear-gradient(left, #f07a60, #f1375e);
            }
            &>div{
            	color: #fff;
            	display: inline-block;
            }
			&>.cur-wrapper{
				display: inline-block;
				position: relative;
				.width(230);
				.height(110);
				float: left;
				.margin-right(50);
				&>p{
					.font-size(45);
					.margin-bottom(8);
					.margin-top(15);
				}
				&>.range-percent{
					float: right;
				}
			}
			&>.detail-wrapper{
				.width(300);
				.font-size(22);
				.margin-top(42);
				&>div{
					&>.highest, &>.lowest{
						float: right;
					}
					&:last-child{
						.margin-top(12);
					}
				}
			}
		}
	}

</style>

<script type="text/javascript">
	export default {
		name: 'infoBar',
		data() {
			return {
				//好像有点多余
				info_data: {
					price: '',
					high: '',
					low: '',
					open: '',
					yesterdayClose: '',
				},

				diffPrice: {
					Ratio: '- -',
					diffPrice: '- - ',
				}
				
			}
		},

		props: ['up', 'price', 'curPrice'],

		created() {
			// console.log(this.curPrice)
		},

		computed: {
			infoData() {
				const price = this.price.todayPrice,
					yesterdayPrice = this.price.yesterdayPrice;

				try{
					this.info_data.price = price.price ? price.price : '- -';
					this.info_data.high = price.high ? price.high : '- -';
					this.info_data.low = price.low ? price.low : '- -';
					this.info_data.open = price.open ? price.open : '- -';
					this.info_data.yesterdayClose = yesterdayPrice.close ? yesterdayPrice.close : '- -';
				}catch(e){
					console.log(e)
				}

				return this.info_data;
			},

			diffPriceRatio() {
				let diff = NaN;
				if (this.curPrice) {
					diff = (this.curPrice[3] - parseFloat(this.price.yesterdayPrice.close)).toFixed(3);
				} else {
					diff = (this.price.todayPrice.price - parseFloat(this.price.yesterdayPrice.close)).toFixed(3);
				}
			
				const ratio = !isNaN(diff)&&(diff/parseFloat(this.price.yesterdayPrice.close)); 
				return {
					diffPrice: !isNaN(diff) ? diff : '- -',
					Ratio: !isNaN(ratio) ? (ratio * 100).toFixed(2) : '- -',
				};
			},

		},

		watch: {
			
		},
	}
</script>