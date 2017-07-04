<template>
	<div class="infoBar">
		<section class="info" :class='{up: up}'>
			<div class="cur-wrapper">
				<p id="J_Price">{{info_data.price}}</p>
				<span class="range" id="J_range">{{diff}}</span>
				<span class="range-percent" id="J_percent">{{ratio}}%</span>
			</div>
			<div class="detail-wrapper">
				<div>
					<span class="price-today">今开:{{info_data.open}}</span>
					<span class="highest">最高:{{info_data.high}}</span>
				</div>
				<div>
					<span class="prec">作收:{{info_data.yesterdayClose}}</span>
					<span class="lowest">最低:{{info_data.low}}</span>
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
	import { mapGetters } from 'vuex';
	export default {
		name: 'infoBar',
		data() {
			return {
				//好像有点多余
				diff: 0.00,
				ratio: 0.00,
				up: 0,
				unit: 2, //curSymbol.policy.min_quote_unit
				cachePrices: null,
				isGetInData: false,
				updateInfoBalContro: null,
				info_data: {
					price: '--',
					high: '--',
					low: '--',
					open: '--',
					yesterdayClose: '--',
				},
				// 这里可以优化
				todayPrice: {
					unit: 0,
					close: 0, 
					price: '--',
				},
				yesterdayPrice: {
					close: 0, 
					price: 0,
				},
				
			}
		},

		created() {
			// console.log(this.curPrice)
			// this.emitGetInfoEvent();
		},


		methods: {
			init(price, cur_symbol) {

				this.cachePrices = price;
				this.updatePriceRatio(price);

				if (!this.isGetInData) {
					this.getInfoData(price);
					this.isGetInData = true;
				}
			},

			destroy() {
				// 回收机制
				clearTimeout(this.updateInfoBalContro);
				this.cachePrices = null,
				this.info_data = null;
				this.todayPrice = null;
				this.yesterdayPrice = null;
			},

			async getInfoData(chchePrices) {
				let cur_symbol = this.getCachePrice;
				if ( !this.updateInfoBalContro ) {
					clearTimeout(this.updateInfoBalContro)
				}
				let prices = await this.getPrices();
					prices = prices.slice(prices.length - 2);

				this.todayPrice = prices[1],
  				this.yesterdayPrice = prices[0];

  				//不清楚unit什么意思，暂时给2
				this.todayPrice.unit = this.unit ? this.unit : 2;
				this.todayPrice.close = this.yesterdayPrice.close;
				//  解决首次渲染慢  可以把这里分开， chchePrices阻塞加载
				try{
					this.todayPrice.price = this.cachePrices&&this.cachePrices.bidPrice || chchePrices.bidPrice;
  					this.up = this.todayPrice.price - this.todayPrice.close > 0 ? true : false;

  					this.updatePriceRatio(this.cachePrices);
				}catch(e){}
						
				this.updateInfoBalContro = setTimeout(()=> {
					this.getInfoData();
				}, 10000)
			},

			updateInfoBar(prices) {
				try{
					this.info_data.price = prices.bidPrice ;
					this.info_data.high = this.todayPrice.high;
					this.info_data.low = this.todayPrice.low;
					this.info_data.open = this.todayPrice.open;
					this.info_data.yesterdayClose = this.yesterdayPrice.close;
				}catch(e){
					// console.log()
				}
			},

			updatePriceRatio(cacheprices) {
				let diff, ratio;
				if (!this.yesterdayPrice.price && !this.todayPrice.price) {
					return;
				}

				this.updateInfoBar(cacheprices);

				try{
					diff = (cacheprices.bidPrice - parseFloat(this.yesterdayPrice.close)).toFixed(3);
					ratio = diff/parseFloat(this.yesterdayPrice.close).toFixed(2); 
				}catch(e) {
					diff = (this.todayPrice.price - parseFloat(this.yesterdayPrice.close)).toFixed(3);
					ratio = diff/parseFloat(this.yesterdayPrice.close).toFixed(2); 
				}
				this.diff = parseFloat(diff).toFixed(3),this.ratio = parseFloat(ratio).toFixed(2);
				return;	
			},

			async getPrices() {
				let params = this.getParams();
					// symbol = params.id;
				let data = await this.$PB.getInfoData(params);
				return data.data.data.price;
			},

			getParams() {
				let type = this.$getType();
				let account = this.$store.state.userAccount;
					account = account.account[type];

				let params = {
					id: '',
					tf: 'm30',
					group_name: account.group_name,
				};
				params.id = this.$route.query.symbol;
				return params;
			}
		},

		computed: {
			...mapGetters([
				"getCachePrice"
			]),
		},

		beforeDestroy() {
			this.destroy();
		},

		watch: {
			getCachePrice: {
				handler: function(prices) {
					let cur_symbol = this.$route.query.symbol,
						price = prices[cur_symbol];

					this.init(price, cur_symbol);
				},
				deep: true,
			},
		},
	}
</script>