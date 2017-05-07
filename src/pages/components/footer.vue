<template>
	<footer class="footer">
		<router-link to='/option'>
			<span class="icon"></span>
			<span class="name">主页</span>
		</router-link>
		<router-link to='/discover'>
			<span class="icon"></span>
			<span class="name">发现</span>
		</router-link>
		<router-link to='/my'>
			<span class="icon"></span>
			<span class="name">我</span>
		</router-link>
	</footer>
</template>
<style lang='less'>
	@import '../style/variable.less';
	footer{
		display: flex;
		display: -webkit-flex;
		position: fixed;
		.width(640);
		.height(90);
		.bottom(-1);
		.right(0);
		.left(0);
		.font-size(26);
		background-color: #160E23;
		justify-content: space-around;
		align-items: center;
		a{
			position: relative;
			color: #fff;
			.padding-top(40);
			.name{
				.font-size(18);
				color: #807691;
				.padding-left(3);
			}
			.icon{
				position: absolute;
				.width(50);
				.height(50);
				background: url(../img/bg-icon.png)0 0 no-repeat;
				.background-position(0, -962);
				.background-size(400, 1500);
				.top(0);
				.left(0);
			}
			&:nth-child(2){
				.icon{
					.background-position(0, -962);
				}
			}
			&:last-child{
				.icon{
					.background-position(0, -816);
					.left(-10);
				}
			}

		}
	}
</style>

