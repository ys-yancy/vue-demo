<template>
	<div class="popup-wrapper">
		<ul class="clearfix">
			<li class="clearfix item title">
				<span class="warpper-icon-outer">
					<span class="warpper-icon">
						<span class="icon"></span>
					</span>
				</span>
				<h2 class="desc">平仓成功</h2>
				<span class="close-icon"></span>
			</li>
			<li class="clearfix item">
				<span class="left">平仓价格：</span>
				<span class="right num">42.64</span>
			</li>
			<li class="clearfix item">
				<span class="left">盈利金额：</span>
				<span class="right num">-0.60</span>
			</li>
			<li class="clearfix item"></li>
			<li class="clearfix item btn-wrapper">
				<router-link class='btn' to='/historyOrder'>确定</router-link>
			</li>
		</ul>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.popup-wrapper{
		position: fixed;
		z-index: 50;
		.left(0);
		.right(0);
		.bottom(0);
		color: #473b61;
		background: #fff;
		ul{
			.padding(0, 30);
			.font-size(20);
			.item{
				position: relative;
				.line-height(90);
				.border-bottom(1, solid, #d2d2da);
				.left{
					float: left;
				}
				.right{
					float: right;
				}
				&.title{
					.warpper-icon-outer{
						position: absolute;
						display: inline-block;
						.width(100);
						.height(100);
						.border-radius(50%);
						-webkit-transform: translateY(-50%);
						background: #473b61;
					}
					h2{
						text-align: left;
						.font-size(26);
						.padding-left(150);
					}
				}
				&.btn-wrapper{
					.width(640);
					display: table-cell;
					text-align: center;
					vertical-align: middle;
					border: none;
					.btn{
						display: inline-block;
						.width(420);
						.height(55);
						.line-height(55);
						.border-radius(5);
						background: #7686ba;
						.border-bottom(3, solid, #5b6ba1);
						.font-size(24);
						color: #fff;
						vertical-align: middle;
					}
				}
			}
		}
	}
</style>