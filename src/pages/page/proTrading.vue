<template>
	<div class="pro-trading">
		<!-- header -->
		<my-header :page-title='symbol.name'>
			<span slot='icon-logo' class="go-back" @click='$router.go(-1)'> < </span>
		</my-header>

		<!-- stock -->

		<my-stock :params='params'></my-stock>
		<my-login></my-login>
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
		}
	}
</style>

<script type="text/javascript">
	import myHeader from '../components/header';
	import myStock from '../components/highStock';
	import myLogin from '../components/login';
	export default {
		name: 'pro-trading',

		data() {
			return {
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

		},

		mounted() {
			// this.getSymbol();
		},

		created() {

			this.symbol.name = this.$route.query.symbolName;
			this.symbol.sbl = this.params.id = this.$route.query.symbol;

			this.params.symbols = this.symbol.sbl;
			
			this.$store.dispatch('getCurSymbolInfo',this.params);

			//获取stockList
			// this.$store.dispatch('getStockSymbolList', this.params);
		},

		computed: {
			// stockList() {
			// 	const stockListPrice = this.$store.state.stockSymbolList.price;

			// 	// this.stockSymbolList.price = stockListPrice;
			// }
		},

		watch: {
			// curSymbolInfo() {

			// }
		},

		components: {
			myHeader: myHeader,
			myStock:  myStock,
			myLogin:  myLogin,
		},
	}
</script>