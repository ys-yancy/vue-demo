<template>
	<div class="history-order">
	<v-scroll :on-refresh="getHistoryOrderList" :on-infinite="onInfinite">
		<ul id="J_list" class="list">
			<router-link :to='{path: "/proTrading", query: {symbolName: symbol.name, symbol: symbol.symbol}}' tag='li' v-for=' symbol in order_list ' :key='symbol.name' ref='symbolListNode'>
					<div class="symbol_way" :class='{sell: symbol.cmd != "buy"}'>
						<span></span>
					</div>
					<div class="symbol-name clearfix">
						<p class="name J_SymbolName">{{ symbol.symbolName }}</p>
						<p class="symbol">{{ symbol.symbol }}</p>
					</div>
					<ul class="attribute detail">
						<li>
							<p class="name">盈亏</p>
							<p class="J_Formate no-guadan down">{{ symbol.profit }}</p>
						</li>
						<li>
							<p class="name">当前价格</p>
							<p class="J_Price J_Formate">{{ symbol.openPrice }}</p>
						</li>
						<li>
							<p class="name">开仓价格</p>
							<p class="J_Formate">{{ symbol.openPrice }}</p>
						</li>
						<li>
							<p class="name">交易量</p>
							<p class="J_Formate">{{ symbol.volume }}</p>
						</li>
						<li>
							<p class="name">止盈价格</p>
							<p class="J_Formate">{{ symbol.takeProfit }}</p>
						</li>
						<li>
							<p class="name">止损价格</p>
							<p class="J_Formate">{{ symbol.stopLoss }}</p>
						</li>
					</ul>
					<span class="guide">
						<span></span>
					</span>

			</router-link>
		</ul>
		</v-scroll>
	</div>
</template>

<style lang='less' scoped>
	@import '../style/variable.less';
	.history-order{
		background: #f4f3fb;
		#J_list{
			&>li{
				position: relative;
				.height(150);
				color: #807691;
				background-color: #fff;
				.padding(10, 40);
				.border-bottom(10, solid, #f4f3fb);
				.symbol_way{
					position: absolute;
					.width(20);
					.height(20);
					.left(10);
					.top(60);
					.border-radius(50%);
					background: #f9594a;
					&.sell{
						background: #32d8a3;
					}
				}
				.symbol-name{
					display: inline-block;
					.width(150);
					.height(120);
					.padding-top(20);
					float: left;
					.border-right(1, solid, #807691);
					p{
						.width(120);
						.height(40);
						.line-height(40);
						text-align: left;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						&:last-child{
							width: 100%;
							.font-size(20);
						}
					}
					
				}
				.attribute{
					display: inline-block;
					/*float: right;*/
					.width(400);
					li{
						display: inline-block;
						.width(100);
						.margin(5, 12);
						.font-size(20);
					}
				}
				.guide{
					display: inline-block;
					position: absolute;
					.width(20);
					.height(20);
					.border-radius(50%);
					background: #d5caf1;
					.top(60);
					.right(10);
					span{
						position: absolute;
						display: inline-block;
						.top(5);
						.left(8);
						.triangle(5,transparent, transparent, transparent, #fff );
					}
				}
			}
		}
	}

</style>

<script type="text/javascript">
	import _ from '../../service/page-base';
	import vScroll from '../components/scroll';
	export default {
		name: 'currentOrder',

		data() {
			return {
				order_list: '',
				page: 0,
			    listdata: [], // 下拉更新数据存放数组
			    downdata: [],  // 上拉更多的数据存放数组
			}
		},

		methods: {
			async getHistoryOrderList(calBack) {
				let list = await _.getHistoryOrderList({page: this.page}).then((data)=> {

					data = data.data.data;

					//  不是这样的  目前只是为了实现效果
					if (!data.length) {
						return
					}
					

					this.order_list = data;
				});

				if (calBack) {
					setTimeout(()=> {
						calBack();
					}, 1000);
				}

				this.page++;
				return this.order_list;
			},

			async onInfinite(calBack) {
				let result = await this.getHistoryOrderList();

				console.log('加载更多')

				calBack&&calBack();

			}
		},

		created() {
			this.getHistoryOrderList();
		},

		mounted() {

		},

		components: {
			vScroll,
		}
	}
</script>