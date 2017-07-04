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
	import myLogin from '../components/login';
	import myHeader from '../components/header';
	import myStock from '../components/highStock';
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
			init() {
				this._initAttrs();
				this.$store.dispatch('getCurSymbolInfo',this.params);
			},

			destroy() {
				this.symbol = null;
				this.params = null;
			},

			_initAttrs() {
				this.symbol.name = this.$route.query.symbolName;
				this.symbol.sbl = this.params.id = this.$route.query.symbol;
				this.params.symbols = this.symbol.sbl;
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
	}
</script>