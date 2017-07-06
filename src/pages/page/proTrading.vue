<template>
	<div class="pro-trading">
		<!-- header -->
		<my-header :page-title='symbol.name'>
			<router-link tag='span' slot='icon-logo' class="go-back item-back" to='/option'>
			</router-link>
			<span v-if='page' slot='right-icon' class="icon-bar right-icon" @click='bar'>
			</span>
		</my-header>

		<!-- stock -->

		<my-stock :params='params'></my-stock>

		<my-login></my-login>

		<!-- 以后将这部分作为单独的组件 -->
		<div class="pro-outer-right">
			<div class="pro-inner-scren" v-if='barconl' 
			@click.prevent.stop='bar'
			@touch.prevent.stop 
			@touchmove.prevent.stop></div>
			
			<ul class="pro-inner-right" :class='{show : barconl}' @touchmove.prevent.stop>
				<router-link tag='li' :to='{path: "/proTrading", 
				query: {symbolName: symbol.name, symbol: symbol.symbol, page: "option"}}' 
				v-for='(symbol, key, index) in list' :key='key'>

					<p class="name">{{symbol.name}}</p>
					<p class="symbol">{{symbol.symbol}}</p>
					<span class="del"></span>

				</router-link>
			</ul>
		</div>
	</div>
</template>

<style lang='less' scoped>
	@import '../style/variable.less';
	.pro-trading{
		background: #160E23;
		header{
			color: #fff;
			.font-size(33);
			background-color: #160E23;
			.icon-bar{
				.width(50);
				.height(40);
				.top(20);
				background:url(../img/bg-icon.png) no-repeat 0 0;
				.background-size(400, 1500);
				.background-position(0, -390);
			}
		}
		.pro-outer-right{
			.pro-inner-scren{
				position: fixed;
				z-index: 99;
				.top(0);
				.left(0);
				.right(0);
				.bottom(0);
				background: rgba(0, 0, 0, .7);
			}
			.pro-inner-right{
				position: fixed;
				z-index: 100;
				.width(340);
				.top(0);
				.right(0);
				.bottom(0);
				background:#5a4984;
				-webkit-transition: all .6s ease;
				-moz-transition: all .6s ease;
				-o-transition: all .6s ease;
				transition: all .6s ease;
				-webkit-transform: translateX(9rem);
				-moz-transform: translateX(9rem);
				-o-transform: translateX(9rem);
				transform: translateX(9rem);
				&.show{
					-webkit-transform: translateX(0);
				    -moz-transform-moz-transform: translateX(0);
				    -o-transform: translateX(0);
				    transform: translateX(0);
				}
				li{
					position: relative;
					.height(85);
					.font-size(22);
					.padding(20, 20);
					color: #fff;
					.border-top(1, solid, #705f9e);
					.symbol{
						color: #ada5c1;
						.font-size(17);
						.margin-top(5);
					}
					.del{
						position: absolute;
						display: inline-block;
						.width(30);
						.height(50);
						background: url('../img/del-icon.png') no-repeat 0 0;
						.background-size(100, 100);
						.background-position(0, 10);
						.top(17);
						.right(20);
					}
				}
			}
		}
	}
</style>

<script type="text/javascript">
	import myLogin from '../components/login';
	import myHeader from '../components/header';
	import myStock from '../components/highStock';
	export default {
		name: 'pro-trading',

		data() {
			return {
				list: [],
				barconl: null,
				page: false,
				symbol: {
					name: '',
					sbl: '',
				},
				params: {
					id: '',
					tf: 'm30',
					group_name: 'b2b_real_0',
				},
			}
		},

		methods: {
			init() {
				this.list = [];
				this.barconl = null;
				this._initAttrs();
				this.getOptionList();
				this.$store.dispatch('getCurSymbolInfo',this.params);
			},

			destroy() {
				this.symbol = null;
				this.params = null;
			},

			async getOptionList() {
				let symbolList = await this.$PB.getOptionSymbolList();
				for ( let symbol of symbolList ) {
					let s = {
						name: symbol.policy.name,
						symbol: symbol.policy.symbol,
					}

					this.list.push(s);
				}
			},

			bar() {
				this.barconl = this.barconl ? false : true;
			},

			_initAttrs() {
				this.symbol.name = this.$route.query.symbolName;
				this.symbol.sbl = this.params.id = this.$route.query.symbol;
				this.params.symbols = this.symbol.sbl;
				this.page = this.$route.query.page == 'option' ? true : false;
			},
		},

		mounted() {
			
		},

		created() {
			this.init();
		},

		beforeDestroy() {
			this.destroy();
		},

		components: {
			myHeader: myHeader,
			myStock:  myStock,
			myLogin:  myLogin,
		},

		watch: {
			$route(to, from) {
				window.location.reload();
			}
		}
	}
</script>