<template>
	<div class="shortcut-wrapper">
		<ul>
			<li>
				<span class="icon"></span>
				<span class="name">添加自选</span>
			</li>
			<li @click='showExchangecode'>
				<span class="icon"></span>
				<span class="name">输入兑换码</span>
			</li>
			<li>
				<span class="icon"></span>
				<span class="name">邀请朋友</span>
			</li>
		</ul>
		<span class="boult"></span>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.shortcut-wrapper{
		position: absolute;
		.right(20);
		.top(100);
		ul{
			.width(250);
			.padding(0, 15);
			background: #fff;
			.border-radius(5);
			li{
				position: relative;
				.height(70);
				.line-height(70);
				.padding-left(80);
				text-align: left;
				color: #5a4984;
				.border-bottom(1, solid, #ccc);
				&>.icon{
					position: absolute;
					.top(15);
					.left(10);
					display: inline-block;
					.width(40);
					.height(40);
					background: url(../img/option-extra.png) 0 0 no-repeat;
					.background-size(50, 320);
				}
				&:first-child>.icon{
						.background-position(-10, -20);
				}
				&:nth-child(2)>.icon{
						.background-position(-10, -180);
				}
				&:last-child>.icon{
						.background-position(-10, -100);
				}
			}
		}
		.boult{
			position: absolute;
			display: inline-block;
			.top(-40);
			.right(40);
			.triangle(20, 10, transparent, transparent, #fff, transparent);
		}
	}

</style>

<script type="text/javascript">
	export default {
		name: 'shortcut',
		data() {
			return {

			}
		},

		props: {
			onChangecode: {
				type: Function,
				default: undefined,
				required: false,
			}
		},

		methods: {
			showExchangecode() {
				this.onChangecode();
			}
		},

		created() {

		},
	}
</script>