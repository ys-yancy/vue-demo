<template>
	<div class="dialog-wrapper-outer" @touchmove.prevent.stop>
		<div class="dialog-wrapper">
			<div class="">
				<p class="dialog-title">输入兑换码</p>
			</div>
			<div class="dialog-content">
				<slot></slot>
				<span></span>
			</div>
			<div class="btn-wrapper">
				<div class="btn-confirm" @click='close'>取消</div>
				<div class="btn-close" @click='confirm'>确认</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.dialog-wrapper-outer{
		position: fixed;
		.top(0);
		.left(0);
		.right(0);
		.bottom(0);
		background: rgba(0, 0, 0, .7);
		z-index: 20;
		.dialog-wrapper{
			position: absolute;
			background: #fff;
			.width(400);
			.padding(20, 0);
			.top(240);
			.right(120);
			.font-size(26);
			.border-radius(10);
			.btn-wrapper{
				position: absolute;
				.left(0);
				.right(0);
				.bottom(0);
				.font-size(0);
				.border-top(1, solid, #ccc);
				div{
					display: inline-block;
					width:50%;
					.height(60);
					.font-size(24);
					.line-height(60);
					text-align: center;
					&:first-child{
						.border-right(1, solid, #ccc);
					}
				}
			}
			.dialog-content{
				.margin-top(30);
				.margin-bottom(70);
				div, span, p, section{
					display: inline-block;
				}
			}
		}
	}
</style>

<script type="text/javascript">
	export default {
		name: 'dialog',
		data() {
			return {

			}
		},

		props: {
			onConfirm: {
				type: Function,
				default: undefined,
				required: false,
			},
			onClose: {
				type: Function,
				default: undefined,
				required: false,

			}
		},

		created() {

		},

		methods: {
			confirm() {
				this.onConfirm(1)
			},

			close() {
				this.onClose(0);
			}
		},

	}
</script>