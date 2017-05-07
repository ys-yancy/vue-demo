<template>
	<header>
		<div class="header-inner">
			<slot name='icon-logo'></slot>
			<div class="page-title" :if='pageTitle'>{{pageTitle}}</div>
			<slot name='right-icon'></slot>
		</div>
	</header>
</template>
<style lang='less' scoped>
	@import '../style/variable.less';
	header{
		position: absolute;
		.top(0);
		.width(640);
		.height(80);
		background: #967BDC;
		text-align: center;
		.line-height(80);
		.margin-bottom(80);
		z-index: 5;
		.header-inner{
			position: relative;
			.padding(0, 20);
		}
		.page-title{
			width: 100%;
			color: #fff;
			.font-size(32);
			font-weight: 400;
			display: inline-block;
		}
		.go-back{
			position: absolute;
			float: left;
		}
		.right-icon{
			position: absolute;
			.top(0);
			.right(20);
			display: inline-block;
			float: right;
			text-decoration: none;
		}
	}
</style>

<script type="text/javascript">
	export default {
		data() {
			return {

			}			
		},

		mounted() {

		},

		props: [
			'pageTitle'
		]
	}
</script>